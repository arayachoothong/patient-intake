import {
  ApiErrorCode,
  IntakeStep,
  SessionStatus,
  computeProgress,
  patientIntakeSchema,
  type PatientIntake,
  type Session,
  type SessionPatchInput,
} from "@patient/validation";

const sessions = new Map<string, Session>();

export function _resetStoreForTests(): void {
  sessions.clear();
}

function nowIso(): string {
  return new Date().toISOString();
}

export function createSessionInStore(): Session {
  const now = nowIso();
  const session: Session = {
    id: crypto.randomUUID(),
    status: SessionStatus.Filling,
    createdAt: now,
    updatedAt: now,
    progress: 0,
    currentStep: IntakeStep.Personal,
    activeField: null,
    isTyping: false,
    data: {
      emergencyContacts: [{ name: "", relation: "", phone: "" }],
    },
  };
  sessions.set(session.id, session);
  return session;
}

export function listSessionsFromStore(): Session[] {
  return Array.from(sessions.values());
}

export function getSessionFromStore(id: string): Session | undefined {
  return sessions.get(id);
}

export type PatchSessionResult = Session | { error: ApiErrorCode.NotFound | ApiErrorCode.Conflict };

export function patchSessionInStore(id: string, input: SessionPatchInput): PatchSessionResult {
  const session = sessions.get(id);
  if (!session) return { error: ApiErrorCode.NotFound };
  if (session.status === SessionStatus.Submitted) {
    return { error: ApiErrorCode.Conflict };
  }

  const data = input.data ? { ...session.data, ...input.data } : session.data;
  const updated: Session = {
    ...session,
    data,
    updatedAt: nowIso(),
    progress: computeProgress(data),
    ...(input.currentStep !== undefined ? { currentStep: input.currentStep } : {}),
    ...(input.activeField !== undefined ? { activeField: input.activeField } : {}),
    ...(input.isTyping !== undefined ? { isTyping: input.isTyping } : {}),
  };
  sessions.set(id, updated);
  return updated;
}

export type SubmitSessionResult =
  | Session
  | { error: ApiErrorCode.NotFound | ApiErrorCode.Invalid; issues?: unknown };

export function submitSessionInStore(id: string, data: PatientIntake): SubmitSessionResult {
  const session = sessions.get(id);
  if (!session) return { error: ApiErrorCode.NotFound };

  const parsed = patientIntakeSchema.safeParse(data);
  if (!parsed.success) {
    return { error: ApiErrorCode.Invalid, issues: parsed.error.issues };
  }

  const updated: Session = {
    ...session,
    status: SessionStatus.Submitted,
    data: parsed.data,
    progress: 100,
    isTyping: false,
    activeField: null,
    updatedAt: nowIso(),
  };
  sessions.set(id, updated);
  return updated;
}
