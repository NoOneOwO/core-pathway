import { walkGoals, useWalk } from "../lib/walk.ts";

export function WalkMeter() {
  const stamps = useWalk();
  const earned = walkGoals.filter((goal) => stamps.includes(goal.id));

  return (
    <div className="walk">
      <details className="walk-details">
        <summary>
          Pathway walk{" "}
          <span className="num">
            {earned.length} / {walkGoals.length}
          </span>
        </summary>
        <ul className="walk-list">
          {walkGoals.map((goal) => {
            const have = stamps.includes(goal.id);
            return (
              <li key={goal.id} className={have ? "is-earned" : undefined}>
                <span className="walk-mark">{have ? "Done" : "Open"}</span>
                <span>{goal.label}</span>
              </li>
            );
          })}
        </ul>
        {earned.length === walkGoals.length && (
          <p className="quiet">You have opened every part of the register and finished the sort.</p>
        )}
      </details>
    </div>
  );
}
