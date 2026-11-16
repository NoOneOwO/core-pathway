import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DisclaimerBlock } from "../components/DisclaimerBlock.tsx";
import { Guide } from "../components/GuideCharacter.tsx";
import { Legend } from "../components/Legend.tsx";
import { LoopDiagram } from "../components/LoopDiagram.tsx";
import { Notice } from "../components/Notice.tsx";
import { StageRegister } from "../components/StageRegister.tsx";
import {
  categoryName,
  limitRows,
  overviewCopy,
  professionals,
  slides,
} from "../data/content.ts";

export function Presentation() {
  const { slideNumber } = useParams();
  const navigate = useNavigate();
  const parsed = Number(slideNumber);
  const slide = slides.find((item) => item.number === parsed);
  const [notes, setNotes] = useState(false);
  const [fullscreenNote, setFullscreenNote] = useState("");

  useEffect(() => {
    document.title = slide
      ? `Slide ${slide.number} of 6, Care pathway register`
      : "Presentation, Care pathway register";
  }, [slide]);

  useEffect(() => {
    if (!slide) return;
    document.getElementById("slide-title")?.focus();
  }, [slide]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("input, textarea, select")) return;
      if (!slide) {
        if (event.key === "Escape") navigate("/");
        return;
      }
      const go = (number: number) => navigate(`/present/${number}`);
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        if (slide.number < 6) go(slide.number + 1);
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        if (slide.number > 1) go(slide.number - 1);
      } else if (event.key === " " || event.key === "Spacebar") {
        if (target instanceof HTMLElement && target.closest("a, button")) return;
        event.preventDefault();
        if (slide.number < 6) go(slide.number + 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        go(1);
      } else if (event.key === "End") {
        event.preventDefault();
        go(6);
      } else if (event.key === "Escape") {
        if (document.fullscreenElement) return;
        event.preventDefault();
        navigate("/");
      } else if (event.key === "n" || event.key === "N") {
        if (target instanceof HTMLElement && target.closest("a, button")) return;
        event.preventDefault();
        setNotes((value) => !value);
      } else if (event.key === "f" || event.key === "F") {
        if (target instanceof HTMLElement && target.closest("a, button")) return;
        event.preventDefault();
        void toggleFullscreen(setFullscreenNote);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, slide]);

  if (!slide) {
    return (
      <div className="container page">
        <Notice as="h1" title="This slide is not in the deck">
          <p>The presentation has six slides.</p>
          <Link className="btn btn-primary" to="/present/1">
            Open the first slide
          </Link>
        </Notice>
      </div>
    );
  }

  return (
    <div className="present">
      <div className="container present-frame">
        <div className="present-bar">
          <p className="num present-count">
            {slide.number} / {slides.length}
          </p>
          <div
            className="progress"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={slides.length}
            aria-valuenow={slide.number}
            aria-valuetext={`Slide ${slide.number} of ${slides.length}`}
          >
            <span style={{ transform: `scaleX(${slide.number / slides.length})` }} />
          </div>
        </div>
        <article className="slide" aria-labelledby="slide-title">
          <h1 id="slide-title" tabIndex={-1}>
            {slide.title}
          </h1>
          <p className="lede">{slide.lede}</p>
          <Guide pose={slide.number % 2 === 0 ? "walk" : "wave"} line={guideLine(slide.number)} />
          <SlideBody number={slide.number} />
          {slide.showDisclaimer && <DisclaimerBlock />}
        </article>
        {notes && (
          <section className="notes" id="speaker-notes" aria-label="Speaker notes">
            <h2>Speaker notes</h2>
            <p>{slide.notes}</p>
          </section>
        )}
        {fullscreenNote && (
          <p className="quiet" role="status">
            {fullscreenNote}
          </p>
        )}
        <div className="present-controls">
          <button
            type="button"
            className="btn"
            onClick={() => navigate(`/present/${slide.number - 1}`)}
            disabled={slide.number === 1}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate(`/present/${slide.number + 1}`)}
            disabled={slide.number === slides.length}
          >
            Next
          </button>
          <button
            type="button"
            className="btn"
            aria-pressed={notes}
            aria-controls={notes ? "speaker-notes" : undefined}
            onClick={() => setNotes((value) => !value)}
          >
            Notes
          </button>
          <button type="button" className="btn" onClick={() => void toggleFullscreen(setFullscreenNote)}>
            Full screen
          </button>
          <Link className="btn" to="/">
            Exit
          </Link>
        </div>
        <p className="quiet present-help">
          Arrow keys or space move between slides. Home and end jump. N shows notes. F asks for full
          screen. Escape leaves.
        </p>
      </div>
    </div>
  );
}

function guideLine(number: number) {
  const lines = [
    "Start with the idea of rehabilitation as a sequence, then keep every clinical judgement with the team.",
    "I walk the six stones in order. The same titles appear in every view.",
    "Count the seven roles. Software may assist the work. It does not take the role.",
    "These are the places software may organise, show, draft, or remind.",
    "Stop at the professional. An insight is advice until a person decides.",
    "Leave with the boundary, not a plan for a real person.",
  ];
  return lines[number - 1] ?? lines[0];
}

function SlideBody({ number }: { number: number }) {
  if (number === 1) {
    return <p>{overviewCopy.definition}</p>;
  }
  if (number === 2) {
    return <StageRegister linked={false} />;
  }
  if (number === 3) {
    return (
      <ul className="name-list">
        {professionals.map((person) => (
          <li key={person.id}>
            <span className="register-title">{person.name}</span>
            <span className="quiet">{person.summary}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (number === 4) {
    const rows = limitRows.filter((row) => row.category === "may-support");
    return (
      <div className="stack">
        <Legend />
        <ul className="name-list">
          {rows.map((row) => (
            <li key={row.id}>
              <span className="register-title">{row.name}</span>
              <span className="quiet">{categoryName(row.category)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (number === 5) {
    const rows = limitRows.filter((row) => row.category === "must-not-decide");
    return (
      <div className="stack">
        <ul className="plain-list">
          {rows.map((row) => (
            <li key={row.id}>{row.name}</li>
          ))}
        </ul>
        <LoopDiagram interactive={false} flowing={false} />
      </div>
    );
  }
  return (
    <div className="stack">
      <Legend />
      <p>
        The pathway, the team, the map, the table, the loop, and these slides read one register.
        Use it to teach the boundary. Do not use it to plan care for a real person.
      </p>
    </div>
  );
}

async function toggleFullscreen(setNote: (value: string) => void) {
  try {
    if (!document.fullscreenEnabled) {
      setNote("Full screen is not available here. The slides already fill this view.");
      return;
    }
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      setNote("");
      return;
    }
    await document.documentElement.requestFullscreen();
    setNote("");
  } catch {
    setNote("Full screen was blocked by the browser. The slides already fill this view.");
  }
}
