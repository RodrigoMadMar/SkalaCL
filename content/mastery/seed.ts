import type { EvidenceEvent } from "@/lib/mastery/engine";

const highEvidence = [
  ["recall", 0.9], ["application", 0.86], ["delayed", 0.82], ["case", 0.88],
  ["case", 0.83], ["application", 0.91], ["delayed", 0.87], ["application", 0.9],
] as const;

const learningEvidence = [["exposure", 1], ["recall", 0.72], ["application", 0.64]] as const;

function eventsFor(skillId: string, source: readonly (readonly [EvidenceEvent["type"], number])[], monthOffset = 0): EvidenceEvent[] {
  return source.map(([type, performance], index) => ({
    id: `${skillId}-${index}`,
    skillId,
    type,
    performance,
    occurredAt: `2026-${String(6 + monthOffset).padStart(2, "0")}-${String(index + 2).padStart(2, "0")}T12:00:00.000Z`,
    sourceId: type === "case" ? "case-ai-copilot-economics" : `session-${skillId}-${index}`,
  }));
}

export const seedEvidence: EvidenceEvent[] = [
  ...eventsFor("competitive-advantage", highEvidence),
  ...eventsFor("financial-statements", highEvidence.slice(0, 5)),
  ...eventsFor("unit-economics", highEvidence, 1),
  ...eventsFor("probability", highEvidence.slice(0, 4)),
  ...eventsFor("ai-models-products", highEvidence, 1),
  ...eventsFor("ai-training-inference", learningEvidence, 1),
  ...eventsFor("ai-inference-economics", learningEvidence, 1),
  ...eventsFor("ai-capability-feature-product", highEvidence.slice(0, 4)),
  ...eventsFor("ai-copilot-agent", learningEvidence),
  ...eventsFor("agent-workflow-decomposition", highEvidence.slice(0, 4)),
];
