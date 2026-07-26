import { describe, expect, it } from "vitest";
import { FieldInputType } from "../src/constants/field-input-type.constant";
import { FieldName } from "../src/constants/field-name.constant";
import { fieldSpanClass } from "../src/helpers/field-span.helper";

describe("fieldSpanClass", () => {
  it("spans textarea and address full width", () => {
    expect(fieldSpanClass(FieldInputType.Textarea)).toBe("sm:col-span-2");
    expect(fieldSpanClass(FieldInputType.Text, FieldName.Address)).toBe("sm:col-span-2");
    expect(fieldSpanClass(FieldInputType.Text, FieldName.FirstName)).toBe("");
  });
});
