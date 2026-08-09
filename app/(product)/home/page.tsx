import Link from "next/link";
import { ArrowIcon, GraphIcon, SparkIcon } from "@/components/layout/icons";
import { MasteryRing } from "@/components/mastery/mastery-ring";
import { loadGraph } from "@/lib/content/load-content";
import { buildMasteryMap } from "@/lib/demo/state";
import { recommendNextSkill } from "@/lib/recommendation/engine";

export default function HomePage() {
  const graph = loadGraph();
  const mastery = buildMasteryMap(graph.nodes);
  const next = recommendNextSkill(graph.nodes, mastery, "ai", "ai-models-products");
  if (!next) return null;
  const cluster = graph.nodes.find((node) => node.id === next.skill.parentId);

  return (
    <div className="home-page page-frame">
      <header className="home-header">
        <div><p className="eyebrow">SATURDAY · 08 AUG</p><h1>Good evening, Martina.</h1><p>One precise move compounds from here.</p></div>
        <div className="system-status"><span />SYSTEM ONLINE</div>
      </header>

      <section className="next-move" aria-labelledby="next-move-title">
        <div className="next-ambient" aria-hidden="true" />
        <div className="next-copy">
          <div className="section-label"><SparkIcon /> YOUR NEXT MOVE</div>
          <p className="skill-code">SKILL {next.skill.id.toUpperCase().replaceAll("-", ".")}</p>
          <h2 id="next-move-title">{next.skill.title}</h2>
          <p className="next-summary">{next.skill.summary} This connects your foundation in models and business economics to a decision you can use.</p>
          <div className="meta-line">
            <span>{cluster?.title}</span><i />
            <span>DIFFICULTY {next.skill.difficulty}</span><i />
            <span>{next.skill.estimatedMinutes} MIN</span>
          </div>
          <Link href={`/learn/${next.skill.id}`} className="primary-action">START <ArrowIcon /></Link>
          <p className="reason-line">Selected because it {next.factors[0]?.toLowerCase()}.</p>
        </div>
        <div className="next-visual" aria-label="Path preview">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <span className="path-node mastered">MODELS</span>
          <span className="path-node learning">ECONOMICS</span>
          <span className="path-node target">NEXT</span>
        </div>
      </section>

      <section className="home-lower">
        <div className="progress-strip">
          <MasteryRing value={38} />
          <div className="progress-copy"><p className="eyebrow">YOUR SKALA</p><h3>Expertise is taking shape.</h3><p>7 skills mastered · 46 evidence events</p></div>
          <div className="domain-pulse"><span>AI</span><strong>44</strong><small>MASTERY</small></div>
          <div className="domain-pulse"><span>CORE</span><strong>31</strong><small>MASTERY</small></div>
          <Link href="/skala" className="text-action"><GraphIcon /> OPEN THE MAP <ArrowIcon /></Link>
        </div>
        <div className="case-tease">
          <p className="eyebrow">THIS WEEK&apos;S CASE</p>
          <p className="case-number">CASE 002 · 18 MIN</p>
          <h3>When intelligence has a marginal cost.</h3>
          <p>Price an AI copilot without letting adoption destroy gross margin.</p>
          <span>Unlocks after 2 foundation skills</span>
        </div>
      </section>
    </div>
  );
}
