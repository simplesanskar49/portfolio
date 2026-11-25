import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { NAV_ITEMS } from "~/constants/navigation";

import { NavBar } from "./NavBar";

describe("NavBar", () => {
  it("links to every section", () => {
    render(<NavBar />);
    const nav = screen.getByRole("navigation", { name: "Primary" });

    for (const item of NAV_ITEMS) {
      expect(nav.querySelector(`a[href="#${item.id}"]`)).toHaveTextContent(item.label);
    }
  });

  it("opens and closes the mobile menu", async () => {
    const user = userEvent.setup();
    render(<NavBar />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("navigation", { name: "Primary mobile" })).toBeVisible();

    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
