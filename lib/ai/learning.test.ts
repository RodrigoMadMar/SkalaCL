import { describe, expect, it } from "vitest";
import { challengeLearningResponse, evaluateSkillApplication } from "./learning";

describe("Build vs Buy learning AI fallback", () => {
  it("returns a structured, response-specific hybrid boundary challenge", async () => {
    const response = "I recommend hybrid because speed matters, while we keep strategic control.";
    const evaluation = await evaluateSkillApplication({ locale: "en", decision: "hybrid", response });
    const challenge = await challengeLearningResponse({
      locale: "en", skillId: "ai.build-vs-buy", objective: "Make and defend a decision", scenarioFacts: [],
      initialDiagnostic: { decision: "hybrid", rationale: "Speed and control" }, applicationResponse: response,
      detectedAssumptions: evaluation.assumptionsDetected, omittedRelevantFactors: evaluation.omittedRelevantFactors,
      allowedChallengePatterns: ["speed", "cost", "control", "capability", "lockIn", "boundary"], maxTurnsRemaining: 2,
    });
    expect(challenge.challengeType).toBe("boundary");
    expect(challenge.challenge).toContain("Which layer");
  });

  it("incorporates the challenge response into final adaptability", async () => {
    const result = await evaluateSkillApplication({
      locale: "en", decision: "buy", response: "Buy for speed but accept switching cost.",
      challengeType: "lockIn", challengeResponse: "I would preserve portability and review if scale triples.", final: true,
    });
    expect(result.dimensions.adaptability).toBeGreaterThan(0.5);
    expect(result.overallPerformance).toBeGreaterThan(0);
  });
});
