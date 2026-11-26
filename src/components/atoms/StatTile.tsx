import type { Stat } from "~/types/content";
import { cn } from "~/utils/cn";

interface StatTileProps extends Stat {
  className?: string | undefined;
}

export function StatTile({ value, label, className }: StatTileProps) {
  return (
    <div className={cn("tile flex flex-col gap-1 p-4 sm:p-5", className)}>
      <dt className="text-sm leading-snug text-text-muted">{label}</dt>
      <dd className="order-first font-mono text-2xl font-semibold text-text-primary sm:text-3xl">
        {value}
      </dd>
    </div>
  );
}
