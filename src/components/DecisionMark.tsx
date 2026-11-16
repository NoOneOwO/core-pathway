import { Eye, UserRound, Waypoints } from "lucide-react";
import type { DecisionTier } from "../data/types.ts";
import { decisionTiers } from "../data/content.ts";

const icons = {
  "ai-supported": Waypoints,
  "human-supervised": Eye,
  "human-only": UserRound,
} as const;

export function DecisionMark({ tier }: { tier: DecisionTier }) {
  const info = decisionTiers.find((item) => item.id === tier);
  const Icon = icons[tier];
  if (!info) return null;

  return (
    <span className={`mark mark-${tier}`}>
      <span className="mark-shape" aria-hidden="true">
        <Icon size={16} strokeWidth={1.75} />
      </span>
      <span className="mark-name">{info.name}</span>
    </span>
  );
}
