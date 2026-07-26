import "server-only";
import Ably from "ably";

let client: Ably.Rest | null = null;

export function getAblyServer(): Ably.Rest {
  if (!client) {
    const key = process.env.ABLY_API_KEY;
    if (!key) throw new Error("Missing ABLY_API_KEY");
    client = new Ably.Rest({ key });
  }
  return client;
}
