import { graphNodes } from "@/content/graph/catalogue";
import { localizeNodes } from "@/content/graph/translations";
import { getExpandedSkill } from "@/content/skills/expanded";
import { defaultLocale, type Locale } from "@/i18n/config";
import { graphDefinitionSchema, type GraphDefinition } from "./schemas";
import { getEconomicsSkill } from "@/content/programs/economics-unit";

export function loadGraph(locale: Locale = defaultLocale): GraphDefinition {
  const contentAlignedNodes = graphNodes.map((node) => {
    if (node.type !== "skill") return node;
    if (node.id === "ai.build-vs-buy") return { ...node, contentStatus: "validated" as const };
    const content = getExpandedSkill(node.id);
    if (content) return { ...node, contentStatus: content.reviewStatus === "validated" ? "validated" as const : "playable" as const };
    if (getEconomicsSkill(node.id)) return { ...node, contentStatus: node.contentStatus === "validated" ? "validated" as const : "playable" as const };
    return { ...node, contentStatus: ["playable", "validated"].includes(node.contentStatus) ? "outlined" as const : node.contentStatus };
  });
  const nodes = localizeNodes(contentAlignedNodes, locale);
  const edges = nodes.flatMap((node) => {
    const hierarchy = node.parentId ? [{ id: `part-of:${node.id}:${node.parentId}`, source: node.parentId, target: node.id, type: "part_of" as const }] : [];
    const prerequisites = node.prerequisites.map((source) => ({ id: `requires:${source}:${node.id}`, source, target: node.id, type: "requires" as const }));
    const related = node.relatedSkills.map((target) => ({ id: `related:${node.id}:${target}`, source: node.id, target, type: "related_to" as const }));
    return [...hierarchy, ...prerequisites, ...related];
  });
  return graphDefinitionSchema.parse({ version: "0.2", nodes, edges });
}
