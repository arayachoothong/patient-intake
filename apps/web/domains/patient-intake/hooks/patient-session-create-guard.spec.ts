import { describe, expect, it, vi } from "vitest";
import type { Session } from "@patient/validation";
import {
  getPatientSessionCreateInFlight,
  resetPatientSessionCreateGuard,
  runPatientSessionCreateOnce,
} from "./patient-session-create-guard";

const fakeSession = { id: "sess-1" } as Session;

describe("runPatientSessionCreateOnce", () => {
  it("returns the same in-flight promise when create already started", async () => {
    resetPatientSessionCreateGuard();
    const mutate = vi.fn((_vars, { onSuccess }) => {
      queueMicrotask(() => onSuccess(fakeSession));
    });

    const first = runPatientSessionCreateOnce(mutate);
    const second = runPatientSessionCreateOnce(mutate);

    expect(second).toBe(first);
    expect(getPatientSessionCreateInFlight()).toBe(first);
    expect(mutate).toHaveBeenCalledTimes(1);

    await expect(first).resolves.toBe(fakeSession);
    expect(getPatientSessionCreateInFlight()).toBeNull();
  });

  it("allows a new create after the previous one fails", async () => {
    resetPatientSessionCreateGuard();
    const mutate = vi.fn((_vars, handlers) => {
      queueMicrotask(() => handlers.onError());
    });

    await expect(runPatientSessionCreateOnce(mutate)).rejects.toThrow();
    expect(getPatientSessionCreateInFlight()).toBeNull();

    mutate.mockImplementation((_vars, { onSuccess }) => {
      queueMicrotask(() => onSuccess(fakeSession));
    });

    await expect(runPatientSessionCreateOnce(mutate)).resolves.toBe(fakeSession);
    expect(mutate).toHaveBeenCalledTimes(2);
  });
});
