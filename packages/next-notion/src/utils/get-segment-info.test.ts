import { describe, expect, it } from "vitest";

import { getSegmentInfo } from "./get-segment-info.js";

describe("getSegmentInfo", () => {
  it("returns segment-only catchAll when no params provided", () => {
    const result = getSegmentInfo({ SEGMENT: "blog" });
    expect(result.catchAll).toEqual(["blog"]);
    expect(result.segment).toBe("blog");
    expect(result.slug).toBe("/blog");
    expect(result.isIndex).toBe(true);
    expect(result.hasMeta).toBe(false);
    expect(result.segmentCount).toBe(1);
  });

  it("appends params.catchAll to the catchAll array", () => {
    const result = getSegmentInfo({
      SEGMENT: "blog",
      params: { catchAll: ["my-post"] },
    });
    expect(result.catchAll).toEqual(["blog", "my-post"]);
    expect(result.slug).toBe("/blog/my-post");
    expect(result.isIndex).toBe(false);
    expect(result.hasMeta).toBe(true);
    expect(result.segmentCount).toBe(2);
  });

  it("builds nested slug from multi-segment catchAll", () => {
    const result = getSegmentInfo({
      SEGMENT: "events",
      params: { catchAll: ["2025", "01", "show"] },
    });
    expect(result.catchAll).toEqual(["events", "2025", "01", "show"]);
    expect(result.slug).toBe("/events/2025/01/show");
    expect(result.segmentCount).toBe(4);
  });

  it("treats a numeric last segment as index (pagination)", () => {
    const result = getSegmentInfo({
      SEGMENT: "blog",
      params: { catchAll: ["2"] },
    });
    expect(result.isIndex).toBe(true);
  });

  it("treats first===last as index (segment-only, no sub-path)", () => {
    const result = getSegmentInfo({ SEGMENT: "shows" });
    expect(result.isIndex).toBe(true);
  });

  it("returns hasMeta false when catchAll has only one element", () => {
    const result = getSegmentInfo({ SEGMENT: "pages" });
    expect(result.hasMeta).toBe(false);
  });

  it("returns hasMeta true when catchAll has two or more elements", () => {
    const result = getSegmentInfo({
      SEGMENT: "shows",
      params: { catchAll: ["hamlet"] },
    });
    expect(result.hasMeta).toBe(true);
  });
});
