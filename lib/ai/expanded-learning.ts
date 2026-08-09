import type { ExpandedSkill } from "@/lib/learning/expanded-schemas";
import { expandedEvaluationSchema, type ExpandedEvaluation } from "@/lib/learning/expanded-schemas";

export type ExpandedEvaluationInput = { skill: ExpandedSkill; locale: "es-CL" | "en"; diagnosticResponse: string; applicationResponse: string; challengeResponse?: string };
export interface ExpandedLearningAIAdapter { evaluateExpandedApplication(input: ExpandedEvaluationInput): Promise<unknown> }
const clamp = (value: number) => Number(Math.max(0, Math.min(1, value)).toFixed(2));

function fallback(input: ExpandedEvaluationInput): ExpandedEvaluation {
  const initial = `${input.diagnosticResponse} ${input.applicationResponse}`.toLowerCase(); const final = `${initial} ${input.challengeResponse ?? ""}`.toLowerCase(); const markers = input.skill.evaluationMarkers[input.locale]; const markerCount = markers.filter((marker) => final.includes(marker.toLowerCase())).length; const tradeoff = ["pero", "aunque", "a cambio", "sin embargo", "but", "although", "however", "trade-off"].some((marker) => final.includes(marker)); const conditional = [" si ", "cuando", "umbral", "revis", " if ", "when", "threshold", "unless"].some((marker) => final.includes(marker)); const framing = clamp(0.3 + Math.min(0.35, input.diagnosticResponse.length / 300) + (markerCount >= 2 ? 0.15 : 0)); const mechanism = clamp(0.25 + markerCount * 0.11 + (tradeoff ? 0.12 : 0)); const application = clamp(0.28 + Math.min(0.28, input.applicationResponse.length / 420) + markerCount * 0.07 + (tradeoff ? 0.12 : 0)); const adaptability = clamp(input.challengeResponse ? 0.35 + Math.min(0.25, input.challengeResponse.length / 420) + (conditional ? 0.2 : 0) + (tradeoff ? 0.1 : 0) : 0.35); const dimensions = { framing, mechanism, application, adaptability }; return expandedEvaluationSchema.parse({ dimensions, overallPerformance: clamp(Object.values(dimensions).reduce((sum, score) => sum + score, 0) / 4), evaluatorVersion: "deterministic-expanded-learning-v1" });
}

export async function evaluateExpandedApplication(input: ExpandedEvaluationInput, adapter?: ExpandedLearningAIAdapter) { if (adapter) { try { return expandedEvaluationSchema.parse(await adapter.evaluateExpandedApplication(input)); } catch { /* deterministic fallback */ } } return fallback(input); }
