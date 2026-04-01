"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import type { GgsEvent, GgsEventsResponse } from "@/lib/ggsEvents";
import { getEventsFixtureState } from "@/lib/ggsEventsFixtures";

type FeedResponse = GgsEventsResponse & {
  error?: string;
};

type EventsTab = "upcoming" | "past";

const INITIAL_PAST_VISIBLE_COUNT = 2;
const PAST_INCREMENT_COUNT = 4;

const fallbackEvent = {
  title: "Greater Gaming Society Monthly Meetup",
  dateLabel: "Every 2nd Tuesday",
  timeLabel: "6:00 PM - 8:00 PM",
  location: "San Antonio, Texas",
  format: "Community meetup",
  description:
    "Join the regular GGS meetup to meet local developers, players, creatives, and supporters in person.",
  link: "https://www.meetup.com/greater-gaming-society-of-san-antonio/",
};

function getNowInChicagoMs(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const partValue = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? "0");

  return Date.UTC(
    partValue("year"),
    partValue("month") - 1,
    partValue("day"),
    partValue("hour"),
    partValue("minute"),
  );
}

function getUpcomingToggleLabel(hiddenCount: number) {
  return hiddenCount === 1
    ? "There is 1 more upcoming event"
    : `There are ${hiddenCount} more upcoming events`;
}

function getPastToggleLabel(hiddenCount: number) {
  if (hiddenCount <= PAST_INCREMENT_COUNT) {
    return hiddenCount === 1
      ? "Show 1 more event"
      : `Show ${hiddenCount} more events`;
  }

  return `Show ${PAST_INCREMENT_COUNT} more events`;
}

