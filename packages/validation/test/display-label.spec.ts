import { describe, expect, it } from "vitest";
import { SessionStatus } from "../src/constants/session-status.constant";
import { formatGenderLabel } from "../src/helpers/display-label.helper";
import { sessionStatusLabel, sessionStatusVariant } from "../src/helpers/session-status-label.helper";

describe("formatGenderLabel", () => {
  it("formats gender snake_case", () => {
    expect(formatGenderLabel("prefer_not_to_say")).toBe("Prefer Not To Say");
  });
});

describe("session status helpers", () => {
  it("maps session status", () => {
    expect(sessionStatusLabel(SessionStatus.Filling)).toBe("Filling");
    expect(sessionStatusVariant(SessionStatus.Submitted)).toBe("default");
  });
});
