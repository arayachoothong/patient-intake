import { describe, expect, it } from "vitest";
import { getFormDefaults, toPatchData } from "./form-defaults.helper";

describe("getFormDefaults", () => {
  it("defaults to one empty emergency contact", () => {
    expect(getFormDefaults().emergencyContacts).toEqual([{ name: "", relation: "", phone: "" }]);
  });
});

describe("toPatchData", () => {
  it("toPatchData always includes emergencyContacts", () => {
    const values = getFormDefaults();
    values.emergencyContacts = [{ name: "A", relation: "", phone: "" }];
    expect(toPatchData(values).emergencyContacts).toEqual([{ name: "A", relation: "", phone: "" }]);
  });

  it("includes partial emergency contact for live sync", () => {
    const values = getFormDefaults();
    values.firstName = "Ada";
    values.emergencyContacts = [{ name: "Bob", relation: "", phone: "" }];

    const data = toPatchData(values);

    expect(data.firstName).toBe("Ada");
    expect(data.emergencyContacts).toEqual([{ name: "Bob", relation: "", phone: "" }]);
  });

  it("includes emergency relation when name is still empty", () => {
    const values = getFormDefaults();
    values.emergencyContacts = [{ name: "", relation: "Spouse", phone: "" }];

    const data = toPatchData(values);

    expect(data.emergencyContacts).toEqual([{ name: "", relation: "Spouse", phone: "" }]);
  });

  it("includes phone and multiple contacts as entered", () => {
    const values = getFormDefaults();
    values.emergencyContacts = [
      { name: "Bob", relation: "Spouse", phone: "081" },
      { name: "Ann", relation: "", phone: "" },
    ];

    const data = toPatchData(values);

    expect(data.emergencyContacts).toEqual([
      { name: "Bob", relation: "Spouse", phone: "081" },
      { name: "Ann", relation: "", phone: "" },
    ]);
  });
});
