import { describe, expect, it } from "vitest";
import esCL from "@/i18n/locales/es-CL.json";
import { esCLGraphCopy } from "@/content/graph/translations";
import { getAICopilotCaseCopy, aiCopilotEconomicsCase } from "@/content/cases/ai-copilot-economics";
import { expandedCases } from "@/content/cases/expanded";
import { getExpandedCaseCopy } from "@/content/cases/expanded-copy";
import type { CaseDefinition } from "@/lib/cases/schemas";
import { getBuildVsBuyCopy } from "@/content/skills/ai/build-vs-buy";
import { expandedSkills } from "@/content/skills/expanded";
import { getExpandedSkillCopy } from "@/content/skills/expanded-copy";

const unnecessaryAnglicisms = /\b(skill|workflow|routing|outcome|guardrails?|enterprise|startup|incumbent|feedback|benchmarks?|datasets?|prompts?|checkpoints?|throughput|accountability|lock-in|rubber-stamping|serving|engagement|commodity|onboarding|handoffs?|trade-offs?|backend)\b/i;

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(collectStrings);
  return [];
}

function localizedCaseStrings(definition: CaseDefinition): string[] {
  return [
    definition.title["es-CL"], definition.subtitle["es-CL"], definition.context.role["es-CL"], definition.context.premise["es-CL"],
    ...definition.sections.flatMap((section) => [section.label["es-CL"], section.title["es-CL"], section.body["es-CL"], ...section.metrics.flatMap((metric) => [metric.label["es-CL"], metric.note["es-CL"]])]),
    ...Object.values(definition.newInformation).flatMap((item) => [item.title["es-CL"], item.body["es-CL"], item.implication["es-CL"]]),
  ];
}

describe("Spanish editorial quality", () => {
  it("keeps visible Spanish copy free of unnecessary English jargon", () => {
    const skillStrings = expandedSkills.flatMap((skill) => [
      skill.misconception["es-CL"], skill.principle["es-CL"], skill.boundary["es-CL"], skill.diagnosticScenario["es-CL"],
      skill.applicationScenario["es-CL"], skill.counterfactual["es-CL"], skill.transferScenario["es-CL"], skill.transferCorrect["es-CL"],
    ]);
    const caseStrings = [
      ...localizedCaseStrings(aiCopilotEconomicsCase),
      ...expandedCases.flatMap(({ definition, decisionLabels }) => [...localizedCaseStrings(definition), ...Object.values(decisionLabels["es-CL"])]),
    ];
    const visibleSpanish = [
      ...Object.values(esCL),
      ...Object.values(esCLGraphCopy).flatMap(({ title, summary }) => [title, summary]),
      ...collectStrings(getBuildVsBuyCopy("es-CL")),
      ...collectStrings(getExpandedSkillCopy("es-CL")),
      ...collectStrings(getAICopilotCaseCopy("es-CL")),
      ...collectStrings(getExpandedCaseCopy("es-CL")),
      ...skillStrings,
      ...caseStrings,
    ];

    expect(visibleSpanish.filter((text) => unnecessaryAnglicisms.test(text))).toEqual([]);
  });
});
