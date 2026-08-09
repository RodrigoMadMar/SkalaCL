import { describe, expect, it } from "vitest";
import { caseStages, createExpandedCaseSession, parseExpandedCaseSession } from "./expanded-session";

describe("expanded case persistence", () => {
  it("restores only a matching case and version", () => {
    const session = createExpandedCaseSession("case.pricing-pressure", "0.1", { "pricing-strategy": 12 });
    session.currentStage = "challenge";
    expect(parseExpandedCaseSession(JSON.stringify(session), session.caseId, session.version, {}).currentStage).toBe("challenge");
    expect(parseExpandedCaseSession(JSON.stringify(session), session.caseId, "0.2", {}).currentStage).toBe(caseStages[0]);
  });
});
