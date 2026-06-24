import { describe, expect, it } from "vitest";

import { getAnnotations, getBlock, getBlockKey } from "./notion.utils";

describe("getAnnotations", () => {
  it("returns empty string for null input", () => {
    expect(getAnnotations(null)).toBe("");
  });

  it("returns empty string for undefined input", () => {
    expect(getAnnotations(undefined)).toBe("");
  });

  it("returns empty string when all annotations are false and color is default", () => {
    expect(
      getAnnotations({
        bold: false,
        code: false,
        color: "default",
        italic: false,
        strikethrough: false,
        underline: false,
      }),
    ).toBe("");
  });

  it("maps bold to font-bold", () => {
    expect(
      getAnnotations({
        bold: true,
        code: false,
        color: "default",
        italic: false,
        strikethrough: false,
        underline: false,
      }),
    ).toBe("font-bold");
  });

  it("maps italic to italic", () => {
    expect(
      getAnnotations({
        bold: false,
        code: false,
        color: "default",
        italic: true,
        strikethrough: false,
        underline: false,
      }),
    ).toBe("italic");
  });

  it("maps code to font-mono", () => {
    expect(
      getAnnotations({
        bold: false,
        code: true,
        color: "default",
        italic: false,
        strikethrough: false,
        underline: false,
      }),
    ).toBe("font-mono");
  });

  it("maps strikethrough to line-through", () => {
    expect(
      getAnnotations({
        bold: false,
        code: false,
        color: "default",
        italic: false,
        strikethrough: true,
        underline: false,
      }),
    ).toBe("line-through");
  });

  it("maps underline to underline", () => {
    expect(
      getAnnotations({
        bold: false,
        code: false,
        color: "default",
        italic: false,
        strikethrough: false,
        underline: true,
      }),
    ).toBe("underline");
  });

  it("adds notion-{color} class for non-default colors", () => {
    expect(
      getAnnotations({
        bold: false,
        code: false,
        color: "blue",
        italic: false,
        strikethrough: false,
        underline: false,
      }),
    ).toBe("notion-blue");
  });

  it("omits color class for color=default", () => {
    const result = getAnnotations({
      bold: true,
      code: false,
      color: "default",
      italic: false,
      strikethrough: false,
      underline: false,
    });
    expect(result).not.toContain("notion-");
    expect(result).toBe("font-bold");
  });

  it("combines multiple annotations in cx order (code, italic, bold, strikethrough, underline)", () => {
    const result = getAnnotations({
      bold: true,
      code: true,
      color: "default",
      italic: true,
      strikethrough: false,
      underline: false,
    });
    expect(result).toBe("font-mono italic font-bold");
  });

  it("combines annotations and color class", () => {
    const result = getAnnotations({
      bold: true,
      code: false,
      color: "red",
      italic: false,
      strikethrough: false,
      underline: false,
    });
    expect(result).toBe("font-bold notion-red");
  });
});

describe("getBlockKey", () => {
  it("produces id--type--order format", () => {
    expect(getBlockKey("abc-123", "paragraph", 0)).toBe("abc-123--paragraph--0");
  });

  it("works with higher order values", () => {
    expect(getBlockKey("xyz", "heading_1", 5)).toBe("xyz--heading_1--5");
  });
});

// @note(vitest) guard cases only; rendering a real block requires a full React tree
describe("getBlock", () => {
  it("returns null when block has no type", () => {
    expect(getBlock({ block: {} as any, blocks: {} })).toBeNull();
  });

  it("returns null when the resolved component is null", () => {
    // @note(vitest) null component exercises the !Component guard without triggering a React render
    const result = getBlock({
      block: { id: "test-id", type: "paragraph" } as any,
      blocks: { paragraph: { component: null } },
      order: 0,
    });
    expect(result).toBeNull();
  });
});