export function Events() {
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLElement | null>(null);
  const fixtureName = searchParams.get("events-fixture");
  const fixtureState = getEventsFixtureState(fixtureName);
  const initialTab: EventsTab =
    searchParams.get("events-tab") === "past" ? "past" : "upcoming";
  const initialShowAllUpcoming = searchParams.get("events-expanded") === "1";
  const initialVisiblePastCount =
    Number(searchParams.get("past-count")) || INITIAL_PAST_VISIBLE_COUNT;
  const [activeTab, setActiveTab] = useState<EventsTab>(initialTab);
  const [showAllUpcoming, setShowAllUpcoming] = useState(
    initialShowAllUpcoming,
  );
  const [visiblePastCount, setVisiblePastCount] = useState(
    initialVisiblePastCount,
  );
  const [upcomingEvents, setUpcomingEvents] = useState<GgsEvent[]>([]);
  const [pastEvents, setPastEvents] = useState<GgsEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [nowMs, setNowMs] = useState(() => getNowInChicagoMs(new Date()));
  const resolvedUpcomingEvents = fixtureState?.upcomingEvents ?? upcomingEvents;
  const resolvedPastEvents = fixtureState?.pastEvents ?? pastEvents;
  const resolvedIsLoading = fixtureState ? false : isLoading;
  const resolvedLoadError = fixtureState?.error ?? loadError;
  const resolvedNowMs = fixtureState?.nowMs ?? nowMs;
  const sortedUpcomingEvents = useMemo(
    () =>
      [...resolvedUpcomingEvents].sort(
        (left, right) => left.startMs - right.startMs,
      ),
    [resolvedUpcomingEvents],
  );
  const sortedPastEvents = useMemo(
    () =>
      [...resolvedPastEvents].sort(
        (left, right) => right.startMs - left.startMs,
      ),
    [resolvedPastEvents],
  );

  useEffect(() => {
    if (fixtureState) {
      setUpcomingEvents(fixtureState.upcomingEvents);
      setPastEvents(fixtureState.pastEvents);
      setLoadError(fixtureState.error ?? null);
      setNowMs(fixtureState.nowMs);
      setIsLoading(false);
      return;
    }

    const intervalId = window.setInterval(() => {
      setNowMs(getNowInChicagoMs(new Date()));
    }, 60 * 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [fixtureState]);

  useEffect(() => {
    if (fixtureState) {
      return;
    }

    let isActive = true;

    async function loadEvents() {
      setIsLoading(true);
      setLoadError(null);

      try {
        // DEVSA's RSS feed does not currently expose CORS headers for browser fetches.
        // This stays behind a Next route for now. If the site later moves to a
        // pure static export, replace this with a build-time or scheduled sync.
        const response = await fetch(
          `/api/ggs-events${window.location.search}`,
        );
        const payload = (await response.json()) as FeedResponse;

        if (!isActive) {
          return;
        }

        setUpcomingEvents(payload.upcomingEvents ?? []);
        setPastEvents(payload.pastEvents ?? []);
        setLoadError(payload.error ?? null);
        setIsLoading(false);
      } catch {
        if (!isActive) {
          return;
        }

        setUpcomingEvents([]);
        setPastEvents([]);
        setLoadError("Unable to load upcoming events.");
        setIsLoading(false);
      }
    }

    loadEvents();

    return () => {
      isActive = false;
    };
  }, [fixtureState]);

  const liveIndex = useMemo(
    () =>
      sortedUpcomingEvents.findIndex(
        (event) =>
          resolvedNowMs >= event.startMs && resolvedNowMs < event.endMs,
      ),
    [resolvedNowMs, sortedUpcomingEvents],
  );
  const upcomingIndex = useMemo(() => {
    if (liveIndex !== -1) {
      return sortedUpcomingEvents.findIndex(
        (event, index) => index > liveIndex && event.startMs > resolvedNowMs,
      );
    }

    return sortedUpcomingEvents.findIndex(
      (event) => event.startMs > resolvedNowMs,
    );
  }, [liveIndex, resolvedNowMs, sortedUpcomingEvents]);
  const visibleUpcomingEvents = showAllUpcoming
    ? sortedUpcomingEvents
    : sortedUpcomingEvents.slice(0, 2);
  const hiddenUpcomingCount = Math.max(sortedUpcomingEvents.length - 2, 0);
  const visiblePastEvents = sortedPastEvents.slice(0, visiblePastCount);
  const hiddenPastCount = Math.max(
    sortedPastEvents.length - visiblePastEvents.length,
    0,
  );
  const isPastExpanded = visiblePastCount > INITIAL_PAST_VISIBLE_COUNT;

  function scrollToEventsTop() {
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function renderUpcomingBadge(index: number) {
    if (index === liveIndex) {
      return (
        <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-700 shadow-[0_8px_24px_rgba(244,63,94,0.16)]">
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-rose-400/70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-600 shadow-[0_0_0_2px_rgba(255,255,255,0.9)]" />
          </span>
          Happening now
        </span>
      );
    }

    if (index === upcomingIndex) {
      return (
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
          Upcoming
        </span>
      );
    }

    return null;
  }

  function renderEventCard(event: GgsEvent, index: number, tab: EventsTab) {
    return (
      <article
        key={`${tab}-${event.title}-${event.startMs}`}
        data-testid="event-card"
        className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-slate-950 hover:shadow-[0_24px_55px_rgba(15,23,42,0.11)]"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-amber-300 to-sky-400 opacity-0 transition group-hover:opacity-100" />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 lg:w-[13rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              {event.dateLabel}
            </p>
            <p className="mt-3 text-lg font-semibold text-slate-950">
              {event.timeLabel}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-500">
              {event.location}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-500">
              {event.format}
            </p>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start gap-3">
              <h3
                data-testid="event-title"
                className="text-2xl font-semibold tracking-tight text-slate-950"
              >
                {event.title}
              </h3>
              <div data-testid="event-badge">
                {tab === "upcoming" ? renderUpcomingBadge(index) : null}
              </div>
            </div>
            <p
              data-testid="event-description"
              title={event.description}
              className="mt-4 overflow-hidden text-base leading-7 font-medium text-slate-800"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
            >
              {event.description}
            </p>
            <p className="mt-4 text-sm font-medium text-slate-500">
              Hosted by {event.hostedBy}
            </p>
          </div>

          <div className="flex lg:justify-end">
            <a
              href={event.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition group-hover:border-slate-950 group-hover:bg-slate-950 group-hover:text-white focus-visible:border-slate-950 focus-visible:bg-slate-950 focus-visible:text-white"
            >
              Event details
            </a>
          </div>
        </div>
      </article>
    );
  }

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative scroll-mt-16 border-y border-black/5 bg-[linear-gradient(180deg,#fffdf7_0%,#f5fbf6_100%)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),transparent)]" />
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Events
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance text-slate-950 sm:text-5xl">
            Events hosted by Greater Gaming Society.
          </h2>
          <p className="mt-6 text-lg leading-8 font-medium text-slate-800">
            Browse what is coming up next, or look back through the recent GGS
            event archive from the DEVSA community calendar.
          </p>
        </div>

        <div
          className="mt-10 flex flex-wrap gap-3"
          role="tablist"
          aria-label="Events tabs"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "upcoming"}
            data-testid="events-tab-upcoming"
            onClick={() => {
              setActiveTab("upcoming");
              setShowAllUpcoming(initialShowAllUpcoming);
            }}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
              activeTab === "upcoming"
                ? "bg-slate-950 text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)]"
                : "border border-slate-300 bg-white/85 text-slate-900 hover:border-slate-950"
            }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "past"}
            data-testid="events-tab-past"
            onClick={() => {
              setActiveTab("past");
              setVisiblePastCount(initialVisiblePastCount);
            }}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
              activeTab === "past"
                ? "bg-slate-950 text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)]"
                : "border border-slate-300 bg-white/85 text-slate-900 hover:border-slate-950"
            }`}
          >
            Past events
          </button>
        </div>

        <div className="mt-14 space-y-5">
          {resolvedIsLoading ? (
            <article
              data-testid="events-loading"
              className="rounded-[2rem] border border-slate-200 bg-white px-6 py-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
            >
              <p className="text-base font-medium text-slate-700">
                Checking the DEVSA calendar for Greater Gaming Society events.
              </p>
            </article>
          ) : activeTab === "upcoming" ? (
            visibleUpcomingEvents.length > 0 ? (
              visibleUpcomingEvents.map((event, index) =>
                renderEventCard(event, index, "upcoming"),
              )
            ) : (
              <article
                data-testid="events-fallback"
                className="rounded-[2rem] border border-slate-200 bg-white px-6 py-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="lg:w-[13rem]">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                      {fallbackEvent.dateLabel}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-slate-950">
                      {fallbackEvent.timeLabel}
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-500">
                      {fallbackEvent.location}
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-500">
                      {fallbackEvent.format}
                    </p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start gap-3">
                      <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
                        {fallbackEvent.title}
                      </h3>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
                        Upcoming
                      </span>
                    </div>
                    <p className="mt-4 text-base leading-7 font-medium text-slate-800">
                      {fallbackEvent.description}
                    </p>
                    {resolvedLoadError ? (
                      <p className="mt-4 text-sm font-medium text-slate-500">
                        The live event feed is unavailable right now, so the
                        regular meetup schedule is shown instead.
                      </p>
                    ) : null}
                  </div>
                  <div className="flex lg:justify-end">
                    <a
                      href={fallbackEvent.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-fit rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white focus-visible:border-slate-950 focus-visible:bg-slate-950 focus-visible:text-white"
                    >
                      Join on Meetup
                    </a>
                  </div>
                </div>
              </article>
            )
          ) : visiblePastEvents.length > 0 ? (
            visiblePastEvents.map((event, index) =>
              renderEventCard(event, index, "past"),
            )
          ) : (
            <article
              data-testid="events-empty-past"
              className="rounded-[2rem] border border-slate-200 bg-white px-6 py-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
            >
              <p className="text-base font-medium text-slate-700">
                No past GGS events are available in the archive yet.
              </p>
            </article>
          )}
        </div>

        {activeTab === "upcoming" && hiddenUpcomingCount > 0 ? (
          <div className="mt-8">
            <button
              type="button"
              data-testid="events-toggle"
              onClick={() => {
                setShowAllUpcoming((currentValue) => {
                  if (currentValue) {
                    window.setTimeout(scrollToEventsTop, 0);
                  }

                  return !currentValue;
                });
              }}
              className="rounded-full border border-slate-300 bg-white/85 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-950 focus-visible:border-slate-950"
            >
              {showAllUpcoming
                ? "Show fewer events"
                : getUpcomingToggleLabel(hiddenUpcomingCount)}
            </button>
          </div>
        ) : null}

        {activeTab === "past" && (hiddenPastCount > 0 || isPastExpanded) ? (
          <div className="mt-8">
            <div className="flex flex-wrap gap-3">
              {hiddenPastCount > 0 ? (
                <button
                  type="button"
                  data-testid="past-events-toggle"
                  onClick={() => {
                    setVisiblePastCount(
                      (currentValue) => currentValue + PAST_INCREMENT_COUNT,
                    );
                  }}
                  className="rounded-full border border-slate-300 bg-white/85 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-950 focus-visible:border-slate-950"
                >
                  {getPastToggleLabel(hiddenPastCount)}
                </button>
              ) : null}
              {isPastExpanded ? (
                <button
                  type="button"
                  data-testid="past-events-collapse"
                  onClick={() => {
                    setVisiblePastCount(INITIAL_PAST_VISIBLE_COUNT);
                    window.setTimeout(scrollToEventsTop, 0);
                  }}
                  className="rounded-full border border-slate-300 bg-white/85 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-950 focus-visible:border-slate-950"
                >
                  Show fewer events
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
