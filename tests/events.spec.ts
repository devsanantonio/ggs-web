import { type Page, expect, test } from "@playwright/test";

async function loadHome(page: Page, fixture: string) {
  await page.goto(`/?events-fixture=${fixture}`);
  await expect(page.getByTestId("events-loading")).toHaveCount(0);
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

  test("expands when more than two upcoming events are available", async ({
    page,
  }) => {
    await loadHome(page, "more");

    await expect(page.getByTestId("event-card")).toHaveCount(2);
    await expect(page.getByTestId("events-toggle")).toHaveText(
      "There are 1 more upcoming events",
    );

    await page.getByTestId("events-toggle").click();
    await expect(page.getByTestId("event-card")).toHaveCount(3);
    await expect(page.getByTestId("events-toggle")).toHaveText(
      "Show fewer events",
    );
  });

  test("falls back to the recurring meetup when there are no feed events", async ({
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
});
