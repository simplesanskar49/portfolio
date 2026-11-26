import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

import { ACCENTS } from "../src/constants/accent";

const accentVar = (page: Page) =>
  page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim(),
  );

async function openPicker(page: Page) {
  const button = page.getByRole("button", { name: "Accent colour" });
  // Retry until hydrated, but never click again once it's open (that would close it).
  await expect(async () => {
    if ((await button.getAttribute("aria-expanded")) !== "true") await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true", { timeout: 500 });
  }).toPass();
}

test("picking an accent recolours the site and survives a reload", async ({ page }) => {
  await page.goto("/");
  const teal = await accentVar(page);

  await openPicker(page);
  await page.getByTitle("Violet").click();
  await expect(page.getByRole("radio", { name: "Violet" })).toBeChecked();
  await expect(page.locator("html")).toHaveAttribute("data-accent", "violet");
  expect(await accentVar(page)).not.toBe(teal);

  await page.reload();
  // Applied by the inline head script, before React hydrates.
  await expect(page.locator("html")).toHaveAttribute("data-accent", "violet");

  await openPicker(page);
  await page.getByTitle("Teal").click();
  await expect(page.locator("html")).not.toHaveAttribute("data-accent", /.+/);
  expect(await accentVar(page)).toBe(teal);
});

test("the browser-tab icon follows the accent", async ({ page, request }) => {
  await page.goto("/");
  const icon = page.locator('link[rel="icon"][type="image/png"]');
  await expect(icon).toHaveAttribute("href", /favicon-teal\.png/);

  await openPicker(page);
  await page.getByTitle("Rose").click();
  await expect(icon).toHaveAttribute("href", /favicon-rose\.png/);

  await page.reload();
  await expect(icon).toHaveAttribute("href", /favicon-rose\.png/);

  for (const accent of ACCENTS) {
    const res = await request.get(`/icons/favicon-${accent.id}.png`);
    expect(res.headers()["content-type"]).toBe("image/png");
  }
});

test("the picker is a keyboard radio group and closes on Esc", async ({ page }) => {
  await page.goto("/");
  await openPicker(page);
  const teal = page.getByRole("radio", { name: "Teal" });
  await teal.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("radio", { name: "Violet" })).toBeChecked();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Accent colour" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(page.getByRole("button", { name: "Accent colour" })).toBeFocused();
});

test("the ⌘K menu can change the accent", async ({ page }) => {
  await page.goto("/");
  await expect(async () => {
    await page.keyboard.press("ControlOrMeta+k");
    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 500 });
  }).toPass();
  await page.getByRole("combobox").fill("amber");
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-accent", "amber");
});

// Every accent must keep text and buttons readable (axe colour contrast) in both themes.
for (const theme of ["dark", "light"] as const) {
  for (const accent of ACCENTS) {
    test(`${accent.label} accent passes axe in ${theme} theme`, async ({ page, isMobile }) => {
      test.skip(isMobile, "colour contrast doesn't depend on viewport");
      await page.addInitScript(
        ({ t, a }) => {
          localStorage.setItem("theme", t);
          localStorage.setItem("accent", a);
        },
        { t: theme, a: accent.id },
      );
      await page.goto("/");
      const results = await new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
