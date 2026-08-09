import { describe, expect, it } from "vitest";
import { createBuildVsBuySession, parseBuildVsBuySession } from "./session";

describe("Build vs Buy session persistence", () => {
  it("restores the same locale-independent progress", () => {
    const session = { ...createBuildVsBuySession(0), currentBlock: 6, diagnosticDecision: "hybrid" as const, applicationResponse: "A structured answer" };
    expect(parseBuildVsBuySession(JSON.stringify(session), 99)).toEqual(session);
  });

  it("recovers safely from corrupted or incompatible state", () => {
    expect(parseBuildVsBuySession("not-json", 12).initialMastery).toBe(12);
    expect(parseBuildVsBuySession(JSON.stringify({ skillId: "other", version: "0.1" }), 7).currentBlock).toBe(0);
  });
});
