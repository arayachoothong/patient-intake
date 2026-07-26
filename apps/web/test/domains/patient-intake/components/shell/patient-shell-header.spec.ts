import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CheckInCodeBadge } from "@/domains/patient-intake/components/shell/CheckInCodeBadge";
import { PatientShellHeader, readStoredPatientSessionId } from "@/domains/patient-intake/components/shell/PatientShellHeader";

describe("CheckInCodeBadge", () => {
  it("formats the session id as a check-in code", () => {
    const markup = renderToStaticMarkup(
      createElement(CheckInCodeBadge, {
        sessionId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      }),
    );

    expect(markup).toContain("Check-in");
    expect(markup).toContain("A1B2-C3D4");
  });
});

describe("PatientShellHeader", () => {
  it("renders the patient-facing clinic identity", () => {
    const markup = renderToStaticMarkup(createElement(PatientShellHeader));

    expect(markup).toContain("Meridian Clinic");
    expect(markup).toContain("Patient check-in");
    expect(markup).toContain("Complete your intake at your own pace.");
  });

  it("reads session id changes including removal and recreation", () => {
    let storedSessionId: string | null = "first-session";
    const storage = {
      getItem: () => storedSessionId,
    };

    expect(readStoredPatientSessionId(storage)).toBe("first-session");

    storedSessionId = null;
    expect(readStoredPatientSessionId(storage)).toBeNull();

    storedSessionId = "second-session";
    expect(readStoredPatientSessionId(storage)).toBe("second-session");
  });
});
