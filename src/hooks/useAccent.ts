import { useCallback, useEffect, useSyncExternalStore } from "react";

import {
  ACCENT_STORAGE_KEY,
  ACCENTS,
  DEFAULT_ACCENT,
  faviconHref,
  type Accent,
} from "~/constants/accent";

const isAccent = (value: unknown): value is Accent => ACCENTS.some((a) => a.id === value);

function readAccent(): Accent {
  const value = document.documentElement.dataset.accent;
  return isAccent(value) ? value : DEFAULT_ACCENT;
}

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-accent"],
  });
  return () => {
    observer.disconnect();
  };
}

/** Current accent (source of truth: `data-accent` on <html>) and a setter that persists it. */
export function useAccent(): { accent: Accent; setAccent: (accent: Accent) => void } {
  const accent = useSyncExternalStore(subscribe, readAccent, () => DEFAULT_ACCENT);

  const setAccent = useCallback((next: Accent) => {
    const root = document.documentElement;
    if (next === DEFAULT_ACCENT) delete root.dataset.accent;
    else root.dataset.accent = next;
    try {
      localStorage.setItem(ACCENT_STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode): the accent still applies for this visit.
    }
  }, []);

  return { accent, setAccent };
}

/** Keeps the browser-tab icon in the current accent. Mount once (root layout). */
export function useAccentFavicon(): void {
  const { accent } = useAccent();
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"][type="image/png"]');
    if (link) link.href = faviconHref(accent);
  }, [accent]);
}
