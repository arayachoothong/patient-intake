"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PatientIntakePartial, Session } from "@patient/validation";
import { patchSession } from "../api/session-api";
import { sessionKeys } from "../api/session-query-keys";

export function usePatchSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      id: string;
      body: { data?: PatientIntakePartial; activeField?: string | null; isTyping?: boolean };
    }) => patchSession(args.id, args.body),
    onSuccess: (session) => {
      qc.setQueryData(sessionKeys.detail(session.id), session);
      qc.setQueryData(sessionKeys.list(), (old: unknown) => {
        if (!Array.isArray(old)) return old;
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
