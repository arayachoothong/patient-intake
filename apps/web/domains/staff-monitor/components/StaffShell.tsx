"use client";

import { SidebarInset, SidebarProvider } from "@patient/ui";
import { StaffSidebar } from "./StaffSidebar";

export function StaffShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <StaffSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
