import { describe, expect, it } from "vitest";
import { graphDefinitionSchema } from "./schemas";
import { loadGraph } from "./load-content";

describe("content loader", () => {
  it("loads a valid scalable graph", () => {
    const graph = loadGraph();
    expect(graph.nodes.length).toBeGreaterThan(80);
    expect(graph.nodes.filter((node) => node.type === "skill").length).toBeGreaterThan(65);
  });

  it("fails loudly on invalid references", () => {
    const graph = loadGraph();
    const invalid = { ...graph, nodes: graph.nodes.map((node, index) => index === 2 ? { ...node, prerequisites: ["missing-skill"] } : node) };
    expect(() => graphDefinitionSchema.parse(invalid)).toThrow(/Unknown prerequisite/);
  });
});
