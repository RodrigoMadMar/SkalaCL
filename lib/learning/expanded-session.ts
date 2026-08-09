import type { ExpandedEvaluation } from "./expanded-schemas";

export const expandedSteps = ["entry", "think", "reveal", "application", "challenge", "transfer", "summary"] as const;
export type ExpandedStep = (typeof expandedSteps)[number];

export type ExpandedSkillSession = {
  sessionId: string;
  skillId: string;
  version: string;
  currentStep: ExpandedStep;
  startedAt: string;
  updatedAt: string;
  initialMastery: number;
  diagnosticResponse?: string;
  activeLens: number;
  applicationResponse?: string;
  initialEvaluation?: ExpandedEvaluation;
  challengeResponse?: string;
  finalEvaluation?: ExpandedEvaluation;
  recallAnswer?: number;
  recallPerformance?: number;
  masteryAfter?: number;
  nextSkillId?: string;
  completedAt?: string;
};

export function expandedSessionStorageKey(skillId: string) { return `skala.learning.${skillId}.v0.2`; }
export function createExpandedSession(skillId: string, version: string, initialMastery: number): ExpandedSkillSession { const now = new Date().toISOString(); return { sessionId: globalThis.crypto?.randomUUID?.() ?? `skill-session-${Date.now()}`, skillId, version, currentStep: "entry", startedAt: now, updatedAt: now, initialMastery, activeLens: 0 }; }
export function nextExpandedStep(step: ExpandedStep) { return expandedSteps[Math.min(expandedSteps.indexOf(step) + 1, expandedSteps.length - 1)]; }
export function parseExpandedSession(raw: string | null, skillId: string, version: string, initialMastery: number) { try { const stored = JSON.parse(raw ?? "null") as ExpandedSkillSession | null; if (stored?.skillId === skillId && stored.version === version && typeof stored.sessionId === "string" && expandedSteps.includes(stored.currentStep) && Number.isInteger(stored.activeLens)) return stored; } catch { /* clean session */ } return createExpandedSession(skillId, version, initialMastery); }
