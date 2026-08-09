"use client";

import { KnowledgeGraph } from "@/components/graph/knowledge-graph";
import { loadGraph } from "@/lib/content/load-content";
import { buildMasteryMap } from "@/lib/demo/state";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/provider";
import { useSkalaState } from "@/lib/state/provider";

export default function SkalaPage() {
  const { locale, t } = useI18n();
  const { evidence, completions } = useSkalaState();
  const [focus, setFocus] = useState<{ nodeId?: string; updated: boolean }>({ updated: false });
  useEffect(() => {
    const task = window.setTimeout(() => {
      const query = new URLSearchParams(window.location.search);
      const nodeId = query.get("focus") ?? undefined;
      setFocus({ nodeId, updated: query.get("updated") === "1" });
    }, 0);
    return () => window.clearTimeout(task);
  }, []);
  const graph = loadGraph(locale);
  const masteryMap = buildMasteryMap(graph.nodes, evidence);
  return (
    <div className="skala-page">
      <header className="graph-page-header">
        <div><p className="eyebrow">{t("skala.eyebrow")}</p><h1>{t("skala.title")}</h1></div>
        <p>{t("skala.description")}</p>
        <div className="graph-stat"><strong>{graph.nodes.filter((node) => node.type === "skill").length}</strong><span>{t("skala.mappedSkills")}</span></div>
      </header>
      <KnowledgeGraph graph={graph} masteryMap={masteryMap} focusNodeId={focus.nodeId} showRecentUpdate={focus.updated} completedSkillIds={completions.map((item) => item.skillId)} />
    </div>
  );
}
