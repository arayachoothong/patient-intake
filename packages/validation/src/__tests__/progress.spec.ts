import { describe, expect, it } from "vitest";
import { computeProgress } from "../progress";

const filledBase = {
  firstName: "A",
  lastName: "B",
  dateOfBirth: "1990-01-01",
  gender: "female" as const,
  phoneNumber: "0812345678",
  email: "a@b.com",
  address: "x",
  preferredLanguage: "en",
  nationality: "Thai",
};

describe("computeProgress", () => {
  it("returns 0 for empty data", () => {
    expect(computeProgress({})).toBe(0);
  });

  it("uses base+3 slots when emergencyContacts missing (stable new-session denominator)", () => {
    // 9 required + 3 empty contact slots = 12; one filled → 8%
    expect(computeProgress({ firstName: "A" })).toBe(8);
  });

  it("returns 100 when all base fields and one full contact are filled", () => {
    expect(
      computeProgress({
        ...filledBase,
        emergencyContacts: [{ name: "Bob", relation: "Spouse", phone: "0812345678" }],
      }),
    ).toBe(100);
  });

  it("grows denominator when a second contact is added", () => {
    // one empty contact: 9/12 = 75%
    expect(
      computeProgress({
        ...filledBase,
        emergencyContacts: [{ name: "", relation: "", phone: "" }],
      }),
    ).toBe(75);

    // two empty contacts: 9/15 = 60%
    expect(
      computeProgress({
        ...filledBase,
        emergencyContacts: [
          { name: "", relation: "", phone: "" },
          { name: "", relation: "", phone: "" },
        ],
      }),
    ).toBe(60);
  });

  it("ignores optional fields for progress", () => {
    expect(
      computeProgress({
        firstName: "A",
        middleName: "M",
        religion: "X",
      }),
    ).toBe(8);
  });
});
