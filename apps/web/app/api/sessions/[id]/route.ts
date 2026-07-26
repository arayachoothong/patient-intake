import { getSession, patchSession } from "@/domains/session";
import {
  ApiErrorCode,
  INTAKE_STEP_ORDER,
  IntakeStep,
  patientIntakePartialSchema,
  RealtimeEvent,
} from "@patient/validation";
import { publishSessionEvent } from "../publish-session-event";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function isIntakeStep(value: unknown): value is IntakeStep {
  return typeof value === "string" && (INTAKE_STEP_ORDER as readonly string[]).includes(value);
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const session = getSession(id);
  if (!session) {
    return Response.json({ error: ApiErrorCode.NotFound }, { status: 404 });
  }
  return Response.json(session);
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: ApiErrorCode.InvalidJson }, { status: 400 });
  }

  if (body === null || typeof body !== "object") {
    return Response.json({ error: ApiErrorCode.Invalid }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  let data: ReturnType<typeof patientIntakePartialSchema.parse> | undefined;

  if ("data" in record && record.data !== undefined) {
    const parsed = patientIntakePartialSchema.safeParse(record.data);
    if (!parsed.success) {
      return Response.json(
        { error: ApiErrorCode.Invalid, issues: parsed.error.issues },
        { status: 400 },
      );
    }
    data = parsed.data;
  }

  let currentStep: IntakeStep | undefined;
  if ("currentStep" in record) {
    if (!isIntakeStep(record.currentStep)) {
      return Response.json({ error: ApiErrorCode.Invalid }, { status: 400 });
    }
    currentStep = record.currentStep;
  }

  let activeField: string | null | undefined;
  if ("activeField" in record) {
    const value = record.activeField;
    if (value !== null && typeof value !== "string") {
      return Response.json({ error: ApiErrorCode.Invalid }, { status: 400 });
    }
    activeField = value;
  }

  let isTyping: boolean | undefined;
  if ("isTyping" in record) {
    if (typeof record.isTyping !== "boolean") {
      return Response.json({ error: ApiErrorCode.Invalid }, { status: 400 });
    }
    isTyping = record.isTyping;
  }

  const result = patchSession(id, { data, currentStep, activeField, isTyping });
  if ("error" in result) {
    if (result.error === ApiErrorCode.NotFound) {
      return Response.json({ error: ApiErrorCode.NotFound }, { status: 404 });
    }
    return Response.json({ error: ApiErrorCode.Conflict }, { status: 409 });
  }

  await publishSessionEvent(RealtimeEvent.SessionUpdated, result);
  return Response.json(result);
}
