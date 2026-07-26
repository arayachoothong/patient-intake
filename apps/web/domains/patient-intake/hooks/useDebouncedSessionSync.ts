"use client";

import { useEffect, useRef } from "react";
import type { PatientIntakePartial } from "@patient/validation";
import { usePatchSession } from "@/domains/session/client";

const DEBOUNCE_MS = 250;
const IDLE_MS = 800;

type UseDebouncedSessionSyncArgs = {
  sessionId: string | null;
  data: PatientIntakePartial;
  activeField: string | null;
  enabled: boolean;
};

/**
 * Debounce form value PATCHes (250ms) with isTyping + activeField.
 * After ~800ms idle, clears isTyping. No-ops when disabled (e.g. submitted).
 */
export function useDebouncedSessionSync({
  sessionId,
  data,
  activeField,
  enabled,
}: UseDebouncedSessionSyncArgs): void {
  const patchMutation = usePatchSession();
  const mutateRef = useRef(patchMutation.mutate);
  mutateRef.current = patchMutation.mutate;

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipFirstRef = useRef(true);
  const latestRef = useRef({ data, activeField });
  latestRef.current = { data, activeField };

  const dataKey = JSON.stringify(data);

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
          activeField: latestRef.current.activeField,
          isTyping: true,
        },
      });
    }, DEBOUNCE_MS);

    idleRef.current = setTimeout(() => {
      mutateRef.current({
        id: sessionId,
        body: {
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
