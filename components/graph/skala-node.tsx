import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { VisualNodeState } from "@/lib/demo/state";

export type SkalaNodeData = {
  label: string;
  kind: "root" | "cluster" | "skill";
  state: VisualNodeState;
  mastery: number;
  coverage?: number;
  code?: string;
};

export type SkalaFlowNode = Node<SkalaNodeData, "skala">;

export function SkalaNode({ data, selected }: NodeProps<SkalaFlowNode>) {
  return (
    <div className={`graph-node graph-node-${data.kind} state-${data.state} ${selected ? "selected" : ""}`}>
      <Handle type="target" position={Position.Top} isConnectable={false} />
      {data.kind === "root" && <span className="node-system">KNOWLEDGE SYSTEM</span>}
      {data.kind === "skill" && <span className="node-dot" />}
      <strong>{data.label}</strong>
      {data.kind !== "root" && <span>{data.kind === "skill" ? `${data.mastery || "—"} MASTERY` : `${data.coverage ?? 0}% COVERAGE`}</span>}
      {data.kind === "root" && <span>{data.coverage ?? 0}% EXPLORED</span>}
      <Handle type="source" position={Position.Bottom} isConnectable={false} />
    </div>
  );
}
