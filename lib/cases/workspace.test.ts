import { describe, expect, it } from "vitest";
import { getDecisionReadiness } from "./workspace";

describe("case decision workspace", () => {
  it("requires evidence diversity and citations before forming a thesis", () => {
    expect(getDecisionReadiness(["brief", "pilot", "economics"], ["brief", "economics"]).readyToAdvance).toBe(false);
    expect(getDecisionReadiness(["brief", "pilot", "economics", "options"], ["brief"]).readyToAdvance).toBe(false);
    expect(getDecisionReadiness(["brief", "pilot", "economics", "options"], ["brief", "economics"]).readyToAdvance).toBe(true);
  });

  it("deduplicates repeated source interactions", () => {
    const readiness = getDecisionReadiness(["brief", "brief", "pilot", "economics", "options"], ["brief", "brief"], true);
    expect(readiness).toMatchObject({ sourcesReady: true, citationsReady: false, decisionReady: true, completed: 2 });
  });
});
