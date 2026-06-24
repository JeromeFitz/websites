import { describe, expect, it, vi } from "vitest";

/**
 * @note(vitest) server-only throws outside Next.js;
 *  env.client calls process.exit(1) without required env vars
 */
vi.mock("server-only", () => ({}));
vi.mock("@jeromefitz/next-config/env.client", () => ({
  envClient: { IS_DEV: false },
}));

const { getPropertyTypeData } = await import("./get-property-type-data.js");

function prop(type: string, value: unknown) {
  return { [type]: value, type };
}

describe("getPropertyTypeData — guards", () => {
  it("returns null when properties is null/falsy", () => {
    expect(getPropertyTypeData(null as any, "Title")).toBeNull();
  });

  it("returns null when the property key is missing", () => {
    expect(getPropertyTypeData({}, "Title")).toBeNull();
  });

  it("returns null when the property has no type field", () => {
    expect(getPropertyTypeData({ Title: {} as any }, "Title")).toBeNull();
  });
});

describe("getPropertyTypeData — checkbox", () => {
  it("returns true for a checked checkbox", () => {
    expect(getPropertyTypeData({ "Is.Published": prop("checkbox", true) }, "Is.Published")).toBe(
      true,
    );
  });

  it("returns false for an unchecked checkbox", () => {
    expect(getPropertyTypeData({ "Is.Published": prop("checkbox", false) }, "Is.Published")).toBe(
      false,
    );
  });
});

describe("getPropertyTypeData — number", () => {
  it("returns the numeric value", () => {
    expect(getPropertyTypeData({ Count: prop("number", 42) }, "Count")).toBe(42);
  });

  it("returns null for a null number", () => {
    expect(getPropertyTypeData({ Count: prop("number", null) }, "Count")).toBeNull();
  });
});

describe("getPropertyTypeData — url", () => {
  it("returns the URL string", () => {
    expect(
      getPropertyTypeData({ "URL.Ticket": prop("url", "https://example.com") }, "URL.Ticket"),
    ).toBe("https://example.com");
  });

  it("returns null for a null URL", () => {
    expect(getPropertyTypeData({ "URL.Ticket": prop("url", null) }, "URL.Ticket")).toBeNull();
  });
});

describe("getPropertyTypeData — date", () => {
  it("returns the DateResponse object", () => {
    const date = { end: null, start: "2025-01-15", time_zone: null };
    expect(getPropertyTypeData({ "Date.Show": prop("date", date) }, "Date.Show")).toEqual(date);
  });
});

describe("getPropertyTypeData — title", () => {
  it("returns the plain_text of the first title rich-text item", () => {
    expect(
      getPropertyTypeData({ Title: prop("title", [{ plain_text: "My Page" }]) }, "Title"),
    ).toBe("My Page");
  });

  it("returns empty string for an empty title array", () => {
    expect(getPropertyTypeData({ Title: prop("title", []) }, "Title")).toBe("");
  });
});

describe("getPropertyTypeData — rich_text", () => {
  it("returns the plain_text of the first rich-text item", () => {
    expect(
      getPropertyTypeData(
        { "SEO.Description": prop("rich_text", [{ plain_text: "A description." }]) },
        "SEO.Description",
      ),
    ).toBe("A description.");
  });

  it("returns empty string for an empty rich_text array", () => {
    expect(
      getPropertyTypeData({ "SEO.Description": prop("rich_text", []) }, "SEO.Description"),
    ).toBe("");
  });
});

describe("getPropertyTypeData — select", () => {
  it("returns the select option object", () => {
    const option = { color: "blue", id: "sel-1", name: "Blog" };
    expect(getPropertyTypeData({ Category: prop("select", option) }, "Category")).toEqual(option);
  });

  it("returns null for a null select", () => {
    expect(getPropertyTypeData({ Category: prop("select", null) }, "Category")).toBeNull();
  });
});

describe("getPropertyTypeData — multi_select", () => {
  it("returns the array of option objects", () => {
    const options = [
      { color: "blue", id: "1", name: "React" },
      { color: "green", id: "2", name: "Next.js" },
    ];
    expect(getPropertyTypeData({ Tags: prop("multi_select", options) }, "Tags")).toEqual(options);
  });
});

describe("getPropertyTypeData — relation", () => {
  it("returns the array of related page IDs", () => {
    const relations = [{ id: "page-abc" }, { id: "page-xyz" }];
    expect(
      getPropertyTypeData({ "Relation.Shows": prop("relation", relations) }, "Relation.Shows"),
    ).toEqual(relations);
  });
});

describe("getPropertyTypeData — files", () => {
  it("returns the files array", () => {
    const files = [
      {
        name: "image.png",
        type: "external",
        external: { url: "https://cdn.example.com/image.png" },
      },
    ];
    expect(getPropertyTypeData({ "SEO.Image": prop("files", files) }, "SEO.Image")).toEqual(files);
  });
});

describe("getPropertyTypeData — formula", () => {
  it("extracts the number from a number formula", () => {
    expect(
      getPropertyTypeData(
        { "Slug.Preview": prop("formula", { number: 7, type: "number" }) },
        "Slug.Preview",
      ),
    ).toBe(7);
  });

  it("extracts the string from a string formula", () => {
    expect(
      getPropertyTypeData(
        { "Slug.Preview": prop("formula", { string: "my-slug", type: "string" }) },
        "Slug.Preview",
      ),
    ).toBe("my-slug");
  });
});

describe("getPropertyTypeData — rollup", () => {
  it("extracts and sorts plain_text from a rollup array of title items", () => {
    const rollup = {
      array: [
        { title: [{ plain_text: "Zara" }], type: "title" },
        { title: [{ plain_text: "Aaron" }], type: "title" },
      ],
      function: "show_original",
      type: "array",
    };
    const result = getPropertyTypeData({ "Rollup.Cast": prop("rollup", rollup) }, "Rollup.Cast");
    expect(result).toEqual(["Aaron", "Zara"]);
  });

  it("returns an empty array for a rollup with an empty array", () => {
    const rollup = { array: [], function: "show_original", type: "array" };
    const result = getPropertyTypeData({ "Rollup.Cast": prop("rollup", rollup) }, "Rollup.Cast");
    expect(result).toEqual([]);
  });

  it("extracts plain_text from a rollup array of rich_text items", () => {
    const rollup = {
      array: [{ rich_text: [{ plain_text: "Director note" }], type: "rich_text" }],
      function: "show_original",
      type: "array",
    };
    const result = getPropertyTypeData({ "Rollup.Notes": prop("rollup", rollup) }, "Rollup.Notes");
    expect(result).toEqual(["Director note"]);
  });
});
