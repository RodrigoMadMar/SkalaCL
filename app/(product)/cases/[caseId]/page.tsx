import { notFound } from "next/navigation";
import { AICopilotEconomicsSession } from "@/components/cases/ai-copilot-economics-session";

export function generateStaticParams() { return [{ caseId: "ai-copilot-economics" }]; }

export default async function CasePage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  if (caseId !== "ai-copilot-economics") notFound();
  return <AICopilotEconomicsSession />;
}
