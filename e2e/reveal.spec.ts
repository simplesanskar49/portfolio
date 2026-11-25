import { expect, test } from "@playwright/test";

const itemOpacity = (selector: string) =>
  `getComputedStyle(document.querySelector('${selector} .reveal-item')).opacity`;

test("sections fade in the first time they scroll into view", async ({ page }) => {
  await page.goto("/");
  const skills = page.locator("#skills");

  await expect(skills).not.toHaveAttribute("data-revealed");
  expect(await page.evaluate(itemOpacity("#skills"))).toBe("0");

  await skills.scrollIntoViewIfNeeded();
  await expect(skills).toHaveAttribute("data-revealed", "");
  await expect.poll(() => page.evaluate(itemOpacity("#skills"))).toBe("1");
});

test("with reduced motion, every section is visible immediately", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("html")).not.toHaveClass(/reveal-ready/);
  expect(await page.evaluate(itemOpacity("#contact"))).toBe("1");
});
