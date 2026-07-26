"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { FormDescription, FormField, FormItem, FormMessage } from "@patient/ui";
import { FormSection as FormSectionId, MAX_EMERGENCY_CONTACTS } from "@patient/validation";
import type { PatientFormValues } from "../../interfaces/patient-form.interface";
import { AddContactButton } from "./AddContactButton";
import { EmergencyContactList } from "./EmergencyContactList";
import { IntakeFormSection } from "../form/IntakeFormSection";

type EmergencyContactsSectionProps = {
  disabled?: boolean;
  onFocusField: (name: string) => void;
  onBlurField: () => void;
};

export function EmergencyContactsSection({
  disabled,
  onFocusField,
  onBlurField,
}: EmergencyContactsSectionProps) {
  const { control } = useFormContext<PatientFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "emergencyContacts",
  });

  return (
    <IntakeFormSection section={FormSectionId.Emergency}>
      <FormField
        control={control}
        name="emergencyContacts"
        render={() => (
          <FormItem className="space-y-4 sm:col-span-2">
            <FormDescription>At least 1 required · up to 3</FormDescription>
            <EmergencyContactList
              fieldIds={fields.map((field) => field.id)}
              disabled={disabled}
              onFocusField={onFocusField}
              onBlurField={onBlurField}
              onRemove={remove}
            />
            <AddContactButton
              disabled={disabled || fields.length >= MAX_EMERGENCY_CONTACTS}
              onClick={() => append({ name: "", relation: "", phone: "" })}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </IntakeFormSection>
  );
}
