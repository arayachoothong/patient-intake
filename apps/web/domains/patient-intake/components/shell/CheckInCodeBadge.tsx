"use client";

import { checkInCode } from "@patient/validation";
import React from "react";

export function CheckInCodeBadge({ sessionId }: { sessionId: string }) {
  return (
    <p className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 font-mono text-sm tracking-wide text-primary">
      Check-in <span className="ml-1.5 font-semibold">{checkInCode(sessionId)}</span>
    </p>
  );
}
