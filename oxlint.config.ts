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
  "eslint/no-extra-boolean-cast": "off", // x2
  "eslint/no-unsafe-optional-chaining": "off", // x4
  "eslint/no-unused-expressions": "off", // x10
  "eslint/no-unused-vars": "off", // x34
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
  "eslint/no-undef": "off", // x253
  "eslint/no-useless-assignment": "off", // x6
  "import/named": "off", // x18
  "react/react-compiler": "off", // x21

  /**
   * pedantic
   */
  "eslint/array-callback-return": "off", // x71
  "eslint/max-lines-per-function": "off", // x105
  "eslint/max-lines": "off", // x12
  "eslint/no-else-return": "off", // x3
  "eslint/no-inline-comments": "off", // x16
  "eslint/no-negated-condition": "off", // x13
  "eslint/no-promise-executor-return": "off", // x1
  "eslint/no-useless-return": "off", // x1
  "eslint/no-warning-comments": "off", // x1
  "eslint/radix": "off", // x3
  "eslint/require-await": "off", // x8
  "eslint/require-unicode-regexp": "off", // x48
  "eslint/sort-vars": "off", // x2
  "import/max-dependencies": "off", // x33
  "react/jsx-no-useless-fragment": "off", // x48
  "react/no-unescaped-entities": "off", // x2
  "typescript/ban-ts-comment": "off", // x110
  "typescript/prefer-enum-initializers": "off", // x3
  "typescript/prefer-ts-expect-error": "off", // x109

  /**
   * perf
   */
  "eslint/no-await-in-loop": "off", // x3
  "react-perf/jsx-no-jsx-as-prop": "off", // x15
  "react-perf/jsx-no-new-array-as-prop": "off", // x7
  "react-perf/jsx-no-new-function-as-prop": "off", // x13
  "react-perf/jsx-no-new-object-as-prop": "off", // x342
  "react/no-array-index-key": "off", // x19
  "react/no-object-type-as-default-prop": "off", // x5

  /**
   * restriction
   */
  "eslint/class-methods-use-this": "off", // x2
  "eslint/complexity": "off", // x2
  "eslint/no-console": "off", // x76
  "eslint/no-empty-function": "off", // x5
  "eslint/no-implicit-globals": "off", // x1
  "eslint/no-param-reassign": "off", // x2
  "eslint/no-plusplus": "off", // x18
  "eslint/no-undefined": "off", // x45
  "eslint/no-use-before-define": "off", // x159
  "eslint/no-void": "off", // x15
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
  "eslint/arrow-body-style": "off", // x75
  "eslint/capitalized-comments": "off", // x894
  "eslint/curly": "off", // x103
  "eslint/func-names": "off", // x6
  "eslint/func-style": "off", // x374
  "eslint/id-length": "off", // x103
  "eslint/init-declarations": "off", // x15
  "eslint/logical-assignment-operators": "off", // x1
  "eslint/max-statements": "off", // x195
  "eslint/new-cap": "off", // x2
  "eslint/no-duplicate-imports": "off", // x31
  "eslint/no-implicit-coercion": "off", // x51
  "eslint/no-magic-numbers": "off", // x416
  "eslint/no-nested-ternary": "off", // x12
  "eslint/no-template-curly-in-string": "off", // x1
  "eslint/no-ternary": "off", // x192
  "eslint/no-useless-computed-key": "off", // x1
  "eslint/object-shorthand": "off", // x2
  "eslint/prefer-arrow-callback": "off", // x4
  "eslint/prefer-const": "off", // x6
  "eslint/prefer-destructuring": "off", // x83
  "eslint/prefer-named-capture-group": "off", // x4
  "eslint/prefer-template": "off", // x33
  "eslint/sort-imports": "off", // x487
  "eslint/sort-keys": "off", // x93
  "eslint/yoda": "off", // x1
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
  "eslint/no-shadow": "off", // x43
  "eslint/no-underscore-dangle": "off", // x61
  "eslint/no-unneeded-ternary": "off", // x3
  "import/no-unassigned-import": "off", // x28
  "promise/always-return": "off", // x1
  "react/iframe-missing-sandbox": "off", // x2
  "react/react-in-jsx-scope": "off", // x2237
};

const config: OxlintConfig = {
  categories: {
    correctness: "warn",
    nursery: "warn",
    pedantic: "warn",
    perf: "warn",
    restriction: "warn",
    style: "warn",
    suspicious: "warn",
  },
  env: {
    builtin: true,
  },
  options: {
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
  },
};

export default defineConfig(config);
