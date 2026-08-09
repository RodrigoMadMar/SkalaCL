import { notFound } from "next/navigation";
import { AICopilotEconomicsSession } from "@/components/cases/ai-copilot-economics-session";
import { ExpandedCaseSession } from "@/components/cases/expanded-case-session";
import { getExpandedCase } from "@/content/cases/expanded";

export function generateStaticParams() { return [{ caseId: "pricing-pressure" }, { caseId: "ai-copilot-economics" }, { caseId: "ai-native-challenger" }]; }

export default async function CasePage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  if (caseId === "ai-copilot-economics") return <AICopilotEconomicsSession />;
  const config = getExpandedCase(caseId);
  if (!config) notFound();
  return <ExpandedCaseSession config={config} />;
}
