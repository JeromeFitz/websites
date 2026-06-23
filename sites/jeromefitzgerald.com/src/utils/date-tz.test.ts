// oxlint-disable playwright/no-standalone-expect
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { describe, expect, it } from "vitest";

// 2025-01-15T20:30:00.000Z
//   UTC  → 2025-01-15 20:30 (Wednesday)
//   EST  → 2025-01-15 15:30 (UTC-5, no DST)
const JAN_UTC = new Date("2025-01-15T20:30:00.000Z");

// 2025-06-20T02:30:00.000Z
//   UTC  → 2025-06-20 02:30 (Friday)
//   EDT  → 2025-06-19 22:30 (UTC-4, DST active) — date rolls back to Thursday
const JUN_UTC = new Date("2025-06-20T02:30:00.000Z");

describe("@date-fns/tz — TZDate construction", () => {
  it("preserves UTC time when constructed with UTC zone", () => {
    const d = new TZDate(JAN_UTC, "UTC");
    expect(format(d, "yyyy-MM-dd HH:mm")).toBe("2025-01-15 20:30");
  });

  it("shifts to America/New_York (EST) in inter", () => {
    const d = new TZDate(JAN_UTC, "America/New_York");
    expect(format(d, "yyyy-MM-dd HH:mm")).toBe("2025-01-15 15:30");
  });

  it("shifts to America/New_York (EDT) in summer", () => {
    const d = new TZDate(JUN_UTC, "America/New_York");
    expect(format(d, "yyyy-MM-dd HH:mm")).toBe("2025-06-19 22:30");
  });
});

describe("@date-fns/tz — withTimeZone conversion", () => {
  it("converts UTC TZDate to ET via withTimeZone (winter)", () => {
    const utc = new TZDate(JAN_UTC, "UTC");
    const et = utc.withTimeZone("America/New_York");
    expect(format(et, "yyyy-MM-dd HH:mm")).toBe("2025-01-15 15:30");
  });

  it("converts UTC TZDate to ET via withTimeZone (summer, cross-midnight)", () => {
    const utc = new TZDate(JUN_UTC, "UTC");
    const et = utc.withTimeZone("America/New_York");
    expect(format(et, "yyyy-MM-dd HH:mm")).toBe("2025-06-19 22:30");
  });
});

// Format strings used in the codebase — validated here so regressions are caught
// at the call site if @date-fns/tz or date-fns bumps a breaking change.
// The format string in book.tsx / blog.tsx uses HH (24-hour) + a (AM/PM suffix).
// The combined output is intentionally 24-hour with a redundant suffix — tested
// here exactly as-is so a future date-fns upgrade can't silently change behaviour.
describe("format patterns — book.tsx / blog.tsx (yyyy-MM-dd HH:mma z)", () => {
  it("formats timestampUTC in UTC zone (24-hour HH + AM/PM suffix)", () => {
    const utc = new TZDate(JAN_UTC, "UTC");
    const result = format(utc, "yyyy-MM-dd HH:mma");
    expect(result).toBe("2025-01-15 20:30PM");
  });

  it("formats timestampET via withTimeZone (winter EST, 24-hour HH + AM/PM suffix)", () => {
    const utc = new TZDate(JAN_UTC, "UTC");
    const et = utc.withTimeZone("America/New_York");
    const result = format(et, "yyyy-MM-dd HH:mma");
    expect(result).toBe("2025-01-15 15:30PM");
  });
});

describe("format patterns — event.data.list.tsx (hh:mma zzz)", () => {
  it("formats 12-hour clock time in ET (winter)", () => {
    const utc = new TZDate(JAN_UTC, "UTC");
    const et = utc.withTimeZone("America/New_York");
    expect(format(et, "hh:mm")).toBe("03:30");
  });

  it("formats 12-hour clock time in ET (summer, post-midnight rollback)", () => {
    const utc = new TZDate(JUN_UTC, "UTC");
    const et = utc.withTimeZone("America/New_York");
    expect(format(et, "hh:mm")).toBe("10:30");
  });
});

describe("format patterns — store-init-events-upcoming (EEE, MM/dd)", () => {
  it("formats EEE correctly in ET (winter)", () => {
    const utc = new TZDate(JAN_UTC, "UTC");
    const et = utc.withTimeZone("America/New_York");
    expect(format(et, "EEE")).toBe("Wed");
  });

  it("formats MM/dd correctly in ET (winter)", () => {
    const utc = new TZDate(JAN_UTC, "UTC");
    const et = utc.withTimeZone("America/New_York");
    expect(format(et, "MM/dd")).toBe("01/15");
  });

  it("formats EEE correctly after cross-midnight rollback (summer)", () => {
    const utc = new TZDate(JUN_UTC, "UTC");
    const et = utc.withTimeZone("America/New_York");
    // UTC is Friday Jun 20 — ET is still Thursday Jun 19
    expect(format(et, "EEE")).toBe("Thu");
  });

  it("formats MM/dd correctly after cross-midnight rollback (summer)", () => {
    const utc = new TZDate(JUN_UTC, "UTC");
    const et = utc.withTimeZone("America/New_York");
    expect(format(et, "MM/dd")).toBe("06/19");
  });
});
