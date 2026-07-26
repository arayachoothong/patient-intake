import axios from "axios";
import { ApiErrorCode } from "@patient/validation";

export const SUBMIT_ERROR_MESSAGES = {
  [ApiErrorCode.Invalid]: "Please fix the highlighted fields and try again.",
  [ApiErrorCode.NotFound]: "Your intake session expired. We started a new one — please submit again.",
  [ApiErrorCode.Conflict]: "This intake was already submitted.",
  network: "Could not reach the server. Check your connection and try again.",
  unknown: "Something went wrong while submitting. Please try again.",
} as const;

export const SESSION_NOT_FOUND_STATUS = 404;

export function submitErrorStatus(error: unknown): number | null {
  return axios.isAxiosError(error) ? (error.response?.status ?? null) : null;
}

export function submitErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) return SUBMIT_ERROR_MESSAGES.unknown;
  const status = error.response?.status;
  if (status === undefined) return SUBMIT_ERROR_MESSAGES.network;

  switch (status) {
    case 400:
      return SUBMIT_ERROR_MESSAGES[ApiErrorCode.Invalid];
    case SESSION_NOT_FOUND_STATUS:
      return SUBMIT_ERROR_MESSAGES[ApiErrorCode.NotFound];
    case 409:
      return SUBMIT_ERROR_MESSAGES[ApiErrorCode.Conflict];
    default:
      return SUBMIT_ERROR_MESSAGES.unknown;
  }
}
