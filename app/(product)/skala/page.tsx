import { KnowledgeGraph } from "@/components/graph/knowledge-graph";
import { loadGraph } from "@/lib/content/load-content";
import { buildMasteryMap } from "@/lib/demo/state";

export default function SkalaPage() {
  const graph = loadGraph();
  const masteryMap = buildMasteryMap(graph.nodes);
  return (
    <div className="skala-page">
      <header className="graph-page-header">
        <div><p className="eyebrow">YOUR KNOWLEDGE SYSTEM</p><h1>Your Skala</h1></div>
        <p>Curriculum and expertise, mapped as one evolving system. Every illuminated node is backed by evidence.</p>
        <div className="graph-stat"><strong>{graph.nodes.filter((node) => node.type === "skill").length}</strong><span>MAPPED SKILLS</span></div>
      </header>
      <KnowledgeGraph graph={graph} masteryMap={masteryMap} />
    </div>
  );
}
