import { type Page, expect, test } from "@playwright/test";

async function getRotationSnapshot(page: Page) {
  const heroImageSrc = await page
    .getByTestId("hero-spotlight-image")
    .getAttribute("src");
  const heroSupportSrc = await page
    .getByTestId("hero-support-image")
    .getAttribute("src");
  const reelCards = page.getByTestId("community-reel-card");
  const reelCount = await reelCards.count();
  const activeCardCount = reelCount / 2;
  const reelImageSources: string[] = [];

  for (let index = 0; index < activeCardCount; index += 1) {
    const src = await reelCards
      .nth(index)
      .getByTestId("community-reel-image")
      .getAttribute("src");

    if (src) {
      reelImageSources.push(src);
    }
  }

  return {
    heroImageSrc,
    heroSupportSrc,
    reelImageSources,
  };
}

function normalizeDay(day: string) {
  const [year, month, date] = day.split("-").map(Number);

  return `${year}-${month}-${date}`;
}

async function goToRotationDay(page: Page, day: string) {
  await page.goto(`/?day=${day}`);
  await expect(page.getByTestId("hero-spotlight-image")).toBeVisible();
  await expect(page.getByTestId("hero-spotlight-image")).toHaveAttribute(
    "data-rotation-day",
    normalizeDay(day),
  );
}

test.describe("daily image rotation", () => {
  test("changes the rotating hero selection on a different day", async ({
    page,
  }) => {
    await goToRotationDay(page, "2026-03-26");
    const firstDay = await getRotationSnapshot(page);

    await goToRotationDay(page, "2026-03-27");
    const secondDay = await getRotationSnapshot(page);
    const firstDayActiveSources = [
      firstDay.heroImageSrc,
      ...firstDay.reelImageSources,
    ].filter((src): src is string => Boolean(src));
    const secondDayActiveSources = [
      secondDay.heroImageSrc,
      ...secondDay.reelImageSources,
    ].filter((src): src is string => Boolean(src));

    expect(firstDay.heroSupportSrc).toContain("ggs-meetup2.jpg");
    expect(secondDay.heroSupportSrc).toBe(firstDay.heroSupportSrc);
    expect(secondDayActiveSources).not.toEqual(firstDayActiveSources);
  });

  test("does not reuse the same active rotating image on the same day", async ({
    page,
  }) => {
    await goToRotationDay(page, "2026-03-26");
    const snapshot = await getRotationSnapshot(page);
    const activeSources = [
      snapshot.heroImageSrc,
      ...snapshot.reelImageSources,
    ].filter((src): src is string => Boolean(src));

    expect(new Set(activeSources).size).toBe(activeSources.length);
  });
});
