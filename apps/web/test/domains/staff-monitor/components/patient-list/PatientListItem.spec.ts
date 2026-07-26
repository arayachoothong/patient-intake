import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { IntakeStep, SessionStatus, type Session } from "@patient/validation";
import { describe, expect, it, vi } from "vitest";
import { PatientListItem } from "@/domains/staff-monitor/components/patient-list/PatientListItem";
import { PatientListMobileItem } from "@/domains/staff-monitor/components/patient-list/PatientListMobileItem";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "session-1",
    status: SessionStatus.Filling,
    createdAt: "2026-07-26T10:00:00.000Z",
    updatedAt: "2026-07-26T10:05:00.000Z",
    progress: 25,
    currentStep: IntakeStep.Contact,
    activeField: null,
    isTyping: false,
    data: { firstName: "Ada", lastName: "Lovelace" },
    ...overrides,
  };
}

describe("PatientListItem", () => {
  it("renders the journey stage and typing pulse for a filling session", () => {
    const markup = renderToStaticMarkup(
      createElement(PatientListItem, {
        session: session({ isTyping: true }),
      }),
    );

    expect(markup).toContain("Filling");
    expect(markup).toContain("animate-pulse");
    expect(markup).toContain("md:table-row");
  });

  it("emphasizes ready sessions", () => {
    const markup = renderToStaticMarkup(
      createElement(PatientListItem, {
        session: session({
          status: SessionStatus.Submitted,
          progress: 100,
        }),
      }),
    );

    expect(markup).toContain("Ready");
    expect(markup).toContain("border-primary");
  });

  it("falls back to the status badge for an abandoned session", () => {
    const markup = renderToStaticMarkup(
      createElement(PatientListItem, {
        session: session({ status: SessionStatus.Abandoned }),
      }),
    );

    expect(markup).toContain("Abandoned");
  });
});

describe("PatientListMobileItem", () => {
  it("renders a mobile card with patient, stage, progress, and activity", () => {
    const markup = renderToStaticMarkup(
      createElement(PatientListMobileItem, {
        session: session(),
      }),
    );

    expect(markup).toContain("Ada Lovelace");
    expect(markup).toContain("Filling");
    expect(markup).toContain("25%");
    expect(markup).toContain("Last activity");
    expect(markup).toContain("md:hidden");
    expect(markup).toContain('tabindex="0"');
  });
});
