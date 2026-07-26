import { describe, expect, it } from "vitest";
import { patientIntakePartialSchema, patientIntakeSchema } from "../src/patient-intake";

const validBase = {
  firstName: "Ada",
  lastName: "Lovelace",
  dateOfBirth: "1990-05-10",
  gender: "female",
  phoneNumber: "0812345678",
  email: "ada@example.com",
  address: "1 Analytical Engine Rd",
  preferredLanguage: "en",
  nationality: "Thai",
};

const oneContact = {
  emergencyContacts: [{ name: "Bob", relation: "Spouse", phone: "+66991234567" }],
};

describe("patientIntakeSchema", () => {
  it("accepts a valid full payload", () => {
    const result = patientIntakeSchema.safeParse({ ...validBase, ...oneContact });
    expect(result.success).toBe(true);
  });

  it("rejects missing required firstName", () => {
    const rest = { ...validBase, ...oneContact };
    delete (rest as { firstName?: string }).firstName;
    const result = patientIntakeSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("allows optional middleName and religion", () => {
    const result = patientIntakeSchema.safeParse({
      ...validBase,
      ...oneContact,
      middleName: "Augusta",
      religion: "None",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = patientIntakeSchema.safeParse({
      ...validBase,
      ...oneContact,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects phone that is too short", () => {
    const result = patientIntakeSchema.safeParse({
      ...validBase,
      ...oneContact,
      phoneNumber: "12",
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-Thai phone number", () => {
    expect(
      patientIntakeSchema.safeParse({ ...validBase, ...oneContact, phoneNumber: "+14155550123" })
        .success,
    ).toBe(false);
  });

  it("requires emergencyContacts with 1–3 complete items", () => {
    expect(patientIntakeSchema.safeParse(validBase).success).toBe(false);
    expect(patientIntakeSchema.safeParse({ ...validBase, ...oneContact }).success).toBe(true);
  });

  it("rejects empty emergencyContacts array", () => {
    expect(patientIntakeSchema.safeParse({ ...validBase, emergencyContacts: [] }).success).toBe(
      false,
    );
  });

  it("rejects more than 3 emergency contacts", () => {
    const contacts = Array.from({ length: 4 }, (_, i) => ({
      name: `N${i}`,
      relation: "Friend",
      phone: "+66812345678",
    }));
    expect(
      patientIntakeSchema.safeParse({ ...validBase, emergencyContacts: contacts }).success,
    ).toBe(false);
  });

  it("rejects contact missing phone", () => {
    expect(
      patientIntakeSchema.safeParse({
        ...validBase,
        emergencyContacts: [{ name: "Bob", relation: "Spouse", phone: "" }],
      }).success,
    ).toBe(false);
  });
});

describe("patientIntakePartialSchema", () => {
  it("allows incomplete emergency contacts for live patch", () => {
    const result = patientIntakePartialSchema.safeParse({
      emergencyContacts: [{ name: "Bob", relation: "", phone: "" }],
    });
    expect(result.success).toBe(true);
  });
});
