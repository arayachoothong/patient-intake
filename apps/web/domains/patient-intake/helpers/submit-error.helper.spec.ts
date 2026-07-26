import { AxiosError, AxiosHeaders } from "axios";
import { describe, expect, it } from "vitest";
import {
  SESSION_NOT_FOUND_STATUS,
  SUBMIT_ERROR_MESSAGES,
  submitErrorMessage,
  submitErrorStatus,
} from "./submit-error.helper";

function axiosErrorWithStatus(status: number): AxiosError {
  const error = new AxiosError("request failed");
  error.response = {
    status,
    statusText: "",
    data: {},
    headers: new AxiosHeaders(),
    config: { headers: new AxiosHeaders() },
  };
  return error;
}

describe("submitErrorStatus", () => {
  it("reads the response status from an axios error", () => {
    expect(submitErrorStatus(axiosErrorWithStatus(SESSION_NOT_FOUND_STATUS))).toBe(404);
  });

  it("returns null for a non-axios error", () => {
    expect(submitErrorStatus(new Error("boom"))).toBeNull();
  });

  it("returns null when the request never got a response", () => {
    expect(submitErrorStatus(new AxiosError("network down"))).toBeNull();
  });
});

describe("submitErrorMessage", () => {
  it("asks the patient to fix fields only on a validation rejection", () => {
    expect(submitErrorMessage(axiosErrorWithStatus(400))).toBe(SUBMIT_ERROR_MESSAGES.invalid);
  });

  it("explains an expired session instead of blaming the fields", () => {
    expect(submitErrorMessage(axiosErrorWithStatus(404))).toBe(SUBMIT_ERROR_MESSAGES.notFound);
  });

  it("reports an already-submitted intake", () => {
    expect(submitErrorMessage(axiosErrorWithStatus(409))).toBe(SUBMIT_ERROR_MESSAGES.conflict);
  });

  it("reports a connection problem when there is no response", () => {
    expect(submitErrorMessage(new AxiosError("network down"))).toBe(SUBMIT_ERROR_MESSAGES.network);
  });

  it("falls back to a generic message for unexpected failures", () => {
    expect(submitErrorMessage(axiosErrorWithStatus(500))).toBe(SUBMIT_ERROR_MESSAGES.unknown);
    expect(submitErrorMessage(new Error("boom"))).toBe(SUBMIT_ERROR_MESSAGES.unknown);
  });
});
