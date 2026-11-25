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
