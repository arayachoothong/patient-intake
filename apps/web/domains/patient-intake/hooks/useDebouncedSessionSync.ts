"use client";

import { useEffect, useRef } from "react";
import type { IntakeStep, PatientIntakePartial } from "@patient/validation";
import { usePatchSession } from "@/domains/session/client";

const DEBOUNCE_MS = 250;
const IDLE_MS = 800;

type UseDebouncedSessionSyncArgs = {
  sessionId: string | null;
  data: PatientIntakePartial;
  currentStep: IntakeStep;
  activeField: string | null;
  enabled: boolean;
};

export function useDebouncedSessionSync({
  sessionId,
  data,
  currentStep,
  activeField,
  enabled,
}: UseDebouncedSessionSyncArgs): void {
  const patchMutation = usePatchSession();
  const mutateRef = useRef(patchMutation.mutate);
  mutateRef.current = patchMutation.mutate;

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipFirstRef = useRef(true);
  const latestRef = useRef({ data, currentStep, activeField });
  latestRef.current = { data, currentStep, activeField };

  const dataKey = JSON.stringify(data);

  useEffect(() => {
    if (!enabled || !sessionId) return;
    mutateRef.current({
      id: sessionId,
      body: { currentStep },
    });
  }, [sessionId, currentStep, enabled]);

  useEffect(() => {
    if (!enabled || !sessionId) {
      return;
    }

    if (skipFirstRef.current) {
      skipFirstRef.current = false;
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (idleRef.current) clearTimeout(idleRef.current);

    debounceRef.current = setTimeout(() => {
      mutateRef.current({
        id: sessionId,
        body: {
          data: latestRef.current.data,
          currentStep: latestRef.current.currentStep,
          activeField: latestRef.current.activeField,
          isTyping: true,
        },
      });
    }, DEBOUNCE_MS);

    idleRef.current = setTimeout(() => {
      mutateRef.current({
        id: sessionId,
        body: {
          currentStep: latestRef.current.currentStep,
          activeField: latestRef.current.activeField,
          isTyping: false,
        },
      });
    }, IDLE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (idleRef.current) clearTimeout(idleRef.current);
    };
  }, [sessionId, dataKey, activeField, enabled]);
}
