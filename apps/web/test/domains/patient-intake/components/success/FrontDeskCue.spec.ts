import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SessionStatus } from "@patient/validation";
import { describe, expect, it } from "vitest";
import { FrontDeskCue } from "@/domains/patient-intake/components/success/FrontDeskCue";

describe("FrontDeskCue", () => {
  it("shows the front-desk visibility cue when submitted", () => {
    const markup = renderToStaticMarkup(
      createElement(FrontDeskCue, { status: SessionStatus.Submitted }),
    );

    expect(markup).toContain("Front desk can see your check-in.");
    expect(markup).toContain('role="status"');
  });

  it("renders nothing when the session is not submitted", () => {
    const markup = renderToStaticMarkup(
      createElement(FrontDeskCue, { status: SessionStatus.Filling }),
    );

    expect(markup).toBe("");
  });
});
