"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { FormDescription, FormField, FormItem, FormMessage } from "@patient/ui";
import { FormSection as FormSectionId, MAX_EMERGENCY_CONTACTS } from "@patient/validation";
import type { PatientFormValues } from "../interfaces/patient-form.interface";
import { AddContactButton } from "./AddContactButton";
import { EmergencyContactFields } from "./EmergencyContactFields";
import { FormSection } from "./FormSection";
import { RemoveContactButton } from "./RemoveContactButton";

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
    <FormSection section={FormSectionId.Emergency}>
      <FormField
        control={control}
        name="emergencyContacts"
        render={() => (
          <FormItem className="space-y-4 sm:col-span-2">
            <FormDescription>At least 1 required · up to 3</FormDescription>
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2">
                <EmergencyContactFields
                  index={index}
                  disabled={disabled}
                  onFocusField={onFocusField}
                  onBlurField={onBlurField}
                />
                <RemoveContactButton
                  disabled={disabled || fields.length <= 1}
                  onClick={() => remove(index)}
                />
              </div>
            ))}
            <AddContactButton
              disabled={disabled || fields.length >= MAX_EMERGENCY_CONTACTS}
              onClick={() => append({ name: "", relation: "", phone: "" })}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  );
}
