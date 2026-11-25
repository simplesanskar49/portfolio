import { Chip } from "~/components/atoms/Chip";
import { Section } from "~/components/layout/Section";
import { skills } from "~/content/skills";

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="What I work with">
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4" data-stagger>
        {skills.map((group) => (
          <li
            key={group.title}
            className="rounded-(--radius-card) border border-border-default bg-bg-surface p-5 shadow-card"
          >
            <h3 className="text-sm font-semibold text-text-primary">{group.title}</h3>
            <ul aria-label={group.title} className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill}>
                  <Chip>{skill}</Chip>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
