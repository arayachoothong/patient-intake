"use client";

import type { ReactNode } from "react";
import { cn } from "@patient/ui";

type FieldHighlightProps = {
  active: boolean;
  isTyping: boolean;
  children: ReactNode;
  className?: string;
};

export function FieldHighlight({ active, isTyping, children, className }: FieldHighlightProps) {
  return (
    <div
      className={cn(
        "relative rounded-md transition-shadow",
        active && "ring-2 ring-sky-400/60 ring-offset-1",
        className,
      )}
      data-active={active ? "true" : undefined}
      data-typing={active && isTyping ? "true" : undefined}
    >
      {children}
      {active && isTyping ? (
        <p
          className="absolute right-2 top-2 text-[10px] font-semibold uppercase tracking-wide text-sky-700"
          role="status"
        >
          Typing…
        </p>
      ) : null}
    </div>
  );
}
