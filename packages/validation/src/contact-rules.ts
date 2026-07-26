import { z } from "zod";

/** Thailand: local `0` + 8–9 digits (landline/mobile) or `+66` + 8–9 digits. */
export const THAI_PHONE_REGEX = /^(?:\+66|0)\d{8,9}$/;

/** Remove human separators before validating. */
export function normalizePhone(raw: string): string {
  return raw.replace(/[\s()-]/g, "");
}

export const phoneSchema = z
  .string()
  .transform((value) => normalizePhone(value.trim()))
  .refine((value) => THAI_PHONE_REGEX.test(value), "Enter a Thai phone number (e.g. 0812345678)");

export const emailSchema = z.string().trim().email("Invalid email");
