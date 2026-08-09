export const unitSkillStages = ["diagnostic", "model", "interaction", "application", "challenge", "transfer", "summary"] as const;
export type UnitSkillStage = (typeof unitSkillStages)[number];

export type UnitSkillSession = {
  sessionId: string;
  skillId: string;
  version: string;
  stage: UnitSkillStage;
  startedAt: string;
  updatedAt: string;
  initialMastery: number;
  diagnosticChoice?: number;
  interactionValue: number;
  quantitativeAnswer?: number;
  applicationResponse?: string;
  challengeResponse?: string;
  transferChoice?: number;
  masteryAfter?: number;
  completedAt?: string;
};

export const unitSkillStorageKey = (skillId: string) => `skala.program.business-core.unit-01.${skillId}.v1`;

export function createUnitSkillSession(skillId: string, initialMastery: number): UnitSkillSession {
  const now = new Date().toISOString();
  return { sessionId: globalThis.crypto?.randomUUID?.() ?? `unit-skill-${Date.now()}`, skillId, version: "1.0.0", stage: "diagnostic", startedAt: now, updatedAt: now, initialMastery, interactionValue: 0 };
}

export function parseUnitSkillSession(raw: string | null, skillId: string, initialMastery: number) {
  try {
    const value = JSON.parse(raw ?? "null") as UnitSkillSession | null;
    if (value?.skillId === skillId && value.version === "1.0.0" && unitSkillStages.includes(value.stage) && typeof value.sessionId === "string") return value;
  } catch { /* start clean */ }
  return createUnitSkillSession(skillId, initialMastery);
}

export function nextUnitSkillStage(stage: UnitSkillStage) {
  return unitSkillStages[Math.min(unitSkillStages.indexOf(stage) + 1, unitSkillStages.length - 1)];
}
