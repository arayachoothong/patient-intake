"use client";

import Ably from "ably";
import { env } from "next-runtime-env";

let client: Ably.Realtime | null = null;

export function getAblyClient(): Ably.Realtime {
  if (!client) {
    const key = env("NEXT_PUBLIC_ABLY_KEY");
    if (!key) throw new Error("Missing NEXT_PUBLIC_ABLY_KEY");
    client = new Ably.Realtime({ key });
  }
  return client;
}
