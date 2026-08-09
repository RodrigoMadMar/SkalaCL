"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Background, Controls, MarkerType, MiniMap, ReactFlow, type Edge, type NodeMouseHandler,
} from "@xyflow/react";
import type { GraphDefinition, GraphNode } from "@/lib/content/schemas";
import type { SkillMastery } from "@/lib/mastery/engine";
import { getVisualState } from "@/lib/demo/state";
import { SkalaNode, type SkalaFlowNode } from "./skala-node";
import { SkillDrawer } from "./skill-drawer";

const nodeTypes = { skala: SkalaNode };
type View = { type: "global" } | { type: "domain"; id: "business-core" | "ai" } | { type: "cluster"; id: string };

function radialPosition(index: number, count: number, radiusX: number, radiusY: number, centerX: number, centerY: number) {
  const angle = (index / Math.max(1, count)) * Math.PI * 2 - Math.PI / 2;
  return { x: centerX + Math.cos(angle) * radiusX, y: centerY + Math.sin(angle) * radiusY };
}

function makeVisibleNodes(graph: GraphDefinition, view: View) {
  if (view.type === "global") return graph.nodes.filter((node) => node.id === "business-core" || node.id === "ai" || node.parentId === "business-core" || node.parentId === "ai");
  if (view.type === "domain") return graph.nodes.filter((node) => node.id === view.id || node.parentId === view.id);
  return graph.nodes.filter((node) => node.id === view.id || node.parentId === view.id);
}

export function KnowledgeGraph({ graph, masteryMap }: { graph: GraphDefinition; masteryMap: Record<string, SkillMastery> }) {
  const [view, setView] = useState<View>({ type: "global" });
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const visible = useMemo(() => makeVisibleNodes(graph, view), [graph, view]);

  const flowNodes = useMemo<SkalaFlowNode[]>(() => visible.map((node) => {
    const state = getVisualState(node, masteryMap);
    const children = graph.nodes.filter((item) => item.parentId === node.id && item.type === "skill");
    const assessed = children.filter((item) => (masteryMap[item.id]?.evidenceCount ?? 0) > 0).length;
    const coverage = children.length ? Math.round(assessed / children.length * 100) : node.id === "business-core" ? 29 : node.id === "ai" ? 24 : 0;
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
    else {
      const peers = visible.filter((item) => item.id !== view.id);
      position = radialPosition(peers.findIndex((item) => item.id === node.id), peers.length, view.type === "cluster" ? 390 : 420, view.type === "cluster" ? 260 : 270, 540, 260);
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
      },
    };
  }), [graph.nodes, masteryMap, view, visible]);

  const edges = useMemo<Edge[]>(() => {
    const ids = new Set(visible.map((node) => node.id));
    return graph.edges.filter((edge) => ids.has(edge.source) && ids.has(edge.target)).map((edge) => ({
      id: edge.id, source: edge.source, target: edge.target,
      type: "smoothstep",
      animated: edge.type === "requires" && (masteryMap[edge.source]?.mastery ?? 0) >= 35,
      markerEnd: edge.type === "requires" ? { type: MarkerType.ArrowClosed, width: 12, height: 12 } : undefined,
      className: `edge-${edge.type}`,
    }));
  }, [graph.edges, masteryMap, visible]);

  const onNodeClick: NodeMouseHandler<SkalaFlowNode> = useCallback((_, flowNode) => {
    const node = graph.nodes.find((item) => item.id === flowNode.id);
    if (!node) return;
    if (node.type === "skill") setSelected(node);
    else if (node.id === "business-core" || node.id === "ai") setView({ type: "domain", id: node.id });
    else setView({ type: "cluster", id: node.id });
  }, [graph.nodes]);

  const title = view.type === "global" ? "All knowledge" : graph.nodes.find((node) => node.id === view.id)?.title ?? "Your Skala";
  return (
    <div className="graph-workspace">
      <div className="graph-toolbar">
        <div className="breadcrumbs">
          <button onClick={() => { setView({ type: "global" }); setSelected(null); }}>YOUR SKALA</button>
          {view.type !== "global" && <><span>/</span><button onClick={() => view.type === "cluster" ? setView({ type: "domain", id: graph.nodes.find((node) => node.id === view.id)?.primaryDomain as "ai" | "business-core" }) : undefined}>{title.toUpperCase()}</button></>}
        </div>
        <div className="legend" aria-label="Node legend"><span className="distant">DISTANT</span><span className="available">AVAILABLE</span><span className="learning">LEARNING</span><span className="mastered">MASTERED</span></div>
      </div>
      <ReactFlow
        key={`${view.type}-${view.type === "global" ? "all" : view.id}`}
        nodes={flowNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.2, maxZoom: 1.15 }}
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
      <div className="graph-hint">PAN TO NAVIGATE · SCROLL TO ZOOM · SELECT TO INSPECT</div>
      {selected && <SkillDrawer node={selected} allNodes={graph.nodes} mastery={masteryMap[selected.id]} visualState={getVisualState(selected, masteryMap)} onClose={() => setSelected(null)} />}
    </div>
  );
}
