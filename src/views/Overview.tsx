import { Link } from "react-router-dom";
import { useEffect } from "react";
import { BoundaryGame } from "../components/BoundaryGame.tsx";
import { DisclaimerBlock } from "../components/DisclaimerBlock.tsx";
import { Legend } from "../components/Legend.tsx";
import { JourneyArt } from "../components/Scenes.tsx";
import { Guide } from "../components/GuideCharacter.tsx";
import { StageRegister } from "../components/StageRegister.tsx";
import {
  categoryName,
  limitRows,
  overviewCopy,
  professionals,
} from "../data/content.ts";

export function Overview() {
  useEffect(() => {
    document.title = "Care pathway register";
  }, []);

  const support = limitRows.filter((row) => row.category === "may-support");
  const blocked = limitRows.filter((row) => row.category === "must-not-decide");

  return (
    <div className="container page">
      <header className="hero hero-split">
        <div className="stack">
          <h1>{overviewCopy.title}</h1>
          <p className="lede">{overviewCopy.lede}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/pathway/01">
              Open the pathway
            </Link>
            <Link className="btn" to="/present/1">
              Present
            </Link>
          </div>
          <DisclaimerBlock />
        </div>
        <figure className="hero-art">
          <JourneyArt />
          <Guide
            pose="wave"
            line="I walk the six stages with you. I explain the pictures. I never decide care."
          />
        </figure>
      </header>

      <section className="stack" aria-labelledby="deliverables-heading">
        <h2 id="deliverables-heading">What this project hands you</h2>
        <p>Four pieces, all in this site, all reading the same register.</p>
        <ul className="deliverables">
          <li>
            <Link to="/pathway/01">
              <span className="num">01</span>
              <span>Care-pathway map</span>
            </Link>
          </li>
          <li>
            <Link to="/limits">
              <span className="num">02</span>
              <span>AI opportunity and limitation table</span>
            </Link>
          </li>
          <li>
            <Link to="/loop">
              <span className="num">03</span>
              <span>Human-in-the-loop diagram</span>
            </Link>
          </li>
          <li>
            <Link to="/present/1">
              <span className="num">04</span>
              <span>5 to 7 minute presentation</span>
            </Link>
          </li>
        </ul>
      </section>

      <section className="stack" aria-labelledby="about-heading">
        <h2 id="about-heading">What this care is</h2>
        <p>{overviewCopy.definition}</p>
        <p className="quiet">{overviewCopy.registerNote}</p>
      </section>

      <section className="stack" aria-labelledby="stages-heading">
        <h2 id="stages-heading">The journey, stage by stage</h2>
        <p>Choose a stage to read the work, the people, and the limits of software there.</p>
        <StageRegister />
      </section>

      <section className="stack" aria-labelledby="team-heading">
        <h2 id="team-heading">Who leads the work</h2>
        <p>Each role can be read against the stages it joins.</p>
        <ul className="name-list">
          {professionals.map((person) => (
            <li key={person.id}>
              <Link to={`/team/${person.id}`}>{person.name}</Link>
              <span className="quiet">{person.summary}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="stack" aria-labelledby="support-heading">
        <h2 id="support-heading">Where software may sit</h2>
        <p>
          The marks below travel with every application, row, and loop step. Read the{" "}
          <Link to="/limits">limits table</Link> or the <Link to="/map">opportunity map</Link> for
          the same boundary in more detail.
        </p>
        <Legend />
        <div className="split-lists">
          <div>
            <h3>{categoryName("may-support")}</h3>
            <ul className="plain-list">
              {support.map((row) => (
                <li key={row.id}>
                  <Link to={`/limits?category=may-support`}>{row.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{categoryName("must-not-decide")}</h3>
            <ul className="plain-list">
              {blocked.map((row) => (
                <li key={row.id}>
                  <Link to={`/limits?category=must-not-decide`}>{row.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <BoundaryGame />
    </div>
  );
}
