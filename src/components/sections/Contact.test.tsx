import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { profile } from "~/content/profile";

import { Contact } from "./Contact";

const EMAIL = `${profile.emailUser}@${profile.emailDomain}`;

describe("Contact", () => {
  it("builds the mailto link in the browser", () => {
    render(<Contact />);

    expect(screen.getByRole("link", { name: "Email me" })).toHaveAttribute(
      "href",
      `mailto:${EMAIL}`,
    );
  });

  it("copies the email address and confirms it", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByRole("button", { name: "Copy email address" }));

    await expect(navigator.clipboard.readText()).resolves.toBe(EMAIL);
    expect(screen.getByRole("button", { name: "Copied!" })).toBeInTheDocument();
  });

  it("links every profile", () => {
    render(<Contact />);

    for (const link of profile.links) {
      expect(document.querySelector(`a[href="${link.href}"]`)).not.toBeNull();
    }
  });
});
