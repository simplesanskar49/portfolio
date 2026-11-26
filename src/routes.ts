import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // Text resources for crawlers and AI assistants, prerendered to static files.
  route("robots.txt", "routes/robots[.]txt.ts"),
  route("sitemap.xml", "routes/sitemap[.]xml.ts"),
  route("llms.txt", "routes/llms[.]txt.ts"),
  // Everything else: styled 404 page.
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
