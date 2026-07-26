"use client";

import { ConnectionStatus, SidebarTrigger, type ConnectionState } from "@patient/ui";

type StaffPageHeaderProps = {
  title: string;
  connectionState: ConnectionState;
};

export function StaffPageHeader({ title, connectionState }: StaffPageHeaderProps) {
  return (
    <header className="border-border flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="font-display text-foreground text-xl font-semibold">{title}</h1>
      </div>
      <ConnectionStatus state={connectionState} />
    </header>
  );
}
