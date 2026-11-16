import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DecisionMark } from "../components/DecisionMark.tsx";
import { SceneBand } from "../components/Scenes.tsx";
import { Notice } from "../components/Notice.tsx";
import {
  applications,
  applicationsForStage,
  getApplication,
  getStage,
  stages,
} from "../data/content.ts";

interface Line {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  hot: boolean;
}

export function OpportunityMap() {
  const [params, setParams] = useSearchParams();
  const stageId = params.get("stage") ?? "";
  const appId = params.get("app") ?? "";
  const stage = stageId ? getStage(stageId) : undefined;
  const stageValid = stageId === "" || Boolean(stage);
  const application = appId ? getApplication(appId) : undefined;
  const visibleApps = useMemo(
    () => (stage ? applicationsForStage(stage.id) : applications),
    [stage],
  );
  const panelApp = application && visibleApps.some((item) => item.id === application.id) ? application : undefined;
  const [active, setActive] = useState<string | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const titleId = useId();

  useEffect(() => {
    document.title = "AI opportunity map, Care pathway register";
  }, []);

  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const measure = () => {
      const box = board.getBoundingClientRect();
      const next: Line[] = [];
      for (const app of visibleApps) {
        const appNode = board.querySelector<HTMLElement>(`[data-app="${app.id}"]`);
        if (!appNode) continue;
        const appBox = appNode.getBoundingClientRect();
        for (const id of app.stageIds) {
          if (stage && id !== stage.id) continue;
          const stageNode = board.querySelector<HTMLElement>(`[data-stage="${id}"]`);
          if (!stageNode) continue;
          const stageBox = stageNode.getBoundingClientRect();
          const hot =
            active === `stage:${id}` ||
            active === `app:${app.id}` ||
            panelApp?.id === app.id;
          next.push({
            key: `${id}-${app.id}`,
            x1: stageBox.right - box.left,
            y1: stageBox.top + stageBox.height / 2 - box.top,
            x2: appBox.left - box.left,
            y2: appBox.top + appBox.height / 2 - box.top,
            hot,
          });
        }
      }
      setLines((current) => (sameLines(current, next) ? current : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(board);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => observer.disconnect();
  }, [active, panelApp, stage, visibleApps]);

  function writeParams(nextStage: string, nextApp: string) {
    const next = new URLSearchParams();
    if (nextStage) next.set("stage", nextStage);
    if (nextApp) next.set("app", nextApp);
    setParams(next, { replace: true });
  }

  return (
    <div className="container page">
      <header className="stack">
        <h1 id={titleId}>AI opportunity map</h1>
        <p className="lede">
          Each application is tied to the stages where it may help. On a wide screen those ties are
          drawn as lines. On a narrow screen each stage lists its applications. Open one to read its
          limits.
        </p>
      </header>
      <SceneBand
        scene="map"
        pose="point"
        line="Lines join a stage to an application. Follow one, then read what a person still has to supervise."
      />
      <div className="filters">
        <div className="field">
          <label className="field-name" htmlFor="map-stage">
            Stage
          </label>
          <select
            id="map-stage"
            value={stageValid ? stageId : ""}
            onChange={(event) => writeParams(event.target.value, "")}
          >
            <option value="">All stages</option>
            {stages.map((item) => (
              <option key={item.id} value={item.id}>
                {item.number} {item.title}
              </option>
            ))}
          </select>
        </div>
        {(stageId || appId) && (
          <button type="button" className="btn" onClick={() => writeParams("", "")}>
            Clear filter
          </button>
        )}
      </div>
      {!stageValid && (
        <Notice title="That stage is not in the register">
          <p>Choose a stage from the filter, or clear it to see every application.</p>
        </Notice>
      )}
      {appId && !application && (
        <Notice title="That application is not in the register">
          <p>The map lists the applications defined for these six stages.</p>
          <button type="button" className="btn" onClick={() => writeParams(stageValid ? stageId : "", "")}>
            Clear application
          </button>
        </Notice>
      )}
      <div className="map-board" ref={boardRef}>
        <svg className="map-lines" aria-hidden="true">
          {lines.map((line) => (
            <line
              key={line.key}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              className={line.hot ? "is-hot" : undefined}
            />
          ))}
        </svg>
        <div className="map-col">
          <p className="column-name" id="map-stages">
            Stages
          </p>
          <div role="group" aria-labelledby="map-stages">
            {stages.map((item) => {
              const showing = stage?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-stage={item.id}
                  className={showing ? "map-node is-current" : "map-node"}
                  aria-pressed={showing}
                  onMouseEnter={() => setActive(`stage:${item.id}`)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(`stage:${item.id}`)}
                  onBlur={() => setActive(null)}
                  onClick={() => writeParams(showing ? "" : item.id, "")}
                >
                  <span className="num">{item.number}</span>
                  <span>{item.title}</span>
                  {showing && <span className="state-word">Showing</span>}
                </button>
              );
            })}
          </div>
        </div>
        <div className="map-gap" aria-hidden="true" />
        <div className="map-col">
          <p className="column-name" id="map-apps">
            Applications
          </p>
          <div role="group" aria-labelledby="map-apps">
            {visibleApps.map((item) => {
              const selected = panelApp?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-app={item.id}
                  className={selected ? "map-node is-current" : "map-node"}
                  aria-pressed={selected}
                  onMouseEnter={() => setActive(`app:${item.id}`)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(`app:${item.id}`)}
                  onBlur={() => setActive(null)}
                  onClick={() => writeParams(stage?.id ?? "", selected ? "" : item.id)}
                >
                  <span>{item.name}</span>
                  <DecisionMark tier={item.decisionTier} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="map-fallback">
        {stages
          .filter((item) => !stage || item.id === stage.id)
          .map((item) => (
            <section key={item.id} className="stack" aria-labelledby={`fallback-${item.id}`}>
              <h2 id={`fallback-${item.id}`}>
                <span className="num">{item.number}</span> {item.title}
              </h2>
              <ul className="plain-list">
                {applicationsForStage(item.id).map((itemApp) => (
                  <li key={itemApp.id}>
                    <button
                      type="button"
                      className="text-button"
                      aria-pressed={panelApp?.id === itemApp.id}
                      onClick={() =>
                        writeParams(stage?.id ?? item.id, panelApp?.id === itemApp.id ? "" : itemApp.id)
                      }
                    >
                      {itemApp.name}
                    </button>
                    <DecisionMark tier={itemApp.decisionTier} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
      </div>
      {panelApp ? (
        <article className="sheet" aria-labelledby="app-title">
          <h2 id="app-title">{panelApp.name}</h2>
          <DecisionMark tier={panelApp.decisionTier} />
          <dl className="spec">
            <div>
              <dt>What it does</dt>
              <dd>
                <p>{panelApp.whatItDoes}</p>
              </dd>
            </div>
            <div>
              <dt>Information it uses</dt>
              <dd>
                <ul className="plain-list">
                  {panelApp.informationUsed.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>Benefits</dt>
              <dd>
                <ul className="plain-list">
                  {panelApp.benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>Limitations</dt>
              <dd>
                <ul className="plain-list">
                  {panelApp.limitations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>Required human supervision</dt>
              <dd>
                <p>{panelApp.supervision}</p>
              </dd>
            </div>
            <div>
              <dt>Stages</dt>
              <dd>
                <ul className="plain-list">
                  {panelApp.stageIds.map((id) => {
                    const item = getStage(id);
                    if (!item) return null;
                    return (
                      <li key={id}>
                        <button type="button" className="text-button" onClick={() => writeParams(id, panelApp.id)}>
                          {item.number} {item.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </div>
          </dl>
        </article>
      ) : (
        <Notice title="Choose an application">
          <p>
            The panel lists what the application may do, the information it uses, the limits, and
            the supervision it still requires.
          </p>
        </Notice>
      )}
    </div>
  );
}

function sameLines(left: Line[], right: Line[]) {
  if (left.length !== right.length) return false;
  return left.every((line, index) => {
    const other = right[index];
    return (
      line.key === other.key &&
      line.x1 === other.x1 &&
      line.y1 === other.y1 &&
      line.x2 === other.x2 &&
      line.y2 === other.y2 &&
      line.hot === other.hot
    );
  });
}
