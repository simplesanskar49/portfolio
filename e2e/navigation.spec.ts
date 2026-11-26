import { expect, test } from "@playwright/test";

test("theme toggle switches theme and persists across reload", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "dark");

  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(html).toHaveAttribute("data-theme", "light");

  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "light");
});

test("mobile menu navigates to a section and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");

  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("navigation", { name: "Primary mobile" });
  await menu.getByRole("link", { name: "Projects" }).click();

  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator("#projects")).toBeInViewport();
});

test("desktop nav highlights the section in view", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop only");
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: "Primary" });
  await nav.getByRole("link", { name: "Skills" }).click();

  await expect(nav.getByRole("link", { name: "Skills" })).toHaveAttribute(
    "aria-current",
    "location",
  );
});

test("nav highlight clears when scrolling back up to the hero", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop only");
  await page.goto("/#about");
  const about = page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "About" });
  await expect(about).toHaveAttribute("aria-current", "location");

  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await expect(about).not.toHaveAttribute("aria-current");
});

test("header fades in gradually with scroll and is clear at the top", async ({ page }) => {
  await page.goto("/");
  const header = page.locator("header").first();
  const alpha = () =>
    header.evaluate((el) => {
      // Background is rgba(...) or oklab(... / a); read the alpha channel.
      const bg = getComputedStyle(el).backgroundColor;
      const match = /\/\s*([\d.]+)\)$|,\s*([\d.]+)\)$/.exec(bg);
      return match ? Number(match[1] ?? match[2]) : 1;
    });
  const scrollTo = (top: number) =>
    page.evaluate((y) => {
      window.scrollTo({ top: y, behavior: "instant" });
    }, top);

  await expect.poll(alpha).toBe(0);
  await scrollTo(24);
  await expect.poll(alpha).toBeGreaterThan(0);
  const partway = await alpha();
  expect(partway).toBeLessThan(0.85);
  await scrollTo(400);
  await expect.poll(alpha).toBeCloseTo(0.85, 2);
  await scrollTo(0);
  await expect.poll(alpha).toBe(0);
});

test("the URL hash follows the section in view", async ({ page }) => {
  await page.goto("/");
  const scrollToSection = (id: string) =>
    page.evaluate((target) => {
      document.getElementById(target)?.scrollIntoView({ behavior: "instant" });
    }, id);

  await scrollToSection("skills");
  await expect(page).toHaveURL(/#skills$/);
  await scrollToSection("experience");
  await expect(page).toHaveURL(/#experience$/);

  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await expect(page).toHaveURL(/\/$/);
});

test("opening a deep link keeps its hash", async ({ page }) => {
  await page.goto("/#projects");
  await expect(page.locator("#projects")).toBeInViewport();
  await page.waitForTimeout(300);
  await expect(page).toHaveURL(/#projects$/);
});
