import { StaffShell } from "@/domains/staff-monitor";

export default function StaffLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StaffShell>{children}</StaffShell>;
}
