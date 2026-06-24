import { describe, expect, it, vi } from "vitest";

/**
 * @note(env) env.client calls process.exit(1) when required env vars are absent
 */
vi.mock("next-config/env.client", () => ({
  envClient: { NEXT_PUBLIC__SITE: "jeromefitzgerald.com" },
}));

const { isExternalUrl } = await import("./is-external-url");

describe("isExternalUrl", () => {
  it("returns false for same-domain paths", () => {
    expect(isExternalUrl("https://jeromefitzgerald.com/about")).toBe(false);
  });

  it("returns false for relative paths containing the domain", () => {
    expect(isExternalUrl("/jeromefitzgerald.com/something")).toBe(false);
  });

  it("returns true for a different domain", () => {
    expect(isExternalUrl("https://example.com/page")).toBe(true);
  });

  it("returns true for bsky.app links (always treated as external)", () => {
    expect(isExternalUrl("https://bsky.app/profile/jeromefitzgerald.com")).toBe(true);
  });

  it("returns true for github.com links", () => {
    expect(isExternalUrl("https://github.com/jeromefitz")).toBe(true);
  });
});
