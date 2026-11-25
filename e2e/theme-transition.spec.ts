import { expect, test } from "@playwright/test";

/** Records whether the page asked for a view transition. */
const spyOnViewTransitions = () => {
  const original = document.startViewTransition.bind(document);
  Object.assign(window, { viewTransitionCalls: 0 });
  document.startViewTransition = (...args: Parameters<typeof original>) => {
    (window as unknown as { viewTransitionCalls: number }).viewTransitionCalls += 1;
    return original(...args);
  };
};

const viewTransitionCalls = () =>
  (window as unknown as { viewTransitionCalls: number }).viewTransitionCalls;

test("theme switch animates with a view transition", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(spyOnViewTransitions);

  await page.getByRole("button", { name: "Switch to light theme" }).click();

  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await page.evaluate(viewTransitionCalls)).toBe(1);
});

test("with reduced motion, the theme switches instantly", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(spyOnViewTransitions);

  await page.getByRole("button", { name: "Switch to light theme" }).click();

  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await page.evaluate(viewTransitionCalls)).toBe(0);
});
