import { describe, expect, it } from "vitest";
import { caseDefinitionSchema } from "@/lib/cases/schemas";
import { aiCopilotEconomicsCase, getAICopilotCaseCopy } from "./ai-copilot-economics";

describe("AI Copilot Economics case content", () => {
  it("is valid, bilingual and maps case evidence to graph skills", () => {
    expect(caseDefinitionSchema.parse(aiCopilotEconomicsCase)).toBeTruthy();
    expect(aiCopilotEconomicsCase.sections).toHaveLength(5);
    expect(aiCopilotEconomicsCase.skills).toContain("ai-inference-economics");
    expect(getAICopilotCaseCopy("es-CL").result.mastery).toBeTruthy();
    expect(getAICopilotCaseCopy("en").result.mastery).toBeTruthy();
  });
});
