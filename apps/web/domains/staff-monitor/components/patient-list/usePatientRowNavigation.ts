"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export function usePatientRowNavigation(sessionId: string) {
  const router = useRouter();
  const href = `/staff/${sessionId}`;

  const navigate = () => {
    router.push(href);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate();
    }
  };

  return { href, navigate, onKeyDown };
}
