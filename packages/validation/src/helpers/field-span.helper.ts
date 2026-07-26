import { FieldInputType } from "../constants/field-input-type.constant";

export function fieldSpanClass(input: FieldInputType, name?: string): string {
  if (input === FieldInputType.Textarea || name === "address") {
    return "sm:col-span-2";
  }
  return "";
}
