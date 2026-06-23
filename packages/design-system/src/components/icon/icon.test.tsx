import { describe, expect, it } from "vitest";

describe("icon sub-modules", () => {
  it("should export hero icons from icon.hero", async () => {
    const { MapIcon } = await import("./icon.hero");
    // oxlint-disable-next-line playwright/no-standalone-expect
    expect(MapIcon).toBeDefined();
  });

  it("should export radix icons from icon.radix", async () => {
    const { ExternalLinkIcon } = await import("./icon.radix");
    // oxlint-disable-next-line playwright/no-standalone-expect
    expect(ExternalLinkIcon).toBeDefined();
  });

  it("should export custom icons from icon.custom", async () => {
    const { SpotifyLogoIcon } = await import("./icon.custom");
    // oxlint-disable-next-line playwright/no-standalone-expect
    expect(SpotifyLogoIcon).toBeDefined();
  });

  it("should re-export all icons from barrel icon.tsx", async () => {
    const icons = await import("./icon");
    // oxlint-disable-next-line playwright/no-standalone-expect
    expect(icons.MapIcon).toBeDefined();
    // oxlint-disable-next-line playwright/no-standalone-expect
    expect(icons.ExternalLinkIcon).toBeDefined();
    // oxlint-disable-next-line playwright/no-standalone-expect
    expect(icons.SpotifyLogoIcon).toBeDefined();
  });
});
