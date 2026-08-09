import type { GraphNode } from "@/lib/content/schemas";
import type { SkillMastery } from "@/lib/mastery/engine";

export type Recommendation = {
  skill: GraphNode;
  score: number;
  factors: RecommendationFactor[];
};

export type RecommendationFactor = "activeDomain" | "prerequisites" | "available" | "continuity" | "rubricGap";

export type RecommendationContext = { completedSkillIds?: string[]; weakestDimension?: string };

export function recommendNextSkill(
  nodes: GraphNode[],
  masteryBySkill: Record<string, SkillMastery>,
  activeDomain = "ai",
  lastSkillId?: string,
  context: RecommendationContext = {},
): Recommendation | null {
  const completed = new Set(context.completedSkillIds ?? []);
  const lastSkill = nodes.find((node) => node.id === lastSkillId);
  const eligible = nodes.filter((node) => {
    if (node.type !== "skill" || !["playable", "validated"].includes(node.contentStatus)) return false;
    if (completed.has(node.id)) return false;
    if ((masteryBySkill[node.id]?.mastery ?? 0) >= 80) return false;
    return node.prerequisites.every((id) => (masteryBySkill[id]?.mastery ?? 0) >= 35);
  });

  const ranked = eligible.map((skill) => {
    const current = masteryBySkill[skill.id]?.mastery ?? 0;
    const factors: RecommendationFactor[] = [];
    let score = (100 - current) * 0.42;
    if (skill.primaryDomain === activeDomain) {
      score += 28;
      factors.push("activeDomain");
    }
    if (skill.prerequisites.length) {
      score += 12;
      factors.push("prerequisites");
    } else {
      factors.push("available");
    }
    if (lastSkillId && (skill.relatedSkills.includes(lastSkillId) || lastSkill?.relatedSkills.includes(skill.id))) {
      score += 8;
      factors.push("continuity");
    }
    const economicGap = context.weakestDimension === "economicReasoning" && ["ai-pricing", "ai-inference-economics", "economics.unit-economics"].includes(skill.id);
    const strategyGap = context.weakestDimension === "strategicCoherence" && ["ai-model-commoditization", "competitive-advantage", "positioning"].includes(skill.id);
    if (economicGap || strategyGap) { score += 18; factors.push("rubricGap"); }
    return { skill, score, factors };
  }).sort((a, b) => b.score - a.score || a.skill.id.localeCompare(b.skill.id));

  return ranked[0] ?? null;
}
