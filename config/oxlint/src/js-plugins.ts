import type { ExternalPluginEntry } from "oxlint";

const jsPluginPlaywright: ExternalPluginEntry = {
  name: "playwright",
  specifier: "eslint-plugin-playwright",
};

const jsPluginTestingLibrary: ExternalPluginEntry = {
  name: "testing-library",
  specifier: "eslint-plugin-testing-library",
};

const jsPluginTailwindcss: ExternalPluginEntry = {
  name: "tailwindcss",
  specifier: "oxlint-tailwindcss",
};

const jsPlugins: ExternalPluginEntry[] = [jsPluginTailwindcss];

export { jsPluginPlaywright, jsPluginTestingLibrary, jsPluginTailwindcss, jsPlugins };
