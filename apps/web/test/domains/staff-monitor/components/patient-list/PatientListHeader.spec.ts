import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PatientListHeader } from "@/domains/staff-monitor/components/patient-list/PatientListHeader";

describe("PatientListHeader", () => {
  it("labels the staff queue columns", () => {
    const markup = renderToStaticMarkup(createElement(PatientListHeader));

    expect(markup).toContain("Patient");
    expect(markup).toContain("Stage");
    expect(markup).toContain("Progress");
    expect(markup).toContain("Last activity");
  });
});
