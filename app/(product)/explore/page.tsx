"use client";

import Link from "next/link";
import { loadGraph } from "@/lib/content/load-content";
import { buildMasteryMap, getVisualState } from "@/lib/demo/state";
import { useI18n } from "@/i18n/provider";
import type { GraphNode } from "@/lib/content/schemas";
import { useSkalaState } from "@/lib/state/provider";
import { programCopy } from "@/content/programs/business-core";

export default function ExplorePage() {
  const { locale, t } = useI18n();
  const { evidence } = useSkalaState();
  const graph = loadGraph(locale);
  const mastery = buildMasteryMap(graph.nodes, evidence);
  const programText = programCopy[locale];
  const clusters = graph.nodes.filter((node) => node.type === "core_area" || node.type === "specialization");

  const renderCluster = (node: GraphNode, index: number, prefix: string) => {
    const skills = graph.nodes.filter((skill) => skill.parentId === node.id && skill.type === "skill");
    const ids = new Set(skills.map((skill) => skill.id));
    const available = skills.filter((skill) => getVisualState(skill, mastery) !== "distant").length;
    const inSkala = skills.filter((skill) => (mastery[skill.id]?.evidenceCount ?? 0) > 0).length;
    const connected = new Set(graph.edges.filter((edge) => ids.has(edge.source) || ids.has(edge.target)).filter((edge) => {
      const other = ids.has(edge.source) ? edge.target : edge.source;
      return !ids.has(other) && (mastery[other]?.evidenceCount ?? 0) > 0;
    }).map((edge) => edge.id)).size;
    return (
      <div key={node.id}>
        <span>{prefix}{String(index + 1).padStart(2, "0")}</span>
        <strong>{node.title}</strong>
        <p>{node.summary}</p>
        <div className="cluster-context">
          <small>{t("explore.availableCount", { count: available })}</small>
          <small>{t("explore.inSkalaCount", { count: inSkala })}</small>
          <small>{t("explore.connectedCount", { count: connected })}</small>
        </div>
      </div>
    );
  };

  return (
    <div className="explore-page page-frame">
      <header className="editorial-header"><p className="eyebrow">{t("explore.eyebrow")}</p><h1>{t("explore.titleLine1")}<br />{t("explore.titleLine2")}</h1><p>{t("explore.intro")}</p></header>
      <section className="explore-domain">
        <div className="domain-intro"><span>01</span><div><p className="eyebrow">{t("explore.foundation")}</p><h2>{graph.nodes.find((node) => node.id === "business-core")?.title}</h2><p>{t("explore.businessCoreSummary")}</p></div><Link href="/programs/business-core">{programText.open}</Link></div>
        <div className="cluster-index">{clusters.filter((node) => node.primaryDomain === "business-core").map((node, index) => renderCluster(node, index, "0"))}</div>
      </section>
      <section className="explore-domain ai">
        <div className="domain-intro"><span>02</span><div><p className="eyebrow">{t("explore.deepDomain")}</p><h2>{t("explore.aiTitle")}</h2><p>{t("explore.aiSummary")}</p></div><Link href="/skala">{t("explore.territory")}</Link></div>
        <div className="cluster-index">{clusters.filter((node) => node.primaryDomain === "ai").map((node, index) => renderCluster(node, index, "AI."))}</div>
      </section>
    </div>
  );
}
