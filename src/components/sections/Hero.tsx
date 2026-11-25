import { ArrowRight, Mail } from "lucide-react";

import { ButtonLink } from "~/components/atoms/ButtonLink";
import { StatTile } from "~/components/atoms/StatTile";
import { Container } from "~/components/layout/Container";
import { profile } from "~/content/profile";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      {/* Decorative backdrop: grid + two soft glows, fading out towards the edges. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-grid)_0.0625rem,transparent_0.0625rem),linear-gradient(to_bottom,var(--color-grid)_0.0625rem,transparent_0.0625rem)] mask-[radial-gradient(ellipse_at_top,black_20%,transparent_70%)] bg-size-[3rem_3rem]"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 h-80 w-[min(56rem,100%)] -translate-x-1/2 rounded-full bg-glow blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute top-24 right-0 -z-10 hidden h-64 w-md rounded-full bg-glow-secondary blur-3xl sm:block"
      />

      <Container className="pt-16 pb-20 sm:pt-24 sm:pb-28">
        <p className="inline-flex items-center gap-2 rounded-full border border-border-default bg-bg-surface px-3 py-1 font-mono text-xs tracking-widest text-accent uppercase shadow-card">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          {profile.title}
        </p>

        <h1
          id="hero-heading"
          className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          {profile.name}
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
