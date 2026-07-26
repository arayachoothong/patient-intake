import type { Session } from "@patient/validation";

let patientSessionCreateInFlight: Promise<Session> | null = null;

export function getPatientSessionCreateInFlight(): Promise<Session> | null {
  return patientSessionCreateInFlight;
}

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
