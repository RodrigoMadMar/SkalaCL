import { z } from "zod";

export const nodeTypeSchema = z.enum(["root", "core_area", "domain", "specialization", "skill"]);
export const contentStatusSchema = z.enum(["mapped", "outlined", "playable", "validated"]);

export const graphNodeSchema = z.object({
  id: z.string().min(2),
  type: nodeTypeSchema,
  title: z.string().min(2),
  summary: z.string().min(8),
  parentId: z.string().nullable(),
  primaryDomain: z.string(),
  specialization: z.string().nullable(),
  difficulty: z.number().int().min(1).max(5).nullable(),
  estimatedMinutes: z.number().int().positive().nullable(),
  prerequisites: z.array(z.string()),
  relatedSkills: z.array(z.string()),
  evidenceTargets: z.array(z.enum(["conceptual", "application", "case", "delayed"])),
  contentStatus: contentStatusSchema,
});

export const graphEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  type: z.enum(["requires", "supports", "related_to", "applies_to", "part_of"]),
});

export const graphDefinitionSchema = z.object({
  version: z.string(),
  nodes: z.array(graphNodeSchema).min(1),
  edges: z.array(graphEdgeSchema),
}).superRefine((graph, ctx) => {
  const ids = new Set(graph.nodes.map((node) => node.id));
  if (ids.size !== graph.nodes.length) {
    ctx.addIssue({ code: "custom", message: "Graph node IDs must be unique" });
  }
  for (const node of graph.nodes) {
    if (node.parentId && !ids.has(node.parentId)) {
      ctx.addIssue({ code: "custom", message: `Unknown parent ${node.parentId} for ${node.id}` });
    }
    for (const prerequisite of node.prerequisites) {
      if (!ids.has(prerequisite)) {
        ctx.addIssue({ code: "custom", message: `Unknown prerequisite ${prerequisite} for ${node.id}` });
      }
    }
  }
  for (const edge of graph.edges) {
    if (!ids.has(edge.source) || !ids.has(edge.target)) {
      ctx.addIssue({ code: "custom", message: `Edge ${edge.id} references an unknown node` });
    }
  }
});

export const skillContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  objective: z.string(),
  summary: z.string(),
  difficulty: z.number().int().min(1).max(5),
  estimatedMinutes: z.number().int().positive(),
  prerequisites: z.array(z.string()),
  masteryTargets: z.array(z.string()),
  blocks: z.array(z.object({
    type: z.enum(["editorial", "definition", "example", "visual", "think", "choice", "open_response", "ai_challenge", "application", "recall_check", "mastery_summary"]),
  }).passthrough()),
  version: z.string(),
  reviewStatus: z.enum(["draft", "reviewed", "validated"]),
});

export type GraphDefinition = z.infer<typeof graphDefinitionSchema>;
export type GraphNode = z.infer<typeof graphNodeSchema>;
export type GraphEdge = z.infer<typeof graphEdgeSchema>;
