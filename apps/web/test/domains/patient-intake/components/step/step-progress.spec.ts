import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { IntakeStep } from "@patient/validation";
import { describe, expect, it } from "vitest";
import { StepProgress } from "@/domains/patient-intake/components/step/StepProgress";

describe("StepProgress", () => {
  it("uses semantic primary tokens without amber utilities", () => {
    const markup = renderToStaticMarkup(
      createElement(StepProgress, {
        step: IntakeStep.Contact,
        index: 1,
        total: 5,
      }),
    );

    expect(markup).toContain("bg-primary");
    expect(markup).toContain("text-foreground");
    expect(markup).not.toMatch(/amber-/);
  });
});
