import { describe, expect, it } from "vitest";

import { getImageAlt, getImageExpiration, getImageUrl } from "./image.utils";

const externalBlock = {
  id: "block-1",
  type: "image",
  image: {
    caption: [],
    external: { url: "https://cdn.example.com/photo.jpg" },
    type: "external",
  },
};

const fileBlock = {
  id: "block-2",
  type: "image",
  image: {
    caption: [],
    file: {
      expiry_time: "2025-06-01T00:00:00.000Z",
      url: "https://s3.amazonaws.com/bucket/photo.jpg",
    },
    type: "file",
  },
};

describe("getImageUrl", () => {
  it("returns external.url for external blocks", () => {
    expect(getImageUrl(externalBlock)).toBe("https://cdn.example.com/photo.jpg");
  });

  it("returns file.url for file (AWS) blocks", () => {
    expect(getImageUrl(fileBlock)).toBe("https://s3.amazonaws.com/bucket/photo.jpg");
  });
});

describe("getImageExpiration", () => {
  it("returns null for external blocks (no expiry)", () => {
    expect(getImageExpiration(externalBlock)).toBeNull();
  });

  it("returns expiry_time string for file (AWS) blocks", () => {
    expect(getImageExpiration(fileBlock)).toBe("2025-06-01T00:00:00.000Z");
  });
});

describe("getImageAlt", () => {
  it("returns empty string for an empty comments array", () => {
    expect(getImageAlt([])).toBe("");
  });

  it("returns the plain_text of the first comment when no ALT: prefix is present", () => {
    const comments = [{ rich_text: [{ plain_text: "A beautiful sunset" }] }];
    expect(getImageAlt(comments)).toBe("A beautiful sunset");
  });

  it("extracts the text after ALT: prefix from a matching comment", () => {
    const comments = [{ rich_text: [{ plain_text: "ALT: A scenic mountain view" }] }];
    expect(getImageAlt(comments)).toBe("A scenic mountain view");
  });

  it("prefers ALT: comment over the first comment when both exist", () => {
    const comments = [
      { rich_text: [{ plain_text: "Some regular note" }] },
      { rich_text: [{ plain_text: "ALT: The real alt text" }] },
    ];
    expect(getImageAlt(comments)).toBe("The real alt text");
  });
});
