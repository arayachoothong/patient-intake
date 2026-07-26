import { PatientLiveView } from "@/domains/staff-monitor";

type StaffSessionPageProps = {
  params: Promise<{ sessionId: string }>;
};

export default async function StaffSessionPage({ params }: StaffSessionPageProps) {
  const { sessionId } = await params;
  return <PatientLiveView sessionId={sessionId} />;
}
