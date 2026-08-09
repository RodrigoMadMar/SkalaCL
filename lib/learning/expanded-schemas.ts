import { z } from "zod";

export const localizedLearningTextSchema = z.object({ "es-CL": z.string().min(8), en: z.string().min(8) });

export const expandedSkillSchema = z.object({
  id: z.string().min(3),
  misconception: localizedLearningTextSchema,
  principle: localizedLearningTextSchema,
  boundary: localizedLearningTextSchema,
  diagnosticScenario: localizedLearningTextSchema,
  applicationScenario: localizedLearningTextSchema,
  counterfactual: localizedLearningTextSchema,
  transferScenario: localizedLearningTextSchema,
  transferCorrect: localizedLearningTextSchema,
  evaluationMarkers: z.object({ "es-CL": z.array(z.string()).min(3), en: z.array(z.string()).min(3) }),
  version: z.string(),
  reviewStatus: z.enum(["reviewed", "validated"]),
  review: z.object({ reviewedAt: z.string(), reviewer: z.string(), references: z.array(z.string()).min(1), freshness: z.enum(["stable", "time-sensitive"]) }),
});

export type ExpandedSkill = z.infer<typeof expandedSkillSchema>;

export const expandedEvaluationSchema = z.object({
  dimensions: z.object({ framing: z.number().min(0).max(1), mechanism: z.number().min(0).max(1), application: z.number().min(0).max(1), adaptability: z.number().min(0).max(1) }),
  overallPerformance: z.number().min(0).max(1),
  evaluatorVersion: z.string(),
});

export type ExpandedEvaluation = z.infer<typeof expandedEvaluationSchema>;
