import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NAV_ITEMS } from "~/constants/navigation";
import { profile } from "~/content/profile";

import Home from "./home";

describe("Home", () => {
  it("renders the name as the only h1, with title and subtitle", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: profile.name })).toBeInTheDocument();
    expect(screen.getByText(profile.title)).toBeInTheDocument();
    expect(screen.getByText(profile.subtitle)).toBeInTheDocument();
  });

  it("renders every stat as a value/label pair", () => {
    render(<Home />);

    for (const stat of profile.stats) {
      const term = screen.getByText(stat.label);
      expect(term.tagName).toBe("DT");
      expect(term.parentElement).toContainElement(screen.getByText(stat.value));
    }
  });

  it("has a section for every nav item", () => {
    render(<Home />);

    for (const item of NAV_ITEMS) {
      expect(document.getElementById(item.id)).not.toBeNull();
    }
  });
});
