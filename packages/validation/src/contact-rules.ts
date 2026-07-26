import { z } from "zod";
import { requiredMessage } from "./helpers/required-message.helper";

export const THAI_PHONE_REGEX = /^(?:\+66|0)\d{8,9}$/;

export function normalizePhone(raw: string): string {
  return raw.replace(/[\s()-]/g, "");
}

export function createPhoneSchema(label: string) {
  return z
    .string()
    .trim()
    .min(1, requiredMessage(label))
    .transform((value) => normalizePhone(value))
    .refine((value) => THAI_PHONE_REGEX.test(value), "Enter a Thai phone number (e.g. 0812345678)");
}

export function createEmailSchema(label: string) {
  return z.string().trim().min(1, requiredMessage(label)).email("Invalid email");
}

export function formatPhoneDisplay(raw: string): string {
  const normalized = normalizePhone(raw.trim());
  if (!normalized) return "";

  let local = normalized;
  if (local.startsWith("+66")) {
    local = `0${local.slice(3)}`;
  } else if (local.startsWith("66") && !local.startsWith("0") && local.length >= 10) {
    local = `0${local.slice(2)}`;
  }

  if (local.length < 4) return local;
  return `${local.slice(0, 3)}-${local.slice(3)}`;
}

export const phoneSchema = createPhoneSchema("Phone number");
export const emailSchema = createEmailSchema("Email");
