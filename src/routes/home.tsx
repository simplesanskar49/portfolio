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
    <main id="main" className="mx-auto max-w-(--container-content) px-4 py-24 sm:px-6 lg:px-8">
      <p className="font-mono text-sm tracking-widest text-accent uppercase">{profile.title}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{profile.name}</h1>
      <p className="mt-2 text-lg text-text-secondary">{profile.subtitle}</p>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
        {profile.pitch}
      </p>
    </main>
  );
}
