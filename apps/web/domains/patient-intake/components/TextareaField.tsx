"use client";

import type { FocusEventHandler } from "react";
import { useFormContext, type Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Textarea } from "@patient/ui";
import type { PatientFormValues } from "../interfaces/patient-form.interface";

type TextareaFieldProps = {
  name: Path<PatientFormValues>;
  label: string;
  required?: boolean;
  disabled?: boolean;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
};

export function TextareaField({
  name,
  label,
  required,
  disabled,
  onFocus,
  onBlur,
}: TextareaFieldProps) {
  const { control } = useFormContext<PatientFormValues>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required ? <span className="text-red-600"> *</span> : null}
          </FormLabel>
          <FormControl>
            <Textarea
              disabled={disabled}
              {...field}
              value={typeof field.value === "string" ? field.value : ""}
              onFocus={onFocus}
              onBlur={(event) => {
                field.onBlur();
                onBlur?.(event);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
