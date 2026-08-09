import { describe, expect, it } from "vitest";
import { getExpandedSkill } from "@/content/skills/expanded";
import { evaluateExpandedApplication } from "./expanded-learning";

describe("expanded learning evaluation", () => {
  it("returns rubric dimensions through a provider-independent fallback", async () => { const skill = getExpandedSkill("elasticity")!; const result = await evaluateExpandedApplication({ skill, locale: "en", diagnosticResponse: "I would separate segments and alternatives before deciding.", applicationResponse: "Demand response depends on price, segment and horizon, but I would test causality.", challengeResponse: "If the competitor changes its offer, I would revise the threshold and re-estimate by segment." }); expect(result.overallPerformance).toBeGreaterThan(0.5); expect(Object.keys(result.dimensions)).toEqual(["framing", "mechanism", "application", "adaptability"]); });
});
