import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PatientTableHeader } from "./PatientTableHeader";

describe("PatientTableHeader", () => {
  it("labels the staff queue columns", () => {
    const markup = renderToStaticMarkup(createElement(PatientTableHeader));

    expect(markup).toContain("Patient");
    expect(markup).toContain("Stage");
    expect(markup).toContain("Progress");
    expect(markup).toContain("Last activity");
  });
});
