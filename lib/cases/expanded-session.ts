import { caseChallengeSchema, caseEvaluationSchema, type CaseChallenge, type CaseDecision, type CaseEvaluation, type CaseStage } from "./schemas";
import { caseStages, nextCaseStage } from "./session";

export type ExpandedCaseSession = {
  sessionId: string; caseId: string; version: string; currentStage: CaseStage; startedAt: string; updatedAt: string;
  evidenceViewed: string[]; masteryBefore: Record<string, number>; initialDecision?: CaseDecision; initialRationale?: string;
  citedEvidence?: string[]; primaryRisk?: string; challenge?: CaseChallenge; challengeResponse?: string;
  finalDecision?: CaseDecision; revisedRationale?: string; recommendation?: string; reviewTrigger?: string;
  evaluation?: CaseEvaluation; masteryAfter?: Record<string, number>; completedAt?: string;
};
export const expandedCaseStorageKey = (slug: string) => `skala.case.${slug}.v0.1`;
export function createExpandedCaseSession(caseId: string, version: string, masteryBefore: Record<string, number>): ExpandedCaseSession { const now = new Date().toISOString(); return { sessionId: globalThis.crypto?.randomUUID?.() ?? `case-session-${Date.now()}`, caseId, version, currentStage: "intro", startedAt: now, updatedAt: now, evidenceViewed: [], masteryBefore }; }
export function parseExpandedCaseSession(raw: string | null, caseId: string, version: string, masteryBefore: Record<string, number>) { try { const stored = JSON.parse(raw ?? "null") as ExpandedCaseSession | null; if (stored?.caseId === caseId && stored.version === version && typeof stored.sessionId === "string" && caseStages.includes(stored.currentStage) && Array.isArray(stored.evidenceViewed) && (!stored.challenge || caseChallengeSchema.safeParse(stored.challenge).success) && (!stored.evaluation || caseEvaluationSchema.safeParse(stored.evaluation).success)) return stored; } catch { /* clean session */ } return createExpandedCaseSession(caseId, version, masteryBefore); }
export { caseStages, nextCaseStage };
