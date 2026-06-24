import { describe, expect, it } from "vitest";

import { TIME } from "./constants";

/**
 * @note(redis) values are in seconds, not milliseconds — used as Redis TTLs
 * @note(ms) "1y" resolves to 365.25-day year = 31,557,600s
 */
describe("TIME constants", () => {
  it("MINUTE is 60 seconds", () => {
    expect(TIME.MINUTE).toBe(60);
  });

  it("HOUR is 3600 seconds", () => {
    expect(TIME.HOUR).toBe(3600);
  });

  it("DAY is 86400 seconds", () => {
    expect(TIME.DAY).toBe(86_400);
  });

  it("MONTH is 30 days in seconds", () => {
    expect(TIME.MONTH).toBe(2_592_000);
  });

  it("YEAR is 365.25 days in seconds", () => {
    expect(TIME.YEAR).toBe(31_557_600);
  });

  it("maintains expected relationships between units", () => {
    expect(TIME.HOUR).toBe(60 * TIME.MINUTE);
    expect(TIME.DAY).toBe(24 * TIME.HOUR);
    expect(TIME.MONTH).toBe(30 * TIME.DAY);
  });
});
