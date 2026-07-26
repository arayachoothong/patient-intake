"use client";

import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "@patient/ui";

type SidebarNavItemProps = {
  href: string;
  label: string;
  isActive: boolean;
};

export function SidebarNavItem({ href, label, isActive }: SidebarNavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={href}>{label}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
