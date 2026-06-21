// oxlint-disable no-inline-comments capitalized-comments sort-keys
import type { DummyRuleMap, OxlintConfig } from "oxlint";
import { defineConfig } from "oxlint";

/**
 * @note(oxlint)
 * i will never get over how if you turn on a category...
 * you turn on _every single rule_
 *
 * some of these are incredibly contradictory too
 *
 */
const tempRulesTurnedOffForOxlintAdoption: DummyRuleMap = {
  /**
   * correctness
   */
  "no-unsafe-optional-chaining": "warn", // x4
  "no-unused-expressions": "warn", // x10
  "no-unused-vars": "warn", // x34

  // non-eslint
  "import/default": "off", // x1
  "jsx-a11y/control-has-associated-label": "off", // x1
  "jsx-a11y/prefer-tag-over-role": "off", // x181
  "nextjs/no-async-client-component": "off", // x2
  "nextjs/no-html-link-for-pages": "off", // x2
  "nextjs/no-img-element": "off", // x3
  "react/exhaustive-deps": "off", // x5

  /**
   * nursery
   */
  "no-undef": "off", // x253
  "no-useless-assignment": "off", // x6

  // non-eslint
  "import/named": "off", // x18
  "react/react-compiler": "off", // x21

  /**
   * pedantic
   */
  "array-callback-return": "off", // x71
  "max-lines-per-function": "off", // x105
  "max-lines": "off", // x12
  "no-else-return": "off", // x3
  "no-inline-comments": "off", // x16
  "no-negated-condition": "off", // x13
  "no-promise-executor-return": "off", // x1
  "no-useless-return": "off", // x1
  "no-warning-comments": "off", // x1
  radix: "off", // x3
  "require-await": "off", // x8
  "require-unicode-regexp": "off", // x48
  "sort-vars": "off", // x2

  // non-eslint
  "import/max-dependencies": "off", // x33
  "react/jsx-no-useless-fragment": "off", // x48
  "react/no-unescaped-entities": "off", // x2
  "typescript/ban-ts-comment": "off", // x110
  "typescript/prefer-enum-initializers": "off", // x3
  "typescript/prefer-ts-expect-error": "off", // x109

  /**
   * perf
   */
  "no-await-in-loop": "off", // x3

  // non-eslint
  "react-perf/jsx-no-jsx-as-prop": "off", // x15
  "react-perf/jsx-no-new-array-as-prop": "off", // x7
  "react-perf/jsx-no-new-function-as-prop": "off", // x13
  "react-perf/jsx-no-new-object-as-prop": "off", // x342
  "react/no-array-index-key": "off", // x19
  "react/no-object-type-as-default-prop": "off", // x5

  /**
   * restriction
   */
  "class-methods-use-this": "off", // x2
  "no-console": "off", // x76
  "no-empty-function": "off", // x5
  "no-implicit-globals": "off", // x1
  "no-param-reassign": "off", // x2
  "no-plusplus": "off", // x18
  "no-undefined": "off", // x45
  "no-use-before-define": "off", // x159
  "no-void": "off", // x15

  // non-eslint
  "import/no-commonjs": "off", // x28
  "import/no-cycle": "off", // x22
  "import/no-default-export": "off", // x82
  "import/no-relative-parent-imports": "off", // x89
  "import/unambiguous": "off", // x12
  "node/no-process-env": "off", // x92
  "oxc/no-async-await": "off", // x178
  "oxc/no-barrel-file": "off", // x3
  "oxc/no-optional-chaining": "off", // x308
  "oxc/no-rest-spread-properties": "off", // x567
  "react/button-has-type": "off", // x1
  "react/forbid-component-props": "off", // x366
  "react/jsx-filename-extension": "off", // x186
  "react/jsx-no-literals": "off", // x425
  "react/no-multi-comp": "off", // x255
  "react/no-unknown-property": "off", // x10
  "react/only-export-components": "off", // x49
  "typescript/explicit-function-return-type": "off", // x644
  "typescript/explicit-member-accessibility": "off", // x8
  "typescript/explicit-module-boundary-types": "off", // x599
  "typescript/no-dynamic-delete": "off", // x5
  "typescript/no-explicit-any": "off", // x484
  "typescript/no-non-null-assertion": "off", // x2
  "typescript/no-require-imports": "off", // x15
  "typescript/no-var-requires": "off", // x4

  /**
   * style
   */
  // eslint
  "arrow-body-style": "off", // x75
  "capitalized-comments": "off", // x894
  curly: "off", // x103
  "func-names": "off", // x6
  "func-style": "off", // x374
  "id-length": "off", // x103
  "init-declarations": "off", // x15
  "logical-assignment-operators": "off", // x1
  "max-statements": "off", // x195
  "new-cap": "off", // x2
  "no-duplicate-imports": "off", // x31
  "no-implicit-coercion": "off", // x51
  "no-magic-numbers": "off", // x416
  "no-nested-ternary": "off", // x12
  "no-template-curly-in-string": "off", // x1
  "no-ternary": "off", // x192
  "no-useless-computed-key": "off", // x1
  "object-shorthand": "off", // x2
  "prefer-arrow-callback": "off", // x4
  "prefer-const": "off", // x6
  "prefer-destructuring": "off", // x83
  "prefer-named-capture-group": "off", // x4
  "prefer-template": "off", // x33
  "sort-imports": "off", // x487
  "sort-keys": "off", // x93
  // "sort-keys": ["warn", "asc", { allowLineSeparatedGroups: true }],
  yoda: "off", // x1

  // non-eslint
  "import/exports-last": "off", // x52
  "import/first": "off", // x51
  "import/group-exports": "off", // x140
  "import/newline-after-import": "off", // x8
  "import/no-anonymous-default-export": "off", // x7
  "import/no-named-export": "off", // x565
  "import/no-namespace": "off", // x10
  "import/no-nodejs-modules": "off", // x23
  "import/prefer-default-export": "off", // x203
  "node/global-require": "off", // x5
  "promise/avoid-new": "off", // x1
  "promise/prefer-await-to-then": "off", // x3
  "react/hook-use-state": "off", // x11
  "react/jsx-boolean-value": "off", // x9
  "react/jsx-curly-brace-presence": "off", // x12
  "react/jsx-max-depth": "off", // x552
  "react/jsx-pascal-case": "off", // x25
  "react/jsx-props-no-spreading": "off", // x223
  "react/self-closing-comp": "off", // x28
  "typescript/consistent-indexed-object-style": "off", // x2
  "typescript/consistent-type-definitions": "off", // x26
  "typescript/consistent-type-imports": "off", // x3
  "typescript/no-inferrable-types": "off", // x2
  "typescript/prefer-for-of": "off", // x1

  /**
   * suspicious
   */
  "no-shadow": "off", // x43
  "no-underscore-dangle": "off", // x61
  "no-unneeded-ternary": "off", // x3

  // non-eslint
  "import/no-unassigned-import": "off", // x28
  "promise/always-return": "off", // x1
  "react/iframe-missing-sandbox": "off", // x2
  "react/react-in-jsx-scope": "off", // x2237

  /**
   * @jsplugin(tailwindcss)
   */
  "tailwindcss/no-unknown-classes": "off", // x19`
  "tailwindcss/no-dark-without-light": "off", // x15
  "tailwindcss/enforce-consistent-line-wrapping": "off", // x15
};

