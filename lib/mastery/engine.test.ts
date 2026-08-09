import { describe, expect, it } from "vitest";
import { calculateMastery, type EvidenceEvent } from "./engine";

describe("calculateMastery", () => {
  it("does not treat exposure as mastery", () => {
    const result = calculateMastery("skill", [{ id: "1", skillId: "skill", type: "exposure", performance: 1, occurredAt: "2026-01-01", sourceId: "s1" }]);
    expect(result.mastery).toBe(0);
    expect(result.status).toBe("learning");
  });

  it("is deterministic and caps a single strong event", () => {
    const events: EvidenceEvent[] = [{ id: "1", skillId: "skill", type: "case", performance: 1, occurredAt: "2026-01-01", sourceId: "c1" }];
    expect(calculateMastery("skill", events)).toEqual(calculateMastery("skill", events));
    expect(calculateMastery("skill", events).mastery).toBeLessThanOrEqual(18);
  });

  it("requires evidence diversity before mastery", () => {
    const events: EvidenceEvent[] = Array.from({ length: 8 }, (_, index) => ({
      id: String(index), skillId: "skill", type: "recall" as const, performance: 1,
      occurredAt: `2026-01-${String(index + 1).padStart(2, "0")}`, sourceId: `s${index}`,
    }));
    expect(calculateMastery("skill", events).status).not.toBe("mastered");
  });

  it("turns one application plus recall into learning, not demonstrated expertise", () => {
    const events: EvidenceEvent[] = [
      { id: "application", skillId: "ai.build-vs-buy", type: "application", performance: 0.82, occurredAt: "2026-08-09T10:00:00Z", sourceId: "session-1" },
      { id: "recall", skillId: "ai.build-vs-buy", type: "recall", performance: 1, occurredAt: "2026-08-09T10:01:00Z", sourceId: "session-1" },
    ];
    const result = calculateMastery("ai.build-vs-buy", events);
    expect(result.mastery).toBeGreaterThan(0);
    expect(result.status).toBe("learning");
    expect(result.evidenceCount).toBe(2);
  });
});
