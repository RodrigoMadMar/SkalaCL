import { z } from "zod";

export const caseDecisionSchema = z.enum(["vendor", "build", "hybrid", "defer"]);
export const caseStageSchema = z.enum([
  "intro", "evidence", "initial_decision", "challenge", "new_information", "revision", "final_recommendation", "result",
]);
export const caseDimensionSchema = z.enum([
  "problemDiagnosis", "evidenceUse", "strategicReasoning", "decisionCoherence", "adaptability", "communication", "financialReasoning",
]);

export const localizedTextSchema = z.object({ "es-CL": z.string(), en: z.string() });

export const caseDefinitionSchema = z.object({
  id: z.string().min(3),
  slug: z.string().min(3),
  version: z.string(),
  estimatedMinutes: z.number().int().positive(),
  skills: z.array(z.string()).min(2),
  rubricId: z.string(),
  title: localizedTextSchema,
  subtitle: localizedTextSchema,
  context: z.object({ company: z.string(), role: localizedTextSchema, premise: localizedTextSchema }),
  sections: z.array(z.object({
    id: z.string(),
    label: localizedTextSchema,
    title: localizedTextSchema,
    body: localizedTextSchema,
    metrics: z.array(z.object({ label: localizedTextSchema, value: z.string(), note: localizedTextSchema })),
  })).min(3),
  newInformation: z.record(z.string(), z.object({ title: localizedTextSchema, body: localizedTextSchema, implication: localizedTextSchema })),
  reviewStatus: z.enum(["draft", "reviewed", "validated"]),
});

export const caseChallengeSchema = z.object({
  type: z.string(),
  prompt: localizedTextSchema,
  targetedAssumption: z.string(),
  newInformationId: z.string(),
  evaluatorVersion: z.string(),
});

export const caseEvaluationSchema = z.object({
  dimensions: z.record(caseDimensionSchema, z.object({ score: z.number().min(0).max(1), reason: localizedTextSchema })),
  strength: localizedTextSchema,
  improvement: localizedTextSchema,
  trajectory: localizedTextSchema,
  overallPerformance: z.number().min(0).max(1),
  skillEvidence: z.array(z.object({ skillId: z.string(), performance: z.number().min(0).max(1), dimensions: z.array(caseDimensionSchema) })),
  evaluatorVersion: z.string(),
});

export type CaseDecision = z.infer<typeof caseDecisionSchema>;
export type CaseStage = z.infer<typeof caseStageSchema>;
export type CaseDimension = z.infer<typeof caseDimensionSchema>;
export type CaseChallenge = z.infer<typeof caseChallengeSchema>;
export type CaseEvaluation = z.infer<typeof caseEvaluationSchema>;
export type CaseDefinition = z.infer<typeof caseDefinitionSchema>;
