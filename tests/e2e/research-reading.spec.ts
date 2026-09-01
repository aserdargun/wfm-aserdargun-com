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
