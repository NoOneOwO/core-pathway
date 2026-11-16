import { disclaimer } from "../data/content.ts";

export function DisclaimerBlock() {
  return (
    <aside className="disclaimer-block" role="note" aria-label="Educational disclaimer">
      <p>{disclaimer}</p>
    </aside>
  );
}
