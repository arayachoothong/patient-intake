"use client";

import {
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select";

type SelectOption = {
  value: string;
  label: string;
};

type FormSelectFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  disabled?: boolean;
  options: SelectOption[];
  onFocus?: () => void;
  onBlur?: () => void;
};

export function FormSelectField<TFieldValues extends FieldValues>({
  name,
  label,
  required,
  disabled,
  options,
  onFocus,
  onBlur,
}: FormSelectFieldProps<TFieldValues>) {
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
          <Select
            value={typeof field.value === "string" && field.value ? field.value : undefined}
            onValueChange={(value) => {
              field.onChange(value);
              onFocus?.();
            }}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger
                onFocus={onFocus}
                onBlur={() => {
                  field.onBlur();
                  onBlur?.();
                }}
              >
                <SelectValue placeholder="Select…" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
