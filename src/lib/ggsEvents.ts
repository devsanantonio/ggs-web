const FEED_URL = "https://www.devsa.community/api/events/feed";
const DEFAULT_EVENT_DURATION_MS = 2 * 60 * 60 * 1000;
const CHICAGO_TIME_ZONE = "America/Chicago";

export type GgsEvent = {
  title: string;
  link: string;
  description: string;
  location: string;
  format: string;
  hostedBy: string;
  startMs: number;
  endMs: number;
  dateLabel: string;
  timeLabel: string;
};

type ParsedFeedItem = {
  title: string;
  link: string;
  description: string;
  category: string;
};

type ParsedDescription = {
  dateTimeText: string;
  location: string;
  format: string;
  hostedBy: string;
  details: string;
};

function decodeXmlEntities(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&apos;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function extractTagValue(xml: string, tagName: string) {
  const match = xml.match(new RegExp(`<${tagName}>([\\s\\S]*?)</${tagName}>`));

  return match ? decodeXmlEntities(match[1].trim()) : "";
}

function parseFeedItems(feedXml: string) {
  return [...feedXml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => {
    const itemXml = match[1];

    return {
      title: extractTagValue(itemXml, "title"),
      link: extractTagValue(itemXml, "link"),
      description: extractTagValue(itemXml, "description"),
      category: extractTagValue(itemXml, "category"),
    } satisfies ParsedFeedItem;
  });
}

function parseDescription(description: string): ParsedDescription | null {
  const segments = description.split(" · ");

  if (segments.length < 5) {
    return null;
  }

  const [dateTimeText, location, formatSegment, hostedBySegment, ...details] =
    segments;

  return {
    dateTimeText: dateTimeText.trim(),
    location: location.trim(),
    format: formatSegment.replace(/^Format:\s*/, "").trim(),
    hostedBy: hostedBySegment.replace(/^Hosted by\s*/, "").trim(),
    details: details.join(" · ").trim(),
  };
}

function monthNameToIndex(monthName: string) {
  return [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ].indexOf(monthName.toLowerCase());
}

function getWallClockMs(
  year: number,
  monthIndex: number,
  day: number,
  hour: number,
  minute: number,
) {
  return Date.UTC(year, monthIndex, day, hour, minute);
}

function parseEventDateTime(dateTimeText: string) {
  const match = dateTimeText.match(
    /^[A-Za-z]+,\s+([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})\s+at\s+(\d{1,2}):(\d{2})\s+(AM|PM)(?:\s*[-–]\s*(\d{1,2}):(\d{2})\s+(AM|PM))?\s+CT$/,
  );

  if (!match) {
    return null;
  }

  const [
    ,
    monthName,
    dayText,
    yearText,
    startHourText,
    startMinuteText,
    startMeridiem,
    endHourText,
    endMinuteText,
    endMeridiem,
  ] = match;
  const monthIndex = monthNameToIndex(monthName);

  if (monthIndex === -1) {
    return null;
  }

  const year = Number(yearText);
  const day = Number(dayText);
  const startMinute = Number(startMinuteText);
  const rawStartHour = Number(startHourText) % 12;
  const startHour = rawStartHour + (startMeridiem === "PM" ? 12 : 0);
  const startMs = getWallClockMs(year, monthIndex, day, startHour, startMinute);
  let endMs = startMs + DEFAULT_EVENT_DURATION_MS;

  if (endHourText && endMinuteText && endMeridiem) {
    const rawEndHour = Number(endHourText) % 12;
    const endHour = rawEndHour + (endMeridiem === "PM" ? 12 : 0);

    endMs = getWallClockMs(
      year,
      monthIndex,
      day,
      endHour,
      Number(endMinuteText),
    );
    if (endMs <= startMs) {
      endMs += 24 * 60 * 60 * 1000;
    }
  }

  const surrogateDate = new Date(startMs);
  const endSurrogateDate = new Date(endMs);
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(surrogateDate);
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit",
  });

  return {
    startMs,
    endMs,
    dateLabel,
    timeLabel: `${timeFormatter.format(surrogateDate)} - ${timeFormatter.format(endSurrogateDate)}`,
  };
}

function getChicagoNowMs(now: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: CHICAGO_TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const partValue = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? "0");

  return getWallClockMs(
    partValue("year"),
    partValue("month") - 1,
    partValue("day"),
    partValue("hour"),
    partValue("minute"),
  );
}

export async function getUpcomingGgsEvents() {
  const response = await fetch(FEED_URL, {
    next: { revalidate: 60 * 30 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch DEVSA feed: ${response.status}`);
  }

  const feedXml = await response.text();
  const nowMs = getChicagoNowMs(new Date());

  return parseFeedItems(feedXml)
    .map((item) => {
      const parsedDescription = parseDescription(item.description);

      if (!parsedDescription) {
        return null;
      }

      if (!parsedDescription.hostedBy.includes("Greater Gaming Society")) {
        return null;
      }

      const parsedDateTime = parseEventDateTime(parsedDescription.dateTimeText);

      if (!parsedDateTime) {
        return null;
      }

      return {
        title: item.title,
        link: item.link,
        description: parsedDescription.details,
        location: parsedDescription.location,
        format: parsedDescription.format || item.category,
        hostedBy: parsedDescription.hostedBy,
        startMs: parsedDateTime.startMs,
        endMs: parsedDateTime.endMs,
        dateLabel: parsedDateTime.dateLabel,
        timeLabel: parsedDateTime.timeLabel,
      } satisfies GgsEvent;
    })
    .filter((event): event is GgsEvent => Boolean(event))
    .filter((event) => event.endMs >= nowMs)
    .sort((left, right) => left.startMs - right.startMs);
}
