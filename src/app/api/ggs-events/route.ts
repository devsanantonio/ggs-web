import { NextResponse } from "next/server";

import { getGgsEvents } from "@/lib/ggsEvents";
import { getEventsFixtureState } from "@/lib/ggsEventsFixtures";

export async function GET(request: Request) {
  try {
    const fixtureName = new URL(request.url).searchParams.get("events-fixture");
    const fixtureState = getEventsFixtureState(fixtureName);

    if (fixtureState) {
      return NextResponse.json({
        upcomingEvents: fixtureState.upcomingEvents,
        pastEvents: fixtureState.pastEvents,
        error: fixtureState.error,
      });
    }

    const events = await getGgsEvents();

    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to load GGS events from DEVSA feed", error);

    return NextResponse.json(
      {
        upcomingEvents: [],
        pastEvents: [],
        error: "Unable to load upcoming events.",
      },
      { status: 200 },
    );
  }
}
