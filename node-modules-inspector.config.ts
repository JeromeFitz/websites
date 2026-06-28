import { readFileSync } from "node:fs";

import { defineConfig } from "node-modules-inspector";

import pkg from "./package.json";

const rootDevDeps = Object.keys(pkg.devDependencies);

const workspaceYaml = readFileSync("./pnpm-workspace.yaml", "utf-8");
const lines = workspaceYaml.split("\n");
const phpStart = lines.findIndex((l) => l.startsWith("publicHoistPattern:"));
const phpEnd = lines.findIndex((l, i) => i > phpStart && l.length > 0 && !l.startsWith(" "));
const publicHoistPattern = lines
  .slice(phpStart + 1, phpEnd)
  .map((l) => l.replace(/^\s+-\s+"(.+)"$/, "$1"));

export default defineConfig({
  defaultFilters: {
    excludeDts: true,
    excludeWorkspace: true,
    excludes: [...new Set([...rootDevDeps, ...publicHoistPattern])],
  },
  defaultSettings: {
    moduleTypeSimple: true,
  },
  publint: true,
});
