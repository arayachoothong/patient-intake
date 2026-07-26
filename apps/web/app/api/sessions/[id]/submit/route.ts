import { submitSession } from "@/domains/session";
import { ApiErrorCode, patientIntakeSchema, RealtimeEvent } from "@patient/validation";
import { publishSessionEvent } from "../../publish-session-event";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: ApiErrorCode.InvalidJson }, { status: 400 });
  }

  const parsed = patientIntakeSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: ApiErrorCode.Invalid, issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const result = submitSession(id, parsed.data);
  if ("error" in result) {
    if (result.error === ApiErrorCode.NotFound) {
      return Response.json({ error: ApiErrorCode.NotFound }, { status: 404 });
    }
    return Response.json(
      { error: ApiErrorCode.Invalid, issues: result.issues },
      { status: 400 },
    );
  }

  await publishSessionEvent(RealtimeEvent.SessionSubmitted, result);
  return Response.json(result);
}
