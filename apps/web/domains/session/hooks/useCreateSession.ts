"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@patient/validation";
import { createSession } from "../api/session-api";
import { sessionKeys } from "../api/session-query-keys";

export function useCreateSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => createSession(),
    onSuccess: (session) => {
      qc.setQueryData(sessionKeys.detail(session.id), session);
      qc.setQueryData(sessionKeys.list(), (old: unknown) => {
        if (!Array.isArray(old)) return [session];
        const list = old as Session[];
        const i = list.findIndex((s) => s.id === session.id);
        if (i === -1) return [session, ...list];
        const next = list.slice();
        next[i] = session;
        return next;
      });
    },
  });
}
