import { z } from "zod";

export const localizedProgramTextSchema = z.object({ "es-CL": z.string().min(1), en: z.string().min(1) });

export const unitSkillReferenceSchema = z.object({
  id: z.string(),
  graphNodeId: z.string().nullable(),
  order: z.number().int().positive(),
  title: localizedProgramTextSchema,
  estimatedMinutes: z.number().int().positive(),
  implementationStatus: z.enum(["structural", "playable", "validated"]),
});

export const checkpointSchema = z.object({
  id: z.string(),
  title: localizedProgramTextSchema,
  estimatedMinutes: z.number().int().positive(),
  requiredSkillIds: z.array(z.string()),
  evidenceSkillIds: z.array(z.string()),
  implementationStatus: z.enum(["structural", "playable", "validated"]),
});

export const unitSchema = z.object({
  id: z.string(),
  order: z.number().int().positive(),
  title: localizedProgramTextSchema,
  coreQuestion: localizedProgramTextSchema,
  exitCapability: localizedProgramTextSchema,
  skillReferences: z.array(unitSkillReferenceSchema),
  checkpoint: checkpointSchema.nullable(),
  implementationStatus: z.enum(["structural", "playable", "validated"]),
});

export const programSchema = z.object({
  id: z.string(),
  version: z.string(),
  title: localizedProgramTextSchema,
  description: localizedProgramTextSchema,
  units: z.array(unitSchema).min(1),
});

export type LocalizedProgramText = z.infer<typeof localizedProgramTextSchema>;
export type UnitSkillReference = z.infer<typeof unitSkillReferenceSchema>;
export type ProgramCheckpoint = z.infer<typeof checkpointSchema>;
export type ProgramUnit = z.infer<typeof unitSchema>;
export type ProgramDefinition = z.infer<typeof programSchema>;

