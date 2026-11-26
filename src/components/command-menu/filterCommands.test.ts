import { describe, expect, it } from "vitest";

import { filterCommands } from "./filterCommands";

const ITEMS = [
  { label: "Go to About" },
  { label: "Go to Projects", keywords: ["work", "portfolio"] },
  { label: "Copy email address", keywords: ["contact", "mail"] },
  { label: "Open GitHub", keywords: ["code", "repos"] },
  { label: "Toggle theme", keywords: ["dark", "light", "mode"] },
];

const labels = (query: string) => filterCommands(ITEMS, query).map((item) => item.label);

describe("filterCommands", () => {
  it("returns everything, in order, for an empty query", () => {
    expect(labels("  ")).toEqual(ITEMS.map((item) => item.label));
  });

  it("matches labels and keywords, ignoring case", () => {
    expect(labels("GITHUB")).toEqual(["Open GitHub"]);
    expect(labels("dark")).toEqual(["Toggle theme"]);
    expect(labels("work")).toEqual(["Go to Projects"]);
  });

  it("requires every word of the query to match", () => {
    expect(labels("go proj")).toEqual(["Go to Projects"]);
    expect(labels("go github")).toEqual([]);
  });

  it("ranks label-prefix matches above word-start and substring matches", () => {
    const items = [
      { label: "Theme colour" },
      { label: "Go to Contact", keywords: ["email"] },
      { label: "Copy email address" },
    ];
    expect(filterCommands(items, "co").map((item) => item.label)).toEqual([
      "Copy email address",
      "Theme colour",
      "Go to Contact",
    ]);
  });

  it("treats regex characters in the query literally", () => {
    expect(labels("(")).toEqual([]);
  });
});
