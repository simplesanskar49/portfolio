import { expect, test } from "@playwright/test";

test("email address is not in the prerendered HTML", async ({ request }) => {
  const html = await (await request.get("/")).text();
  expect(html).not.toContain("@gmail.com");
  expect(html).not.toContain("mailto:");
});

test("email button gets a mailto link once the page is interactive", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Email me" })).toHaveAttribute("href", /^mailto:/);
});
