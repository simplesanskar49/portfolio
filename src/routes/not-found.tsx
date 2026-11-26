import { ArrowLeft } from "lucide-react";

import { ButtonLink } from "~/components/atoms/ButtonLink";
import { GridBackdrop } from "~/components/atoms/GridBackdrop";
import { ThemeToggle } from "~/components/atoms/ThemeToggle";
import { Wordmark } from "~/components/atoms/Wordmark";
import { Container } from "~/components/layout/Container";
import { NAV_ITEMS } from "~/constants/navigation";
import { profile } from "~/content/profile";

import type { Route } from "./+types/not-found";

export function meta(_: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: `Page not found | ${profile.name}` },
    // Keep the 404 page itself out of search results.
    { name: "robots", content: "noindex" },
  ];
}

/**
 * Catch-all for unknown URLs. Prerendered as /404 and copied to build/client/404.html
 * (see react-router.config.ts), which static hosts like Vercel serve for missing paths.
 */
export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-hidden">
      <GridBackdrop />

      <header className="pt-[env(safe-area-inset-top)]">
        <Container className="flex h-(--spacing-nav) items-center justify-between gap-4">
          <Wordmark href="/" srSuffix="home" />
          <ThemeToggle />
        </Container>
      </header>

      <main id="main" className="flex flex-1 items-center">
        <Container className="py-16 sm:py-24">
          <p className="font-mono text-sm tracking-widest text-accent uppercase">Error 404</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            This page doesn&apos;t exist
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            The link may be old or mistyped. Everything lives on the home page, so start there or
            jump straight to a section.
          </p>

          <ButtonLink href="/" className="mt-8">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </ButtonLink>

          <nav aria-label="Sections" className="mt-12">
            <h2 className="font-mono text-xs tracking-widest text-text-muted uppercase">
              Or jump to
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    className="inline-flex min-h-11 items-center rounded-lg border border-border-default bg-bg-surface px-4 text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </main>
    </div>
  );
}
