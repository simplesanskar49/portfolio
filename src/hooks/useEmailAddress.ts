import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

/**
 * Returns the email address only in the browser (after hydration), so it never
 * appears in the prerendered HTML that scrapers read. Returns null on the server.
 */
export function useEmailAddress(user: string, domain: string): string | null {
  return useSyncExternalStore(
    subscribe,
    () => `${user}@${domain}`,
    () => null,
  );
}
