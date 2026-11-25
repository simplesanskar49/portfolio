export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  pitch: string;
  email: string;
  links: SocialLink[];
}
