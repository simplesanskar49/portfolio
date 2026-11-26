import { useEffect, useState } from "react";

/**
 * Scroll-spy: returns the id of the section currently crossing the middle of the
 * viewport, or null when none of the given sections is there (e.g. at the hero).
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          } else {
            // Leaving the band without another section entering it (e.g. scrolling back
            // up into the hero) means no section is active.
            setActiveId((current) => (current === entry.target.id ? null : current));
          }
        }
      },
      // A thin band at mid-viewport: exactly one section intersects it at a time.
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const el of elements) observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [ids]);

  return activeId;
}
