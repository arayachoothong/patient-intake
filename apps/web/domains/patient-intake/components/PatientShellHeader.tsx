"use client";

import React, { useEffect, useState } from "react";
import { PATIENT_SESSION_STORAGE_KEY } from "../interfaces/patient-form.interface";
import { CheckInCodeBadge } from "./CheckInCodeBadge";

const SESSION_ID_POLL_INTERVAL_MS = 250;

export function PatientShellHeader() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const readSessionId = () => {
      const storedSessionId = window.sessionStorage.getItem(PATIENT_SESSION_STORAGE_KEY);
      setSessionId(storedSessionId);
      return storedSessionId;
    };

    if (readSessionId()) return;

    const intervalId = window.setInterval(() => {
      if (readSessionId()) window.clearInterval(intervalId);
    }, SESSION_ID_POLL_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <header className="mx-auto w-full max-w-2xl px-4 pb-6 pt-10 sm:px-6 sm:pb-8 sm:pt-14">
      <div className="flex flex-col items-start gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Meridian Clinic
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Patient check-in
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Complete your intake at your own pace.
          </p>
        </div>
        {sessionId ? <CheckInCodeBadge sessionId={sessionId} /> : null}
      </div>
    </header>
  );
}
