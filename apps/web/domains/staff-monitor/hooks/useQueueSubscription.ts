"use client";

import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { ConnectionState } from "@patient/ui";
import type { Session } from "@patient/validation";
import type { InboundMessage } from "ably";
import { getAblyClient, QUEUE_CHANNEL, sessionKeys, useSessions } from "@/domains/session/client";
import type { RealtimeEvent, SessionEventPayload } from "@/domains/session";
import { mapAblyConnectionState } from "../helpers/ably-connection.helper";
import { sortByUpdatedAt, upsertSession } from "../helpers/session-list.helper";
import type { QueueSubscriptionState } from "../interfaces/staff-subscription.interface";

const QUEUE_EVENTS: RealtimeEvent[] = ["session.created", "session.updated", "session.submitted"];

export function useQueueSubscription(): QueueSubscriptionState {
  const query = useSessions();
  const queryClient = useQueryClient();
  const [connectionState, setConnectionState] = useState<ConnectionState>("connecting");
  const [ablyError, setAblyError] = useState<string | null>(null);
  const hadConnectedRef = useRef(false);
  const reloadSessions = query.refetch;

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
    const channel = client.channels.get(QUEUE_CHANNEL);

    const onMessage = (message: InboundMessage) => {
      const payload = message.data as SessionEventPayload | undefined;
      const session = payload?.session;
      if (!session) return;
      queryClient.setQueryData(sessionKeys.list(), (old: unknown) => {
        const list = Array.isArray(old) ? (old as Session[]) : [];
        return sortByUpdatedAt(upsertSession(list, session));
      });
    };

    void channel.subscribe([...QUEUE_EVENTS], onMessage);

    const onConnectionChange = () => {
      const next = mapAblyConnectionState(client.connection.state);
      setConnectionState(next);

      if (next === "connected") {
        if (hadConnectedRef.current) {
          void reloadSessions();
        }
        hadConnectedRef.current = true;
      }
    };

    onConnectionChange();
    client.connection.on(onConnectionChange);

    return () => {
      channel.unsubscribe([...QUEUE_EVENTS], onMessage);
      client.connection.off(onConnectionChange);
    };
  }, [queryClient, reloadSessions]);

  const sessions = sortByUpdatedAt(query.data ?? []);
  const queryError =
    query.error instanceof Error
      ? query.error.message
      : query.error
        ? "Unable to load sessions"
        : null;

  return {
    sessions,
    connectionState,
    isLoading: query.isLoading,
    error: ablyError ?? queryError,
  };
}
