import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // Text resources for crawlers and AI assistants, prerendered to static files.
  route("robots.txt", "routes/robots[.]txt.ts"),
  route("sitemap.xml", "routes/sitemap[.]xml.ts"),
  route("llms.txt", "routes/llms[.]txt.ts"),
] satisfies RouteConfig;
