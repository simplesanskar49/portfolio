import { rename, rm } from "node:fs/promises";
import path from "node:path";

import type { Config } from "@react-router/dev/config";

const CLIENT_DIR = path.join(import.meta.dirname, "build", "client");

export default {
  appDirectory: "src",
  // Fully static site: every route is prerendered to HTML at build time.
  ssr: false,
  // Every static route, plus /404 for the catch-all "*" route (splats aren't prerendered by default).
  prerender: ({ getStaticPaths }) => [...getStaticPaths(), "/404"],
  // Static hosts (Vercel included) serve /404.html for missing paths, so move it there.
  async buildEnd() {
    await rename(path.join(CLIENT_DIR, "404", "index.html"), path.join(CLIENT_DIR, "404.html"));
    await rm(path.join(CLIENT_DIR, "404"), { recursive: true, force: true });
  },
  // Opt in to React Router v8 behaviour now so the upgrade is a no-op.
  future: {
    v8_middleware: true,
    v8_passThroughRequests: true,
    v8_splitRouteModules: true,
    v8_trailingSlashAwareDataRequests: true,
    v8_viteEnvironmentApi: true,
  },
} satisfies Config;
