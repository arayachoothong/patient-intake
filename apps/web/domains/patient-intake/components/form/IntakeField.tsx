"use client";

import type { ReactElement } from "react";
import type { Path } from "react-hook-form";
import { FormSelectField, FormTextareaField, FormTextField } from "@patient/ui";
import { FieldInputType, type FieldDefinition } from "@patient/validation";
import { textInputType } from "../../helpers/field-input.helper";
import { selectOptionsFor } from "../../helpers/select-options.helper";
import type { PatientFormValues } from "../../interfaces/patient-form.interface";

type IntakeFieldProps = {
  def: FieldDefinition;
  disabled?: boolean;
  onFocus: () => void;
  onBlur: () => void;
};

type IntakeFieldRenderProps = {
  name: Path<PatientFormValues>;
  label: string;
  required: boolean;
  disabled?: boolean;
  onFocus: () => void;
  onBlur: () => void;
  def: FieldDefinition;
};

const renderTextField = ({
  name,
  label,
  required,
  disabled,
  onFocus,
  onBlur,
  def,
}: IntakeFieldRenderProps): ReactElement => (
  <FormTextField<PatientFormValues>
    name={name}
    label={label}
    required={required}
    disabled={disabled}
    type={textInputType(def.input)}
    onFocus={onFocus}
    onBlur={onBlur}
  />
);

const FIELD_BY_INPUT: Record<FieldInputType, (props: IntakeFieldRenderProps) => ReactElement> = {
  [FieldInputType.Select]: ({ name, label, required, disabled, onFocus, onBlur, def }) => (
    <FormSelectField<PatientFormValues>
      name={name}
      label={label}
      required={required}
      disabled={disabled}
      options={selectOptionsFor(def)}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  ),
  [FieldInputType.Textarea]: ({ name, label, required, disabled, onFocus, onBlur }) => (
    <FormTextareaField<PatientFormValues>
      name={name}
      label={label}
      required={required}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  ),
  [FieldInputType.Text]: renderTextField,
  [FieldInputType.Date]: renderTextField,
  [FieldInputType.Email]: renderTextField,
  [FieldInputType.Tel]: renderTextField,
};

export function IntakeField({ def, disabled, onFocus, onBlur }: IntakeFieldProps) {
  const Field = FIELD_BY_INPUT[def.input];

  return (
    <Field
      name={def.name as Path<PatientFormValues>}
      label={def.label}
      required={def.required}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      def={def}
    />
  );
}
