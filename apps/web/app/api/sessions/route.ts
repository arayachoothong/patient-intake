import { createSession, listSessions } from "@/domains/session";
import { publishSessionEvent } from "./publish-session-event";

export async function GET() {
  return Response.json(listSessions());
}

export async function POST() {
  const session = createSession();
  await publishSessionEvent("session.created", session, {
    queue: true,
    session: false,
  });
  return Response.json(session, { status: 201 });
}
