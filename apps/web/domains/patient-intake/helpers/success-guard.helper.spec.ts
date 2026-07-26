import { describe, expect, it } from "vitest";
import { SessionStatus } from "@patient/validation";
import { shouldRedirectToIntake } from "./success-guard.helper";

describe("shouldRedirectToIntake", () => {
  it("redirects when no stored id", () => {
    expect(shouldRedirectToIntake(undefined, false)).toBe(true);
  });

  it("stays when submitted", () => {
    expect(shouldRedirectToIntake({ status: SessionStatus.Submitted } as never, true)).toBe(false);
  });

  it("redirects when still filling", () => {
    expect(shouldRedirectToIntake({ status: SessionStatus.Filling } as never, true)).toBe(true);
  });
});
