import { useCallback, useSyncExternalStore } from "react";

import { DEFAULT_THEME, THEME_COLOR, THEME_STORAGE_KEY, type Theme } from "~/constants/theme";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => {
    observer.disconnect();
  };
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}

export interface Point {
  x: number;
  y: number;
}

const REVEAL_DURATION_MS = 550;

/**
 * Applies `theme` with a circular reveal that grows from `origin` (View Transitions API).
 * Falls back to an instant switch when there is no origin, the browser lacks view
 * transitions, or the visitor prefers reduced motion.
 */
function switchTheme(theme: Theme, origin?: Point): void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!origin || reduceMotion || !("startViewTransition" in document)) {
    applyTheme(theme);
    return;
  }

  // Radius that reaches the farthest viewport corner from the click point.
  const radius = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  );
  const transition = document.startViewTransition(() => {
    applyTheme(theme);
  });
  void transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0 at ${String(origin.x)}px ${String(origin.y)}px)`,
          `circle(${String(radius)}px at ${String(origin.x)}px ${String(origin.y)}px)`,
        ],
      },
      {
        duration: REVEAL_DURATION_MS,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });
}

/** Current theme (source of truth: `data-theme` on <html>) and a toggle that persists it. */
export function useTheme(): { theme: Theme; toggleTheme: (origin?: Point) => void } {
  const theme = useSyncExternalStore(subscribe, readTheme, () => DEFAULT_THEME);

  const toggleTheme = useCallback((origin?: Point) => {
    switchTheme(readTheme() === "dark" ? "light" : "dark", origin);
  }, []);

  return { theme, toggleTheme };
}
