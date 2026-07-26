import { afterEach, describe, expect, it, vi } from "vitest";
import { startSessionIdPoller } from "./session-id-poller.helper";

describe("startSessionIdPoller", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("emits the initial session id immediately", () => {
    vi.useFakeTimers();
    const onChange = vi.fn();

    startSessionIdPoller({
      readId: () => "first-session",
      onChange,
    });

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith("first-session");
  });

  it("emits null when storage is cleared", () => {
    vi.useFakeTimers();
    let sessionId: string | null = "first-session";
    const onChange = vi.fn();

    startSessionIdPoller({
      readId: () => sessionId,
      onChange,
      intervalMs: 100,
    });
    vi.advanceTimersByTime(100);
    expect(onChange).toHaveBeenCalledOnce();

    sessionId = null;
    vi.advanceTimersByTime(100);

    expect(onChange).toHaveBeenLastCalledWith(null);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("emits a new id after the session is recreated", () => {
    vi.useFakeTimers();
    let sessionId: string | null = null;
    const onChange = vi.fn();

    startSessionIdPoller({
      readId: () => sessionId,
      onChange,
      intervalMs: 100,
    });
    sessionId = "second-session";
    vi.advanceTimersByTime(100);

    expect(onChange).toHaveBeenLastCalledWith("second-session");
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("stops polling and prevents further emissions", () => {
    vi.useFakeTimers();
    let sessionId: string | null = "first-session";
    const onChange = vi.fn();
    const stop = startSessionIdPoller({
      readId: () => sessionId,
      onChange,
      intervalMs: 100,
    });

    stop();
    sessionId = "second-session";
    vi.advanceTimersByTime(100);

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith("first-session");
  });
});
