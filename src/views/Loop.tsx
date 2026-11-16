import { useEffect, useState } from "react";
import { LoopDiagram } from "../components/LoopDiagram.tsx";
import { SceneBand } from "../components/Scenes.tsx";
import { Notice } from "../components/Notice.tsx";
import { loopNodes } from "../data/content.ts";
import { useReducedMotion } from "../lib/useReducedMotion.ts";

export function Loop() {
  const reduced = useReducedMotion();
  const [flow, setFlow] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const node = loopNodes.find((item) => item.id === selected);

  useEffect(() => {
    document.title = "Care loop, Care pathway register";
  }, []);

  return (
    <div className="container page">
      <header className="stack">
        <h1>Human in the loop</h1>
        <p className="lede">
          Insights are advisory. Nothing in this sequence reaches patient care without a
          professional decision.
        </p>
      </header>
      <SceneBand
        scene="loop"
        pose="walk"
        line="Watch the order. An insight stops at the professional. Care starts only after that decision."
      />
      <div className="flow-controls">
        <label className="check">
          <input
            type="checkbox"
            checked={flow && !reduced}
            disabled={reduced}
            onChange={(event) => setFlow(event.target.checked)}
          />
          <span>Animate the flow</span>
        </label>
        {reduced && (
          <p className="quiet">Your system asks for less motion, so this diagram stays still.</p>
        )}
      </div>
      <LoopDiagram
        interactive
        flowing={flow && !reduced}
        selectedId={node?.id}
        onSelect={(id) => setSelected((current) => (current === id ? null : id))}
      />
      {node ? (
        <article className="sheet" aria-live="polite" aria-labelledby="node-title">
          <h2 id="node-title">{node.title}</h2>
          <p>{node.detail}</p>
        </article>
      ) : (
        <Notice title="Choose a step">
          <p>Each step names who acts, and whether software may only prepare the work.</p>
        </Notice>
      )}
    </div>
  );
}
