import type { NavItem } from "~/types/content";

/** Page sections, in scroll order. `id` is the anchor and the scroll-spy target. */
export const NAV_ITEMS: readonly NavItem[] = [
  { id: "about", label: "About" },
  { id: "how-i-work", label: "How I work" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];
