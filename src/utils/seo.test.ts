import { describe, expect, it } from "vitest";

import { SITE_URL } from "~/constants/site";
import { experience } from "~/content/experience";
import { profile } from "~/content/profile";
import { projects } from "~/content/projects";

import { buildLlmsTxt, buildStructuredData } from "./seo";

describe("buildStructuredData", () => {
  const [person, website] = buildStructuredData()["@graph"];

  it("describes the person with role, profiles and skills", () => {
    expect(person).toMatchObject({
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.title,
      url: `${SITE_URL}/`,
      sameAs: profile.links.map((link) => link.href),
      knowsAbout: expect.arrayContaining(["React", "TypeScript", "Go"]) as unknown,
    });
  });

  it("links the website to its author", () => {
    expect(website).toMatchObject({ "@type": "WebSite", author: { "@id": person?.["@id"] } });
  });
});

describe("buildLlmsTxt", () => {
  const text = buildLlmsTxt();

  it("starts with the name and a one-line summary", () => {
    expect(text.startsWith(`# ${profile.name}\n\n> ${profile.title}`)).toBe(true);
  });

  it("covers every role and project", () => {
    for (const role of experience) expect(text).toContain(`${role.role}, ${role.company}`);
    for (const project of projects) expect(text).toContain(`### ${project.title}`);
  });

  it("never includes the email address", () => {
    expect(text).not.toContain(`${profile.emailUser}@`);
    expect(text).not.toContain(profile.emailDomain);
  });
});
