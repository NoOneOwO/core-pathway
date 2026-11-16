import { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Notice } from "../components/Notice.tsx";
import { SceneBand } from "../components/Scenes.tsx";
import { getProfessional, professionals, stages } from "../data/content.ts";

export function Team() {
  const { roleId } = useParams();
  const [params, setParams] = useSearchParams();
  const stageId = params.get("stage") ?? "";
  const person = roleId ? getProfessional(roleId) : undefined;
  const stageKnown = stageId === "" || stages.some((stage) => stage.id === stageId);

  useEffect(() => {
    document.title = person
      ? `${person.name}, Care pathway register`
      : "Healthcare team, Care pathway register";
  }, [person]);

  function toggleStage(id: string) {
    const next = new URLSearchParams(params);
    if (stageId === id) next.delete("stage");
    else next.set("stage", id);
    setParams(next, { replace: true });
  }

  return (
    <div className="container page">
      <header className="stack">
        <h1>Healthcare team</h1>
        <p className="lede">
          Choose a role to see where that person leads, where software may assist, and where it must
          not take their place. Choose a stage to see which roles join it.
        </p>
      </header>
      <SceneBand
        scene="team"
        pose="point"
        line="Seven roles lead this work. I can point at a stage they share. I cannot take their place."
      />
      {!stageKnown && (
        <Notice title="That stage is not in the register">
          <p>Stage filters use the numbers 01 to 06.</p>
          <button type="button" className="btn" onClick={() => toggleStage(stageId)}>
            Clear stage
          </button>
        </Notice>
      )}
      <div className="team-layout">
        <ul className="role-list" aria-label="Roles">
          {professionals.map((item) => {
            const selected = item.id === roleId;
            const inStage = stageKnown && stageId !== "" && item.stageIds.includes(stageId);
            return (
              <li key={item.id}>
                <Link
                  to={stageId ? `/team/${item.id}?stage=${stageId}` : `/team/${item.id}`}
                  className={selected ? "role-link is-current" : "role-link"}
                  aria-current={selected ? "page" : undefined}
                >
                  <span className="role-name">{item.name}</span>
                  <span className="quiet">{item.summary}</span>
                  {selected && <span className="state-word">Selected</span>}
                  {inStage && <span className="state-word">In this stage</span>}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="stack">
          <div className="stage-picks" role="group" aria-label="Stages">
            {stages.map((stage) => {
              const selected = stage.id === stageId;
              const inRole = person?.stageIds.includes(stage.id) ?? false;
              return (
                <button
                  key={stage.id}
                  type="button"
                  className={selected ? "pick is-current" : "pick"}
                  aria-pressed={selected}
                  onClick={() => toggleStage(stage.id)}
                >
                  <span className="num">{stage.number}</span>
                  <span>{stage.title}</span>
                  {selected && <span className="state-word">Selected</span>}
                  {inRole && <span className="state-word">In this role</span>}
                </button>
              );
            })}
          </div>
          {roleId && !person && (
            <Notice title="This role is not in the register">
              <p>The team view lists seven roles.</p>
              <Link className="btn" to="/team">
                Show all roles
              </Link>
            </Notice>
          )}
          {!roleId && (
            <Notice title="Choose a role">
              <p>
                The detail here names responsibilities, the help software may offer, and the work it
                must leave to people.
              </p>
            </Notice>
          )}
          {person && (
            <article className="sheet" aria-labelledby="role-title">
              <h2 id="role-title">{person.name}</h2>
              <p>{person.summary}</p>
              <dl className="spec">
                <div>
                  <dt>Responsibilities</dt>
                  <dd>
                    <ul className="plain-list">
                      {person.responsibilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>Where AI can assist</dt>
                  <dd>
                    <ul className="plain-list">
                      {person.aiCanAssist.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>Where AI must not replace them</dt>
                  <dd>
                    <ul className="plain-list">
                      {person.aiMustNotReplace.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
