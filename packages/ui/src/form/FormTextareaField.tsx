"use client";

import type { FocusEventHandler } from "react";
import {
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../Form";
import { Textarea } from "../Textarea";

type FormTextareaFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  disabled?: boolean;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
};

export function FormTextareaField<TFieldValues extends FieldValues>({
  name,
  label,
  required,
  disabled,
  onFocus,
  onBlur,
}: FormTextareaFieldProps<TFieldValues>) {
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
