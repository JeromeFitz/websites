import { describe, expect, it } from "vitest";

import { uuidConverter } from "./uuid.js";

const VALID_UUID = "550e8400-e29b-41d4-a716-446655440000";
const COMPACT_UUID = "550e8400e29b41d4a716446655440000";

describe("uuidConverter", () => {
  it("returns a valid UUID unchanged", () => {
    expect(uuidConverter(VALID_UUID)).toBe(VALID_UUID);
  });

  it("inserts dashes into a 32-char compact UUID", () => {
    expect(uuidConverter(COMPACT_UUID)).toBe(VALID_UUID);
  });

  it("returns null for strings shorter than 32 chars", () => {
    expect(uuidConverter("abc")).toBeNull();
  });

  it("returns null for strings longer than 36 chars that are not valid UUIDs", () => {
    expect(uuidConverter("550e8400e29b41d4a716446655440000extra")).toBeNull();
  });

  it("returns null for an empty string", () => {
    expect(uuidConverter("")).toBeNull();
  });
});
