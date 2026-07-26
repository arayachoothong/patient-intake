"use client";

import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import type { ConnectionState } from "@patient/ui";
import type { Session } from "@patient/validation";
import type { InboundMessage } from "ably";
import { getAblyClient, sessionChannel, sessionKeys, useSession } from "@/domains/session/client";
import type { RealtimeEvent, SessionEventPayload } from "@/domains/session";
import { mapAblyConnectionState } from "../helpers/ably-connection.helper";
import { sortByUpdatedAt, upsertSession } from "../helpers/session-list.helper";
import type { SessionSubscriptionState } from "../interfaces/staff-subscription.interface";

const SESSION_EVENTS: RealtimeEvent[] = ["session.created", "session.updated", "session.submitted"];

function queryErrorMessage(error: unknown): string | null {
  if (!error) return null;
  if (isAxiosError(error) && error.response?.status === 404) {
    return "Session not found";
  }
  if (error instanceof Error) return error.message;
  return "Unable to load session";
}

/**
 * Loads a session via React Query, subscribes to session-{id}, and writes Ably
 * payloads into `sessionKeys.detail(id)` (+ list cache). Refetches on reconnect.
 */
export function useSessionSubscription(sessionId: string): SessionSubscriptionState {
  const query = useSession(sessionId);
  const queryClient = useQueryClient();
  const [connectionState, setConnectionState] = useState<ConnectionState>("connecting");
  const [ablyError, setAblyError] = useState<string | null>(null);
  const hadConnectedRef = useRef(false);
  const reloadSession = query.refetch;

  useEffect(() => {
    let client: ReturnType<typeof getAblyClient>;
    try {
      client = getAblyClient();
    } catch {
      setConnectionState("disconnected");
      setAblyError("Missing Ably configuration");
      return;
    }

    setAblyError(null);
    const channel = client.channels.get(sessionChannel(sessionId));

    const onMessage = (message: InboundMessage) => {
      const payload = message.data as SessionEventPayload | undefined;
      const session = payload?.session;
      if (!session || session.id !== sessionId) return;

      queryClient.setQueryData(sessionKeys.detail(sessionId), session);
      queryClient.setQueryData(sessionKeys.list(), (old: unknown) => {
        const list = Array.isArray(old) ? (old as Session[]) : [];
        return sortByUpdatedAt(upsertSession(list, session));
      });
    };

    void channel.subscribe([...SESSION_EVENTS], onMessage);

    const onConnectionChange = () => {
      const next = mapAblyConnectionState(client.connection.state);
      setConnectionState(next);

      if (next === "connected") {
        if (hadConnectedRef.current) {
          void reloadSession();
        }
        hadConnectedRef.current = true;
      }
    };

    onConnectionChange();
    client.connection.on(onConnectionChange);

    return () => {
      channel.unsubscribe([...SESSION_EVENTS], onMessage);
      client.connection.off(onConnectionChange);
    };
  }, [sessionId, queryClient, reloadSession]);

  return {
    session: query.data ?? null,
    connectionState,
    isLoading: query.isLoading,
    error: ablyError ?? queryErrorMessage(query.error),
  };
}
