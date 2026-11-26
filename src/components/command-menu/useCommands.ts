import { ArrowUpRight, Copy, Hash, Mail, SunMoon, type LucideIcon } from "lucide-react";
import { useMemo } from "react";

import { NAV_ITEMS } from "~/constants/navigation";
import { profile } from "~/content/profile";
import { useEmailAddress } from "~/hooks/useEmailAddress";
import { useTheme } from "~/hooks/useTheme";

export type CommandGroup = "Navigate" | "Actions" | "Profiles";

export interface Command {
  id: string;
  group: CommandGroup;
  label: string;
  keywords?: readonly string[];
  icon: LucideIcon;
  /** Short text shown on the right, e.g. "↗" for links that open a new tab. */
  hint?: string;
  /** Runs after the menu has closed. Return a message to announce to screen readers. */
  run: () => string | undefined | Promise<string | undefined>;
}

export const GROUP_ORDER: readonly CommandGroup[] = ["Navigate", "Actions", "Profiles"];

const SECTION_KEYWORDS: Partial<Record<string, readonly string[]>> = {
  about: ["bio", "intro", "education"],
  "how-i-work": ["principles", "values", "approach"],
  experience: ["work", "jobs", "career", "armada"],
  projects: ["work", "portfolio", "built"],
  skills: ["stack", "tech", "tools"],
  achievements: ["leetcode", "codeforces", "topmate"],
  contact: ["email", "hire", "reach"],
};

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
  // Move keyboard/screen-reader focus to the section so the next Tab continues from there.
  const heading = target.querySelector<HTMLElement>("h2");
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}

/** Everything the ⌘K menu can do, built from the same content as the page. */
export function useCommands(): Command[] {
  const { theme, toggleTheme } = useTheme();
  const email = useEmailAddress(profile.emailUser, profile.emailDomain);

  return useMemo(() => {
    const navigate: Command[] = NAV_ITEMS.map((item) => ({
      id: `nav-${item.id}`,
      group: "Navigate",
      label: `Go to ${item.label}`,
      keywords: SECTION_KEYWORDS[item.id] ?? [],
      icon: Hash,
      run: () => {
        scrollToSection(item.id);
        return undefined;
      },
    }));

    const actions: Command[] = [
      {
        id: "theme",
        group: "Actions",
        label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
        keywords: ["theme", "dark", "light", "mode", "appearance"],
        icon: SunMoon,
        run: () => {
          // Reveal the new theme from the middle of the screen.
          toggleTheme({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
          return undefined;
        },
      },
    ];
    if (email) {
      actions.push(
        {
          id: "copy-email",
          group: "Actions",
          label: "Copy email address",
          keywords: ["contact", "mail", "clipboard"],
          icon: Copy,
          run: async () => {
            try {
              await navigator.clipboard.writeText(email);
              return "Email address copied to clipboard";
            } catch {
              return "Couldn't copy. The email address is in the Contact section.";
            }
          },
        },
        {
          id: "send-email",
          group: "Actions",
          label: "Send an email",
          keywords: ["contact", "mail", "hire", "message"],
          icon: Mail,
          run: () => {
            window.location.href = `mailto:${email}`;
            return undefined;
          },
        },
      );
    }

    const profiles: Command[] = profile.links.map((link) => ({
      id: `link-${link.label.toLowerCase()}`,
      group: "Profiles",
      label: `Open ${link.label}`,
      keywords: ["profile", "social", "link"],
      icon: ArrowUpRight,
      hint: "New tab",
      run: () => {
        window.open(link.href, "_blank", "noopener,noreferrer");
        return undefined;
      },
    }));

    return [...navigate, ...actions, ...profiles];
  }, [theme, toggleTheme, email]);
}
