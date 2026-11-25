import type { ReactNode } from "react";

import { Container } from "./Container";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}

/** A page section: anchor target for the nav, with a labelled heading. */
export function Section({ id, eyebrow, title, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="border-t border-border-default py-20 sm:py-28"
    >
      <Container>
        <p className="font-mono text-xs tracking-widest text-accent uppercase">{eyebrow}</p>
        <h2 id={headingId} className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}
