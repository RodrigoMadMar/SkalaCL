import { describe, expect, it } from "vitest";
import { caseStages, createAICopilotCaseSession, nextCaseStage, parseAICopilotCaseSession } from "./session";

describe("AI Copilot Economics case session", () => {
  it("follows the documented structured sequence", () => {
    expect(caseStages).toEqual(["intro", "evidence", "initial_decision", "challenge", "new_information", "revision", "final_recommendation", "result"]);
    expect(nextCaseStage("evidence")).toBe("initial_decision");
    expect(nextCaseStage("result")).toBe("result");
  });

  it("restores a valid session and replaces corrupted state", () => {
    const session = createAICopilotCaseSession({ "ai-pricing": 32 });
    expect(parseAICopilotCaseSession(JSON.stringify({ ...session, currentStage: "challenge" }), {})).toMatchObject({ currentStage: "challenge" });
    expect(parseAICopilotCaseSession("{", { "ai-pricing": 32 })).toMatchObject({ currentStage: "intro", masteryBefore: { "ai-pricing": 32 } });
    expect(parseAICopilotCaseSession(JSON.stringify({ ...session, currentStage: "result", evaluation: { dimensions: {} } }), {})).toMatchObject({ currentStage: "intro" });
  });
});
