const DEFAULT_EVENT_DURATION_MS = 2 * 60 * 60 * 1000;
const CHICAGO_TIME_ZONE = "America/Chicago";
const DEFAULT_FEED_ORIGIN = "https://www.devsa.community";
const GGS_COMMUNITY_ID = "greater-gaming-society";

function getFeedOrigin() {
  const configuredOrigin =
    process.env.GGS_EVENTS_FEED_ORIGIN?.trim() || DEFAULT_FEED_ORIGIN;

  return configuredOrigin.endsWith("/")
    ? configuredOrigin.slice(0, -1)
    : configuredOrigin;
}

function getFeedUrl() {
  return `${getFeedOrigin()}/api/events/feed?communityId=${GGS_COMMUNITY_ID}`;
}

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
  detailsUrl: string;
  description: string;
  eventType: string;
  eventStart: string;
  eventEnd: string;
  eventTimezone: string;
  locationLabel: string;
  hosts: Array<{ id: string; name: string }>;
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

function extractRepeatedTagValues(xml: string, tagName: string) {
  return [
    ...xml.matchAll(new RegExp(`<${tagName}>([\\s\\S]*?)</${tagName}>`, "g")),
  ]
    .map((match) => decodeXmlEntities(match[1].trim()))
    .filter(Boolean);
}

function extractHosts(xml: string) {
  return [
    ...xml.matchAll(
      /<devsa:host(?:\s+id="([^"]*)")?>([\s\S]*?)<\/devsa:host>/g,
    ),
  ]
    .map((match) => ({
      id: decodeXmlEntities(match[1]?.trim() ?? ""),
      name: decodeXmlEntities(match[2].trim()),
    }))
    .filter((host) => host.name);
}

function parseFeedItems(feedXml: string) {
  return [...feedXml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => {
    const itemXml = match[1];

    return {
      title: extractTagValue(itemXml, "title"),
      detailsUrl:
        extractTagValue(itemXml, "devsa:detailsUrl") ||
        extractTagValue(itemXml, "link"),
      description:
        extractTagValue(itemXml, "devsa:description") ||
        extractTagValue(itemXml, "description"),
      eventType: extractTagValue(itemXml, "devsa:eventType"),
      eventStart: extractTagValue(itemXml, "devsa:eventStart"),
      eventEnd: extractTagValue(itemXml, "devsa:eventEnd"),
      eventTimezone:
        extractTagValue(itemXml, "devsa:eventTimezone") || CHICAGO_TIME_ZONE,
      locationLabel:
        extractTagValue(itemXml, "devsa:locationLabel") ||
        extractRepeatedTagValues(itemXml, "category")[0] ||
        "San Antonio, Texas",
      hosts: extractHosts(itemXml),
    } satisfies ParsedFeedItem;
  });
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

function parseEventTimeMs(isoDateTime: string) {
  const parsedMs = Date.parse(isoDateTime);

  return Number.isNaN(parsedMs) ? null : parsedMs;
}

function formatEventLabels(startMs: number, endMs: number, timeZone: string) {
  const startDate = new Date(startMs);
  const endDate = new Date(endMs);

  return {
    dateLabel: new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(startDate),
    timeLabel: `${new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
    }).format(startDate)} - ${new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
    }).format(endDate)}`,
  };
}

function toFormatLabel(eventType: string) {
  switch (eventType) {
    case "in-person":
      return "In-Person";
    case "hybrid":
      return "Hybrid";
    case "virtual":
      return "Virtual";
    default:
      return "Community event";
  }
}

export async function getUpcomingGgsEvents() {
  const response = await fetch(getFeedUrl(), {
    next: { revalidate: 60 * 30 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch DEVSA feed: ${response.status}`);
  }

  const feedXml = await response.text();
  const nowMs = getChicagoNowMs(new Date());

  return parseFeedItems(feedXml)
    .filter((item) => item.hosts.some((host) => host.id === GGS_COMMUNITY_ID))
    .map((item) => {
      const startMs = parseEventTimeMs(item.eventStart);

      if (startMs === null) {
        return null;
      }

      const endMs =
        parseEventTimeMs(item.eventEnd) ?? startMs + DEFAULT_EVENT_DURATION_MS;
      const timeZone = item.eventTimezone || CHICAGO_TIME_ZONE;
      const labels = formatEventLabels(startMs, endMs, timeZone);

      return {
        title: item.title,
        link: item.detailsUrl,
        description: item.description,
        location: item.locationLabel || "San Antonio, Texas",
        format: toFormatLabel(item.eventType),
        hostedBy: item.hosts.map((host) => host.name).join(", "),
        startMs,
        endMs,
        dateLabel: labels.dateLabel,
        timeLabel: labels.timeLabel,
      } satisfies GgsEvent;
    })
    .filter((event): event is GgsEvent => Boolean(event))
    .filter((event) => event.endMs >= nowMs)
    .sort((left, right) => left.startMs - right.startMs);
}
