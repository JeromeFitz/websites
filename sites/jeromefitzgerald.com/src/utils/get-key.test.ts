import { describe, expect, it } from "vitest";

import { getKey, getKeyForGenerateStaticParams } from "./get-key";

describe("getKey", () => {
  it("prefixes with / for the pages segment (no segment in path)", () => {
    expect(getKey("pages", "about")).toBe("/about");
  });

  it("includes segment in path for non-pages segments", () => {
    expect(getKey("blog", "my-post")).toBe("/blog/my-post");
  });

  it("joins array keys with / for catch-all routes", () => {
    expect(getKey("events", ["2025", "01", "show"])).toBe("/events/2025/01/show");
  });

  it("coerces array key to comma-separated string for pages segment (no join)", () => {
    /** @note(get-key) pages uses `/${key}` — arrays stringify with commas; always pass a string for pages */
    expect(getKey("pages", ["a", "b"])).toBe("/a,b");
  });
});

describe("getKeyForGenerateStaticParams", () => {
  it("strips the /segment/ prefix and returns a simple string for a single-level path", () => {
    expect(getKeyForGenerateStaticParams("blog", "/blog/my-post")).toBe("my-post");
  });

  it("returns a split array for nested paths (catch-all [[...key]])", () => {
    expect(getKeyForGenerateStaticParams("events", "/events/2025/01/show")).toEqual([
      "2025",
      "01",
      "show",
    ]);
  });

  it("returns the leaf segment when path has exactly two parts", () => {
    expect(getKeyForGenerateStaticParams("shows", "/shows/hamlet")).toBe("hamlet");
  });
});
