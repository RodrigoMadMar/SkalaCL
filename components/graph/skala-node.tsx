"use client";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { VisualNodeState } from "@/lib/demo/state";
import { useI18n } from "@/i18n/provider";

export type SkalaNodeData = {
  label: string;
  kind: "root" | "cluster" | "skill";
  state: VisualNodeState;
  mastery: number;
  coverage?: number;
  contextLabel?: string;
};

export type SkalaFlowNode = Node<SkalaNodeData, "skala">;

export function SkalaNode({ data, selected }: NodeProps<SkalaFlowNode>) {
  const { t } = useI18n();
  return (
    <div className={`graph-node graph-node-${data.kind} state-${data.state} ${data.contextLabel ? "cross-context" : ""} ${selected ? "selected" : ""}`}>
      <Handle type="target" position={Position.Top} isConnectable={false} />
      {data.kind === "root" && <span className="node-system">{t("skala.system")}</span>}
      {data.kind === "skill" && <span className="node-dot" />}
      {data.contextLabel && <span className="node-context">↗ {data.contextLabel}</span>}
      <strong>{data.label}</strong>
      {data.kind !== "root" && <span>{data.kind === "skill" ? t("skala.masteryValue", { count: data.mastery || "—" }) : t("skala.coverageValue", { count: data.coverage ?? 0 })}</span>}
      {data.kind === "root" && <span>{t("skala.explored", { count: data.coverage ?? 0 })}</span>}
      <Handle type="source" position={Position.Bottom} isConnectable={false} />
    </div>
  );
}
