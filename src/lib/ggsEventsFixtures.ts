import type { GgsEvent } from "@/lib/ggsEvents";

export type EventsFixtureState = {
  events: GgsEvent[];
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
    events: [
      createEvent({
        title: "Single Upcoming Event",
      }),
    ],
  },
  two: {
    nowMs: FIXED_NOW_MS,
    events: [
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
  },
  more: {
    nowMs: FIXED_NOW_MS,
    events: [
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
  },
  none: {
    nowMs: FIXED_NOW_MS,
    events: [],
  },
  live: {
    nowMs: FIXED_NOW_MS,
    events: [
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
  },
  clamp: {
    nowMs: FIXED_NOW_MS,
    events: [
      createEvent({
        title: "Clamped Description Event",
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
