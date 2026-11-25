import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { experience } from "~/content/experience";

import { Experience } from "./Experience";

describe("Experience", () => {
  it("lists roles in order with company, dates and every bullet", () => {
    render(<Experience />);

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(experience.length);

    cards.forEach((article, index) => {
      const role = experience[index];
      if (!role) throw new Error(`no content for card ${String(index)}`);
      const card = within(article);
      expect(card.getByRole("heading", { level: 3 })).toHaveTextContent(role.company);
      expect(card.getByRole("link", { name: new RegExp(role.company) })).toHaveAttribute(
        "href",
        role.companyUrl,
      );
      expect(card.getByText(`${role.start} – ${role.end} · ${role.location}`)).toBeInTheDocument();
      for (const bullet of role.groups.flatMap((group) => group.bullets)) {
        expect(card.getByText(bullet)).toBeInTheDocument();
      }
    });
  });
});
