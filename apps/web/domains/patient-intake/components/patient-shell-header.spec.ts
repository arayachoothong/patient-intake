import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CheckInCodeBadge } from "./CheckInCodeBadge";
import { PatientShellHeader } from "./PatientShellHeader";

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
});
