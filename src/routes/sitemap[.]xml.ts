import { absoluteUrl } from "~/constants/site";

/**
 * Single-page site, so the sitemap lists just the home page.
 */
export function loader() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${absoluteUrl("/")}</loc>
  </url>
</urlset>
`;

  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
