import { createReadStream, existsSync } from "node:fs";
import path from "node:path";

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";

/**
 * `vite preview` falls back to index.html for unknown URLs. Static hosts like
 * Vercel serve 404.html with a 404 status instead, so do the same locally to
 * keep e2e tests honest. Preview only; has no effect on the build.
 */
function preview404Page(): Plugin {
  return {
    name: "preview-404-page",
    configurePreviewServer(server) {
      const outDir = path.resolve(server.config.root, server.config.build.outDir);
      const notFoundPage = path.join(outDir, "404.html");

      server.middlewares.use((req, res, next) => {
        const { pathname } = new URL(req.url ?? "/", "http://localhost");
        const file = path.join(outDir, decodeURIComponent(pathname));
        const wantsHtml = req.headers.accept?.includes("text/html") ?? false;
        const exists =
          pathname === "/" || existsSync(file) || existsSync(path.join(file, "index.html"));
        if (exists || !wantsHtml || !existsSync(notFoundPage)) {
          next();
          return;
        }
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        createReadStream(notFoundPage).pipe(res);
      });
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), preview404Page()],
  resolve: {
    tsconfigPaths: true,
  },
});
