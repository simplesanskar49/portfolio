import { ArrowUp } from "lucide-react";

import { profile } from "~/content/profile";

import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-border-default pb-[env(safe-area-inset-bottom)]">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React Router and Tailwind CSS.
        </p>
        <a
          href="#top"
          className="inline-flex min-h-11 items-center gap-1 text-text-secondary hover:text-accent"
        >
          <ArrowUp className="size-4" aria-hidden="true" />
          Back to top
        </a>
      </Container>
    </footer>
  );
}
