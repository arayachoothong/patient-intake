"use client";

import type { Path } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, FieldGrid } from "@patient/ui";
import { EMERGENCY_CONTACT_FIELD_LABELS } from "@patient/validation";
import type { PatientFormValues } from "../interfaces/patient-form.interface";
import { TextInputField } from "./TextInputField";

type EmergencyContactFieldsProps = {
  index: number;
  disabled?: boolean;
  onFocusField: (name: string) => void;
  onBlurField: () => void;
};

export function EmergencyContactFields({
  index,
  disabled,
  onFocusField,
  onBlurField,
}: EmergencyContactFieldsProps) {
  const namePath = `emergencyContacts.${index}.name` as Path<PatientFormValues>;
  const relationPath = `emergencyContacts.${index}.relation` as Path<PatientFormValues>;
  const phonePath = `emergencyContacts.${index}.phone` as Path<PatientFormValues>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact {index + 1}</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGrid>
          <div className="sm:col-span-2">
            <TextInputField
              name={namePath}
              label={EMERGENCY_CONTACT_FIELD_LABELS.name}
              required
              disabled={disabled}
              type="text"
              onFocus={() => onFocusField(namePath)}
              onBlur={onBlurField}
            />
          </div>
          <TextInputField
            name={relationPath}
            label={EMERGENCY_CONTACT_FIELD_LABELS.relation}
            required
            disabled={disabled}
            type="text"
            onFocus={() => onFocusField(relationPath)}
            onBlur={onBlurField}
          />
          <TextInputField
            name={phonePath}
            label={EMERGENCY_CONTACT_FIELD_LABELS.phone}
            required
            disabled={disabled}
            type="tel"
            onFocus={() => onFocusField(phonePath)}
            onBlur={onBlurField}
          />
        </FieldGrid>
      </CardContent>
    </Card>
  );
}
