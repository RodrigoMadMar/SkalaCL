import { describe, expect, it } from "vitest";
import en from "./locales/en.json";
import esCL from "./locales/es-CL.json";
import { graphNodes } from "@/content/graph/catalogue";
import { esCLGraphCopy } from "@/content/graph/translations";
import { loadGraph } from "@/lib/content/load-content";

describe("internationalization", () => {
  it("keeps both UI dictionaries in structural parity", () => {
    expect(Object.keys(esCL).sort()).toEqual(Object.keys(en).sort());
  });

  it("provides Spanish copy for every seed graph node", () => {
    expect(Object.keys(esCLGraphCopy).sort()).toEqual(graphNodes.map((node) => node.id).sort());
  });

  it("changes language without changing graph structure or learner state keys", () => {
    const enGraph = loadGraph("en");
    const esGraph = loadGraph("es-CL");
    expect(esGraph.nodes.map(({ id, parentId, prerequisites }) => ({ id, parentId, prerequisites })))
      .toEqual(enGraph.nodes.map(({ id, parentId, prerequisites }) => ({ id, parentId, prerequisites })));
    expect(esGraph.edges).toEqual(enGraph.edges);
    expect(esGraph.nodes.find((node) => node.id === "ai.build-vs-buy")?.summary).not.toBe(enGraph.nodes.find((node) => node.id === "ai.build-vs-buy")?.summary);
  });
});
