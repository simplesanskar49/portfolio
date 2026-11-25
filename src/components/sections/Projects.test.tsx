import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { projects } from "~/content/projects";

import { Projects } from "./Projects";

describe("Projects", () => {
  it("renders one card per project, in order", () => {
    render(<Projects />);

    const titles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(projects.map((p) => p.title));
  });

  it("opens external project links in a new tab", () => {
    render(<Projects />);

    for (const link of projects.flatMap((p) => p.links)) {
      const anchor = document.querySelector(`a[href="${link.href}"]`);
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
