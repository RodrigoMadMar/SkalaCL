import { describe, expect, it } from "vitest";
import { evaluateSurvia } from "./survia";

describe("Survia evaluator", () => {
  it("uses a complete deterministic fallback with eight dimensions", async () => {
    const response = await evaluateSurvia({ locale: "en", initialDecision: 1, finalDecision: 4, economicsResponse: "Use marginal cost for empty seats and a capacity threshold for a new departure.", initialRationale: "Segment price response and elasticity instead of one route average.", competitorResponse: "The entrant can match off-peak but capacity limits its peak response.", incentiveResponse: "Replace the volume bonus with contribution and customer-outcome measures.", finalRecommendation: "Use segmented fares, protect peak capacity, discount spare off-peak seats, and review if flexible-segment elasticity changes.", uncertainty: "The entrant's actual peak capacity." });
    expect(Object.keys(response.dimensions)).toHaveLength(8);
    expect(response.overallPerformance).toBeGreaterThan(.5);
  });
});

