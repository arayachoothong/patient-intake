import {
  SessionStatus,
  computeProgress,
  patientIntakeSchema,
  type PatientIntake,
  type PatientIntakePartial,
  type Session,
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

export type PatchSessionInput = {
  data?: PatientIntakePartial;
  activeField?: string | null;
  isTyping?: boolean;
};

export type PatchSessionResult = Session | { error: "not_found" | "conflict" };

export function patchSessionInStore(id: string, input: PatchSessionInput): PatchSessionResult {
  const session = sessions.get(id);
  if (!session) return { error: "not_found" };
  if (session.status === SessionStatus.Submitted) {
    return { error: "conflict" };
  }

  const data = input.data ? { ...session.data, ...input.data } : session.data;
  const updated: Session = {
    ...session,
    data,
    updatedAt: nowIso(),
    progress: computeProgress(data),
    ...(input.activeField !== undefined ? { activeField: input.activeField } : {}),
    ...(input.isTyping !== undefined ? { isTyping: input.isTyping } : {}),
  };
  sessions.set(id, updated);
  return updated;
}

export type SubmitSessionResult = Session | { error: "not_found" | "invalid"; issues?: unknown };

export function submitSessionInStore(id: string, data: PatientIntake): SubmitSessionResult {
  const session = sessions.get(id);
  if (!session) return { error: "not_found" };

  const parsed = patientIntakeSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "invalid", issues: parsed.error.issues };
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
