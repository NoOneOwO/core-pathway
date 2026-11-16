import { useEffect, useRef, type CSSProperties, type KeyboardEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DecisionMark } from "../components/DecisionMark.tsx";
import { GuideCharacter } from "../components/GuideCharacter.tsx";
import { SceneBand } from "../components/Scenes.tsx";
import { Notice } from "../components/Notice.tsx";
import {
  applicationsForStage,
  getApplication,
  getStage,
  professionalsForStage,
  stages,
} from "../data/content.ts";

export function Pathway() {
  const { stageId } = useParams();
  const stage = getStage(stageId);
  const navigate = useNavigate();
  const pendingFocus = useRef(false);

  useEffect(() => {
    document.title = stage
      ? `${stage.title}, Care pathway register`
      : "Unknown stage, Care pathway register";
  }, [stage]);

  useEffect(() => {
    if (!stage || !pendingFocus.current) return;
    pendingFocus.current = false;
    document.getElementById(`stage-step-${stage.id}`)?.focus();
  }, [stage]);

  if (!stage) {
    return (
      <div className="container page">
        <Notice as="h1" title="This stage is not in the register">
          <p>The pathway has six stages, numbered 01 to 06.</p>
          <Link className="btn btn-primary" to="/pathway/01">
            Open initial assessment
          </Link>
        </Notice>
      </div>
    );
  }

  const index = stages.findIndex((item) => item.id === stage.id);
  const previous = stages[index - 1];
  const next = stages[index + 1];

  function go(id: string) {
    pendingFocus.current = true;
    navigate(`/pathway/${id}`);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.closest("a, select, input, textarea")) return;
    const key = event.key;
    if (key === "ArrowRight" || key === "ArrowDown") {
      event.preventDefault();
      if (next) go(next.id);
    } else if (key === "ArrowLeft" || key === "ArrowUp") {
      event.preventDefault();
      if (previous) go(previous.id);
    } else if (key === "Home") {
      event.preventDefault();
      go(stages[0].id);
    } else if (key === "End") {
      event.preventDefault();
      go(stages[stages.length - 1].id);
    }
  }

  const people = professionalsForStage(stage.id);
  const apps = applicationsForStage(stage.id);

  return (
    <div className="container page pathway" onKeyDown={onKeyDown}>
      <header className="stack">
        <h1>Care pathway</h1>
        <p className="lede">
          Six connected stages. Choose one, or use the previous and next controls. Arrow keys move
          between stages while a stage control is focused.
        </p>
      </header>
      <SceneBand
        scene="journey"
        pose="walk"
        line="Each stone is a stage. Open one and I will keep the same words you see in the table and the talk."
      />
      <div className="stepper-wrap">
        <div className="step-walker" style={{ "--i": index } as CSSProperties}>
          <GuideCharacter pose="walk" />
          <span className="visually-hidden">Guide standing on stage {stage.number}</span>
        </div>
      <ol
        className="stepper"
        aria-label="Rehabilitation stages"
      >
        {stages.map((item) => {
          const current = item.id === stage.id;
          return (
            <li key={item.id}>
              <button
                id={`stage-step-${item.id}`}
                type="button"
                className={current ? "step is-current" : "step"}
                aria-current={current ? "step" : undefined}
                onClick={() => go(item.id)}
              >
                <span className="num">{item.number}</span>
                <span className="step-title">{item.title}</span>
                {current && <span className="step-state">Current</span>}
              </button>
            </li>
          );
        })}
      </ol>
      </div>
      <article className="sheet" id="stage-panel" aria-labelledby="stage-title">
        <p className="visually-hidden" aria-live="polite">
          {`Showing stage ${stage.number}, ${stage.title}.`}
        </p>
        <h2 id="stage-title" tabIndex={-1}>
          <span className="num">{stage.number}</span> {stage.title}
        </h2>
        <p>{stage.summary}</p>
        <dl className="spec">
          <div>
            <dt>Activities</dt>
            <dd>
              <ul className="plain-list">
                {stage.activities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>Professionals</dt>
            <dd>
              <ul className="plain-list">
                {people.map((person) => (
                  <li key={person.id}>
                    <Link to={`/team/${person.id}?stage=${stage.id}`}>{person.name}</Link>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>AI support</dt>
            <dd>
              <ul className="plain-list">
                {apps.map((application) => {
                  const full = getApplication(application.id);
                  if (!full) return null;
                  return (
                    <li key={application.id}>
                      <Link to={`/map?app=${application.id}&stage=${stage.id}`}>{full.name}</Link>
                      <DecisionMark tier={full.decisionTier} />
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
          <div>
            <dt>Limitations</dt>
            <dd>
              <ul className="plain-list">
                {stage.limitations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>Required human oversight</dt>
            <dd>
              <p>{stage.oversight}</p>
            </dd>
          </div>
        </dl>
        <div className="pager">
          <button
            type="button"
            className="btn"
            onClick={() => previous && go(previous.id)}
            disabled={!previous}
          >
            Previous stage
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => next && go(next.id)}
            disabled={!next}
          >
            Next stage
          </button>
        </div>
      </article>
    </div>
  );
}
