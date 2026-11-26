export interface Searchable {
  label: string;
  keywords?: readonly string[];
}

/**
 * Case-insensitive filter + rank. Every word of the query must appear somewhere in the
 * label or keywords. Matches at the start of the label rank first, then at the start
 * of any word, then anywhere. Ties keep their original order.
 */
export function filterCommands<T extends Searchable>(items: readonly T[], query: string): T[] {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [...items];

  const scored: { item: T; score: number; index: number }[] = [];
  items.forEach((item, index) => {
    const label = item.label.toLowerCase();
    const haystack = [label, ...(item.keywords ?? []).map((k) => k.toLowerCase())].join(" ");
    if (!words.every((word) => haystack.includes(word))) return;

    const first = words[0] ?? "";
    const score = label.startsWith(first)
      ? 0
      : new RegExp(`(^|\\s)${escapeRegExp(first)}`).test(haystack)
        ? 1
        : 2;
    scored.push({ item, score, index });
  });

  return scored.sort((a, b) => a.score - b.score || a.index - b.index).map(({ item }) => item);
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
