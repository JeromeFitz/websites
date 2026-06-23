import { describe, expect, it } from "vitest";

describe("icon sub-modules", () => {
  it("should export hero icons from icon.hero", async () => {
    const { MapIcon } = await import("./icon.hero");
    expect(MapIcon).toBeDefined();
  });

  it("should export radix icons from icon.radix", async () => {
    const { ExternalLinkIcon } = await import("./icon.radix");
    expect(ExternalLinkIcon).toBeDefined();
  });

  it("should export custom icons from icon.custom", async () => {
    const { SpotifyLogoIcon } = await import("./icon.custom");
    expect(SpotifyLogoIcon).toBeDefined();
  });

  it("should re-export all icons from barrel icon.tsx", async () => {
    const icons = await import("./icon");
    expect(icons.MapIcon).toBeDefined();
    expect(icons.ExternalLinkIcon).toBeDefined();
    expect(icons.SpotifyLogoIcon).toBeDefined();
  });
});
