import { FieldInputType } from "@patient/validation";

export type TextInputType = "text" | "date" | "email" | "tel";

const TEXT_INPUT_TYPES: Partial<Record<FieldInputType, TextInputType>> = {
  [FieldInputType.Date]: "date",
  [FieldInputType.Email]: "email",
  [FieldInputType.Tel]: "tel",
};

export function textInputType(input: FieldInputType): TextInputType {
  return TEXT_INPUT_TYPES[input] ?? "text";
}
