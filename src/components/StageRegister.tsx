import { Link } from "react-router-dom";
import { stages } from "../data/content.ts";

export function StageRegister({ linked = true }: { linked?: boolean }) {
  return (
    <ol className="register">
      {stages.map((stage) => {
        const body = (
          <>
            <span className="num">{stage.number}</span>
            <span className="register-copy">
              <span className="register-title">{stage.title}</span>
              <span className="quiet">{stage.summary}</span>
            </span>
          </>
        );
        return (
          <li key={stage.id}>
            {linked ? (
              <Link to={`/pathway/${stage.id}`}>{body}</Link>
            ) : (
              <div className="register-static">{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
