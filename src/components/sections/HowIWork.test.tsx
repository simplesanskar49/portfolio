import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { principles } from "~/content/principles";

import { HowIWork } from "./HowIWork";

describe("HowIWork", () => {
  it("lists every principle in order with its explanation", () => {
    render(<HowIWork />);

    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(principles.length);
    items.forEach((item, index) => {
      const principle = principles[index];
      if (!principle) throw new Error(`no content for item ${String(index)}`);
      expect(within(item).getByRole("heading", { level: 3 })).toHaveTextContent(principle.title);
      expect(item).toHaveTextContent(principle.detail);
    });
  });
});
