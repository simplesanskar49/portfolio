import type { ComponentPropsWithoutRef } from "react";

import { cn } from "~/utils/cn";

type Variant = "primary" | "secondary" | "ghost";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover",
  secondary:
    "border border-border-strong bg-bg-surface text-text-primary shadow-card hover:border-accent hover:text-accent",
  ghost: "text-text-secondary hover:bg-bg-raised hover:text-text-primary",
};

interface ButtonLinkProps extends ComponentPropsWithoutRef<"a"> {
  variant?: Variant;
}

/** A link styled as a button (navigation, not actions — use <button> for actions). */
export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium transition-colors",
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
