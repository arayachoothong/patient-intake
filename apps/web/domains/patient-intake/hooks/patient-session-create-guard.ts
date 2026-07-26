import type { Session } from "@patient/validation";

/** Survives Strict Mode remounts — only one createSession mutation at a time per tab. */
let patientSessionCreateInFlight: Promise<Session> | null = null;

export function getPatientSessionCreateInFlight(): Promise<Session> | null {
  return patientSessionCreateInFlight;
}

/** @internal test helper */
export function resetPatientSessionCreateGuard(): void {
  patientSessionCreateInFlight = null;
}

type CreateMutate = (
  variables: undefined,
  options: {
    onSuccess: (session: Session) => void;
    onError: () => void;
  },
) => void;

export function runPatientSessionCreateOnce(mutate: CreateMutate): Promise<Session> {
  if (patientSessionCreateInFlight) {
    return patientSessionCreateInFlight;
  }

  patientSessionCreateInFlight = new Promise<Session>((resolve, reject) => {
    mutate(undefined, {
      onSuccess: (session) => resolve(session),
      onError: () => reject(new Error("createSession failed")),
    });
  }).finally(() => {
    patientSessionCreateInFlight = null;
  });

  return patientSessionCreateInFlight;
}
