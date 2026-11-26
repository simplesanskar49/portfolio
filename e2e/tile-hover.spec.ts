import { expect, test, type Locator, type Page } from "@playwright/test";

/** The tile's computed lift, border colour and shadow. */
const tileStyle = (tile: Locator) =>
  tile.evaluate((el) => {
    const style = getComputedStyle(el);
    return { translate: style.translate, border: style.borderTopColor, shadow: style.boxShadow };
  });

const firstTile = (page: Page, section: string) => page.locator(`#${section} .tile`).first();

test.describe("tile hover", () => {
  test.skip(({ isMobile }) => isMobile, "touch devices have no hover");

  for (const section of ["projects", "skills", "experience", "achievements"]) {
    test(`${section} tiles lift and highlight on hover`, async ({ page }) => {
      await page.goto(`/#${section}`);
      const tile = firstTile(page, section);
      await tile.scrollIntoViewIfNeeded();
      // Park the pointer away from the tile, then let reveal animations settle.
      await page.mouse.move(0, 0);
      await expect.poll(() => tileStyle(tile).then((s) => s.translate)).toBe("none");
      const rest = await tileStyle(tile);

      await tile.hover();
      await expect.poll(() => tileStyle(tile).then((s) => s.translate)).toBe("0px -4px");
      const hovered = await tileStyle(tile);
      expect(hovered.border).not.toBe(rest.border);
      expect(hovered.shadow).not.toBe(rest.shadow);
    });
  }

  test("keyboard focus inside a tile gets the hover look", async ({ page }) => {
    await page.goto("/#experience");
    const tile = firstTile(page, "experience");
    await page.mouse.move(0, 0);
    await tile.getByRole("link").first().focus();
    // Re-enter with the keyboard so the browser treats it as :focus-visible.
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect.poll(() => tileStyle(tile).then((s) => s.translate)).toBe("0px -4px");
  });

  test("with reduced motion, hover highlights without moving", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#projects");
    const tile = firstTile(page, "projects");
    await page.mouse.move(0, 0);
    const rest = await tileStyle(tile);

    await tile.hover();
    await expect.poll(() => tileStyle(tile).then((s) => s.border)).not.toBe(rest.border);
    expect((await tileStyle(tile)).translate).toBe("none");
  });
});
