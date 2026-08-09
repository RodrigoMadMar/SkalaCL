import { describe, expect, it } from "vitest";
import { caseDefinitionSchema } from "@/lib/cases/schemas";
import { aiCopilotEconomicsCase, getAICopilotCaseCopy } from "./ai-copilot-economics";
import { aiCopilotEvidenceViews, getAICopilotWorkspaceCopy } from "./ai-copilot-workspace";

describe("AI Copilot Economics case content", () => {
  it("is valid, bilingual and maps case evidence to graph skills", () => {
    expect(caseDefinitionSchema.parse(aiCopilotEconomicsCase)).toBeTruthy();
    expect(aiCopilotEconomicsCase.sections).toHaveLength(5);
    expect(aiCopilotEconomicsCase.skills).toContain("ai-inference-economics");
    expect(getAICopilotCaseCopy("es-CL").result.mastery).toBeTruthy();
    expect(getAICopilotCaseCopy("en").result.mastery).toBeTruthy();
  });

  it("provides a bilingual visualization for every evidence source", () => {
    expect(Object.keys(aiCopilotEvidenceViews)).toEqual(aiCopilotEconomicsCase.sections.map(({ id }) => id));
    expect(getAICopilotWorkspaceCopy("es-CL").railTitle).toBe("Tesis de trabajo");
    expect(getAICopilotWorkspaceCopy("en").railTitle).toBe("Working thesis");
  });
});
