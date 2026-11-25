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
  email: string;
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
