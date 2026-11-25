import { ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "~/utils/cn";

interface ExternalLinkProps extends Omit<ComponentPropsWithoutRef<"a">, "target" | "rel"> {
  href: string;
  /** Show the ↗ icon after the text. */
  showIcon?: boolean;
}

/** Link to another site: opens in a new tab and says so to screen readers. */
export function ExternalLink({
  showIcon = true,
  className,
  children,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {children}
      {showIcon && <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
