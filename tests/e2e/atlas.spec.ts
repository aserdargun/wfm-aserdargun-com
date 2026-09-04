import { expect, test } from "@playwright/test";

test("opens the Turkish field map and selects Dünya modeli", async ({ page }) => {
  await page.goto("/tr");
  await expect(page.getByRole("heading", { name: "Dilden fiziksel zekâya" })).toBeVisible();
  await page.getByRole("button", { name: "Dünya modeli" }).click();
  await expect(page.getByRole("complementary", { name: "Kanıt inceleyici" })).toContainText("Dünya modeli");
});

test("restores map and evidence selection through browser history", async ({ page }) => {
  await page.goto("/en?stage=world-model");
  await page.getByRole("button", { name: /^Planner/ }).click();
  await expect(page).toHaveURL(/stage=planner/);
  await expect(page.getByRole("complementary", { name: "Evidence inspector" })).toContainText("Planner");
  await page.goBack();
  await expect(page).toHaveURL(/stage=world-model/);
  await expect(page.getByRole("complementary", { name: "Evidence inspector" })).toContainText("World model");
});
