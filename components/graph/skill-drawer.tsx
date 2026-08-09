import Link from "next/link";
import { ArrowIcon, SparkIcon } from "@/components/layout/icons";
import type { GraphNode } from "@/lib/content/schemas";
import type { SkillMastery } from "@/lib/mastery/engine";
import type { VisualNodeState } from "@/lib/demo/state";

export function SkillDrawer({
  node, allNodes, mastery, visualState, onClose,
}: {
  node: GraphNode;
  allNodes: GraphNode[];
  mastery?: SkillMastery;
  visualState: VisualNodeState;
  onClose: () => void;
}) {
  const cluster = allNodes.find((item) => item.id === node.parentId);
  const prerequisites = node.prerequisites.map((id) => allNodes.find((item) => item.id === id)).filter(Boolean) as GraphNode[];
  const canStart = visualState !== "distant" && ["playable", "validated"].includes(node.contentStatus);
  return (
    <aside className="skill-drawer" aria-label={`${node.title} detail`}>
      <button className="drawer-close" onClick={onClose} aria-label="Close detail">×</button>
      <div className="drawer-topline"><span>SKILL</span><span>{node.contentStatus.toUpperCase()}</span></div>
      <p className="skill-code">{node.id.toUpperCase().replaceAll("-", ".")}</p>
      <h2>{node.title}</h2>
      <p className="drawer-summary">{node.summary}</p>
      <div className="drawer-state">
        <div className={`mastery-gauge state-${visualState}`}><span style={{ width: `${mastery?.mastery ?? 0}%` }} /></div>
        <div><strong>{mastery?.mastery ?? 0}</strong><span> MASTERY</span></div>
        <small>{visualState.toUpperCase()}</small>
      </div>
      <dl className="skill-facts">
        <div><dt>CLUSTER</dt><dd>{cluster?.title}</dd></div>
        <div><dt>DIFFICULTY</dt><dd>{node.difficulty} / 5</dd></div>
        <div><dt>EST. TIME</dt><dd>{node.estimatedMinutes} minutes</dd></div>
        <div><dt>EVIDENCE</dt><dd>{mastery?.evidenceCount ?? 0} recorded</dd></div>
      </dl>
      <div className="prerequisite-list">
        <p className="eyebrow">PREREQUISITES</p>
        {prerequisites.length ? prerequisites.map((item) => <span key={item.id}><i />{item.title}</span>) : <span><i className="ready" />Open entry point</span>}
      </div>
      <div className="evidence-note"><SparkIcon /><p><strong>Evidence, not completion.</strong> Mastery changes only when recall, application or case evidence is recorded.</p></div>
      {canStart ? <Link className="primary-action full" href={`/learn/${node.id}`}>START <ArrowIcon /></Link> : <button className="primary-action full disabled" disabled>PREREQUISITES REQUIRED</button>}
    </aside>
  );
}
