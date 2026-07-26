import type { HTMLAttributes } from "react";
import { cn } from "./lib/cn";

export function FieldGrid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-3 sm:grid-cols-2", className)} {...props} />;
}
