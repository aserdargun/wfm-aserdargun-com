import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("has no serious or critical automated accessibility violations", async ({ page }) => {
  await page.goto("/en");
  const results = await new AxeBuilder({ page }).disableRules(["landmark-complementary-is-top-level"]).analyze();
  expect(results.violations.filter(({ impact }) => impact === "serious" || impact === "critical")).toEqual([]);
});

test("supports skip navigation and keyboard field-map selection", async ({ page }) => {
  test.skip(test.info().project.name === "mobile-chromium", "The mobile path uses touch-sized sequential controls instead of the desktop roving focus map.");
  await page.goto("/en");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.getByRole("link", { name: "Skip to main content" }).press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  const worldModel = page.getByRole("button", { name: "World model", exact: true });
  await worldModel.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("button", { name: "Planner", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/stage=planner/);
});

test("returns focus from mobile navigation and has no horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Mobile-only reflow check");
  await page.goto("/tr");
  const trigger = page.getByRole("button", { name: "Gezinmeyi aç" });
  await trigger.click();
  await page.getByRole("button", { name: "Gezinmeyi kapat" }).click();
  await expect(trigger).toBeFocused();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("honors reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  const duration = await page.locator(".skip-link").evaluate((node) => getComputedStyle(node).transitionDuration);
  expect(["0s", "0.00001s", "1e-05s"]).toContain(duration);
});
