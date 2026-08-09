"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Background, Controls, MarkerType, MiniMap, ReactFlow, type Edge, type NodeMouseHandler,
} from "@xyflow/react";
import type { GraphDefinition, GraphNode } from "@/lib/content/schemas";
import type { SkillMastery } from "@/lib/mastery/engine";
import { getVisualState, type VisualNodeState } from "@/lib/demo/state";
import { useI18n } from "@/i18n/provider";
import { SkalaNode, type SkalaFlowNode } from "./skala-node";
import { SkillDrawer } from "./skill-drawer";

const nodeTypes = { skala: SkalaNode };
type View = { type: "global" } | { type: "domain"; id: "business-core" | "ai" } | { type: "cluster"; id: string };

function radialPosition(index: number, count: number, radiusX: number, radiusY: number, centerX: number, centerY: number, offset = 0) {
  const angle = (index / Math.max(1, count)) * Math.PI * 2 - Math.PI / 2 + offset;
  return { x: centerX + Math.cos(angle) * radiusX, y: centerY + Math.sin(angle) * radiusY };
}

function makeVisibleNodes(graph: GraphDefinition, view: View) {
  if (view.type === "global") return graph.nodes.filter((node) => node.id === "business-core" || node.id === "ai" || node.parentId === "business-core" || node.parentId === "ai");
  if (view.type === "domain") return graph.nodes.filter((node) => node.id === view.id || node.parentId === view.id);

  const clusterNodes = graph.nodes.filter((node) => node.id === view.id || node.parentId === view.id);
  const clusterIds = new Set(clusterNodes.map((node) => node.id));
  const crossIds = graph.edges.flatMap((edge) => {
    if (clusterIds.has(edge.source) && !clusterIds.has(edge.target)) return [edge.target];
    if (clusterIds.has(edge.target) && !clusterIds.has(edge.source)) return [edge.source];
    return [];
  });
  const crossNodes = [...new Set(crossIds)].map((id) => graph.nodes.find((node) => node.id === id && node.type === "skill")).filter(Boolean) as GraphNode[];
  return [...clusterNodes, ...crossNodes.slice(0, 7)];
}

function edgeState(source: GraphNode, target: GraphNode, masteryMap: Record<string, SkillMastery>): VisualNodeState {
  const states = [getVisualState(source, masteryMap), getVisualState(target, masteryMap)];
  if (states.every((state) => state === "mastered" || state === "demonstrated")) return "mastered";
  if (!states.includes("distant") && states.some((state) => state === "learning")) return "learning";
  if (!states.includes("distant")) return "available";
  return "distant";
}

