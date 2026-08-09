import type { ApplicationEvaluation, ChallengeResult, LearningDecision } from "./schemas";

export const buildVsBuySessionStorageKey = "skala.learning.ai.build-vs-buy.v0.1";

export type BuildVsBuySession = {
  sessionId: string;
  skillId: "ai.build-vs-buy";
  version: "0.1";
  currentBlock: number;
  startedAt: string;
  updatedAt: string;
  initialMastery: number;
  diagnosticDecision?: LearningDecision;
  diagnosticRationale?: string;
  activeLens?: number;
  fieldX: number;
  fieldY: number;
  fieldPlaced: boolean;
  fieldMoved?: boolean;
  applicationDecision?: LearningDecision;
  applicationResponse?: string;
  initialEvaluation?: ApplicationEvaluation;
  challenge?: ChallengeResult;
  challengeResponse?: string;
  finalDecision?: LearningDecision;
  finalRationale?: string;
  finalEvaluation?: ApplicationEvaluation;
  recallAnswer?: number;
  recallPerformance?: number;
  masteryAfter?: number;
  nextSkillId?: string;
  completedAt?: string;
};

export function createBuildVsBuySession(initialMastery: number): BuildVsBuySession {
  const now = new Date().toISOString();
  return {
    sessionId: globalThis.crypto?.randomUUID?.() ?? `session-${Date.now()}`,
    skillId: "ai.build-vs-buy",
    version: "0.1",
    currentBlock: 0,
    startedAt: now,
    updatedAt: now,
    initialMastery,
    fieldX: 50,
    fieldY: 50,
    fieldPlaced: false,
  };
}

export function parseBuildVsBuySession(raw: string | null, initialMastery: number) {
  try {
    const stored = JSON.parse(raw ?? "null") as BuildVsBuySession | null;
    if (stored?.skillId === "ai.build-vs-buy" && stored.version === "0.1"
      && typeof stored.sessionId === "string" && Number.isInteger(stored.currentBlock)
      && stored.currentBlock >= 0 && stored.currentBlock < 10
      && Number.isFinite(stored.fieldX) && Number.isFinite(stored.fieldY)) return stored;
  } catch { /* start a clean session */ }
  return createBuildVsBuySession(initialMastery);
}

export function readBuildVsBuySession(initialMastery: number) {
  return parseBuildVsBuySession(window.localStorage.getItem(buildVsBuySessionStorageKey), initialMastery);
}
