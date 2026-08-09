export type EvidenceBreakdown = {
  evidenceCount: number;
  conceptChecks: number;
  appliedDecisions: number;
  retainedChecks: number;
  lastEvidence?: string;
};

export type DomainMasterySeed = {
  id: string;
  mastery: number;
  coverage: number;
  evidence: EvidenceBreakdown;
};

export const domainMasterySeed: DomainMasterySeed[] = [
  { id: "ai", mastery: 44, coverage: 29, evidence: { evidenceCount: 18, conceptChecks: 6, appliedDecisions: 8, retainedChecks: 4, lastEvidence: "2026-08-06" } },
  { id: "strategy", mastery: 42, coverage: 38, evidence: { evidenceCount: 14, conceptChecks: 5, appliedDecisions: 6, retainedChecks: 3, lastEvidence: "2026-08-04" } },
  { id: "finance", mastery: 35, coverage: 31, evidence: { evidenceCount: 9, conceptChecks: 4, appliedDecisions: 4, retainedChecks: 1, lastEvidence: "2026-08-01" } },
  { id: "data-decisions", mastery: 29, coverage: 24, evidence: { evidenceCount: 5, conceptChecks: 3, appliedDecisions: 1, retainedChecks: 1, lastEvidence: "2026-07-27" } },
];

export const demonstratedSkillIds = ["competitive-advantage", "unit-economics", "ai-models-products"];

export const profileCapabilityIds = [
  "ai-economics", "competitive-advantage", "pricing-strategy", "ai-build-buy", "unit-economics",
];
