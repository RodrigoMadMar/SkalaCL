import { describe, expect, it } from "vitest";
import { expandedCases, getExpandedCase } from "./expanded";

describe("Phase 4 expanded cases", () => {
  it("authors the two remaining MVP cases in both locales", () => {
    expect(expandedCases).toHaveLength(2);
    for (const { definition } of expandedCases) {
      expect(definition.sections.length).toBeGreaterThanOrEqual(4);
      expect(definition.skills).toHaveLength(5);
      expect(definition.title["es-CL"]).toBeTruthy();
      expect(definition.title.en).toBeTruthy();
      expect(definition.reviewStatus).toBe("validated");
    }
    expect(getExpandedCase("pricing-pressure")?.definition.id).toBe("case.pricing-pressure");
    expect(getExpandedCase("ai-native-challenger")?.definition.id).toBe("case.ai-native-challenger");
  });
});
