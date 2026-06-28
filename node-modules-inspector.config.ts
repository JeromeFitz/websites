import { readFileSync } from "node:fs";

import { defineConfig } from "node-modules-inspector";

import pkg from "./package.json";

const rootDevDeps = Object.keys(pkg.devDependencies);

const workspaceYaml = readFileSync("./pnpm-workspace.yaml", "utf-8");
const lines = workspaceYaml.split("\n");
const hoistStart = lines.findIndex((l) => l.startsWith("publicHoistPattern:"));
const hoistEnd = lines.findIndex((l, i) => i > hoistStart && l.length > 0 && !l.startsWith(" "));
const hoistLines = lines
  .slice(hoistStart + 1, hoistEnd)
  .map((l) => l.replace(/^\s+-\s+"(.+)"$/, "$1"));

export default defineConfig({
  defaultFilters: {
    excludeDts: true,
    excludeWorkspace: true,
    excludes: [...new Set([...rootDevDeps, ...hoistLines])],
  },
  defaultSettings: {
    moduleTypeSimple: true,
  },
  publint: true,
});
