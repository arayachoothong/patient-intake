"use client";

import type { Path } from "react-hook-form";
import { FormTextField } from "@patient/ui";
import {
  type EmergencyContactFieldDefinition,
} from "@patient/validation";
import { textInputType } from "../../helpers/field-input.helper";
import type { PatientFormValues } from "../../interfaces/patient-form.interface";

type EmergencyContactFieldItemProps = {
  index: number;
  def: EmergencyContactFieldDefinition;
  disabled?: boolean;
  onFocusField: (name: string) => void;
  onBlurField: () => void;
};

export function EmergencyContactFieldItem({
  index,
  def,
  disabled,
  onFocusField,
  onBlurField,
}: EmergencyContactFieldItemProps) {
  const path = `emergencyContacts.${index}.${def.name}` as Path<PatientFormValues>;

  return (
    <div className={def.fullWidth ? "sm:col-span-2" : undefined}>
      <FormTextField<PatientFormValues>
        name={path}
        label={def.label}
        required={def.required}
        disabled={disabled}
        type={textInputType(def.input)}
        onFocus={() => onFocusField(path)}
        onBlur={onBlurField}
      />
    </div>
  );
}
