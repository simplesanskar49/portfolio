import { absoluteUrl, OG_IMAGE } from "~/constants/site";
import { about } from "~/content/about";
import { achievements } from "~/content/achievements";
import { experience } from "~/content/experience";
import { profile } from "~/content/profile";
import { projects } from "~/content/projects";
import { skills } from "~/content/skills";

/*
 * Everything search engines and AI assistants read about the site is built
 * from the same content files the page renders, so it can't drift.
 * The email address is deliberately left out (see Profile.emailUser).
 *
 * TODO(launch): all absolute URLs here use the placeholder SITE_URL until
 * VITE_SITE_URL is set (see constants/site.ts).
 */

const fact = (label: string) => about.facts.find((f) => f.label === label)?.value;

export const PAGE_TITLE = `${profile.name} | ${profile.title}`;
export const PAGE_DESCRIPTION = profile.pitch;

const currentRole = experience.find((role) => role.end === "Present");

/** schema.org Person + WebSite graph for the home page. */
export function buildStructuredData() {
  const personId = absoluteUrl("/#person");
  const location = fact("Based in");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        jobTitle: profile.title,
        description: profile.pitch,
        url: absoluteUrl("/"),
        image: absoluteUrl(OG_IMAGE.path),
        sameAs: profile.links.map((link) => link.href),
        knowsAbout: skills.flatMap((group) => group.skills),
        ...(currentRole && {
          worksFor: {
            "@type": "Organization",
            name: currentRole.company,
            url: currentRole.companyUrl,
          },
        }),
        ...(location && {
          address: {
            "@type": "PostalAddress",
            addressLocality: location.split(",")[0]?.trim(),
            addressCountry: location.split(",").at(-1)?.trim(),
          },
        }),
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "RCC Institute of Information Technology",
        },
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: profile.name,
        url: absoluteUrl("/"),
        description: PAGE_DESCRIPTION,
        inLanguage: "en",
        author: { "@id": personId },
      },
    ],
  };
}

/** Plain-markdown summary for AI assistants (https://llmstxt.org). */
export function buildLlmsTxt() {
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.title} (${profile.subtitle}). ${profile.pitch}`,
    "",
    ...about.paragraphs.flatMap((paragraph) => [paragraph, ""]),
    ...about.facts.map((f) => `- ${f.label}: ${f.value}`),
    "",
    "## Experience",
    "",
    ...experience.flatMap((role) => [
      `### ${role.role}, ${role.company} (${role.start} – ${role.end}, ${role.location})`,
      "",
      role.summary,
      "",
      ...role.groups.flatMap((group) => group.bullets.map((bullet) => `- ${bullet}`)),
      "",
      `Tech: ${role.tech.join(", ")}`,
      "",
    ]),
    "## Projects",
    "",
    ...projects.flatMap((project) => [
      `### ${project.title} (${project.context})`,
      "",
      `- Problem: ${project.problem}`,
      `- What I built: ${project.built}`,
      `- Result: ${project.outcome}`,
      `- Stack: ${project.stack.join(", ")}`,
      ...project.links.map((link) => `- ${link.label}: ${link.href}`),
      "",
    ]),
    "## Skills",
    "",
    ...skills.map((group) => `- ${group.title}: ${group.skills.join(", ")}`),
    "",
    "## Achievements",
    "",
    ...achievements.map((a) => `- ${a.value} ${a.label}. ${a.detail}. ${a.link.href}`),
    "",
    "## Links",
    "",
    `- [Website](${absoluteUrl("/")})`,
    ...profile.links.map((link) => `- [${link.label}](${link.href})`),
    "",
  ];
  return lines.join("\n");
}
