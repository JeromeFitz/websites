import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "json"],
      thresholds: {
        statements: 75,
        branches: 65,
        functions: 85,
        lines: 75,
      },
    },
    environment: "happy-dom",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
