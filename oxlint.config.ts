import { config, overridePlaywright, overrideVitest } from "@jeromefitz/oxlint-config";
import { defineConfig } from "oxlint";

export default defineConfig({
  ...config,
  // anything below overrides above
  env: {
    builtin: true,
  },
  overrides: [overridePlaywright, overrideVitest],
  options: {
    maxWarnings: 50,
    reportUnusedDisableDirectives: "allow",
    typeAware: false,
    typeCheck: false,
  },
  settings: {
    react: {
      // renovate: datasource=npm depName=react
      version: "19.2.7",
    },
    tailwindcss: {
      // ref: https://oxlint-tailwindcss.pages.dev/
      entryPoint: ["./sites/jeromefitzgerald.com/src/app/styles--globals.css"],
    },
  },
});
