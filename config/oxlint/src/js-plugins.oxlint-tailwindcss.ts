/**
 * @ref: https://oxlint-tailwindcss.pages.dev/rules/#correctness
 */
import type { DummyRuleMap } from "oxlint";

const overridesTemporary: DummyRuleMap = {
  /**
   * correctness
   */
  "tailwindcss/no-unknown-classes": "off", // x19`
  "tailwindcss/no-dark-without-light": "off", // x15

  /**
   * style and consistency
   */
  "tailwindcss/enforce-consistent-line-wrapping": "off", // x15
};

const overrides: DummyRuleMap = {
  /**
   * correctness
   */
  // "tailwindcss/no-conflicting-classes": "error", // adds 0.5s...
  /**
   * modernization
   */
  // "tailwindcss/enforce-canonical": "error", // adds 5.0s...
  /**
   * style and consistency
   */
  // "tailwindcss/enforce-sort-order": "error", // adds 0.5s...
};

const rules: DummyRuleMap = {
  ...overridesTemporary,
  ...overrides,
};

export { rules as tailwindcss };
