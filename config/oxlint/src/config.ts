import type { DummyRuleMap, OxlintConfig } from "oxlint";

import { categories } from "./categories.ts";
import { globals } from "./globals.ts";
import { ignorePatterns } from "./ignore-patterns.ts";
import { tailwindcss } from "./js-plugins.oxlint-tailwindcss.ts";
import { playwright } from "./js-plugins.playwright.ts";
import { testingLibrary } from "./js-plugins.testing-library.ts";
import { jsPlugins } from "./js-plugins.ts";
import { eslint } from "./plugins.eslint.ts";
import { importRules } from "./plugins.import.ts";
import { jsxA11y } from "./plugins.jsx-a11y.ts";
import { nextjs } from "./plugins.nextjs.ts";
import { node } from "./plugins.node.ts";
import { oxc } from "./plugins.oxc.ts";
import { promise } from "./plugins.promise.ts";
import { reactPerf } from "./plugins.react-perf.ts";
import { react } from "./plugins.react.ts";
import { plugins } from "./plugins.ts";
import { typescript } from "./plugins.typescript.ts";
import { unicorn } from "./plugins.unicorn.ts";
import { vitest } from "./plugins.vitest.ts";

const jsPluginsRules: DummyRuleMap = {
  ...playwright,
  ...testingLibrary,
  ...tailwindcss,
};

const pluginsRules: DummyRuleMap = {
  ...eslint,
  ...importRules,
  ...jsxA11y,
  ...nextjs,
  ...node,
  ...oxc,
  ...promise,
  ...react,
  ...reactPerf,
  ...typescript,
  ...unicorn,
  ...vitest,
};

const rules: DummyRuleMap = {
  ...pluginsRules,
  ...jsPluginsRules,
};

export const config: OxlintConfig = {
  categories,
  ignorePatterns,
  globals,
  jsPlugins,
  plugins,
  rules,
};
