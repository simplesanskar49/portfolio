import { useEffect, useRef } from "react";

/**
 * Keeps the URL hash in sync with the section in view (`#projects`, or no hash at the
 * hero), so the address bar is always a shareable link to where the visitor is.
 * Uses replaceState: no history entry per section, no scroll jump.
 */
export function useSyncHash(activeId: string | null): void {
  // Ignore the initial null: on a page opened at /#projects the scroll-spy hasn't
  // reported yet, and clearing the hash then would lose the deep link.
  const seenSection = useRef(false);

  useEffect(() => {
    if (activeId) seenSection.current = true;
    if (!seenSection.current) return;

    const { pathname, search, hash } = window.location;
    const next = activeId ? `#${activeId}` : "";
    if (hash === next) return;
    // Keep React Router's history state so its scroll restoration still works.
    history.replaceState(history.state, "", `${pathname}${search}${next}`);
  }, [activeId]);
}
