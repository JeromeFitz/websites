import { expect, test } from "@playwright/test";

const basePath = "";

test("has title", async ({ page }) => {
  await page.goto(basePath);

  await expect(page).toHaveTitle("Jerome Fitzgerald (he/him) | Actor. Comedian. Writer.");
});

test("has heading", async ({ page }) => {
  await page.goto(basePath);

  /**
   * @note(playwright)
   *
   * - https://playwright.dev/docs/api/class-framelocator#frame-locator-first
   * - https://www.programsbuzz.com/article/playwright-select-first-or-last-element#first-method
   *
   */
  // oxlint-disable-next-line testing-library/prefer-screen-queries
  const heading = page.getByRole("heading", { level: 1 }).first();
  await expect(heading).toContainText("Jerome (he/him)");
});
