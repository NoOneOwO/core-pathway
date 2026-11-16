import { useMemo, useState } from "react";
import { categoryName, limitRows } from "../data/content.ts";
import type { LimitCategory } from "../data/types.ts";
import { addStamp } from "../lib/walk.ts";
import { Guide } from "./GuideCharacter.tsx";

const deck = [
  ...limitRows.filter((row) => row.category === "may-support").slice(0, 3),
  ...limitRows.filter((row) => row.category === "must-not-decide").slice(0, 3),
];

export function BoundaryGame() {
  const cards = useMemo(() => deck, []);
  const [index, setIndex] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const card = cards[index];

  function choose(category: LimitCategory) {
    if (!card || done) return;
    if (category !== card.category) {
      setWrong(true);
      return;
    }
    const nextScore = score + 1;
    setScore(nextScore);
    setWrong(false);
    if (index + 1 >= cards.length) {
      setDone(true);
      addStamp("sort");
      return;
    }
    setIndex(index + 1);
  }

  function restart() {
    setIndex(0);
    setWrong(false);
    setScore(0);
    setDone(false);
  }

  return (
    <section className="stack game" aria-labelledby="game-heading">
      <h2 id="game-heading">Boundary sort</h2>
      <p>
        Sort six items from the register. This checks whether you can tell support from a decision.
        It does not test clinical skill.
      </p>
      <div className="game-layout">
        <Guide
          pose={done ? "wave" : wrong ? "think" : "point"}
          line={
            done
              ? "You sorted the whole set. A stamp is on your pathway walk."
              : wrong
                ? `That one stays under ${categoryName(card.category)}.`
                : "Read the name, then choose the side the register already gives it."
          }
        />
        {done ? (
          <div className="sheet game-card">
            <p className="game-score">
              <span className="num">{score}</span> of {cards.length} sorted
            </p>
            <p>Support can organise or remind. The decisions in this set stay with people.</p>
            <button type="button" className="btn" onClick={restart}>
              Sort again
            </button>
          </div>
        ) : (
          <div className={wrong ? "sheet game-card is-wrong" : "sheet game-card"}>
            <p className="quiet">
              Card <span className="num">{index + 1}</span> of {cards.length}
            </p>
            <p className="game-name">{card.name}</p>
            <div className="hero-actions">
              <button type="button" className="btn" onClick={() => choose("may-support")}>
                AI may support
              </button>
              <button type="button" className="btn" onClick={() => choose("must-not-decide")}>
                Must not decide
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