export function KnowledgeGraph({ graph, masteryMap }: { graph: GraphDefinition; masteryMap: Record<string, SkillMastery> }) {
  const { t } = useI18n();
  const [view, setView] = useState<View>({ type: "global" });
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const visible = useMemo(() => makeVisibleNodes(graph, view), [graph, view]);

  const flowNodes = useMemo<SkalaFlowNode[]>(() => visible.map((node) => {
    const state = getVisualState(node, masteryMap);
    const children = graph.nodes.filter((item) => item.parentId === node.id && item.type === "skill");
    const assessed = children.filter((item) => (masteryMap[item.id]?.evidenceCount ?? 0) > 0).length;
    const coverage = children.length ? Math.round(assessed / children.length * 100) : node.id === "business-core" ? 29 : node.id === "ai" ? 24 : 0;
    const context = view.type === "cluster" && node.type === "skill" && node.parentId !== view.id;
    let position = { x: 0, y: 0 };
    if (view.type === "global") {
      if (node.id === "business-core") position = { x: 280, y: 260 };
      else if (node.id === "ai") position = { x: 950, y: 260 };
      else if (node.parentId === "business-core") {
        const peers = visible.filter((item) => item.parentId === "business-core");
        position = radialPosition(peers.findIndex((item) => item.id === node.id), peers.length, 330, 230, 285, 260);
      } else {
        const peers = visible.filter((item) => item.parentId === "ai");
        position = radialPosition(peers.findIndex((item) => item.id === node.id), peers.length, 300, 215, 955, 260);
      }
    } else if (node.id === view.id) position = { x: 520, y: 250 };
    else if (view.type === "cluster" && context) {
      const peers = visible.filter((item) => item.type === "skill" && item.parentId !== view.id);
      position = radialPosition(peers.findIndex((item) => item.id === node.id), peers.length, 570, 320, 540, 260, Math.PI / 8);
    } else {
      const peers = visible.filter((item) => item.id !== view.id && (view.type !== "cluster" || item.parentId === view.id));
      position = radialPosition(peers.findIndex((item) => item.id === node.id), peers.length, view.type === "cluster" ? 345 : 420, view.type === "cluster" ? 230 : 270, 540, 260);
    }
    return {
      id: node.id,
      type: "skala",
      position,
      data: {
        label: node.title,
        kind: node.type === "skill" ? "skill" : node.id === "business-core" || node.id === "ai" ? "root" : "cluster",
        state,
        mastery: masteryMap[node.id]?.mastery ?? 0,
        coverage,
        contextLabel: context ? graph.nodes.find((item) => item.id === node.parentId)?.title : undefined,
      },
    };
  }), [graph.nodes, masteryMap, view, visible]);

  const edges = useMemo<Edge[]>(() => {
    const ids = new Set(visible.map((node) => node.id));
    return graph.edges.filter((edge) => ids.has(edge.source) && ids.has(edge.target)).map((edge) => {
      const source = graph.nodes.find((node) => node.id === edge.source)!;
      const target = graph.nodes.find((node) => node.id === edge.target)!;
      const state = edgeState(source, target, masteryMap);
      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type === "part_of" ? "smoothstep" : "default",
        markerEnd: edge.type === "requires" ? { type: MarkerType.ArrowClosed, width: 12, height: 12 } : undefined,
        className: `edge-${edge.type} edge-state-${state}`,
      };
    });
  }, [graph.edges, graph.nodes, masteryMap, visible]);

  const onNodeClick: NodeMouseHandler<SkalaFlowNode> = useCallback((_, flowNode) => {
    const node = graph.nodes.find((item) => item.id === flowNode.id);
    if (!node) return;
    if (node.type === "skill") setSelected(node);
    else if (node.id === "business-core" || node.id === "ai") setView({ type: "domain", id: node.id });
    else setView({ type: "cluster", id: node.id });
  }, [graph.nodes]);

  const title = view.type === "global" ? t("skala.allKnowledge") : graph.nodes.find((node) => node.id === view.id)?.title ?? t("skala.title");
  return (
    <div className={`graph-workspace disclosure-${view.type}`}>
      <div className="graph-toolbar">
        <div className="breadcrumbs">
          <button onClick={() => { setView({ type: "global" }); setSelected(null); }}>{t("skala.title")}</button>
          {view.type !== "global" && <><span>/</span><button onClick={() => view.type === "cluster" ? setView({ type: "domain", id: graph.nodes.find((node) => node.id === view.id)?.primaryDomain as "ai" | "business-core" }) : undefined}>{title}</button></>}
        </div>
        <div className="legend" aria-label={t("skala.legend")}><span className="distant">{t("common.distant")}</span><span className="available">{t("common.available")}</span><span className="learning">{t("common.learning")}</span><span className="mastered">{t("common.mastered")}</span></div>
      </div>
      <ReactFlow
        key={`${view.type}-${view.type === "global" ? "all" : view.id}`}
        nodes={flowNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: view.type === "cluster" ? 0.28 : 0.2, maxZoom: view.type === "cluster" ? 1 : 1.15, duration: 420 }}
        minZoom={0.35}
        maxZoom={1.8}
        nodesDraggable={false}
        nodesConnectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#252931" gap={36} size={1} />
        <Controls showInteractive={false} />
        <MiniMap pannable zoomable nodeColor={(node) => node.data?.state === "mastered" ? "#c7ff4a" : node.data?.state === "learning" ? "#8b7cff" : "#434851"} maskColor="rgba(10,11,13,.82)" />
      </ReactFlow>
      <div className="graph-activity"><i />{t("skala.connectionsFormed")}</div>
      <div className="graph-hint">{t("skala.hint")}</div>
      {selected && <SkillDrawer node={selected} allNodes={graph.nodes} mastery={masteryMap[selected.id]} visualState={getVisualState(selected, masteryMap)} onClose={() => setSelected(null)} />}
    </div>
  );
}
