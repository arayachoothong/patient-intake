import { PatientShellHeader } from "@/domains/patient-intake";

export default function PatientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-background">
      <PatientShellHeader />
      <main className="mx-auto w-full max-w-2xl px-4 pb-12 sm:px-6 sm:pb-16">{children}</main>
    </div>
  );
}
