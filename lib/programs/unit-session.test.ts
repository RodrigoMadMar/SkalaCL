import { describe, expect, it } from "vitest";
import { createUnitSkillSession, nextUnitSkillStage, parseUnitSkillSession } from "./unit-session";

describe("unit skill session", () => {
  it("restores a compatible session and rejects a different skill", () => {
    const session = createUnitSkillSession("elasticity", 10);
    expect(parseUnitSkillSession(JSON.stringify(session), "elasticity", 10).sessionId).toBe(session.sessionId);
    expect(parseUnitSkillSession(JSON.stringify(session), "incentives", 0).skillId).toBe("incentives");
  });
  it("advances without going past summary", () => {
    expect(nextUnitSkillStage("interaction")).toBe("application");
    expect(nextUnitSkillStage("summary")).toBe("summary");
  });
});

