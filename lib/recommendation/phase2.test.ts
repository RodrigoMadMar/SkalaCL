import { describe, expect, it } from "vitest";
import { loadGraph } from "@/lib/content/load-content";
import { buildMasteryMap } from "@/lib/demo/state";
import { recommendNextSkill } from "./engine";

describe("Phase 2 recommendation path", () => {
  it("starts with the reference skill and moves on after completion", () => {
    const graph = loadGraph("es-CL");
    const mastery = buildMasteryMap(graph.nodes);
    const first = recommendNextSkill(graph.nodes, mastery, "ai", "ai.model-landscape");
    expect(first?.skill.id).toBe("ai.build-vs-buy");
    const next = recommendNextSkill(graph.nodes, mastery, "ai", "ai.build-vs-buy", { completedSkillIds: ["ai.build-vs-buy"] });
    expect(next?.skill.id).not.toBe("ai.build-vs-buy");
  });
});
