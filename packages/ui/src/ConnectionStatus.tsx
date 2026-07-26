import { cn } from "./lib/cn";

export type ConnectionState = "connected" | "connecting" | "disconnected";

const labels: Record<ConnectionState, string> = {
  connected: "Connected",
  connecting: "Reconnecting…",
  disconnected: "Disconnected",
};

export function ConnectionStatus({ state }: { state: ConnectionState }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
        state === "connected" && "bg-emerald-50 text-emerald-800",
        state === "connecting" && "bg-blue-50 text-blue-800",
        state === "disconnected" && "bg-red-50 text-red-800",
      )}
      role="status"
    >
      <span
        className={cn(
          "size-2 rounded-full",
          state === "connected" && "bg-emerald-500",
          state === "connecting" && "bg-blue-500",
          state === "disconnected" && "bg-red-500",
        )}
      />
      {labels[state]}
    </div>
  );
}
