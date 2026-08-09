import { graphNodes } from "@/content/graph/catalogue";
import { graphDefinitionSchema, type GraphDefinition } from "./schemas";

export function loadGraph(): GraphDefinition {
  const edges = graphNodes.flatMap((node) => {
    const hierarchy = node.parentId ? [{ id: `part-of:${node.id}:${node.parentId}`, source: node.parentId, target: node.id, type: "part_of" as const }] : [];
    const prerequisites = node.prerequisites.map((source) => ({ id: `requires:${source}:${node.id}`, source, target: node.id, type: "requires" as const }));
    const related = node.relatedSkills.map((target) => ({ id: `related:${node.id}:${target}`, source: node.id, target, type: "related_to" as const }));
    return [...hierarchy, ...prerequisites, ...related];
  });
  return graphDefinitionSchema.parse({ version: "0.1", nodes: graphNodes, edges });
}
