"use client";

import { FieldInputType, type FieldDefinition } from "@patient/validation";
import type { Path } from "react-hook-form";
import { selectOptionsFor } from "../helpers/select-options.helper";
import type { PatientFormValues } from "../interfaces/patient-form.interface";
import { SelectField } from "./SelectField";
import { TextInputField } from "./TextInputField";
import { TextareaField } from "./TextareaField";

type IntakeFieldProps = {
  def: FieldDefinition;
  disabled?: boolean;
  onFocus: () => void;
  onBlur: () => void;
};

export function IntakeField({ def, disabled, onFocus, onBlur }: IntakeFieldProps) {
  const name = def.name as Path<PatientFormValues>;

  if (def.input === FieldInputType.Select) {
    return (
      <SelectField
        name={name}
        label={def.label}
        required={def.required}
        disabled={disabled}
        options={selectOptionsFor(def)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  }

  if (def.input === FieldInputType.Textarea) {
    return (
      <TextareaField
        name={name}
        label={def.label}
        required={def.required}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  }

  const type =
    def.input === FieldInputType.Date
      ? "date"
      : def.input === FieldInputType.Email
        ? "email"
        : def.input === FieldInputType.Tel
          ? "tel"
          : "text";

  return (
    <TextInputField
      name={name}
      label={def.label}
      required={def.required}
      disabled={disabled}
      type={type}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
