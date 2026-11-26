import { Chip } from "~/components/atoms/Chip";
import { ExternalLink } from "~/components/atoms/ExternalLink";
import { Section } from "~/components/layout/Section";
import { projects } from "~/content/projects";
import type { Project } from "~/types/content";

const STORY: { key: "problem" | "built" | "outcome"; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "built", label: "What I built" },
  { key: "outcome", label: "Result" },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="tile flex h-full flex-col p-5 sm:p-6">
      <p className="font-mono text-xs tracking-widest text-accent uppercase">{project.context}</p>
      <h3 className="mt-2 text-lg font-semibold">{project.title}</h3>

      <dl className="mt-4 space-y-3 text-sm leading-relaxed">
        {STORY.map(({ key, label }) => (
          <div key={key}>
            <dt className="font-medium text-text-primary">{label}</dt>
            <dd className="text-text-secondary">{project[key]}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto pt-5">
        <ul aria-label="Technologies" className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Chip>{tech}</Chip>
            </li>
          ))}
        </ul>
        {project.links.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <li key={link.href}>
                <ExternalLink
                  href={link.href}
                  className="min-h-11 text-sm font-medium text-accent hover:text-accent-hover"
                >
                  {link.label}
                  <span className="sr-only"> for {project.title}</span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="What I've built">
      <ul className="grid gap-4 sm:gap-6 md:grid-cols-2" data-stagger>
        {projects.map((project) => (
          <li key={project.title}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
