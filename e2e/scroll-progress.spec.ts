import { expect, test } from "@playwright/test";

/** Horizontal scale of the progress bar, read from its computed transform matrix. */
const barScale = () => {
  const bar = document.querySelector('[data-testid="scroll-progress"]');
  if (!bar) return Number.NaN;
  return new DOMMatrixReadOnly(getComputedStyle(bar).transform).a;
};

test("progress bar fills as the page scrolls", async ({ page }) => {
  await page.goto("/");
  expect(await page.evaluate(barScale)).toBeCloseTo(0, 2);

  await page.evaluate(() => {
    window.scrollTo(0, (document.documentElement.scrollHeight - window.innerHeight) / 2);
  });
  await expect.poll(() => page.evaluate(barScale)).toBeGreaterThan(0.3);
  expect(await page.evaluate(barScale)).toBeLessThan(0.7);

  await page.evaluate(() => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  await expect.poll(() => page.evaluate(barScale)).toBeCloseTo(1, 2);
});
