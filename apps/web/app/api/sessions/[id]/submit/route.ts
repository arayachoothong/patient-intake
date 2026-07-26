import { submitSession } from "@/domains/session";
import { patientIntakeSchema } from "@patient/validation";
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
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = patientIntakeSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "invalid", issues: parsed.error.issues }, { status: 400 });
  }

  const result = submitSession(id, parsed.data);
  if ("error" in result) {
    if (result.error === "not_found") {
      return Response.json({ error: "not_found" }, { status: 404 });
    }
    return Response.json({ error: "invalid", issues: result.issues }, { status: 400 });
  }

  await publishSessionEvent("session.submitted", result);
  return Response.json(result);
}
