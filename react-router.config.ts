import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  // Fully static site: every route is prerendered to HTML at build time.
  ssr: false,
  prerender: true,
  // Opt in to React Router v8 behaviour now so the upgrade is a no-op.
  future: {
    v8_middleware: true,
    v8_passThroughRequests: true,
    v8_splitRouteModules: true,
    v8_trailingSlashAwareDataRequests: true,
    v8_viteEnvironmentApi: true,
  },
} satisfies Config;
