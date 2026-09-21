import { expect, test } from "@playwright/test";

test("moves through timeline, signals, and evidence method", async ({ page }) => {
  await page.goto("/en/evolution");
  await expect(page.getByRole("heading", { name: "Evolution of world models" })).toBeVisible();
  await expect(page.locator("time").first()).toHaveAttribute("datetime", "2018-03-27");
  if (test.info().project.name === "mobile-chromium") await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("link", { name: "Signals" }).click();
  await expect(page.getByRole("heading", { name: "Research signals" })).toBeVisible();
  await expect(page.getByText("Atlas broadens spatial output")).toBeVisible();
  if (test.info().project.name === "mobile-chromium") await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("link", { name: "Method" }).click();
  await expect(page.getByRole("heading", { name: "Method and source policy" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Reported" })).toBeVisible();
});

test("switches a localized concept route to its counterpart", async ({ page }) => {
  await page.goto("/tr/concepts/dunya-modeli");
  if (test.info().project.name === "mobile-chromium") await page.getByRole("button", { name: "Gezinmeyi aç" }).click();
  await page.getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/en\/concepts\/world-model$/);
  await expect(page.getByRole("heading", { level: 1, name: "World model", exact: true })).toBeVisible();
});

test("concept links, unknown dates, and portfolio paths remain bilingual", async ({ page }) => {
  for (const locale of ["en", "tr"] as const) {
    const tr = locale === "tr";
    await page.goto(`/${locale}/concepts/${tr ? "planlayici" : "planner"}`);
    await page.locator(".related-models").getByRole("link", { name: "V-JEPA 2" }).click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/models/v-jepa-2$`));
    await expect(page.locator("main")).toContainText(tr ? "Son kaynak kontrolü" : "Source last checked");
    await page.goto(`/${locale}/models/oasis-3`);
    await expect(page.locator("main")).toContainText(tr ? "Tarih bilinmiyor" : "Date unknown");
    await expect(page.locator("main .source-review-note")).toContainText(tr ? "ilk yayın" : "original publication");
    await expect(page.locator("main")).not.toContainText(tr ? "10 Haz 2026" : "10 Jun 2026");
    await page.goto(`/${locale}/method`);
    const context = page.locator(".portfolio-context");
    await expect(context.getByRole("link").first()).toHaveAttribute("href", `https://aserdargun.com/${tr ? "tr/" : ""}`);
    await expect(context).toContainText(tr ? "bağımsız çalışır" : "run independently");
    await expect(page.locator('a[download]')).toHaveAttribute("href", "/research-export.json");
  }
});
