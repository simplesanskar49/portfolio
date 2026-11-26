import type { ComponentPropsWithoutRef } from "react";

import { profile } from "~/content/profile";
import { cn } from "~/utils/cn";

interface WordmarkProps extends ComponentPropsWithoutRef<"a"> {
  /** Extra screen-reader context for where the link goes, e.g. "back to top". */
  srSuffix: string;
}

/** "Sanskar Kumar" → "SK". */
const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("");

/** Site brand: initials with an accent dot, linking home or to the top. */
export function Wordmark({ srSuffix, className, ...props }: WordmarkProps) {
  return (
    <a
      className={cn(
        "font-mono text-lg font-semibold text-text-primary transition-colors hover:text-accent",
        className,
      )}
      {...props}
    >
      {initials(profile.name)}
      <span className="text-accent">.</span>
      {/* Visible "SK." stays in the accessible name so voice-control users can say it. */}
      <span className="sr-only">
        {" "}
        {profile.name}, {srSuffix}
      </span>
    </a>
  );
}
