import { defineConfig } from "node-modules-inspector";

export default defineConfig({
  defaultFilters: {
    excludeDts: true,
    excludeWorkspace: true,
    excludes: [
      "*eslint*",
      "*lint-staged*",
      "*oxfmt*",
      "*oxlint*",
      "*rolldown*",
      "*semantic*",
      "*tsdown*",
    ],
  },
  defaultSettings: {
    moduleTypeSimple: true,
  },

  publint: true,
});
