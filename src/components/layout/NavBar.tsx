import { Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { ScrollProgress } from "~/components/atoms/ScrollProgress";
import { ThemeToggle } from "~/components/atoms/ThemeToggle";
import { NAV_ITEMS } from "~/constants/navigation";
import { profile } from "~/content/profile";
import { useActiveSection } from "~/hooks/useActiveSection";
import { useScrolled } from "~/hooks/useScrolled";
import { cn } from "~/utils/cn";

import { Container } from "./Container";

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);
const DESKTOP_QUERY = "(min-width: 48rem)";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("");
}

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();
  const activeId = useActiveSection(SECTION_IDS);
  const menuId = useId();

  // Close the mobile menu on Escape or when the viewport grows to desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const close = () => {
      setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", close);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", close);
    };
  }, [menuOpen]);

  const linkClass = (id: string) =>
    cn(
      "rounded-md px-3 py-2 text-sm transition-colors",
      activeId === id ? "text-accent" : "text-text-secondary hover:text-text-primary",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b pt-[env(safe-area-inset-top)] transition-colors",
        scrolled || menuOpen
          ? "border-border-default bg-bg-page/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-(--spacing-nav) items-center justify-between gap-4">
        <a
          href="#top"
          className="font-mono text-lg font-semibold text-text-primary hover:text-accent"
        >
          {initials(profile.name)}
          <span className="text-accent">.</span>
          <span className="sr-only"> {profile.name}, back to top</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={linkClass(item.id)}
                  aria-current={activeId === item.id ? "location" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg text-text-secondary hover:bg-bg-raised hover:text-text-primary md:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setMenuOpen((open) => !open);
            }}
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      <ScrollProgress />

      <nav
        id={menuId}
        aria-label="Primary mobile"
        hidden={!menuOpen}
        className="border-t border-border-default md:hidden"
      >
        <Container>
          <ul className="flex flex-col py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(linkClass(item.id), "flex min-h-11 items-center")}
                  aria-current={activeId === item.id ? "location" : undefined}
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
