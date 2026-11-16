import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DecisionMark } from "../components/DecisionMark.tsx";
import { SceneBand } from "../components/Scenes.tsx";
import { Notice } from "../components/Notice.tsx";
import {
  categoryName,
  getApplication,
  getStage,
  limitRows,
  stages,
} from "../data/content.ts";
export function Limitations() {
  const [params, setParams] = useSearchParams();
  const stageId = params.get("stage") ?? "";
  const category = params.get("category") ?? "";
  const stageValid = stageId === "" || stages.some((stage) => stage.id === stageId);
  const categoryValid = category === "" || category === "may-support" || category === "must-not-decide";
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Opportunities and limits, Care pathway register";
  }, []);

  const rows = useMemo(() => {
    return limitRows.filter((row) => {
      if (stageValid && stageId && !row.stageIds.includes(stageId)) return false;
      if (categoryValid && category && row.category !== category) return false;
      return true;
    });
  }, [stageId, category, stageValid, categoryValid]);

  function write(nextStage: string, nextCategory: string) {
    const next = new URLSearchParams();
    if (nextStage) next.set("stage", nextStage);
    if (nextCategory) next.set("category", nextCategory);
    setParams(next, { replace: true });
  }

  return (
    <div className="container page">
      <header className="stack">
        <h1>Opportunities and limits</h1>
        <p className="lede">
          One column lists what software may support. The other lists decisions it must not make.
          Filter by stage or by category, and open a row for a fuller note.
        </p>
      </header>
      <SceneBand
        scene="table"
        pose="think"
        line="The table is the boundary. Support on one side. Decisions that stay human on the other."
      />
      <div className="filters">
        <div className="field">
          <label className="field-name" htmlFor="limit-stage">
            Stage
          </label>
          <select
            id="limit-stage"
            value={stageValid ? stageId : ""}
            onChange={(event) => write(event.target.value, categoryValid ? category : "")}
          >
            <option value="">All stages</option>
            {stages.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.number} {stage.title}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label className="field-name" htmlFor="limit-category">
            Category
          </label>
          <select
            id="limit-category"
            value={categoryValid ? category : ""}
            onChange={(event) => write(stageValid ? stageId : "", event.target.value)}
          >
            <option value="">All categories</option>
            <option value="may-support">{categoryName("may-support")}</option>
            <option value="must-not-decide">{categoryName("must-not-decide")}</option>
          </select>
        </div>
        {(stageId || category) && (
          <button type="button" className="btn" onClick={() => write("", "")}>
            Clear filters
          </button>
        )}
      </div>
      {(!stageValid || !categoryValid) && (
        <Notice title="That filter is not in the register">
          <p>Stages are numbered 01 to 06. Categories are the two headings in this table.</p>
          <button type="button" className="btn" onClick={() => write("", "")}>
            Clear filters
          </button>
        </Notice>
      )}
      <p className="quiet">
        Showing {rows.length} of {limitRows.length} rows.
      </p>
      {rows.length === 0 ? (
        <Notice title="No rows match">
          <p>Clear one filter, or both, to return to the full table.</p>
          <button type="button" className="btn" onClick={() => write("", "")}>
            Clear filters
          </button>
        </Notice>
      ) : (
        <div className="table-wrap">
          <table className="register-table">
            <thead>
              <tr>
                <th scope="col">Capability or decision</th>
                <th scope="col">Category</th>
                <th scope="col">Stages</th>
                <th scope="col">Why</th>
                <th scope="col">Required oversight</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const expanded = open === row.id;
                return (
                  <Row
                    key={row.id}
                    expanded={expanded}
                    onToggle={() => setOpen(expanded ? null : row.id)}
                    name={row.name}
                    tier={row.decisionTier}
                    category={categoryName(row.category)}
                    stageIds={row.stageIds}
                    why={row.why}
                    oversight={row.oversight}
                    detail={row.detail}
                    relatedApplicationIds={row.relatedApplicationIds}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Row({
  expanded,
  onToggle,
  name,
  tier,
  category,
  stageIds,
  why,
  oversight,
  detail,
  relatedApplicationIds,
}: {
  expanded: boolean;
  onToggle: () => void;
  name: string;
  tier: (typeof limitRows)[number]["decisionTier"];
  category: string;
  stageIds: string[];
  why: string;
  oversight: string;
  detail: string;
  relatedApplicationIds: string[];
}) {
  return (
    <>
      <tr>
        <th scope="row" data-label="Capability or decision">
          <button type="button" className="text-button" aria-expanded={expanded} onClick={onToggle}>
            {name}
          </button>
          <DecisionMark tier={tier} />
        </th>
        <td data-label="Category">{category}</td>
        <td data-label="Stages">
          {stageIds
            .map((id) => getStage(id))
            .filter((stage) => stage !== undefined)
            .map((stage, index) => (
              <span key={stage.id}>
                {index > 0 ? ", " : ""}
                <Link to={`/pathway/${stage.id}`}>
                  <span className="num">{stage.number}</span> {stage.title}
                </Link>
              </span>
            ))}
        </td>
        <td data-label="Why">{why}</td>
        <td data-label="Required oversight">{oversight}</td>
      </tr>
      {expanded && (
        <tr className="detail-row">
          <td colSpan={5} data-label="Detail">
            <p>{detail}</p>
            {relatedApplicationIds.length > 0 && (
              <p>
                Related applications:{" "}
                {relatedApplicationIds.map((id, index) => {
                  const application = getApplication(id);
                  if (!application) return null;
                  return (
                    <span key={id}>
                      {index > 0 ? ", " : ""}
                      <Link to={`/map?app=${id}`}>{application.name}</Link>
                    </span>
                  );
                })}
              </p>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
