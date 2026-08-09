import { describe, expect, it } from "vitest";
import { buildVsBuySkill, getBuildVsBuyCopy } from "./build-vs-buy";

describe("Build vs Buy reference content", () => {
  it("implements the canonical sequence once in the renderer model", () => {
    expect(buildVsBuySkill.id).toBe("ai.build-vs-buy");
    expect(buildVsBuySkill.blocks.map((block) => block.type)).toEqual([
      "editorial", "think", "editorial", "visual", "example", "open_response", "ai_challenge", "application", "recall_check", "mastery_summary",
    ]);
  });

  it("provides explicit authored content in both locales", () => {
    for (const locale of ["es-CL", "en"] as const) {
      const copy = getBuildVsBuyCopy(locale);
      expect(copy.entry.body.length).toBeGreaterThan(80);
      expect(copy.reveal.lenses).toHaveLength(6);
      expect(copy.recall.options).toHaveLength(4);
    }
  });
});
