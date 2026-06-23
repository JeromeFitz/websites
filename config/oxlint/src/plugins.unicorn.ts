import type { DummyRuleMap } from "oxlint";

/**
 * @note(oxlint) migration
 * slowly move to only having overrides where necessary
 */
const overridesTemporary: DummyRuleMap = {
  /**
   * correctness
   */
  /**
   * nursery
   */
  /**
   * pedantic
   */
  /**
   * perf
   */
  /**
   * restriction
   */
  /**
   * style
   */
  /**
   * suspicious
   */
};

const overrides: DummyRuleMap = {
  /**
   * style
   */
  "unicorn/filename-case": "error",
};

const rules: DummyRuleMap = {
  ...overridesTemporary,
  ...overrides,
};

export { rules as unicorn };
