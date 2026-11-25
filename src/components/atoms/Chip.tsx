import type { ReactNode } from "react";

/** Small non-interactive label, e.g. a technology name. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border-default bg-bg-raised px-2 py-0.5 font-mono text-xs text-text-secondary">
      {children}
    </span>
  );
}
