import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon, SparkIcon } from "@/components/layout/icons";
import { loadGraph } from "@/lib/content/load-content";
import { buildMasteryMap, getVisualState } from "@/lib/demo/state";

export default async function SkillPreviewPage({ params }: { params: Promise<{ skillId: string }> }) {
  const { skillId } = await params;
  const graph = loadGraph();
  const skill = graph.nodes.find((node) => node.id === skillId && node.type === "skill");
  if (!skill) notFound();
  const mastery = buildMasteryMap(graph.nodes)[skill.id];
  const cluster = graph.nodes.find((node) => node.id === skill.parentId);
  const prereqs = skill.prerequisites.map((id) => graph.nodes.find((node) => node.id === id)).filter(Boolean);
  const state = getVisualState(skill, buildMasteryMap(graph.nodes));
  return (
    <div className="skill-preview-page page-frame">
      <Link href="/skala" className="back-link">← BACK TO YOUR SKALA</Link>
      <div className="skill-preview-layout">
        <main>
          <p className="skill-code">SKILL {skill.id.toUpperCase().replaceAll("-", ".")}</p>
          <p className="eyebrow">{cluster?.title} · DIFFICULTY {skill.difficulty}</p>
          <h1>{skill.title}</h1>
          <p className="skill-lede">{skill.summary}</p>
          <div className="objective-block"><span>LEARNING OBJECTIVE</span><p>Use this concept to frame a real business decision, expose the critical trade-off and support a recommendation with evidence.</p></div>
          <div className="preview-note"><SparkIcon /><p><strong>Phase 1 preview</strong>This route establishes the skill contract and entry point. The adaptive block renderer and evidence-producing session are intentionally reserved for Phase 2.</p></div>
          <button className="primary-action disabled" disabled>SESSION AVAILABLE IN PHASE 2</button>
        </main>
        <aside>
          <div className="preview-stat"><span>CURRENT MASTERY</span><strong>{mastery.mastery}</strong><small>{state.toUpperCase()}</small></div>
          <dl className="skill-facts"><div><dt>ESTIMATED TIME</dt><dd>{skill.estimatedMinutes} minutes</dd></div><div><dt>EVIDENCE</dt><dd>{mastery.evidenceCount} recorded</dd></div><div><dt>CONTENT STATE</dt><dd>{skill.contentStatus}</dd></div></dl>
          <div className="prerequisite-list"><p className="eyebrow">PREREQUISITES</p>{prereqs.length ? prereqs.map((item) => item && <span key={item.id}><i className="ready" />{item.title}</span>) : <span><i className="ready" />Open entry point</span>}</div>
          <Link href="/skala" className="text-action">INSPECT IN GRAPH <ArrowIcon /></Link>
        </aside>
      </div>
    </div>
  );
}
