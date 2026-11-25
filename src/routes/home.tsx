import { NavBar } from "~/components/layout/NavBar";
import { Section } from "~/components/layout/Section";
import { About } from "~/components/sections/About";
import { Experience } from "~/components/sections/Experience";
import { Hero } from "~/components/sections/Hero";
import { NAV_ITEMS } from "~/constants/navigation";
import { profile } from "~/content/profile";

import type { Route } from "./+types/home";

const BUILT_SECTIONS = new Set(["about", "experience"]);

export function meta(_: Route.MetaArgs) {
  return [
    { title: `${profile.name} — ${profile.title}` },
    { name: "description", content: profile.pitch },
  ];
}

export default function Home() {
  return (
    <>
      <NavBar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        {/* Placeholders until these sections are built. */}
        {NAV_ITEMS.filter((item) => !BUILT_SECTIONS.has(item.id)).map((item) => (
          <Section key={item.id} id={item.id} eyebrow={item.label} title={item.label}>
            <p className="max-w-2xl text-text-muted">Content coming in the next step.</p>
          </Section>
        ))}
      </main>
    </>
  );
}
