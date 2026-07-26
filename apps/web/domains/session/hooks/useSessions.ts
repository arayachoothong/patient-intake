"use client";

import { useQuery } from "@tanstack/react-query";
import { listSessions } from "../api/session-api";
import { sessionKeys } from "../api/session-query-keys";

export function useSessions() {
  return useQuery({
    queryKey: sessionKeys.list(),
    queryFn: listSessions,
  });
}
