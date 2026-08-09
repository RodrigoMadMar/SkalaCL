import { caseChallengeSchema, caseEvaluationSchema, type CaseChallenge, type CaseDecision, type CaseEvaluation, type CaseStage } from "./schemas";

export const aiCopilotCaseStorageKey = "skala.case.ai-copilot-economics.v0.1";
export const caseStages: CaseStage[] = [
  "intro", "evidence", "initial_decision", "challenge", "new_information", "revision", "final_recommendation", "result",
];

export type AICopilotCaseSession = {
  sessionId: string;
  caseId: "case.ai-copilot-economics";
  version: "0.1";
  currentStage: CaseStage;
  startedAt: string;
  updatedAt: string;
  evidenceViewed: string[];
  masteryBefore: Record<string, number>;
  initialDecision?: CaseDecision;
  initialRationale?: string;
  citedEvidence?: string[];
  primaryRisk?: string;
  challenge?: CaseChallenge;
  challengeResponse?: string;
  newInformationAcknowledged?: boolean;
  finalDecision?: CaseDecision;
  revisedRationale?: string;
  recommendation?: string;
  reviewTrigger?: string;
  evaluation?: CaseEvaluation;
  masteryAfter?: Record<string, number>;
  completedAt?: string;
};

export function createAICopilotCaseSession(masteryBefore: Record<string, number>): AICopilotCaseSession {
  const now = new Date().toISOString();
  return {
    sessionId: globalThis.crypto?.randomUUID?.() ?? `case-session-${Date.now()}`,
    caseId: "case.ai-copilot-economics",
    version: "0.1",
    currentStage: "intro",
    startedAt: now,
    updatedAt: now,
    evidenceViewed: [],
    masteryBefore,
  };
}

export function nextCaseStage(current: CaseStage): CaseStage {
  return caseStages[Math.min(caseStages.indexOf(current) + 1, caseStages.length - 1)];
}

export function parseAICopilotCaseSession(raw: string | null, masteryBefore: Record<string, number>) {
  try {
    const stored = JSON.parse(raw ?? "null") as AICopilotCaseSession | null;
    if (stored?.caseId === "case.ai-copilot-economics" && stored.version === "0.1"
      && typeof stored.sessionId === "string" && caseStages.includes(stored.currentStage)
      && Array.isArray(stored.evidenceViewed)
      && (!stored.challenge || caseChallengeSchema.safeParse(stored.challenge).success)
      && (!stored.evaluation || caseEvaluationSchema.safeParse(stored.evaluation).success)) return stored;
  } catch { /* start a clean case */ }
  return createAICopilotCaseSession(masteryBefore);
}
