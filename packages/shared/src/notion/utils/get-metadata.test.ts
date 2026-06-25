import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@jeromefitz/next-config", () => ({
  envClient: { NEXT_PUBLIC__BASE_URL: "https://jeromefitzgerald.com" },
}));

vi.mock("next-notion/utils", () => ({
  getPropertyTypeData: vi.fn<typeof import("next-notion/utils").getPropertyTypeData>(),
}));

import { getPropertyTypeData } from "next-notion/utils";

import { getMetadata } from "./get-metadata";

const mockGPTD = vi.mocked(getPropertyTypeData);

const BASE_PROPS = { Title: { type: "title" } };
const IMAGE_PROPS = { ...BASE_PROPS, "SEO.Image": { type: "files" } };

function seedGPTD({
  title = "My Page",
  description = "A description",
  image = undefined as unknown,
  imageDescription = "",
} = {}) {
  mockGPTD.mockImplementation((_props: unknown, key: string) => {
    if (key === "Title") return title;
    if (key === "SEO.Description") return description;
    if (key === "SEO.Image") return image ? [image] : [];
    if (key === "SEO.Image.Description") return imageDescription;
    return undefined;
  });
}

beforeEach(() => vi.clearAllMocks());

describe("getMetadata — empty properties", () => {
  it("returns {} when properties is empty", () => {
    expect(getMetadata({ properties: {}, segmentInfo: {} })).toEqual({});
  });
});

describe("getMetadata — canonical", () => {
  it("uses BASE_URL alone for /homepage slug", () => {
    seedGPTD();
    const { alternates } = getMetadata({
      properties: BASE_PROPS,
      segmentInfo: { isIndex: false, segment: "pages", slug: "/homepage" },
    });
    expect(alternates?.canonical).toBe("https://jeromefitzgerald.com");
  });

  it("appends slug to BASE_URL for all other pages", () => {
    seedGPTD();
    const { alternates } = getMetadata({
      properties: BASE_PROPS,
      segmentInfo: { isIndex: false, segment: "pages", slug: "/about" },
    });
    expect(alternates?.canonical).toBe("https://jeromefitzgerald.com/about");
  });
});

describe("getMetadata — title suffix", () => {
  it("appends 'Actor. Comedian. Writer.' for /homepage", () => {
    seedGPTD({ title: "Home" });
    const { title } = getMetadata({
      properties: BASE_PROPS,
      segmentInfo: { isIndex: false, segment: "pages", slug: "/homepage" },
    });
    expect(title).toBe("Home | Actor. Comedian. Writer.");
  });

  it("appends 'Jerome (he/him)' for pages segment non-homepage", () => {
    seedGPTD({ title: "About" });
    const { title } = getMetadata({
      properties: BASE_PROPS,
      segmentInfo: { isIndex: false, segment: "pages", slug: "/about" },
    });
    expect(title).toBe("About | Jerome (he/him)");
  });

  it("appends 'Jerome (he/him)' for index pages regardless of segment", () => {
    seedGPTD({ title: "Blog" });
    const { title } = getMetadata({
      properties: BASE_PROPS,
      segmentInfo: { isIndex: true, segment: "blog", slug: "/blog" },
    });
    expect(title).toBe("Blog | Jerome (he/him)");
  });

  it("appends title-cased segment name for non-index non-pages", () => {
    seedGPTD({ title: "My Post" });
    const { title } = getMetadata({
      properties: BASE_PROPS,
      segmentInfo: { isIndex: false, segment: "blog", slug: "/blog/my-post" },
    });
    expect(title).toBe("My Post | Blog");
  });
});

describe("getMetadata — description", () => {
  it("includes description from SEO.Description", () => {
    seedGPTD({ description: "Page about Jerome" });
    const { description } = getMetadata({
      properties: BASE_PROPS,
      segmentInfo: { isIndex: false, segment: "pages", slug: "/about" },
    });
    expect(description).toBe("Page about Jerome");
  });
});

describe("getMetadata — openGraph", () => {
  it("builds openGraph with external image URL and alt", () => {
    seedGPTD({
      image: {
        type: "external",
        external: { url: "https://example.com/og.jpg" },
        caption: [],
      },
      imageDescription: "A preview image",
    });
    const { openGraph } = getMetadata({
      properties: IMAGE_PROPS,
      segmentInfo: { isIndex: false, segment: "pages", slug: "/about" },
    }) as any;
    expect(openGraph.images[0]).toEqual({
      url: "https://example.com/og.jpg",
      alt: "A preview image",
    });
  });

  it("builds openGraph with file image URL", () => {
    seedGPTD({
      image: {
        type: "file",
        file: { url: "https://s3.aws.example.com/img.jpg", expiry_time: "2099-01-01" },
        caption: [],
      },
    });
    const { openGraph } = getMetadata({
      properties: IMAGE_PROPS,
      segmentInfo: { isIndex: false, segment: "pages", slug: "/about" },
    }) as any;
    expect(openGraph.images[0].url).toBe("https://s3.aws.example.com/img.jpg");
  });

  it("omits openGraph when no SEO.Image property", () => {
    seedGPTD();
    const { openGraph } = getMetadata({
      properties: BASE_PROPS,
      segmentInfo: { isIndex: false, segment: "pages", slug: "/about" },
    }) as any;
    expect(openGraph).toBeUndefined();
  });
});
