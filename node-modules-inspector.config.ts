import { defineConfig } from "node-modules-inspector";

export default defineConfig({
  defaultFilters: {
    excludeDts: true,
    excludes: [
      "*eslint*",
      "*lint-staged*",
      "*oxfmt*",
      "*oxlint*",
      "*rolldown*",
      "*semantic*",
      "*tsdown*",
    ],
    excludeWorkspace: true,
  },
  defaultSettings: {
    moduleTypeSimple: true,
  },

  publint: true,
});
