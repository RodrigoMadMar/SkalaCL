import { z } from "zod";

export const learningDecisionSchema = z.enum(["build", "buy", "hybrid", "defer"]);
export const learningBlockTypeSchema = z.enum([
  "editorial", "think", "visual", "example", "open_response", "ai_challenge", "application", "recall_check", "mastery_summary",
]);

export const referenceSkillSchema = z.object({
  id: z.literal("ai.build-vs-buy"),
  domain: z.literal("ai"),
  specialization: z.literal("ai-strategy"),
  title: z.object({ "es-CL": z.string(), en: z.string() }),
  objective: z.object({ "es-CL": z.string().min(20), en: z.string().min(20) }),
  difficulty: z.literal(2),
  estimatedMinutes: z.literal(7),
  prerequisites: z.tuple([z.literal("ai.model-landscape"), z.literal("economics.unit-economics")]),
  masteryTargets: z.tuple([
    z.literal("ai.build-vs-buy"), z.literal("strategy.strategic-differentiation"), z.literal("economics.unit-economics"),
  ]),
  blocks: z.array(z.object({ id: z.string(), type: learningBlockTypeSchema })).min(10),
  version: z.string(),
  reviewStatus: z.literal("validated"),
});

export type LearningDecision = z.infer<typeof learningDecisionSchema>;
export type LearningBlockType = z.infer<typeof learningBlockTypeSchema>;

export const applicationEvaluationSchema = z.object({
  decision: learningDecisionSchema,
  dimensions: z.object({
    tradeoffRecognition: z.number().min(0).max(1),
    evidenceUse: z.number().min(0).max(1),
    economicReasoning: z.number().min(0).max(1),
    strategicCoherence: z.number().min(0).max(1),
    adaptability: z.number().min(0).max(1).optional(),
  }),
  assumptionsDetected: z.array(z.string()),
  omittedRelevantFactors: z.array(z.string()),
  strongestReason: z.string(),
  challengeTarget: z.string(),
  overallPerformance: z.number().min(0).max(1),
  evaluatorVersion: z.string(),
});

export const challengeResultSchema = z.object({
  challengeType: z.string(),
  challenge: z.string(),
  targetedAssumption: z.string(),
  introducedFact: z.string().optional(),
  requiresFollowUp: z.boolean(),
});

export type ApplicationEvaluation = z.infer<typeof applicationEvaluationSchema>;
export type ChallengeResult = z.infer<typeof challengeResultSchema>;
