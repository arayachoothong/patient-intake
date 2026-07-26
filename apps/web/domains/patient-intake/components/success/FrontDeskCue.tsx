"use client";

import { SessionStatus } from "@patient/validation";
import React from "react";

type FrontDeskCueProps = {
  status: SessionStatus;
};

export function FrontDeskCue({ status }: FrontDeskCueProps) {
  if (status !== SessionStatus.Submitted) {
    return null;
  }

  return (
    <p
      role="status"
      className="mt-3 max-w-lg text-sm leading-6 text-stone-600 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000 motion-safe:delay-300"
    >
      Front desk can see your check-in.
    </p>
  );
}
