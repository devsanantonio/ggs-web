import { type Page, expect, test } from "@playwright/test";

async function loadHome(page: Page, fixture: string, extraQuery = "") {
  await page.goto(`/?events-fixture=${fixture}${extraQuery}`);
  await expect(page.getByTestId("events-loading")).toHaveCount(0);
}

async function loadExpandedHome(page: Page, fixture: string) {
  await loadHome(page, fixture, "&events-expanded=1");
}

test.describe("events section states", () => {
  test("renders a single upcoming event without an expansion button", async ({
    page,
  }) => {
    await loadHome(page, "single");

    await expect(page.getByTestId("event-card")).toHaveCount(1);
    await expect(page.getByTestId("event-title")).toHaveText([
      "Single Upcoming Event",
    ]);
    await expect(page.getByTestId("event-badge")).toContainText(["Upcoming"]);
    await expect(page.getByTestId("events-toggle")).toHaveCount(0);
  });

  test("renders two upcoming events in time order", async ({ page }) => {
    await loadHome(page, "two");

    await expect(page.getByTestId("event-card")).toHaveCount(2);
    await expect(page.getByTestId("event-title")).toHaveText([
      "First Event",
      "Second Event",
    ]);
  });

  test("shows the expanded state when more than two upcoming events are available", async ({
    page,
  }) => {
    await loadExpandedHome(page, "more");

    await expect(page.getByTestId("event-card")).toHaveCount(3);
    await expect(page.getByTestId("events-toggle")).toHaveText(
      "Show fewer events",
    );
  });

  test("falls back to the recurring meetup when there are no upcoming feed events", async ({
    page,
  }) => {
    await loadHome(page, "none");

    await expect(page.getByTestId("events-fallback")).toBeVisible();
    await expect(
      page.getByText("Greater Gaming Society Monthly Meetup"),
    ).toBeVisible();
    await expect(page.getByText("Every 2nd Tuesday")).toBeVisible();
    await expect(page.getByText("6:00 PM - 8:00 PM")).toBeVisible();
  });

  test("shows live and upcoming badges for overlapping current state", async ({
    page,
  }) => {
    await loadHome(page, "live");

    await expect(page.getByTestId("event-title")).toHaveText([
      "Live Event",
      "Next Event",
    ]);
    await expect(page.getByTestId("event-badge")).toContainText([
      "Happening now",
      "Upcoming",
    ]);
  });

  test("clamps long event descriptions with overflow hidden", async ({
    page,
  }) => {
    await loadHome(page, "clamp");

    const description = page.getByTestId("event-description").first();
    const descriptionText = await description.textContent();

    await expect(description).toHaveCSS("overflow", "hidden");
    await expect(description).toHaveJSProperty("title", descriptionText);
  });

  test.fixme(
    "renders past events newest first and expands by four after the first two",
    async ({ page }) => {
      await loadHome(page, "past", "&events-tab=past");

      await expect(page.getByTestId("events-tab-past")).toHaveAttribute(
        "aria-selected",
        "true",
      );
      await expect(page.getByTestId("event-card")).toHaveCount(2);
      await expect(page.getByTestId("event-title")).toHaveText([
        "Past Event 1",
        "Past Event 2",
      ]);
      await expect(page.getByTestId("event-badge")).toHaveCount(2);
      await expect(page.getByTestId("event-badge").first()).toBeEmpty();

      await expect(page.getByTestId("past-events-toggle")).toHaveText(
        "Show 4 more events",
      );

      await loadHome(page, "past", "&events-tab=past&past-count=6");

      await expect(page.getByTestId("event-card")).toHaveCount(6);
      await expect(page.getByTestId("event-title")).toHaveText([
        "Past Event 1",
        "Past Event 2",
        "Past Event 3",
        "Past Event 4",
        "Past Event 5",
        "Past Event 6",
      ]);
      await expect(page.getByTestId("past-events-toggle")).toHaveText(
        "Show 4 more events",
      );

      await loadHome(page, "past", "&events-tab=past&past-count=10");
      await expect(page.getByTestId("event-card")).toHaveCount(10);
      await expect(page.getByTestId("past-events-toggle")).toHaveText(
        "Show 1 more event",
      );

      await loadHome(page, "past", "&events-tab=past&past-count=14");
      await expect(page.getByTestId("event-card")).toHaveCount(11);
      await expect(page.getByTestId("past-events-toggle")).toHaveCount(0);
    },
  );
});
