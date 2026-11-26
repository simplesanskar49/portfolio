import { Chip } from "~/components/atoms/Chip";
import { Section } from "~/components/layout/Section";
import { experience } from "~/content/experience";
import type { ExperienceRole } from "~/types/content";

function RoleCard({ role }: { role: ExperienceRole }) {
  return (
    <article className="tile p-5 sm:p-7">
      <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="text-lg font-semibold sm:text-xl">
          {role.role}{" "}
          <span className="text-accent">
            ·{" "}
            <a
              href={role.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-accent-hover hover:underline"
            >
              {role.company}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </span>
        </h3>
        <p className="shrink-0 font-mono text-xs text-text-muted sm:text-sm">
          {role.start} – {role.end} · {role.location}
        </p>
      </header>
      <p className="mt-3 text-text-secondary">{role.summary}</p>

      <div className="mt-6 space-y-6">
        {role.groups.map((group) => (
          <div key={group.title}>
            {role.groups.length > 1 && (
              <h4 className="text-sm font-semibold text-text-primary">{group.title}</h4>
            )}
            <ul className="mt-2 space-y-2">
              {group.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="relative pl-5 text-sm leading-relaxed text-text-secondary before:absolute before:top-2.5 before:left-0 before:size-1.5 before:rounded-full before:bg-accent sm:text-base"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2">
        {role.tech.map((tech) => (
          <li key={tech}>
            <Chip>{tech}</Chip>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've shipped">
      {/* Timeline: a rail on the left with a marker per role. */}
      <ol className="relative space-y-8 border-l border-border-default pl-6 sm:pl-10" data-stagger>
        {experience.map((role) => (
          <li key={`${role.company}-${role.start}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-7 -left-6 size-3 -translate-x-1/2 rounded-full border-2 border-accent bg-bg-page sm:-left-10"
            />
            <RoleCard role={role} />
          </li>
        ))}
      </ol>
    </Section>
  );
}
