import type { GraphNode } from "@/lib/content/schemas";
import type { SkillMastery } from "@/lib/mastery/engine";

export type Recommendation = {
  skill: GraphNode;
  score: number;
  factors: RecommendationFactor[];
};

export type RecommendationFactor = "activeDomain" | "prerequisites" | "available" | "continuity";

export function recommendNextSkill(
  nodes: GraphNode[],
  masteryBySkill: Record<string, SkillMastery>,
  activeDomain = "ai",
  lastSkillId?: string,
): Recommendation | null {
  const eligible = nodes.filter((node) => {
    if (node.type !== "skill" || !["playable", "validated"].includes(node.contentStatus)) return false;
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
    if (lastSkillId && skill.relatedSkills.includes(lastSkillId)) {
      score += 8;
      factors.push("continuity");
    }
    return { skill, score, factors };
  }).sort((a, b) => b.score - a.score || a.skill.id.localeCompare(b.skill.id));

  return ranked[0] ?? null;
}
