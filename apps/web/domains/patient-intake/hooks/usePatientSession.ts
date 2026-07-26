"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SessionStatus, type PatientIntake } from "@patient/validation";
import { useCreateSession, useSession } from "@/domains/session/client";
import { sessionDataToFormValues } from "../helpers/form-defaults.helper";
import {
  PATIENT_SESSION_STORAGE_KEY,
  type PatientFormValues,
} from "../interfaces/patient-form.interface";
import { runPatientSessionCreateOnce } from "./patient-session-create-guard";

type UsePatientSessionOptions = {
  /** Optional RHF `reset` (or equivalent) applied when session data is ready. */
  reset?: (values: PatientFormValues) => void;
};

export function usePatientSession(options: UsePatientSessionOptions = {}) {
  const { reset } = options;

  const [storedId, setStoredId] = useState<string | null | undefined>(undefined);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [bootstrapError, setBootstrapError] = useState<string | null>(null);
  const [bootstrapping, setBootstrapping] = useState(true);

  const createMutation = useCreateSession();
  const existingQuery = useSession(storedId);

  const createBootstrapRef = useRef(false);
  const appliedIdRef = useRef<string | null>(null);
  const resetRef = useRef(reset);
  resetRef.current = reset;

  const resetFormFromSession = useCallback((data: Partial<PatientIntake>) => {
    resetRef.current?.(sessionDataToFormValues(data));
  }, []);

  const createMutateRef = useRef(createMutation.mutate);
  createMutateRef.current = createMutation.mutate;

  /**
   * Replace a session the server no longer knows about (the store is in-memory,
   * so a restart drops sessions while the tab still holds the old id).
   * Keeps the entered form values — only the id changes.
   */
  const recreateSession = useCallback(async () => {
    window.sessionStorage.removeItem(PATIENT_SESSION_STORAGE_KEY);
    const session = await runPatientSessionCreateOnce(createMutateRef.current);
    window.sessionStorage.setItem(PATIENT_SESSION_STORAGE_KEY, session.id);
    appliedIdRef.current = session.id;
    setStoredId(session.id);
    setSessionId(session.id);
    return session.id;
  }, []);

  useEffect(() => {
    setStoredId(window.sessionStorage.getItem(PATIENT_SESSION_STORAGE_KEY));
  }, []);

  useEffect(() => {
    if (storedId === undefined || !bootstrapping) return;

    // No stored session → create (module guard prevents Strict Mode double-create)
    if (storedId === null) {
      const persistedId = window.sessionStorage.getItem(PATIENT_SESSION_STORAGE_KEY);
      if (persistedId) {
        setStoredId(persistedId);
        return;
      }

      if (createBootstrapRef.current) return;
      createBootstrapRef.current = true;

      void runPatientSessionCreateOnce(createMutation.mutate).then(
        (session) => {
          window.sessionStorage.setItem(PATIENT_SESSION_STORAGE_KEY, session.id);
          setSessionId(session.id);
          if (appliedIdRef.current !== session.id) {
            appliedIdRef.current = session.id;
            resetFormFromSession(session.data);
          }
          if (session.status === SessionStatus.Submitted) {
            setSubmitted(true);
          }
          setBootstrapping(false);
        },
        () => {
          setBootstrapError("Could not start intake session. Please refresh.");
          setBootstrapping(false);
        },
      );
      return;
    }

    // Stored id → wait for useSession
    if (existingQuery.isPending) return;

    if (existingQuery.isError) {
      window.sessionStorage.removeItem(PATIENT_SESSION_STORAGE_KEY);
      createBootstrapRef.current = false;
      setStoredId(null);
      return;
    }

    const session = existingQuery.data;
    if (!session) return;

    setSessionId(session.id);
    if (appliedIdRef.current !== session.id) {
      appliedIdRef.current = session.id;
      resetFormFromSession(session.data);
      if (session.status === SessionStatus.Submitted) {
        setSubmitted(true);
      }
    }
    setBootstrapping(false);
  }, [
    storedId,
    bootstrapping,
    createMutation,
    existingQuery.isPending,
    existingQuery.isError,
    existingQuery.data,
    resetFormFromSession,
  ]);

  return {
    sessionId,
    bootstrapping,
    submitted,
    setSubmitted,
    bootstrapError,
    resetFormFromSession,
    recreateSession,
  };
}
