import { useEffect } from "react";

import { REVEAL_READY_CLASS } from "~/constants/reveal";

/**
 * Marks each `[data-reveal]` element with `data-revealed` the first time it
 * scrolls into view; CSS turns that into a fade-and-rise. Each element animates once.
 */
export function useRevealOnScroll(): void {
  useEffect(() => {
    if (!document.documentElement.classList.contains(REVEAL_READY_CLASS)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    for (const el of document.querySelectorAll("[data-reveal]")) observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);
}
