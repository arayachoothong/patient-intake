import { describe, expect, it } from "vitest";
import { IntakeStep } from "../src/constants/intake-step.constant";
import { JourneyStage } from "../src/constants/journey-stage.constant";
import { SessionStatus } from "../src/constants/session-status.constant";
import {
  journeyStage,
  journeyStageLabel,
  journeyStageVariant,
} from "../src/helpers/journey-stage.helper";

describe("journeyStage", () => {
  it("maps submitted to ready", () => {
    expect(journeyStage({ status: SessionStatus.Submitted, progress: 100 })).toBe(
      JourneyStage.Ready,
    );
  });

  it("maps filling with zero progress to new", () => {
    expect(journeyStage({ status: SessionStatus.Filling, progress: 0 })).toBe(JourneyStage.New);
  });

  it("maps filling with progress to filling", () => {
    expect(journeyStage({ status: SessionStatus.Filling, progress: 17 })).toBe(
      JourneyStage.Filling,
    );
  });

  it("keeps filling at 100% progress when not on Review (e.g. emergency contacts)", () => {
    expect(
      journeyStage({
        status: SessionStatus.Filling,
        progress: 100,
        currentStep: IntakeStep.Emergency,
      }),
    ).toBe(JourneyStage.Filling);
    expect(
      journeyStage({
        status: SessionStatus.Filling,
        progress: 100,
        currentStep: IntakeStep.Contact,
      }),
    ).toBe(JourneyStage.Filling);
  });

  it("maps filling on Review step to waiting for review", () => {
    expect(
      journeyStage({
        status: SessionStatus.Filling,
        progress: 100,
        currentStep: IntakeStep.Review,
      }),
    ).toBe(JourneyStage.WaitingReview);
    expect(
      journeyStage({
        status: SessionStatus.Filling,
        progress: 75,
        currentStep: IntakeStep.Review,
      }),
    ).toBe(JourneyStage.WaitingReview);
  });

  it("returns null for abandoned with zero progress", () => {
    expect(journeyStage({ status: SessionStatus.Abandoned, progress: 0 })).toBeNull();
  });

  it("returns null for abandoned with progress", () => {
    expect(journeyStage({ status: SessionStatus.Abandoned, progress: 42 })).toBeNull();
  });
});

describe("journeyStage labels", () => {
  it("labels and variants", () => {
    expect(journeyStageLabel(JourneyStage.New)).toBe("New");
    expect(journeyStageLabel(JourneyStage.Filling)).toBe("Filling");
    expect(journeyStageLabel(JourneyStage.WaitingReview)).toBe("Waiting for review");
    expect(journeyStageLabel(JourneyStage.Ready)).toBe("Ready");
    expect(journeyStageVariant(JourneyStage.Ready)).toBe("ready");
    expect(journeyStageVariant(JourneyStage.Filling)).toBe("filling");
    expect(journeyStageVariant(JourneyStage.New)).toBe("new");
    expect(journeyStageVariant(JourneyStage.WaitingReview)).toBe("waitingReview");
  });
});
