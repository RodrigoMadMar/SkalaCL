import { describe, expect, it } from "vitest";
import { parsePersistentState } from "./provider";

describe("persistent user state", () => {
  it("drops corrupted ledger entries without losing valid evidence", () => {
    const state = parsePersistentState(JSON.stringify({ evidence: [
      { id: "valid", skillId: "ai.build-vs-buy", type: "recall", performance: 1, occurredAt: "2026-08-09T10:00:00Z", sourceId: "session" },
      { id: "broken", performance: 4 },
    ], completions: [{ skillId: "ai.build-vs-buy", sessionId: "session", completedAt: "2026-08-09T10:00:00Z", version: "0.1" }], caseCompletions: [
      { caseId: "case.ai-copilot-economics", sessionId: "case-session", completedAt: "2026-08-09T10:20:00Z", version: "0.1", initialDecision: "vendor", finalDecision: "hybrid", overallPerformance: 0.74 },
    ] }));
    expect(state.evidence).toHaveLength(1);
    expect(state.completions).toHaveLength(1);
    expect(state.caseCompletions).toHaveLength(1);
  });

  it("recovers from malformed JSON", () => {
    expect(parsePersistentState("{")).toEqual({ evidence: [], completions: [], caseCompletions: [] });
  });
});
