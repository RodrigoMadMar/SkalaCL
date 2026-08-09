import type { ExpandedCaseConfig } from "@/content/cases/expanded";
import type { Locale } from "@/i18n/config";
import { caseChallengeSchema, caseEvaluationSchema, type CaseDecision, type CaseEvaluation } from "@/lib/cases/schemas";

type BaseInput = { config: ExpandedCaseConfig; locale: Locale; decision: CaseDecision; rationale: string; citedEvidence: string[]; primaryRisk: string };
type EvaluationInput = BaseInput & { challengeResponse: string; finalDecision: CaseDecision; revisedRationale: string; recommendation: string; reviewTrigger: string };
const l = (es: string, en: string) => ({ "es-CL": es, en });
const clamp = (value: number) => Number(Math.max(0, Math.min(1, value)).toFixed(2));
const tradeoffs = ["pero", "aunque", "a cambio", "sin embargo", "but", "although", "however", "trade-off"];
const conditions = [" si ", "cuando", "umbral", "revis", " if ", "when", "threshold", "unless"];

export async function challengeExpandedCase(input: BaseInput) {
  const key = input.decision === "defer" ? "retention" : input.decision === "hybrid" ? "channel" : "control";
  const available = Object.keys(input.config.definition.newInformation); const newInformationId = available.includes(key) ? key : available[input.decision === "vendor" ? 0 : 1] ?? available[0];
  const prompt = l(
    `Tu tesis favorece “${input.config.decisionLabels["es-CL"][input.decision]}”. ¿Qué supuesto tendría que fallar para que esa recomendación deje de ser coherente?`,
    `Your thesis favors “${input.config.decisionLabels.en[input.decision]}.” Which assumption would have to fail for that recommendation to stop being coherent?`,
  );
  return caseChallengeSchema.parse({ type: "assumption-boundary", prompt, targetedAssumption: "decision-boundary", newInformationId, evaluatorVersion: "deterministic-expanded-case-challenge-v1" });
}

export async function evaluateExpandedCase(input: EvaluationInput): Promise<CaseEvaluation> {
  const text = `${input.rationale} ${input.primaryRisk} ${input.challengeResponse} ${input.revisedRationale} ${input.recommendation} ${input.reviewTrigger}`.toLowerCase();
  const markerCount = input.config.markers[input.locale].filter((marker) => text.includes(marker.toLowerCase())).length;
  const tradeoff = tradeoffs.some((marker) => text.includes(marker)); const conditional = conditions.some((marker) => text.includes(marker));
  const evidenceUse = clamp(.3 + input.citedEvidence.length * .09 + markerCount * .045); const strategicReasoning = clamp(.34 + markerCount * .055 + (tradeoff ? .18 : 0)); const decisionCoherence = clamp(.38 + (tradeoff ? .16 : 0) + (conditional ? .16 : 0) + (input.recommendation.length > 120 ? .1 : 0)); const adaptability = clamp(.4 + (input.challengeResponse.length > 70 ? .13 : 0) + (input.revisedRationale.length > 90 ? .13 : 0) + (conditional ? .12 : 0)); const problemDiagnosis = clamp(.34 + markerCount * .06 + (input.primaryRisk.length > 35 ? .12 : 0)); const communication = clamp(.4 + (input.recommendation.length > 120 ? .18 : .08) + (input.reviewTrigger.length > 45 ? .16 : 0)); const financialReasoning = clamp(.3 + (text.includes("margen") || text.includes("margin") || text.includes("costo") || text.includes("cost") ? .28 : 0) + (conditional ? .12 : 0));
  const reason = { problemDiagnosis: l("Separa la señal visible del mecanismo que cambia la decisión.", "Separates the visible signal from the mechanism that changes the decision."), evidenceUse: l("Conecta fuentes del caso con la recomendación.", "Connects case sources to the recommendation."), strategicReasoning: l("Hace explícitos mecanismos y trade-offs.", "Makes mechanisms and trade-offs explicit."), decisionCoherence: l("Alinea tesis, riesgo y condición de revisión.", "Aligns thesis, risk and review condition."), adaptability: l("Procesa nueva información sin premiar el cambio por sí mismo.", "Processes new information without rewarding change by itself."), communication: l("Formula una recomendación ejecutiva y específica.", "Frames a specific executive recommendation."), financialReasoning: l("Relaciona economía y comportamiento, no una cifra aislada.", "Connects economics and behavior rather than one isolated figure.") };
  const dimensions = { problemDiagnosis: { score: problemDiagnosis, reason: reason.problemDiagnosis }, evidenceUse: { score: evidenceUse, reason: reason.evidenceUse }, strategicReasoning: { score: strategicReasoning, reason: reason.strategicReasoning }, decisionCoherence: { score: decisionCoherence, reason: reason.decisionCoherence }, adaptability: { score: adaptability, reason: reason.adaptability }, communication: { score: communication, reason: reason.communication }, financialReasoning: { score: financialReasoning, reason: reason.financialReasoning } };
  const scores = Object.values(dimensions).map((item) => item.score); const overallPerformance = clamp(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  const skillEvidence = input.config.definition.skills.map((skillId, index) => ({ skillId, performance: clamp((overallPerformance + scores[index % scores.length]) / 2), dimensions: index % 2 ? ["strategicReasoning", "adaptability"] as const : ["problemDiagnosis", "evidenceUse"] as const }));
  return caseEvaluationSchema.parse({ dimensions, strength: l("Tu recomendación conecta una decisión con evidencia y un trade-off explícito.", "Your recommendation connects a decision to evidence and an explicit trade-off."), improvement: conditional ? l("Jerarquiza mejor qué evidencia podría invalidar la tesis.", "Prioritize more sharply which evidence could invalidate the thesis.") : l("Convierte la revisión futura en un umbral observable.", "Turn the future review into an observable threshold."), trajectory: l(`Partiste con ${input.config.decisionLabels["es-CL"][input.decision]} y cerraste con ${input.config.decisionLabels["es-CL"][input.finalDecision]}, incorporando nueva evidencia.`, `You began with ${input.config.decisionLabels.en[input.decision]} and closed with ${input.config.decisionLabels.en[input.finalDecision]}, incorporating new evidence.`), overallPerformance, skillEvidence, evaluatorVersion: "deterministic-expanded-case-v1" });
}
