import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Widths the site must work at without horizontal scroll (px, matches the plan).
const WIDTHS = [320, 375, 414, 768, 1024, 1280, 1440, 1920];

for (const colorScheme of ["dark", "light"] as const) {
  test(`home page has no accessibility violations (${colorScheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", colorScheme);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

for (const width of WIDTHS) {
  test(`no horizontal scroll at ${String(width)}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });
}
