import { describe, expect, it } from "vitest";
import { challengeCaseDecision, evaluateCaseDecision } from "./cases";

const base = { locale: "en" as const, caseId: "case.ai-copilot-economics", caseVersion: "0.1", citedEvidence: ["economics", "options"], primaryRisk: "We accept a short-term margin risk while learning usage." };

describe("case AI fallback", () => {
  it("challenges the assumption implied by different defensible decisions", async () => {
    const vendor = await challengeCaseDecision({ ...base, decision: "vendor", rationale: "Launch quickly because the market window matters." });
    const build = await challengeCaseDecision({ ...base, decision: "build", rationale: "Own the capability because it will differentiate the product." });
    expect(vendor.type).not.toBe(build.type);
  });

  it("returns validated dimension-level evaluation and skill evidence", async () => {
    const challenge = await challengeCaseDecision({ ...base, decision: "hybrid", rationale: "Buy inference but own evaluation and routing to control cost and portability." });
    const evaluation = await evaluateCaseDecision({ ...base, decision: "hybrid", rationale: "Buy inference but own evaluation and routing to protect margin.", challenge, challengeResponse: "If intensive users cost more than price, we will route simpler work and introduce usage tiers.", finalDecision: "hybrid", revisedRationale: "The usage tail strengthens the need for routing, evaluation and a segment-specific quality threshold while preserving launch speed.", recommendation: "Launch a paid pilot with vendor inference, but own routing, evaluation and product experience; accept lower initial margin to learn usage before scaling.", reviewTrigger: "Review when any segment falls below 55% contribution margin or quality drops below 85% for two weeks." });
    expect(Object.keys(evaluation.dimensions)).toHaveLength(7);
    expect(evaluation.skillEvidence).toHaveLength(5);
    expect(evaluation.overallPerformance).toBeGreaterThan(0.5);
  });

  it("does not reward one canonical decision over another", async () => {
    const vendorChallenge = await challengeCaseDecision({ ...base, decision: "vendor", rationale: "Launch quickly because the market window matters and the vendor is portable." });
    const buildChallenge = await challengeCaseDecision({ ...base, decision: "build", rationale: "Own the capability because customer value and proprietary learning create strategic differentiation." });
    const shared = { challengeResponse: "Set a measurable threshold for margin and quality, then narrow the segment or change course if it fails.", revisedRationale: "The new evidence changes scope but not the core logic; usage, quality, speed and reversibility remain explicit trade-offs.", recommendation: "Proceed with a limited segment, connect price to usage and quality, preserve evaluations and routing, and accept the stated speed-versus-control trade-off.", reviewTrigger: "Review if contribution margin falls below 55% or acceptance below 85% for two weeks." };
    const vendor = await evaluateCaseDecision({ ...base, decision: "vendor", rationale: "Launch in eight weeks using the vendor while controlling usage cost, margin, quality and portability.", challenge: vendorChallenge, finalDecision: "vendor", ...shared });
    const build = await evaluateCaseDecision({ ...base, decision: "build", rationale: "Build because customer value and proprietary learning justify the seven-month delay, while modeling cost and quality.", challenge: buildChallenge, finalDecision: "build", ...shared });
    expect(vendor.overallPerformance).toBeGreaterThan(0.55);
    expect(build.overallPerformance).toBeGreaterThan(0.55);
    expect(vendorChallenge.type).not.toBe(buildChallenge.type);
  });
});
