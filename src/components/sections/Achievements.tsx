import { ExternalLink } from "~/components/atoms/ExternalLink";
import { Section } from "~/components/layout/Section";
import { achievements } from "~/content/achievements";

export function Achievements() {
  return (
    <Section id="achievements" eyebrow="Achievements" title="Beyond the day job">
      <ul className="grid gap-4 sm:gap-6 md:grid-cols-3" data-stagger>
        {achievements.map((item) => (
          <li
            key={item.label}
            className="flex flex-col rounded-(--radius-card) border border-border-default bg-bg-surface p-5 shadow-card sm:p-6"
          >
            <p className="font-mono text-3xl font-semibold text-text-primary sm:text-4xl">
              {item.value}
            </p>
            <h3 className="mt-1 text-base font-medium text-text-primary">{item.label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{item.detail}</p>
            <ExternalLink
              href={item.link.href}
              className="mt-auto min-h-11 pt-4 text-sm font-medium text-accent hover:text-accent-hover"
            >
              {item.link.label}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}
