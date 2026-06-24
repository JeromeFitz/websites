import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("swr/infinite", () => ({
  default: vi.fn<typeof useSWRInfinite>(),
}));

import useSWRInfinite from "swr/infinite";

import { useSWRInfinitePages } from "./use-swr-infinite-pages";

const mockSWR = vi.mocked(useSWRInfinite);
const noop = vi.fn<() => void>();

function seedSWR(overrides: Record<string, unknown> = {}) {
  mockSWR.mockReturnValue({
    data: undefined,
    error: undefined,
    isLoading: false,
    isValidating: false,
    mutate: noop,
    setSize: noop,
    size: 1,
    ...overrides,
  } as any);
}

beforeEach(() => {
  vi.clearAllMocks();
});

function hook(dataPath = "items", limit = 20) {
  return renderHook(() => useSWRInfinitePages(vi.fn(), vi.fn(), { dataPath, limit }));
}

describe("useSWRInfinitePages — flat", () => {
  it("flattens pages by dataPath into a single array", () => {
    seedSWR({ data: [{ items: [{ id: 1 }, { id: 2 }] }, { items: [{ id: 3 }] }], size: 2 });
    const { result } = hook();
    expect(result.current.data).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it("supports a nested dataPath array", () => {
    seedSWR({ data: [{ nested: { items: [{ id: 1 }] } }], size: 1 });
    const { result } = renderHook(() =>
      useSWRInfinitePages(vi.fn(), vi.fn(), { dataPath: ["nested", "items"], limit: 20 }),
    );
    expect(result.current.data).toEqual([{ id: 1 }]);
  });

  it("returns undefined when no data has loaded", () => {
    seedSWR({ data: undefined });
    const { result } = hook();
    expect(result.current.data).toBeUndefined();
  });
});

describe("useSWRInfinitePages — canFetchMore", () => {
  it("is true when the last page has exactly limit items", () => {
    seedSWR({ data: [{ items: [{ id: 1 }, { id: 2 }] }], size: 1 });
    const { result } = hook("items", 2);
    expect(result.current.canFetchMore).toBeTruthy();
  });

  it("is false when the last page has fewer than limit items", () => {
    seedSWR({ data: [{ items: [{ id: 1 }] }], size: 1 });
    const { result } = hook("items", 20);
    expect(result.current.canFetchMore).toBeFalsy();
  });
});

describe("useSWRInfinitePages — isEmpty", () => {
  it("is true when the first page data array is empty", () => {
    seedSWR({ data: [{ items: [] }], size: 1 });
    const { result } = hook();
    expect(result.current.isEmpty).toBe(true);
  });

  it("is false when the first page has items", () => {
    seedSWR({ data: [{ items: [{ id: 1 }] }], size: 1 });
    const { result } = hook();
    expect(result.current.isEmpty).toBe(false);
  });
});

describe("useSWRInfinitePages — isLoadingInitialData", () => {
  it("is true before the first page loads (no data, no error)", () => {
    seedSWR({ data: undefined, error: undefined });
    const { result } = hook();
    expect(result.current.isLoadingInitialData).toBe(true);
  });

  it("is false once data arrives", () => {
    seedSWR({ data: [{ items: [] }], size: 1 });
    const { result } = hook();
    expect(result.current.isLoadingInitialData).toBe(false);
  });
});

describe("useSWRInfinitePages — fetchMore", () => {
  it("calls setSize to increment the page count", () => {
    const setSize = vi.fn<() => void>();
    seedSWR({ data: [{ items: [{ id: 1 }] }], setSize, size: 1 });
    const { result } = hook();
    result.current.fetchMore();
    expect(setSize).toHaveBeenCalledOnce();
    const updater = setSize.mock.calls[0][0] as (n: number) => number;
    expect(updater(1)).toBe(2);
  });
});
