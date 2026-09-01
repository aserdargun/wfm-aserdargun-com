import { expect, test } from "@playwright/test";

test("filters and compares models with shareable state", async ({ page }) => {
  await page.goto("/en/models");
  await page.getByRole("checkbox", { name: "Spatial / 3D" }).click();
  await expect(page).toHaveURL(/capability=spatial-3d/);
  await expect(page.getByRole("checkbox", { name: "Spatial / 3D" })).toBeChecked();
  await page.getByRole("checkbox", { name: "Atlas" }).click();
  await expect(page).toHaveURL(/compare=atlas/);
  await page.getByRole("checkbox", { name: "V-JEPA 2" }).click();
  await expect(page).toHaveURL(/compare=atlas%2Cv-jepa-2/);
  await expect(page.getByRole("table", { name: "Model comparison" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("checkbox", { name: "Atlas" })).toBeChecked();
  await expect(page.getByRole("checkbox", { name: "V-JEPA 2" })).toBeChecked();
});
