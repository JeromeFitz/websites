import { describe, expect, it, vi } from "vitest";

vi.mock("next-notion/utils", () => ({
  getPropertyTypeData: vi.fn<typeof import("next-notion/utils").getPropertyTypeData>(),
}));

import { getPropertyTypeData } from "next-notion/utils";

import { getSlugPreview } from "./get-slug-preview";

const mockGPTD = vi.mocked(getPropertyTypeData);

describe("getSlugPreview", () => {
  it("calls getPropertyTypeData with 'Slug.Preview' key", () => {
    mockGPTD.mockReturnValue("my-post-preview" as any);
    getSlugPreview({ "Slug.Preview": {} });
    expect(mockGPTD).toHaveBeenCalledWith({ "Slug.Preview": {} }, "Slug.Preview");
  });

  it("returns the value from getPropertyTypeData", () => {
    mockGPTD.mockReturnValue("preview-slug" as any);
    expect(getSlugPreview({})).toBe("preview-slug");
  });
});
