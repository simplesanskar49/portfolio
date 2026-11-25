import type { NavItem } from "~/types/content";

/** Page sections, in scroll order. `id` is the anchor and the scroll-spy target. */
export const NAV_ITEMS: readonly NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
