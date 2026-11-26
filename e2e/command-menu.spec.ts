import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const menu = (page: Page) => page.getByRole("dialog", { name: "Command menu" });
const search = (page: Page) => page.getByRole("combobox", { name: "Search commands" });

/** Press ⌘K / Ctrl+K until the menu opens (the shortcut only works once the page has hydrated). */
async function openMenu(page: Page) {
  await expect(async () => {
    await page.keyboard.press("ControlOrMeta+k");
    await expect(menu(page)).toBeVisible({ timeout: 500 });
  }).toPass();
}

test.describe("command menu", () => {
  test("⌘K / Ctrl+K opens it with the search box focused; Esc closes it", async ({ page }) => {
    await page.goto("/");
    await openMenu(page);
    await expect(search(page)).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(menu(page)).toBeHidden();
  });

  test("the navbar button opens it and focus returns there on close", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Search" });
    await expect(async () => {
      await trigger.click();
      await expect(menu(page)).toBeVisible({ timeout: 500 });
    }).toPass();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  });

  test("focus ring on the trigger after Esc: hidden if opened by mouse, kept for keyboard", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "desktop trigger");
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Search" });
    const hasRing = () => trigger.evaluate((el) => el.matches(":focus-visible"));

    await expect(async () => {
      await trigger.click();
      await expect(menu(page)).toBeVisible({ timeout: 500 });
    }).toPass();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    expect(await hasRing()).toBe(false);

    await page.keyboard.press("Enter");
    await expect(menu(page)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    expect(await hasRing()).toBe(true);
  });

  test("typing filters, arrows move the highlight, Enter jumps to the section", async ({
    page,
  }) => {
    await page.goto("/");
    await openMenu(page);
    await search(page).fill("proj");

    const options = menu(page).getByRole("option");
    await expect(options.first()).toHaveText(/Go to Projects/);
    await expect(options.first()).toHaveAttribute("aria-selected", "true");

    await page.keyboard.press("Enter");
    await expect(menu(page)).toBeHidden();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator("#projects h2")).toBeFocused();
    await expect(page.locator("#projects h2")).toBeInViewport();
  });

  test("highlights the section you're currently on", async ({ page }) => {
    await page.goto("/#skills");
    await openMenu(page);
    const current = menu(page).getByRole("option", { name: /Go to Skills/ });
    await expect(current).toHaveAttribute("aria-selected", "true");
    await expect(current).toContainText("You're here");

    // Searching moves the highlight to the best match; clearing the search goes back.
    await search(page).fill("proj");
    await expect(menu(page).getByRole("option").first()).toHaveAttribute("aria-selected", "true");
    await search(page).fill("");
    await expect(current).toHaveAttribute("aria-selected", "true");
  });

  test("arrow keys wrap around the list", async ({ page }) => {
    await page.goto("/");
    await openMenu(page);
    const options = menu(page).getByRole("option");
    await page.keyboard.press("ArrowUp");
    await expect(options.last()).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("ArrowDown");
    await expect(options.first()).toHaveAttribute("aria-selected", "true");
  });

  test("switches the theme", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await openMenu(page);
    await search(page).fill("light");
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });

  test("copies the email address and announces it", async ({ page, context, browserName }) => {
    test.skip(browserName !== "chromium", "clipboard permissions are Chromium-only");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await openMenu(page);
    await search(page).fill("copy email");
    await page.keyboard.press("Enter");

    await expect(page.getByText("Email address copied to clipboard")).toBeAttached();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toMatch(/^[^@\s]+@[^@\s]+$/);
  });

  test("shows a message when nothing matches", async ({ page }) => {
    await page.goto("/");
    await openMenu(page);
    await search(page).fill("zzzz");
    await expect(menu(page).getByRole("option")).toHaveCount(0);
    await expect(menu(page)).toContainText("No results for “zzzz”");
  });

  test("clicking the backdrop closes it", async ({ page }) => {
    await page.goto("/");
    await openMenu(page);
    await page.mouse.click(5, 5);
    await expect(menu(page)).toBeHidden();
  });

  test("has no accessibility violations while open", async ({ page }) => {
    await page.goto("/");
    await openMenu(page);
    const results = await new AxeBuilder({ page }).include("dialog").analyze();
    expect(results.violations).toEqual([]);
  });
});
