import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { profile } from "~/content/profile";

import Home from "./home";

describe("Home", () => {
  it("renders the name as the page heading and the title", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1, name: profile.name })).toBeInTheDocument();
    expect(screen.getByText(profile.title)).toBeInTheDocument();
  });
});
