import { describe, expect, it } from "vitest";
import { Gender } from "../constants/gender.constant";
import { IntakeStep } from "../constants/intake-step.constant";
import {
  intakeStepSchema,
  resolveResumeStep,
} from "../helpers/intake-step.helper";

const validAll = {
  firstName: "Ada",
  middleName: "",
  lastName: "Lovelace",
  dateOfBirth: "1990-01-02",
  gender: Gender.Female,
  phoneNumber: "0812345678",
  email: "ada@example.com",
  address: "1 Analytical Eng",
  preferredLanguage: "English",
  nationality: "Thai",
  religion: "",
  emergencyContacts: [{ name: "Charles", relation: "Friend", phone: "0823456789" }],
};

describe("intakeStepSchema", () => {
  it("validates personal step fields only", () => {
    expect(
      intakeStepSchema(IntakeStep.Personal).safeParse({
        firstName: "Ada",
        middleName: "",
        lastName: "Lovelace",
        dateOfBirth: "1990-01-02",
        gender: Gender.Female,
      }).success,
    ).toBe(true);
  });

  it("rejects incomplete personal step", () => {
    expect(
      intakeStepSchema(IntakeStep.Personal).safeParse({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
      }).success,
    ).toBe(false);
  });
});

describe("resolveResumeStep", () => {
  it("returns first failing step", () => {
    expect(resolveResumeStep({ ...validAll, phoneNumber: "" })).toBe(
      IntakeStep.Contact,
    );
  });

  it("returns review when all steps valid", () => {
    expect(resolveResumeStep(validAll)).toBe(IntakeStep.Review);
  });
});
