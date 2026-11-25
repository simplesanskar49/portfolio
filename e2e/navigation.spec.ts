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
