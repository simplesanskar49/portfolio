import { Footer } from "~/components/layout/Footer";
import { NavBar } from "~/components/layout/NavBar";
import { About } from "~/components/sections/About";
import { Achievements } from "~/components/sections/Achievements";
import { Contact } from "~/components/sections/Contact";
import { Experience } from "~/components/sections/Experience";
import { Hero } from "~/components/sections/Hero";
import { Projects } from "~/components/sections/Projects";
import { Skills } from "~/components/sections/Skills";
import { absoluteUrl, OG_IMAGE } from "~/constants/site";
import { profile } from "~/content/profile";
import { useRevealOnScroll } from "~/hooks/useRevealOnScroll";
import { buildStructuredData, PAGE_DESCRIPTION, PAGE_TITLE } from "~/utils/seo";

import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs): Route.MetaDescriptors {
  const url = absoluteUrl("/");
  const image = absoluteUrl(OG_IMAGE.path);
  const imageAlt = `${profile.name}, ${profile.title}`;

  return [
    { title: PAGE_TITLE },
    { name: "description", content: PAGE_DESCRIPTION },
    { name: "author", content: profile.name },
    { tagName: "link", rel: "canonical", href: url },
    // Open Graph (LinkedIn, Slack, WhatsApp, etc.)
    { property: "og:type", content: "profile" },
    { property: "og:site_name", content: profile.name },
    { property: "og:title", content: PAGE_TITLE },
    { property: "og:description", content: PAGE_DESCRIPTION },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: String(OG_IMAGE.width) },
    { property: "og:image:height", content: String(OG_IMAGE.height) },
    { property: "og:image:alt", content: imageAlt },
    { property: "og:locale", content: "en_IN" },
    { property: "profile:first_name", content: profile.name.split(" ")[0] },
    { property: "profile:last_name", content: profile.name.split(" ").slice(1).join(" ") },
    // X / Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: PAGE_TITLE },
    { name: "twitter:description", content: PAGE_DESCRIPTION },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: imageAlt },
    // Structured data for search engines and AI assistants
    { "script:ld+json": buildStructuredData() },
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
