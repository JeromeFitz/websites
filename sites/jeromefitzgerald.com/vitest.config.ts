import { resolve } from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "next-config/env.client": resolve(__dirname, "./src/config/next.config.env.client.ts"),
      "next-config/env.server": resolve(__dirname, "./src/config/next.config.env.server.ts"),
    },
  },
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "json"],
    },
  },
});
