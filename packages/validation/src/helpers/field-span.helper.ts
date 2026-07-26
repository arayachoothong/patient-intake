import { FieldInputType } from "../constants/field-input-type.constant";
import { FieldName } from "../constants/field-name.constant";

export function fieldSpanClass(input: FieldInputType, name?: FieldName): string {
  if (input === FieldInputType.Textarea || name === FieldName.Address) {
    return "sm:col-span-2";
  }
  return "";
}
