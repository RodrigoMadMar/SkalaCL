import type { SkillCompletion, CheckpointCompletion } from "@/lib/state/provider";
import type { SkillMastery } from "@/lib/mastery/engine";
import type { ProgramDefinition, ProgramUnit } from "./schemas";

export type UnitProgress = {
  completedSkills: number;
  totalSkills: number;
  completion: number;
  coverage: number;
  mastery: number;
  checkpointCompleted: boolean;
  nextSkillId?: string;
  checkpointReady: boolean;
};

export function deriveUnitProgress(
  unit: ProgramUnit,
  completions: SkillCompletion[],
  checkpointCompletions: CheckpointCompletion[],
  masteryBySkill: Record<string, SkillMastery>,
): UnitProgress {
  const completed = new Set(completions.map((item) => item.skillId));
  const refs = unit.skillReferences.filter((item) => item.graphNodeId);
  const completedSkills = refs.filter((item) => completed.has(item.graphNodeId!)).length;
  const assessed = refs.filter((item) => (masteryBySkill[item.graphNodeId!]?.evidenceCount ?? 0) > 0);
  const mastery = assessed.length
    ? Math.round(assessed.reduce((sum, item) => sum + (masteryBySkill[item.graphNodeId!]?.mastery ?? 0), 0) / assessed.length)
    : 0;
  const checkpointCompleted = Boolean(unit.checkpoint && checkpointCompletions.some((item) => item.checkpointId === unit.checkpoint?.id));
  const required = unit.checkpoint?.requiredSkillIds ?? [];
  const checkpointReady = required.length > 0 && required.every((id) => completed.has(id) || (masteryBySkill[id]?.evidenceCount ?? 0) >= 2);
  return {
    completedSkills,
    totalSkills: refs.length,
    completion: refs.length ? Math.round((completedSkills / refs.length) * 100) : 0,
    coverage: refs.length ? Math.round((assessed.length / refs.length) * 100) : 0,
    mastery,
    checkpointCompleted,
    nextSkillId: refs.find((item) => !completed.has(item.graphNodeId!))?.graphNodeId ?? undefined,
    checkpointReady,
  };
}

export function deriveProgramProgress(
  program: ProgramDefinition,
  completions: SkillCompletion[],
  checkpointCompletions: CheckpointCompletion[],
  masteryBySkill: Record<string, SkillMastery>,
) {
  const units = program.units.map((unit) => ({ unit, progress: deriveUnitProgress(unit, completions, checkpointCompletions, masteryBySkill) }));
  const playable = units.filter(({ unit }) => unit.implementationStatus !== "structural");
  const current = playable.find(({ progress }) => !progress.checkpointCompleted) ?? playable.at(-1);
  return { units, current, completion: playable.length ? Math.round(playable.reduce((sum, item) => sum + item.progress.completion, 0) / playable.length) : 0 };
}

