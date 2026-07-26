"use client";

import type { FocusEventHandler } from "react";
import {
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../Form";
import { Input } from "../Input";

type FormTextFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  disabled?: boolean;
  type: "text" | "date" | "email" | "tel";
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function FormTextField<TFieldValues extends FieldValues>({
  name,
  label,
  required,
  disabled,
  type,
  onFocus,
  onBlur,
}: FormTextFieldProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

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
