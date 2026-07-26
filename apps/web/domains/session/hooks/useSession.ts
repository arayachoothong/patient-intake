"use client";

import { useQuery } from "@tanstack/react-query";
import { getSession } from "../api/session-api";
import { sessionKeys } from "../api/session-query-keys";

export function useSession(id: string | null | undefined) {
  return useQuery({
    queryKey: sessionKeys.detail(id ?? ""),
    queryFn: () => getSession(id!),
    enabled: Boolean(id),
  });
}
