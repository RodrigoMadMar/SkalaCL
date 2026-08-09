"use client";

import Link from "next/link";
import { ArrowIcon, SparkIcon } from "@/components/layout/icons";
import { MasteryExplainer } from "@/components/mastery/mastery-explainer";
import type { GraphNode } from "@/lib/content/schemas";
import type { SkillMastery } from "@/lib/mastery/engine";
import type { VisualNodeState } from "@/lib/demo/state";
import { useI18n } from "@/i18n/provider";
import type { TranslationKey } from "@/i18n/config";

const contentKeys: Record<string, TranslationKey> = {
  mapped: "content.mapped",
  outlined: "content.outlined",
  playable: "content.playable",
  validated: "content.validated",
};

const stateKeys: Record<VisualNodeState, TranslationKey> = {
  distant: "common.distant",
  available: "common.available",
  learning: "common.learning",
  mastered: "common.mastered",
  demonstrated: "common.demonstrated",
};

export function SkillDrawer({
  node, allNodes, mastery, visualState, onClose,
}: {
  node: GraphNode;
  allNodes: GraphNode[];
  mastery?: SkillMastery;
  visualState: VisualNodeState;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const cluster = allNodes.find((item) => item.id === node.parentId);
  const prerequisites = node.prerequisites.map((id) => allNodes.find((item) => item.id === id)).filter(Boolean) as GraphNode[];
  const canStart = visualState !== "distant" && ["playable", "validated"].includes(node.contentStatus);
  const explanation = {
    evidenceCount: mastery?.evidenceCount ?? 0,
    conceptChecks: Math.min(2, mastery?.evidenceCount ?? 0),
    appliedDecisions: Math.max(0, (mastery?.evidenceCount ?? 0) - 2),
    retainedChecks: mastery?.lastValidatedAt ? 1 : 0,
    lastEvidence: mastery?.lastEvidenceAt?.slice(0, 10),
  };
  return (
    <aside className="skill-drawer" aria-label={t("drawer.detail", { title: node.title })}>
      <button className="drawer-close" onClick={onClose} aria-label={t("drawer.close")}>×</button>
      <div className="drawer-topline"><span>{t("common.skill")}</span><span>{t(contentKeys[node.contentStatus])}</span></div>
      <p className="skill-code">{node.id.toUpperCase().replaceAll("-", ".")}</p>
      <h2>{node.title}</h2>
      <p className="drawer-summary">{node.summary}</p>
      <div className="drawer-state">
        <div className={`mastery-gauge state-${visualState}`}><span style={{ width: `${mastery?.mastery ?? 0}%` }} /></div>
        <div><strong>{mastery?.mastery ?? 0}</strong><span> {t("common.mastery")}</span></div>
        <small>{t(stateKeys[visualState])}</small>
      </div>
      <MasteryExplainer data={explanation} />
      <dl className="skill-facts">
        <div><dt>{t("common.cluster")}</dt><dd>{cluster?.title}</dd></div>
        <div><dt>{t("common.difficulty")}</dt><dd>{node.difficulty} / 5</dd></div>
        <div><dt>{t("drawer.estimatedTime")}</dt><dd>{t("common.minutesLong", { count: node.estimatedMinutes ?? 0 })}</dd></div>
        <div><dt>{t("drawer.evidence")}</dt><dd>{t("common.recorded", { count: mastery?.evidenceCount ?? 0 })}</dd></div>
      </dl>
      <div className="prerequisite-list">
        <p className="eyebrow">{t("drawer.prerequisites")}</p>
        {prerequisites.length ? prerequisites.map((item) => <span key={item.id}><i />{item.title}</span>) : <span><i className="ready" />{t("drawer.openEntry")}</span>}
      </div>
      <div className="evidence-note"><SparkIcon /><p><strong>{t("drawer.evidenceTitle")}</strong>{t("drawer.evidenceBody")}</p></div>
      {canStart ? <Link className="primary-action full" href={`/learn/${node.id}`}>{t("drawer.start")} <ArrowIcon /></Link> : <button className="primary-action full disabled" disabled>{t("drawer.prerequisitesRequired")}</button>}
    </aside>
  );
}
