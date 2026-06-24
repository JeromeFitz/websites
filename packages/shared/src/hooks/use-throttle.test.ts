import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useThrottle } from "./use-throttle";

describe("useThrottle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("fires immediately on the first call (leading: true)", () => {
    const cb = vi.fn<() => void>();
    const { result } = renderHook(() => useThrottle(cb, 200));
    act(() => result.current());
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it("suppresses calls within the delay window (trailing: false)", () => {
    const cb = vi.fn<() => void>();
    const { result } = renderHook(() => useThrottle(cb, 200));
    act(() => {
      result.current();
      result.current();
      result.current();
    });
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it("does not fire a trailing call after the window expires", () => {
    const cb = vi.fn<() => void>();
    const { result } = renderHook(() => useThrottle(cb, 200));
    act(() => result.current());
    act(() => vi.advanceTimersByTime(200));
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it("fires again on the next leading edge after the window expires", () => {
    const cb = vi.fn<() => void>();
    const { result } = renderHook(() => useThrottle(cb, 200));
    act(() => result.current());
    act(() => vi.advanceTimersByTime(200));
    act(() => result.current());
    expect(cb).toHaveBeenCalledTimes(2);
  });

  it("always calls the latest callback without recreating the throttle", () => {
    const cb1 = vi.fn<() => void>();
    const cb2 = vi.fn<() => void>();
    let cb = cb1;
    const { result, rerender } = renderHook(() => useThrottle(cb, 200));

    act(() => result.current());
    expect(cb1).toHaveBeenCalledTimes(1);

    cb = cb2;
    rerender();
    act(() => vi.advanceTimersByTime(200));
    act(() => result.current());
    expect(cb2).toHaveBeenCalledTimes(1);
    expect(cb1).toHaveBeenCalledTimes(1);
  });
});
