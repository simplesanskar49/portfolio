import { Footer } from "~/components/layout/Footer";
import { NavBar } from "~/components/layout/NavBar";
import { About } from "~/components/sections/About";
import { Achievements } from "~/components/sections/Achievements";
import { Contact } from "~/components/sections/Contact";
import { Experience } from "~/components/sections/Experience";
import { Hero } from "~/components/sections/Hero";
import { Projects } from "~/components/sections/Projects";
import { Skills } from "~/components/sections/Skills";
import { profile } from "~/content/profile";
import { useRevealOnScroll } from "~/hooks/useRevealOnScroll";

import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: `${profile.name} | ${profile.title}` },
    { name: "description", content: profile.pitch },
  ];
}

export default function Home() {
  useRevealOnScroll();

  return (
    <>
      <NavBar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
