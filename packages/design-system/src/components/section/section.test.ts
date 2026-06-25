import { describe, expect, it } from "vitest";

describe("section barrel exports", () => {
  it("exports all section components from the index", async () => {
    const section = await import("./index");
    expect(section.SectionContent).toBeDefined();
    expect(section.SectionHeader).toBeDefined();
    expect(section.SectionHeaderContent).toBeDefined();
    expect(section.SectionHeaderTitle).toBeDefined();
    expect(section.SectionHero).toBeDefined();
    expect(section.SectionWrapper).toBeDefined();
    expect(section.Tags).toBeDefined();
  });
});
