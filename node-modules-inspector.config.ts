import { defineConfig } from "node-modules-inspector";

import pkg from "./package.json";

const rootDevDeps = Object.keys(pkg.devDependencies);

export default defineConfig({
  defaultFilters: {
    excludeDts: true,
    excludeWorkspace: true,
    excludes: [
      ...rootDevDeps,
      "*eslint*",
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
