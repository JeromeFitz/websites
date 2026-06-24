import { describe, expect, it } from "vitest";

import { cx } from "./cx";

describe("cx — design-system (clsx, no twMerge)", () => {
  it("returns empty string with no arguments", () => {
    expect(cx()).toBe("");
  });

  it("joins multiple class strings with a space", () => {
    expect(cx("a", "b", "c")).toBe("a b c");
  });

  it("filters out falsy values", () => {
    expect(cx(false, null, undefined, "foo", 0 as any, "bar")).toBe("foo bar");
  });

  it("evaluates conditional classes", () => {
    const isActive = true;
    const isDisabled = false;
    expect(cx(isActive && "active", isDisabled && "disabled")).toBe("active");
  });

  it("does NOT deduplicate conflicting Tailwind classes (no twMerge)", () => {
    expect(cx("p-2", "p-4")).toBe("p-2 p-4");
    expect(cx("text-red-500", "text-blue-500")).toBe("text-red-500 text-blue-500");
  });

  it("flattens array inputs", () => {
    expect(cx(["a", "b"], "c")).toBe("a b c");
  });
});
