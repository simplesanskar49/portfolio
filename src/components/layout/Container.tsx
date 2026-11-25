import type { ComponentPropsWithoutRef } from "react";

import { cn } from "~/utils/cn";

/** Centered content column with responsive side gutters. */
export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-(--container-content) px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
