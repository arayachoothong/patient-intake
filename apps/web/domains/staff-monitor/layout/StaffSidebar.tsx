"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@patient/ui";
import { SidebarNavItem } from "./SidebarNavItem";

export function StaffSidebar() {
  const pathname = usePathname();
  const isPatientActive = pathname === "/staff" || pathname.startsWith("/staff/");

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-3">
          <p className="text-sidebar-foreground text-sm font-semibold tracking-tight">
            Staff Monitor
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarNavItem href="/staff" label="Patient" isActive={isPatientActive} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
