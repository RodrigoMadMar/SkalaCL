import { seedEvidence } from "@/content/mastery/seed";
import type { GraphNode } from "@/lib/content/schemas";
import { calculateMastery, type SkillMastery } from "@/lib/mastery/engine";

export type VisualNodeState = "distant" | "available" | "learning" | "mastered" | "demonstrated";

export function buildMasteryMap(nodes: GraphNode[], userEvidence = [] as typeof seedEvidence): Record<string, SkillMastery> {
  const evidence = [...seedEvidence, ...userEvidence];
  return Object.fromEntries(
    nodes.filter((node) => node.type === "skill").map((node) => [node.id, calculateMastery(node.id, evidence)]),
  );
}

export function getVisualState(node: GraphNode, masteryMap: Record<string, SkillMastery>): VisualNodeState {
  if (node.type !== "skill") return "available";
  const state = masteryMap[node.id];
  if (state?.status === "demonstrated") return "demonstrated";
  if (state?.status === "mastered") return "mastered";
  if (state && ["learning", "learned"].includes(state.status)) return "learning";
  const prerequisitesMet = node.prerequisites.every((id) => (masteryMap[id]?.mastery ?? 0) >= 35);
  return prerequisitesMet && ["playable", "validated"].includes(node.contentStatus) ? "available" : "distant";
}
