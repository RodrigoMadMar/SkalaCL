import type { SurviaEvaluation } from "@/lib/ai/survia";
export const surviaStages = ["market", "economics", "initial", "competitor", "incentive", "final", "result"] as const;
export type SurviaStage = (typeof surviaStages)[number];
export type SurviaSession = { sessionId: string; version: string; stage: SurviaStage; startedAt: string; updatedAt: string; selectedQuestions: number[]; economicsResponse?: string; initialDecision?: number; initialRationale?: string; competitorResponse?: string; incentiveResponse?: string; finalDecision?: number; finalRecommendation?: string; uncertainty?: string; evaluation?: SurviaEvaluation; masteryBefore: Record<string, number>; masteryAfter?: Record<string, number>; completedAt?: string };
export const surviaStorageKey = "skala.program.business-core.survia.v1";
export function createSurviaSession(masteryBefore: Record<string, number>): SurviaSession { const now = new Date().toISOString(); return { sessionId: globalThis.crypto?.randomUUID?.() ?? `survia-${Date.now()}`, version: "1.0.0", stage: "market", startedAt: now, updatedAt: now, selectedQuestions: [], masteryBefore }; }
export function parseSurviaSession(raw: string | null, masteryBefore: Record<string, number>) { try { const value = JSON.parse(raw ?? "null") as SurviaSession | null; if (value?.version === "1.0.0" && surviaStages.includes(value.stage) && typeof value.sessionId === "string" && Array.isArray(value.selectedQuestions)) return value; } catch { /* clean */ } return createSurviaSession(masteryBefore); }
export function nextSurviaStage(stage: SurviaStage) { return surviaStages[Math.min(surviaStages.indexOf(stage) + 1, surviaStages.length - 1)]; }

