import { describe, expect, it } from "vitest";
import { SessionStatus } from "../constants/session-status.constant";
import {
  journeyStage,
  journeyStageLabel,
  journeyStageVariant,
} from "../helpers/journey-stage.helper";

describe("journeyStage", () => {
  it("maps submitted to ready", () => {
    expect(journeyStage({ status: SessionStatus.Submitted, progress: 100 })).toBe("ready");
  });

  it("maps filling with zero progress to new", () => {
    expect(journeyStage({ status: SessionStatus.Filling, progress: 0 })).toBe("new");
  });

  it("maps filling with progress to filling", () => {
    expect(journeyStage({ status: SessionStatus.Filling, progress: 17 })).toBe("filling");
  });
});

describe("journeyStage labels", () => {
  it("labels and variants", () => {
    expect(journeyStageLabel("new")).toBe("New");
    expect(journeyStageLabel("filling")).toBe("Filling");
    expect(journeyStageLabel("ready")).toBe("Ready");
    expect(journeyStageVariant("ready")).toBe("default");
    expect(journeyStageVariant("filling")).toBe("secondary");
    expect(journeyStageVariant("new")).toBe("outline");
  });
});
