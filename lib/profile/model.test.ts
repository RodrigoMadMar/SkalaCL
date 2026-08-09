import { describe, expect, it } from "vitest";
import { loadGraph } from "@/lib/content/load-content";
import { seedEvidence } from "@/content/mastery/seed";
import { buildExpertiseProfile } from "./model";

describe("expertise profile", () => {
  it("derives professional signals from the evidence ledger", () => {
    const profile = buildExpertiseProfile(loadGraph("en"), seedEvidence);

    expect(profile.evidenceCount).toBe(seedEvidence.filter((event) => event.type !== "exposure").length);
    expect(profile.demonstratedSkills.map((item) => item.node.id)).toEqual([
      "competitive-advantage",
      "economics.unit-economics",
      "ai.model-landscape",
    ]);
    expect(profile.masteredSkills.length).toBeGreaterThanOrEqual(profile.demonstratedSkills.length);
    expect(profile.domains).toHaveLength(2);
    expect(profile.specializations.every((item) => item.evidenceCount > 0)).toBe(true);
  });

  it("keeps mastery and graph structure identical across locales", () => {
    const spanish = buildExpertiseProfile(loadGraph("es-CL"), seedEvidence);
    const english = buildExpertiseProfile(loadGraph("en"), seedEvidence);

    expect(spanish.overall).toMatchObject({ mastery: english.overall.mastery, coverage: english.overall.coverage });
    expect(spanish.capabilities.map((item) => item.node.id)).toEqual(english.capabilities.map((item) => item.node.id));
    expect(spanish.capabilities[0]?.node.title).not.toBe(english.capabilities[0]?.node.title);
  });

  it("counts repeated evidence from one case as one completed case", () => {
    const profile = buildExpertiseProfile(loadGraph("en"), seedEvidence, [
      { caseId: "case.ai-copilot-economics", completedAt: "2026-08-09T10:00:00Z" },
    ]);

    expect(profile.casesCompleted).toBe(1);
  });
});
