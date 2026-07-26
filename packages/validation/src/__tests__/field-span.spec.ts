import { describe, expect, it } from "vitest";
import { FieldInputType } from "../constants/field-input-type.constant";
import { fieldSpanClass } from "../helpers/field-span.helper";

describe("fieldSpanClass", () => {
  it("spans textarea and address full width", () => {
    expect(fieldSpanClass(FieldInputType.Textarea)).toBe("sm:col-span-2");
    expect(fieldSpanClass(FieldInputType.Text, "address")).toBe("sm:col-span-2");
    expect(fieldSpanClass(FieldInputType.Text, "firstName")).toBe("");
  });
});
