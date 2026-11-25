export interface SocialLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  pitch: string;
  /** Email split in two so the address never appears whole in the static HTML. */
  emailUser: string;
  emailDomain: string;
  links: SocialLink[];
  stats: Stat[];
}

export interface NavItem {
  id: string;
  label: string;
}

export interface AboutFact {
  label: string;
  value: string;
}

export interface About {
  paragraphs: string[];
  facts: AboutFact[];
}

export interface ExperienceGroup {
  title: string;
  bullets: string[];
}

export interface ExperienceRole {
  company: string;
  companyUrl: string;
  role: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  groups: ExperienceGroup[];
  tech: string[];
}

export interface Project {
  title: string;
  /** Where it was built, e.g. "Armada" or "Personal". */
  context: string;
  problem: string;
  built: string;
  outcome: string;
  stack: string[];
  links: SocialLink[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Achievement {
  value: string;
  label: string;
  detail: string;
  link: SocialLink;
}
