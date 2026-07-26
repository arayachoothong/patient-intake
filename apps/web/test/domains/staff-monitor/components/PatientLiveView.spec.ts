import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { checkInCode, Gender, IntakeStep, SessionStatus, type Session } from "@patient/validation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SessionSubscriptionState } from "@/domains/staff-monitor/interfaces/staff-subscription.interface";
import { PatientLiveView } from "@/domains/staff-monitor/components/PatientLiveView";

const subscription = vi.hoisted(() => ({
  current: {} as SessionSubscriptionState,
}));

vi.mock("@/domains/staff-monitor/hooks/useSessionSubscription", () => ({
  useSessionSubscription: () => subscription.current,
}));

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "12345678-abcd-4def-8123-123456789abc",
    status: SessionStatus.Filling,
    createdAt: "2026-07-26T10:00:00.000Z",
    updatedAt: "2026-07-26T10:05:00.000Z",
    progress: 75,
    currentStep: IntakeStep.Preferences,
    activeField: "firstName",
    isTyping: true,
    data: {
      firstName: "Ada",
      middleName: "Byron",
      lastName: "Lovelace",
      dateOfBirth: "1815-12-10",
      gender: Gender.Female,
      phoneNumber: "+66812345678",
      email: "ada@example.com",
      address: "12 St James Square",
      preferredLanguage: "English",
      nationality: "British",
      emergencyContacts: [{ name: "Anne Milbanke", relation: "Mother", phone: "+66876543210" }],
    },
    ...overrides,
  };
}

describe("PatientLiveView", () => {
  beforeEach(() => {
    vi.stubGlobal("React", React);
    subscription.current = {
      session: session(),
      connectionState: "connected",
      isLoading: false,
      error: null,
    };
  });

  it("keeps live presence and shows the check-in code while filling", () => {
    const currentSession = subscription.current.session!;
    const markup = renderToStaticMarkup(
      React.createElement(PatientLiveView, { sessionId: currentSession.id }),
    );

    expect(markup).toContain("Patient is typing");
    expect(markup).toContain(checkInCode(currentSession.id));
    expect(markup).not.toContain("Check-in receipt");
  });

  it("replaces live presence chrome with a submitted receipt", () => {
    const submittedSession = session({
      status: SessionStatus.Submitted,
      updatedAt: "2026-07-26T11:30:00.000Z",
    });
    subscription.current.session = submittedSession;

    const markup = renderToStaticMarkup(
      React.createElement(PatientLiveView, { sessionId: submittedSession.id }),
    );

    expect(markup).toContain("Check-in receipt");
    expect(markup).toContain(checkInCode(submittedSession.id));
    expect(markup).toContain("Submitted");
    expect(markup).toContain("Ada");
    expect(markup).toContain("Byron");
    expect(markup).toContain("Lovelace");
    expect(markup).toContain("Anne Milbanke");
    expect(markup).toContain("Mother");
    expect(markup).toContain("+66876543210");
    expect(markup).not.toContain("Patient is typing");
    expect(markup).not.toContain("Form progress");
    expect(markup).not.toContain("data-typing");
  });
});
