import { defineConfig } from "vitest/config";

// Separate from vite.config.ts: the React Router plugin is not needed for unit tests.
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
  },
});
