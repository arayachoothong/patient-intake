import type {
  IntakeStep,
  PatientIntake,
  PatientIntakePartial,
  Session,
} from "@patient/validation";
import { api } from "@/lib/http/axios-client";

export async function listSessions(): Promise<Session[]> {
  const { data } = await api.get<Session[]>("/api/sessions");
  return data;
}

export async function getSession(id: string): Promise<Session> {
  const { data } = await api.get<Session>(`/api/sessions/${id}`);
  return data;
}

export async function createSession(): Promise<Session> {
  const { data } = await api.post<Session>("/api/sessions");
  return data;
}

export type SessionPatchBody = {
  data?: PatientIntakePartial;
  currentStep?: IntakeStep;
  activeField?: string | null;
  isTyping?: boolean;
};

export async function patchSession(id: string, body: SessionPatchBody): Promise<Session> {
  const { data } = await api.patch<Session>(`/api/sessions/${id}`, body);
  return data;
}

export async function submitSession(id: string, data: PatientIntake): Promise<Session> {
  const { data: session } = await api.post<Session>(`/api/sessions/${id}/submit`, data);
  return session;
}
