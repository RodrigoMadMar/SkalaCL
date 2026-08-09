import type { GraphDefinition, GraphNode } from "@/lib/content/schemas";
import { aggregateMastery, calculateMastery, type EvidenceEvent, type SkillMastery } from "@/lib/mastery/engine";

export type EvidenceBreakdown = {
  evidenceCount: number;
  conceptChecks: number;
  appliedDecisions: number;
  retainedChecks: number;
  lastEvidence?: string;
};

export type ProfileRollup = {
  id: string;
  title: string;
  summary: string;
  mastery: number;
  coverage: number;
  evidenceCount: number;
  assessedSkills: number;
  assessableSkills: number;
  demonstratedSkills: number;
  latestValidation: string | null;
  evidence: EvidenceBreakdown;
  state: "available" | "learning" | "mastered" | "demonstrated";
};

export type ProfileSkill = {
  node: GraphNode;
  mastery: SkillMastery;
};

export type CaseCompletionInput = {
  caseId: string;
  completedAt: string;
};

export type ExpertiseProfile = {
  overall: ProfileRollup;
  domains: ProfileRollup[];
  specializations: ProfileRollup[];
  capabilities: ProfileSkill[];
  demonstratedSkills: ProfileSkill[];
  masteredSkills: ProfileSkill[];
  recentEvidence: EvidenceEvent[];
  evidenceCount: number;
  casesCompleted: number;
  latestValidation: string | null;
};

const assessableStatuses = new Set(["playable", "validated"]);

function latest(values: Array<string | null | undefined>) {
  return values.filter((value): value is string => Boolean(value)).sort().at(-1) ?? null;
}

function breakdown(events: EvidenceEvent[]): EvidenceBreakdown {
  const assessed = events.filter((event) => event.type !== "exposure");
  return {
    evidenceCount: assessed.length,
    conceptChecks: assessed.filter((event) => event.type === "recall").length,
    appliedDecisions: assessed.filter((event) => event.type === "application" || event.type === "case").length,
    retainedChecks: assessed.filter((event) => event.type === "delayed").length,
    lastEvidence: latest(assessed.map((event) => event.occurredAt)) ?? undefined,
  };
}

function rollupState(mastery: number, evidenceCount: number, demonstratedSkills: number): ProfileRollup["state"] {
  if (demonstratedSkills > 0) return "demonstrated";
  if (mastery >= 65) return "mastered";
  if (evidenceCount > 0) return "learning";
  return "available";
}

function buildRollup(node: GraphNode, skills: GraphNode[], states: Record<string, SkillMastery>, events: EvidenceEvent[]): ProfileRollup {
  const skillIds = new Set(skills.map((skill) => skill.id));
  const skillStates = skills.map((skill) => states[skill.id]);
  const aggregate = aggregateMastery(skillStates, skills.length);
  const relevantEvents = events.filter((event) => skillIds.has(event.skillId));
  const demonstratedSkills = skillStates.filter((state) => state.status === "demonstrated").length;
  return {
    id: node.id,
    title: node.title,
    summary: node.summary,
    ...aggregate,
    assessedSkills: skillStates.filter((state) => state.evidenceCount > 0).length,
    assessableSkills: skills.length,
    demonstratedSkills,
    latestValidation: latest(skillStates.map((state) => state.lastValidatedAt)),
    evidence: breakdown(relevantEvents),
    state: rollupState(aggregate.mastery, aggregate.evidenceCount, demonstratedSkills),
  };
}

function normalizeCaseId(value: string) {
  return value.toLowerCase().replace(/^case[.-]/, "").replace(/[^a-z0-9]+/g, "");
}

export function buildExpertiseProfile(
  graph: GraphDefinition,
  events: EvidenceEvent[],
  caseCompletions: CaseCompletionInput[] = [],
): ExpertiseProfile {
  const assessableSkills = graph.nodes.filter((node) => node.type === "skill" && assessableStatuses.has(node.contentStatus));
  const states = Object.fromEntries(
    graph.nodes.filter((node) => node.type === "skill").map((node) => [node.id, calculateMastery(node.id, events)]),
  );
  const profileSkills = assessableSkills.map((node) => ({ node, mastery: states[node.id] }));
  const domainNodes = graph.nodes.filter((node) => node.id === "business-core" || node.id === "ai");
  const domains = domainNodes.map((node) => buildRollup(
    node,
    assessableSkills.filter((skill) => skill.primaryDomain === node.id),
    states,
    events,
  ));
  const specializationNodes = graph.nodes.filter((node) => node.type === "core_area" || node.type === "specialization");
  const specializations = specializationNodes
    .map((node) => buildRollup(node, assessableSkills.filter((skill) => skill.parentId === node.id), states, events))
    .filter((item) => item.evidenceCount > 0)
    .sort((a, b) => b.mastery - a.mastery || b.coverage - a.coverage);
  const demonstratedSkills = profileSkills
    .filter((item) => item.mastery.status === "demonstrated")
    .sort((a, b) => b.mastery.mastery - a.mastery.mastery);
  const masteredSkills = profileSkills
    .filter((item) => item.mastery.status === "mastered" || item.mastery.status === "demonstrated")
    .sort((a, b) => b.mastery.mastery - a.mastery.mastery);
  const capabilities = profileSkills
    .filter((item) => item.mastery.evidenceCount > 0)
    .sort((a, b) => {
      const statusGap = Number(b.mastery.status === "demonstrated") - Number(a.mastery.status === "demonstrated");
      return statusGap || b.mastery.mastery - a.mastery.mastery || b.mastery.confidence - a.mastery.confidence;
    })
    .slice(0, 5);
  const overallNode: GraphNode = {
    id: "overall",
    type: "root",
    title: "Skala",
    summary: "Evidence-backed expertise across the active graph.",
    parentId: null,
    primaryDomain: "overall",
    specialization: null,
    difficulty: null,
    estimatedMinutes: null,
    prerequisites: [],
    relatedSkills: [],
    evidenceTargets: [],
    contentStatus: "validated",
  };
  const overall = buildRollup(overallNode, assessableSkills, states, events);
  const caseIds = new Set(caseCompletions.map((completion) => normalizeCaseId(completion.caseId)));
  events.filter((event) => event.type === "case").forEach((event) => {
    caseIds.add(normalizeCaseId(event.metadata?.caseId ?? event.sourceId));
  });
  const assessedEvents = events.filter((event) => event.type !== "exposure");

  return {
    overall,
    domains,
    specializations,
    capabilities,
    demonstratedSkills,
    masteredSkills,
    recentEvidence: [...assessedEvents].sort((a, b) => b.occurredAt.localeCompare(a.occurredAt)).slice(0, 5),
    evidenceCount: assessedEvents.length,
    casesCompleted: caseIds.size,
    latestValidation: latest(events.filter((event) => event.type === "case" || event.type === "delayed").map((event) => event.occurredAt)),
  };
}