const config: OxlintConfig = {
  categories: {
    correctness: "warn",
    nursery: "off",
    pedantic: "off",
    perf: "off",
    restriction: "off",
    style: "off",
    suspicious: "off",
  },
  env: {
    builtin: true,
  },
  jsPlugins: ["oxlint-tailwindcss"],
  options: {
    maxWarnings: 53,
    reportUnusedDisableDirectives: "allow",
    typeAware: false,
    typeCheck: false,
  },
  plugins: [
    "eslint",
    "import",
    "jsx-a11y",
    "nextjs",
    "node",
    "oxc",
    "promise",
    "react",
    "react-perf",
    "typescript",
  ],
  rules: {
    ...tempRulesTurnedOffForOxlintAdoption,

    /**
     * eslint
     */
    complexity: ["error", { max: 10 }],
    "react/exhaustive-deps": "warn",

    /**
     * @jsplugin(tailwindcss)
     */
    // "tailwindcss/enforce-canonical": "error", // @note(tailwindcss) 5.0s...
    // "tailwindcss/enforce-sort-order": "error", // @note(tailwindcss) 0.5s...
    // "tailwindcss/no-conflicting-classes": "error", // @note(tailwindcss) 0.5s...
  },
  settings: {
    react: {
      // renovate: datasource=npm depName=react
      version: "19.2.7",
    },
    tailwindcss: {
      // ref: https://oxlint-tailwindcss.pages.dev/
      entryPoint: "./sites/jeromefitzgerald.com/src/app/styles--globals.css", // your CSS file with @import "tailwindcss"
    },
  },
};

export default defineConfig(config);
