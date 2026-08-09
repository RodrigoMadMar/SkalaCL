import { describe, expect, it } from "vitest";
import { economicsUnit } from "@/content/programs/business-core";
import { deriveUnitProgress } from "./progress";

describe("program progress", () => {
  it("derives completion and coverage from shared state without storing program mastery", () => {
    const mastery = { "supply-demand": { skillId: "supply-demand", mastery: 42, confidence: .5, status: "learned", evidenceCount: 2, evidenceTypes: ["application"], lastEvidenceAt: null, lastValidatedAt: null } } as never;
    const result = deriveUnitProgress(economicsUnit, [{ skillId: "supply-demand", sessionId: "s1", completedAt: "2026-01-01", version: "1" }], [], mastery);
    expect(result.completedSkills).toBe(1);
    expect(result.coverage).toBe(11);
    expect(result.nextSkillId).toBe("opportunity-cost");
    expect(result.checkpointReady).toBe(false);
  });
});
