import { describe, expect, it } from "vitest";

import { cx } from "./cx";

describe("cx — site (twMerge)", () => {
  it("returns empty string with no arguments", () => {
    expect(cx()).toBe("");
  });

  it("joins non-conflicting class strings with a space", () => {
    expect(cx("font-bold", "italic")).toBe("font-bold italic");
  });

  it("filters out falsy values", () => {
    expect(cx(false, null, undefined, "foo", 0 as any, "bar")).toBe("foo bar");
  });

  it("evaluates conditional classes", () => {
    const isActive = true;
    const isDisabled = false;
    expect(cx(isActive && "active", isDisabled && "disabled")).toBe("active");
  });

  it("deduplicates conflicting Tailwind classes — last wins", () => {
    expect(cx("p-2", "p-4")).toBe("p-4");
    expect(cx("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("deduplicates across multiple conflicting utilities", () => {
    expect(cx("px-2", "py-2", "px-4")).toBe("py-2 px-4");
  });

  it("flattens array inputs", () => {
    expect(cx(["font-bold", "italic"], "underline")).toBe("font-bold italic underline");
  });
});
