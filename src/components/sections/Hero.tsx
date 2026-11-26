import { ArrowRight, Mail } from "lucide-react";

import { ButtonLink } from "~/components/atoms/ButtonLink";
import { GridBackdrop } from "~/components/atoms/GridBackdrop";
import { StatTile } from "~/components/atoms/StatTile";
import { Container } from "~/components/layout/Container";
import { profile } from "~/content/profile";

const [firstName, ...rest] = profile.name.split(" ");
const lastName = rest.join(" ");

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <GridBackdrop />

      <Container className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="flex flex-wrap items-center gap-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-border-default bg-bg-surface px-3 py-1 font-mono text-xs tracking-widest text-accent uppercase shadow-card">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            {profile.title}
          </p>
          {profile.availability && (
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-xs font-medium text-text-primary transition-colors hover:border-success"
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {profile.availability.label}
            </a>
          )}
        </div>

        <h1
          id="hero-heading"
          className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          <span className="text-accent">{firstName}</span> {lastName}
        </h1>
        <p className="mt-3 font-mono text-sm text-text-secondary sm:text-base">
          {profile.subtitle}
        </p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-text-muted sm:text-lg">
          {profile.pitch}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#projects">
            View my work
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="#contact" variant="secondary">
            <Mail className="size-4" aria-hidden="true" />
            Get in touch
          </ButtonLink>
          {/*
            TODO(resume): enable once a public resume PDF (without phone number) is in public/resume.pdf.
            <ButtonLink href="/resume.pdf" variant="ghost" download>
              <Download className="size-4" aria-hidden="true" />
              Download resume
            </ButtonLink>
          */}
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {profile.stats.map((stat) => (
            <StatTile key={stat.label} {...stat} />
          ))}
        </dl>
      </Container>
    </section>
  );
}
