export type EvidenceType = "exposure" | "recall" | "application" | "case" | "delayed";

export type EvidenceEvent = {
  id: string;
  skillId: string;
  type: EvidenceType;
  performance: number;
  weight?: number;
  occurredAt: string;
  sourceId: string;
  dimensions?: Record<string, number>;
  metadata?: {
    initialDecision?: string;
    finalDecision?: string;
    challengeType?: string;
    rationaleSummary?: string;
    evaluatorVersion?: string;
    answerId?: string;
    caseId?: string;
    caseVersion?: string;
    trajectory?: string;
  };
};

export type MasteryStatus = "unseen" | "learning" | "learned" | "mastered" | "demonstrated";

export type SkillMastery = {
  skillId: string;
  mastery: number;
  confidence: number;
  exposureCount: number;
  evidenceCount: number;
  caseEvidenceCount: number;
  lastEvidenceAt: string | null;
  lastValidatedAt: string | null;
  status: MasteryStatus;
};

export const evidenceWeights: Record<EvidenceType, number> = {
  exposure: 0,
  recall: 0.7,
  application: 1,
  case: 1.4,
  delayed: 1.3,
};

export function calculateMastery(skillId: string, events: EvidenceEvent[]): SkillMastery {
  const skillEvents = events
    .filter((event) => event.skillId === skillId)
    .sort((a, b) => a.occurredAt.localeCompare(b.occurredAt));
  const exposures = skillEvents.filter((event) => event.type === "exposure");
  const evidence = skillEvents.filter((event) => event.type !== "exposure");
  let mastery = 0;

  for (const [index, event] of evidence.entries()) {
    const weight = event.weight ?? evidenceWeights[event.type];
    const target = Math.max(0, Math.min(1, event.performance)) * 100;
    const recencyFactor = 0.78 + 0.22 * ((index + 1) / evidence.length);
    const proposed = mastery + (target - mastery) * Math.min(0.42, 0.18 * weight) * recencyFactor;
    const delta = Math.max(-12, Math.min(18, proposed - mastery));
    mastery = Math.max(0, Math.min(100, mastery + delta));
  }

  const evidenceTypes = new Set(evidence.map((event) => event.type));
  const confidence = Math.min(1, (1 - Math.exp(-evidence.length / 3)) * (0.75 + evidenceTypes.size * 0.08));
  const caseEvidenceCount = evidence.filter((event) => event.type === "case").length;
  let status: MasteryStatus = "unseen";
  if (skillEvents.length) status = "learning";
  if (mastery >= 35 && evidence.length >= 2) status = "learned";
  if (mastery >= 65 && evidence.length >= 3 && evidenceTypes.size >= 2) status = "mastered";
  if (mastery >= 78 && caseEvidenceCount >= 2 && confidence >= 0.7) status = "demonstrated";

  const last = skillEvents.at(-1);
  const lastValidation = [...evidence].reverse().find((event) => event.type === "case" || event.type === "delayed");
  return {
    skillId,
    mastery: Math.round(mastery),
    confidence: Number(confidence.toFixed(2)),
    exposureCount: exposures.length,
    evidenceCount: evidence.length,
    caseEvidenceCount,
    lastEvidenceAt: last?.occurredAt ?? null,
    lastValidatedAt: lastValidation?.occurredAt ?? null,
    status,
  };
}

export function aggregateMastery(states: SkillMastery[], assessableCount = states.length) {
  const assessed = states.filter((state) => state.evidenceCount > 0);
  const mastery = assessed.length
    ? Math.round(assessed.reduce((sum, state) => sum + state.mastery, 0) / assessed.length)
    : 0;
  const coverage = assessableCount ? Math.round((assessed.length / assessableCount) * 100) : 0;
  return { mastery, coverage, evidenceCount: assessed.reduce((sum, state) => sum + state.evidenceCount, 0) };
}
