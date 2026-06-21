import type { ExternalPluginEntry } from "oxlint";

const jsPlugins: ExternalPluginEntry[] = [
  { name: "playwright", specifier: "eslint-plugin-playwright" },
  { name: "testing-library", specifier: "eslint-plugin-testing-library" },
  { name: "tailwindcss", specifier: "oxlint-tailwindcss" },
];

export { jsPlugins };
