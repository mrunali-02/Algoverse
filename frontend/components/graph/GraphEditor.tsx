"use client";

import { useMemo, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  Node,
  Edge,
  Connection,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useGraphStore } from "@/store/useGraphStore";
import { CustomNode } from "./CustomNode";
import { GraphToolbar } from "./GraphToolbar";
import { EdgeWeightModal } from "./EdgeWeightModal";

interface GraphEditorProps {
  interactive?: boolean;
  highlightedNodeId?: string;
  highlightedEdgeId?: string;
  visitedNodeIds?: string[];
  distances?: Record<string, number | "∞">;
}

export function GraphEditor({
  interactive = true,
  highlightedNodeId,
  highlightedEdgeId,
  visitedNodeIds = [],
  distances,
}: GraphEditorProps) {
  const {
    nodes,
    edges,
    isDirected,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectNode,
    selectEdge,
  } = useGraphStore();

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  // Compute reactive node styles during simulation
  const processedNodes = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        isVisited: visitedNodeIds.includes(node.id),
        isHighlighted: node.id === highlightedNodeId,
        distance: distances ? distances[node.id] : undefined,
      },
    }));
  }, [nodes, visitedNodeIds, highlightedNodeId, distances]);

  // Compute reactive edge styles during simulation
  const processedEdges = useMemo(() => {
    return edges.map((edge) => {
      const isEdgeHighlighted = edge.id === highlightedEdgeId;
      return {
        ...edge,
        markerEnd: isDirected ? { type: MarkerType.ArrowClosed, color: isEdgeHighlighted ? "#f59e0b" : "#6366f1" } : undefined,
        style: {
          stroke: isEdgeHighlighted ? "#f59e0b" : "#475569",
          strokeWidth: isEdgeHighlighted ? 3.5 : 2,
        },
        labelStyle: { fill: "#f8fafc", fontWeight: 700, fontSize: 13 },
        labelBgStyle: { fill: "#1e293b", rx: 6, ry: 6 },
        labelBgPadding: [6, 4] as [number, number],
      };
    });
  }, [edges, isDirected, highlightedEdgeId]);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      selectNode(node.id);
    },
    [selectNode]
  );

  const handleEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      selectEdge(edge.id);
    },
    [selectEdge]
  );

  const handlePaneClick = useCallback(() => {
    selectNode(null);
    selectEdge(null);
  }, [selectNode, selectEdge]);

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950/60 rounded-3xl border border-slate-800 overflow-hidden shadow-inner">
      {interactive && <GraphToolbar />}

      <ReactFlow
        nodes={processedNodes}
        edges={processedEdges}
        nodeTypes={nodeTypes}
        onNodesChange={interactive ? onNodesChange : undefined}
        onEdgesChange={interactive ? onEdgesChange : undefined}
        onConnect={interactive ? onConnect : undefined}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        onPaneClick={handlePaneClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#334155" />
        <Controls className="!bg-slate-900 !border-slate-800 !text-slate-300 rounded-xl" />
      </ReactFlow>

      {interactive && <EdgeWeightModal />}
    </div>
  );
}
