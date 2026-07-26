export default function PatientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-5">
          <p className="text-xs font-medium uppercase tracking-wide text-teal-700">Welcome</p>
          <h1 className="font-display text-2xl font-semibold text-slate-900">Patient check-in</h1>
          <p className="mt-1 text-sm text-slate-600">Complete your intake form at your own pace.</p>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-8">{children}</main>
    </div>
  );
}
