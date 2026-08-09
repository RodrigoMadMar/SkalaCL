import { describe, expect, it } from "vitest";
import type { GraphNode } from "@/lib/content/schemas";
import { recommendNextSkill } from "./engine";

const node = (id: string, prerequisites: string[] = [], domain = "ai"): GraphNode => ({
  id, type: "skill", title: id, summary: "A sufficiently detailed skill summary.", parentId: "cluster",
  primaryDomain: domain, specialization: "cluster", difficulty: 2, estimatedMinutes: 7,
  prerequisites, relatedSkills: [], evidenceTargets: ["application"], contentStatus: "playable",
});

describe("recommendNextSkill", () => {
  it("excludes skills with unmet prerequisites", () => {
    const result = recommendNextSkill([node("ready"), node("blocked", ["foundation"])], {});
    expect(result?.skill.id).toBe("ready");
  });

  it("prefers the active domain", () => {
    const result = recommendNextSkill([node("strategy", [], "business-core"), node("ai-skill")], {});
    expect(result?.skill.id).toBe("ai-skill");
  });

  it("does not recommend a completed skill again", () => {
    const result = recommendNextSkill([node("completed"), node("next")], {}, "ai", "completed", { completedSkillIds: ["completed"] });
    expect(result?.skill.id).toBe("next");
  });
});
