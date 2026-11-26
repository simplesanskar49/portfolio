import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { NAV_ITEMS } from "../src/constants/navigation";

const MISSING = "/this/page/does-not-exist";

test("unknown URLs get the styled 404 page with a 404 status", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  const response = await page.goto(MISSING);
  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle(/Page not found/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page doesn't exist");

  // Hydrates cleanly on a URL it wasn't prerendered for, and the theme toggle works.
  await page.getByRole("button", { name: /switch to light theme/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(errors).toEqual([]);
});

test("404 page links back home and to every section", async ({ page }) => {
  await page.goto(MISSING);
  const sections = page.getByRole("navigation", { name: "Sections" });
  for (const item of NAV_ITEMS) {
    await expect(sections.getByRole("link", { name: item.label })).toHaveAttribute(
      "href",
      `/#${item.id}`,
    );
  }

  await page.getByRole("link", { name: "Back to home" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

for (const colorScheme of ["dark", "light"] as const) {
  test(`404 page has no accessibility violations (${colorScheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto(MISSING);
    await expect(page.locator("html")).toHaveAttribute("data-theme", colorScheme);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
