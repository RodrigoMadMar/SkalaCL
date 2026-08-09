import { describe, expect, it } from "vitest";
import { loadGraph } from "@/lib/content/load-content";
import { expandedSkills } from "./expanded";

describe("Phase 4 expanded skills", () => {
  it("authors exactly 34 reusable skill experiences in addition to Build vs Buy", () => {
    expect(expandedSkills).toHaveLength(34);
    expect(new Set(expandedSkills.map((skill) => skill.id)).size).toBe(34);
    expect(expandedSkills.filter((skill) => skill.reviewStatus === "validated")).toHaveLength(19);
  });

  it("keeps authored skill IDs aligned with the graph", () => {
    const graphIds = new Set(loadGraph("en").nodes.map((node) => node.id));
    expect(expandedSkills.every((skill) => graphIds.has(skill.id))).toBe(true);
  });
});
