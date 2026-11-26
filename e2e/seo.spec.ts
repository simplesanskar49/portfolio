import { expect, test } from "@playwright/test";

test.describe("search and AI crawlers", () => {
  test("home page has title, description, canonical, Open Graph and JSON-LD in the HTML", async ({
    request,
  }) => {
    const html = await (await request.get("/")).text();
    expect(html).toContain('<link rel="canonical"');
    expect(html).toMatch(/<meta name="description" content="[^"]+"/);
    expect(html).toContain('<meta property="og:image"');
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image"');

    const jsonLd = /<script type="application\/ld\+json">(.+?)<\/script>/.exec(html)?.[1];
    expect(jsonLd).toBeDefined();
    const data = JSON.parse(jsonLd ?? "{}") as { "@graph": { "@type": string }[] };
    expect(data["@graph"].map((node) => node["@type"])).toEqual(["Person", "WebSite"]);
  });

  test("robots.txt allows AI crawlers and points to the sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBe(true);
    const body = await res.text();
    for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) {
      expect(body).toContain(`User-agent: ${bot}\nAllow: /`);
    }
    expect(body).toMatch(/^Sitemap: https?:\/\/.+\/sitemap\.xml$/m);
  });

  test("sitemap.xml lists the home page", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    expect(body).toMatch(/<loc>https?:\/\/[^<]+\/<\/loc>/);
  });

  test("llms.txt is served as markdown text", async ({ request }) => {
    const body = await (await request.get("/llms.txt")).text();
    expect(body).toMatch(/^# .+\n\n> /);
    expect(body).toContain("## Experience");
  });

  test("Open Graph image is a 1200 × 630 PNG", async ({ request }) => {
    const res = await request.get("/og.png");
    expect(res.headers()["content-type"]).toBe("image/png");
    const png = await res.body();
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  });
});
