"use client";

import type { FocusEventHandler } from "react";
import { useFormContext, type Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@patient/ui";
import type { PatientFormValues } from "../interfaces/patient-form.interface";

type TextInputFieldProps = {
  name: Path<PatientFormValues>;
  label: string;
  required?: boolean;
  disabled?: boolean;
  type: "text" | "date" | "email" | "tel";
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function TextInputField({
  name,
  label,
  required,
  disabled,
  type,
  onFocus,
  onBlur,
}: TextInputFieldProps) {
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
            <Input
              type={type}
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
