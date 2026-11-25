import { NavBar } from "~/components/layout/NavBar";
import { Section } from "~/components/layout/Section";
import { Hero } from "~/components/sections/Hero";
import { NAV_ITEMS } from "~/constants/navigation";
import { profile } from "~/content/profile";

import type { Route } from "./+types/home";

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
        {/* Placeholder sections so navigation and scroll-spy can be reviewed; real content comes next. */}
        {NAV_ITEMS.map((item) => (
          <Section key={item.id} id={item.id} eyebrow={item.label} title={item.label}>
            <p className="max-w-2xl text-text-muted">Content coming in the next step.</p>
          </Section>
        ))}
      </main>
    </>
  );
}
