import { decisionTiers } from "../data/content.ts";
import { DecisionMark } from "./DecisionMark.tsx";

export function Legend() {
  return (
    <ul className="legend">
      {decisionTiers.map((tier) => (
        <li key={tier.id}>
          <DecisionMark tier={tier.id} />
          <span className="quiet">
            {tier.pattern}. {tier.meaning}
          </span>
        </li>
      ))}
    </ul>
  );
}
