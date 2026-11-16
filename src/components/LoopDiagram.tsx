import type { LoopNode } from "../data/types.ts";
import { loopNodes } from "../data/content.ts";
import { DecisionMark } from "./DecisionMark.tsx";

export function LoopDiagram({
  interactive,
  flowing,
  selectedId,
  onSelect,
}: {
  interactive: boolean;
  flowing: boolean;
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <ol className={flowing ? "flow is-flowing" : "flow"} aria-label="Human in the loop">
      {loopNodes.map((node, index) => (
        <li key={node.id} className="flow-item">
          {interactive ? (
            <NodeButton node={node} selected={selectedId === node.id} onSelect={onSelect} />
          ) : (
            <NodeBody node={node} />
          )}
          {index < loopNodes.length - 1 && <span className="flow-join" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

function NodeBody({ node }: { node: LoopNode }) {
  return (
    <div className="flow-node">
      <DecisionMark tier={node.decisionTier} />
      <span className="flow-title">{node.title}</span>
      <span className="quiet">{node.summary}</span>
    </div>
  );
}

function NodeButton({
  node,
  selected,
  onSelect,
}: {
  node: LoopNode;
  selected: boolean;
  onSelect?: (id: string) => void;
}) {
  return (
    <button
      type="button"
      className={selected ? "flow-node is-selected" : "flow-node"}
      aria-pressed={selected}
      onClick={() => onSelect?.(node.id)}
    >
      <DecisionMark tier={node.decisionTier} />
      <span className="flow-title">{node.title}</span>
      <span className="quiet">{node.summary}</span>
    </button>
  );
}
