"use client";

import { KnowledgeGraph } from "@/components/graph/knowledge-graph";
import { loadGraph } from "@/lib/content/load-content";
import { buildMasteryMap } from "@/lib/demo/state";
import { useI18n } from "@/i18n/provider";

export default function SkalaPage() {
  const { locale, t } = useI18n();
  const graph = loadGraph(locale);
  const masteryMap = buildMasteryMap(graph.nodes);
  return (
    <div className="skala-page">
      <header className="graph-page-header">
        <div><p className="eyebrow">{t("skala.eyebrow")}</p><h1>{t("skala.title")}</h1></div>
        <p>{t("skala.description")}</p>
        <div className="graph-stat"><strong>{graph.nodes.filter((node) => node.type === "skill").length}</strong><span>{t("skala.mappedSkills")}</span></div>
      </header>
      <KnowledgeGraph graph={graph} masteryMap={masteryMap} />
    </div>
  );
}
