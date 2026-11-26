import { Section } from "~/components/layout/Section";
import { principles } from "~/content/principles";

export function HowIWork() {
  return (
    <Section id="how-i-work" eyebrow="How I work" title="Principles I build by">
      <ol className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3" data-stagger>
        {principles.map((principle, index) => (
          <li key={principle.title}>
            <div className="tile h-full p-5 sm:p-6">
              <p className="font-mono text-sm text-accent" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-base font-semibold text-text-primary">{principle.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{principle.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
