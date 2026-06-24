import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
    },
    environment: "happy-dom",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
