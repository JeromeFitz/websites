import { describe, expect, it } from "vitest";

import { isAwsImage, isImageExpired } from "./get-aws-image.js";

const AWS_URL = "https://s3.amazonaws.com/bucket/image.png";
const NON_AWS_URL = "https://cdn.example.com/image.png";

/**
 * @note(test) far-future/far-past dates prevent clock drift
 *             from flipping the expiry result
 */
const FUTURE_EXPIRY = "2099-12-31T23:59:59.000Z";
const PAST_EXPIRY = "2020-01-01T00:00:00.000Z";

describe("isAwsImage", () => {
  it("returns true for amazonaws.com URLs", () => {
    expect(isAwsImage(AWS_URL)).toBe(true);
  });

  it("returns false for non-AWS URLs", () => {
    expect(isAwsImage(NON_AWS_URL)).toBe(false);
  });

  it("returns false for null/undefined via optional chaining", () => {
    expect(isAwsImage(null as unknown as string)).toBe(false);
    expect(isAwsImage(undefined as unknown as string)).toBe(false);
  });
});

describe("isImageExpired", () => {
  it("returns false immediately for non-AWS images", () => {
    expect(isImageExpired({ src: NON_AWS_URL, expiry_time: PAST_EXPIRY })).toBe(false);
  });

  it("returns true when expiry_time is null (force refresh)", () => {
    expect(isImageExpired({ src: AWS_URL, expiry_time: null })).toBe(true);
  });

  it("returns true when expiry_time is undefined (force refresh)", () => {
    expect(isImageExpired({ src: AWS_URL, expiry_time: undefined })).toBe(true);
  });

  it("returns true when expiry_time is in the past", () => {
    expect(isImageExpired({ src: AWS_URL, expiry_time: PAST_EXPIRY })).toBe(true);
  });

  it("returns false when expiry_time is far in the future", () => {
    expect(isImageExpired({ src: AWS_URL, expiry_time: FUTURE_EXPIRY })).toBe(false);
  });
});
