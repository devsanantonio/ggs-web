import type { GgsEvent } from "@/lib/ggsEvents";

export type EventsFixtureState = {
  upcomingEvents: GgsEvent[];
  pastEvents: GgsEvent[];
  nowMs: number;
  error?: string;
};

const FIXED_NOW_ISO = "2026-04-27T18:30:00-05:00";
const FIXED_NOW_MS = new Date(FIXED_NOW_ISO).getTime();

function createEvent(overrides: Partial<GgsEvent>): GgsEvent {
  return {
    title: "GGS Event",
    link: "https://devsa.community/events/example",
    description:
      "A long event description that should be visually clamped so the list stays clean even when the feed text runs longer than the card wants to show in the layout.",
    location: "San Antonio, Texas",
    format: "In-Person",
    hostedBy: "Greater Gaming Society",
    startMs: FIXED_NOW_MS + 60 * 60 * 1000,
    endMs: FIXED_NOW_MS + 3 * 60 * 60 * 1000,
    dateLabel: "Mon, April 27, 2026",
    timeLabel: "7:30 PM - 9:30 PM",
    ...overrides,
  };
}

const fixtures: Record<string, EventsFixtureState> = {
  single: {
    nowMs: FIXED_NOW_MS,
    upcomingEvents: [
      createEvent({
        title: "Single Upcoming Event",
      }),
    ],
    pastEvents: [],
  },
  two: {
    nowMs: FIXED_NOW_MS,
    upcomingEvents: [
      createEvent({
        title: "Second Event",
        startMs: FIXED_NOW_MS + 4 * 60 * 60 * 1000,
        endMs: FIXED_NOW_MS + 6 * 60 * 60 * 1000,
        timeLabel: "10:30 PM - 12:30 AM",
      }),
      createEvent({
        title: "First Event",
        startMs: FIXED_NOW_MS + 60 * 60 * 1000,
        endMs: FIXED_NOW_MS + 3 * 60 * 60 * 1000,
        timeLabel: "7:30 PM - 9:30 PM",
      }),
    ],
    pastEvents: [],
  },
  more: {
    nowMs: FIXED_NOW_MS,
    upcomingEvents: [
      createEvent({ title: "Event One" }),
      createEvent({
        title: "Event Two",
        startMs: FIXED_NOW_MS + 4 * 60 * 60 * 1000,
        endMs: FIXED_NOW_MS + 6 * 60 * 60 * 1000,
      }),
      createEvent({
        title: "Event Three",
        startMs: FIXED_NOW_MS + 8 * 60 * 60 * 1000,
        endMs: FIXED_NOW_MS + 10 * 60 * 60 * 1000,
      }),
    ],
    pastEvents: [],
  },
  none: {
    nowMs: FIXED_NOW_MS,
    upcomingEvents: [],
    pastEvents: [],
  },
  live: {
    nowMs: FIXED_NOW_MS,
    upcomingEvents: [
      createEvent({
        title: "Live Event",
        startMs: FIXED_NOW_MS - 30 * 60 * 1000,
        endMs: FIXED_NOW_MS + 90 * 60 * 1000,
        timeLabel: "6:00 PM - 8:00 PM",
      }),
      createEvent({
        title: "Next Event",
        startMs: FIXED_NOW_MS + 3 * 60 * 60 * 1000,
        endMs: FIXED_NOW_MS + 5 * 60 * 60 * 1000,
        timeLabel: "9:30 PM - 11:30 PM",
      }),
    ],
    pastEvents: [],
  },
  clamp: {
    nowMs: FIXED_NOW_MS,
    upcomingEvents: [
      createEvent({
        title: "Clamped Description Event",
      }),
    ],
    pastEvents: [],
  },
  past: {
    nowMs: FIXED_NOW_MS,
    upcomingEvents: [],
    pastEvents: [
      createEvent({
        title: "Past Event 1",
        startMs: FIXED_NOW_MS - 1 * 24 * 60 * 60 * 1000,
        endMs: FIXED_NOW_MS - 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
        dateLabel: "Sun, April 26, 2026",
      }),
      createEvent({
        title: "Past Event 2",
        startMs: FIXED_NOW_MS - 2 * 24 * 60 * 60 * 1000,
        endMs: FIXED_NOW_MS - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
        dateLabel: "Sat, April 25, 2026",
      }),
      createEvent({
        title: "Past Event 3",
        startMs: FIXED_NOW_MS - 3 * 24 * 60 * 60 * 1000,
        endMs: FIXED_NOW_MS - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
        dateLabel: "Fri, April 24, 2026",
      }),
      createEvent({
        title: "Past Event 4",
        startMs: FIXED_NOW_MS - 4 * 24 * 60 * 60 * 1000,
        endMs: FIXED_NOW_MS - 4 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
        dateLabel: "Thu, April 23, 2026",
      }),
      createEvent({
        title: "Past Event 5",
        startMs: FIXED_NOW_MS - 5 * 24 * 60 * 60 * 1000,
        endMs: FIXED_NOW_MS - 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
        dateLabel: "Wed, April 22, 2026",
      }),
      createEvent({
        title: "Past Event 6",
        startMs: FIXED_NOW_MS - 6 * 24 * 60 * 60 * 1000,
        endMs: FIXED_NOW_MS - 6 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
        dateLabel: "Tue, April 21, 2026",
      }),
      createEvent({
        title: "Past Event 7",
        startMs: FIXED_NOW_MS - 7 * 24 * 60 * 60 * 1000,
        endMs: FIXED_NOW_MS - 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
        dateLabel: "Mon, April 20, 2026",
      }),
      createEvent({
        title: "Past Event 8",
        startMs: FIXED_NOW_MS - 8 * 24 * 60 * 60 * 1000,
        endMs: FIXED_NOW_MS - 8 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
        dateLabel: "Sun, April 19, 2026",
      }),
      createEvent({
        title: "Past Event 9",
        startMs: FIXED_NOW_MS - 9 * 24 * 60 * 60 * 1000,
        endMs: FIXED_NOW_MS - 9 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
        dateLabel: "Sat, April 18, 2026",
      }),
      createEvent({
        title: "Past Event 10",
        startMs: FIXED_NOW_MS - 10 * 24 * 60 * 60 * 1000,
        endMs: FIXED_NOW_MS - 10 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
        dateLabel: "Fri, April 17, 2026",
      }),
      createEvent({
        title: "Past Event 11",
        startMs: FIXED_NOW_MS - 11 * 24 * 60 * 60 * 1000,
        endMs: FIXED_NOW_MS - 11 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
        dateLabel: "Thu, April 16, 2026",
      }),
    ],
  },
};

export function getEventsFixtureState(name: string | null) {
  if (!name) {
    return null;
  }

  return fixtures[name] ?? null;
}
