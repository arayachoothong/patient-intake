"use client";

import React, { useEffect, useState } from "react";
import { startSessionIdPoller } from "../helpers/session-id-poller.helper";
import { PATIENT_SESSION_STORAGE_KEY } from "../interfaces/patient-form.interface";
import { CheckInCodeBadge } from "./CheckInCodeBadge";

type SessionStorageReader = Pick<Storage, "getItem">;

export function readStoredPatientSessionId(
  storage: SessionStorageReader = window.sessionStorage,
): string | null {
  return storage.getItem(PATIENT_SESSION_STORAGE_KEY);
}

export function PatientShellHeader() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    return startSessionIdPoller({
      readId: readStoredPatientSessionId,
      onChange: setSessionId,
    });
  }, []);

  return (
    <header className="mx-auto w-full max-w-2xl px-4 pb-6 pt-10 sm:px-6 sm:pb-8 sm:pt-14">
      <div className="flex flex-col items-start gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Meridian Clinic
          </p>
          <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Patient check-in
          </h1>
          <p className="text-muted-foreground mt-2 text-base">
            Complete your intake at your own pace.
          </p>
        </div>
        {sessionId ? <CheckInCodeBadge sessionId={sessionId} /> : null}
      </div>
    </header>
  );
}
