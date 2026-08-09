import Link from "next/link";
import { loadGraph } from "@/lib/content/load-content";

export default function ExplorePage() {
  const graph = loadGraph();
  const clusters = graph.nodes.filter((node) => node.type === "core_area" || node.type === "specialization");
  return (
    <div className="explore-page page-frame">
      <header className="editorial-header"><p className="eyebrow">EXPLORE THE FIELD</p><h1>Knowledge is connected.<br />Enter from anywhere.</h1><p>Explore gives you agency. Your Next Move remains the fastest route through the graph.</p></header>
      <section className="explore-domain">
        <div className="domain-intro"><span>01</span><div><p className="eyebrow">FOUNDATION</p><h2>Business Core</h2><p>The durable systems behind strategy, markets, organizations and decisions.</p></div><Link href="/skala">VIEW IN YOUR SKALA →</Link></div>
        <div className="cluster-index">{clusters.filter((node) => node.primaryDomain === "business-core").map((node, index) => <div key={node.id}><span>0{index + 1}</span><strong>{node.title}</strong><p>{node.summary}</p></div>)}</div>
      </section>
      <section className="explore-domain ai">
        <div className="domain-intro"><span>02</span><div><p className="eyebrow">FIRST DEEP DOMAIN</p><h2>Artificial Intelligence</h2><p>Business judgment for products and organizations whose economics are changing now.</p></div><Link href="/skala">ENTER THE DOMAIN →</Link></div>
        <div className="cluster-index">{clusters.filter((node) => node.primaryDomain === "ai").map((node, index) => <div key={node.id}><span>AI.{String(index + 1).padStart(2, "0")}</span><strong>{node.title}</strong><p>{node.summary}</p></div>)}</div>
      </section>
    </div>
  );
}
