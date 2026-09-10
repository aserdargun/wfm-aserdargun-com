import { expect, test } from "@playwright/test";
import { getRouteManifest } from "../../src/app/routes";

test("desktop map cards remain inside their panel without overlapping", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Desktop map geometry");
  for (const width of [1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/tr");
    const geometry = await page.locator(".field-map__desktop").evaluate((panel) => {
      const bounds = panel.getBoundingClientRect();
      return [...panel.querySelectorAll(".stage-node")].map((node) => {
        const rect = node.getBoundingClientRect();
        return { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, contained: rect.top >= bounds.top && rect.bottom <= bounds.bottom && rect.left >= bounds.left && rect.right <= bounds.right };
      });
    });
    expect(geometry).toHaveLength(7);
    expect(geometry.every((node) => node.contained), `${width}px card containment`).toBe(true);
    for (const [i, a] of geometry.entries()) {
      for (const b of geometry.slice(i + 1)) expect(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top, `${width}px overlapping cards`).toBe(true);
    }
  }
});

test("filters only affirmative capabilities and offers every model for comparison", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/en/models?capability=spatial-3d");
  await expect(page.locator(".model-list")).not.toContainText("GAIA-1");
  await page.getByRole("checkbox", { name: "Action conditioning", exact: true }).check();
  await expect(page.locator(".model-list")).not.toContainText("Atlas");
  await expect(page.locator(".model-list")).toContainText("DreamerV3");
  for (const name of ["DreamerV3", "Atlas", "V-JEPA 2", "GAIA-1"]) {
    await page.getByRole("checkbox", { name, exact: true }).check();
  }
  await expect(page.getByRole("checkbox", { name: "Oasis", exact: true })).toBeDisabled();
  await expect(page.getByRole("table", { name: "Model comparison", exact: true }).locator("thead th")).toHaveCount(5);
  await page.reload();
  await expect(page.getByRole("checkbox", { name: "GAIA-1", exact: true })).toBeChecked();
  expect(errors).toEqual([]);
});

test("invalid selections fall back consistently and invalid routes display 404", async ({ page }) => {
  await page.goto("/en?stage=invalid");
  await expect(page.getByRole("button", { name: "World model", exact: true })).toHaveAttribute("aria-pressed", "true");
  for (const path of ["/fr", "/fr/models", "/en/method/extra", "/en/models/atlas/extra"]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This record was not found");
    await expect(page).toHaveTitle("WFM - Record not found");
  }
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

test("mobile navigation traps focus, closes on Escape, and restores the page", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Mobile navigation only");
  await page.goto("/tr");
  const trigger = page.getByRole("button", { name: "Gezinmeyi aç" });
  await trigger.click();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("link", { name: "English" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Gezinmeyi kapat" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.locator("main")).not.toHaveAttribute("inert");
});

test("every approved route renders its localized metadata without overflow or runtime errors", async ({ page }) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  for (const route of getRouteManifest()) {
    await page.goto(route.path);
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator("html")).toHaveAttribute("lang", route.locale);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), route.path).toBeLessThanOrEqual(1);
    await expect(page.locator("vite-error-overlay")).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});
