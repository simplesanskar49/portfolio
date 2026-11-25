import { Section } from "~/components/layout/Section";
import { about } from "~/content/about";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Building for the person on the other side">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
        <div className="space-y-5 text-base leading-relaxed text-text-secondary sm:text-lg">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <dl className="h-fit divide-y divide-border-default rounded-(--radius-card) border border-border-default bg-bg-surface shadow-card">
          {about.facts.map((fact) => (
            <div key={fact.label} className="px-5 py-4">
              <dt className="font-mono text-xs tracking-widest text-accent uppercase">
                {fact.label}
              </dt>
              <dd className="mt-1 text-sm text-text-primary">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
