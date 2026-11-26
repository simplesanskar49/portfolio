import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type * as ProfileModule from "~/content/profile";

import { Contact } from "./Contact";
import { Hero } from "./Hero";

const { AVAILABILITY } = vi.hoisted(() => ({
  AVAILABILITY: { label: "Open to new roles", lookingFor: "Product engineering roles." },
}));

// Force it on so these tests don't depend on whether the shipped content has it enabled.
vi.mock("~/content/profile", async (importOriginal) => {
  const actual = await importOriginal<typeof ProfileModule>();
  return { profile: { ...actual.profile, availability: AVAILABILITY } };
});

describe("availability (when switched on)", () => {
  it("shows a badge in the hero that links to Contact", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: AVAILABILITY.label })).toHaveAttribute(
      "href",
      "#contact",
    );
  });

  it("shows the role note in Contact", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { name: "The role I'm looking for" })).toBeInTheDocument();
    expect(screen.getByText(AVAILABILITY.lookingFor)).toBeInTheDocument();
  });
});
