import { Guide } from "./GuideCharacter.tsx";

export function JourneyArt() {
  return (
    <svg className="scene-svg" viewBox="0 0 640 280" role="img" aria-label="Six stepping stones from a clinic doorway to a home">
      <rect className="scene-sky" x="0" y="0" width="640" height="280" rx="16" />
      <path className="scene-hill" d="M0 190 C80 150 140 210 220 180 C300 150 360 200 460 170 C540 146 580 160 640 140 L640 280 L0 280 Z" />
      <path className="scene-trail" d="M70 210 C140 160 200 230 280 190 C360 150 420 210 520 176 C560 164 590 168 610 150" />
      <g className="scene-door">
        <rect x="36" y="132" width="48" height="70" rx="4" />
        <path d="M36 132 H84 L70 112 H50 Z" />
      </g>
      <g className="scene-home">
        <rect x="548" y="96" width="58" height="46" rx="3" />
        <path d="M540 100 L577 72 L614 100" />
      </g>
      {[
        [110, 188],
        [190, 206],
        [270, 176],
        [360, 168],
        [450, 188],
        [530, 162],
      ].map(([x, y], index) => (
        <g key={x} className="scene-stone" style={{ animationDelay: `${index * 180}ms` }}>
          <ellipse cx={x} cy={y} rx="22" ry="10" />
          <text x={x} y={y + 4} textAnchor="middle">
            {String(index + 1).padStart(2, "0")}
          </text>
        </g>
      ))}
      <circle className="scene-walker" cx="0" cy="0" r="7" />
    </svg>
  );
}

export function TeamArt() {
  const people = [70, 160, 250, 340, 430, 520];
  return (
    <svg className="scene-svg" viewBox="0 0 640 240" role="img" aria-label="A small group standing together">
      <rect className="scene-sky" width="640" height="240" rx="16" />
      <path className="scene-hill" d="M0 180 H640 V240 H0 Z" />
      {people.map((x, index) => (
        <g key={x} className="scene-person" style={{ animationDelay: `${index * 140}ms` }}>
          <circle cx={x} cy="78" r="16" />
          <path d={`M${x - 18} 150 C${x - 16} 110 ${x + 16} 110 ${x + 18} 150`} />
        </g>
      ))}
    </svg>
  );
}

export function MapArt() {
  return (
    <svg className="scene-svg" viewBox="0 0 640 240" role="img" aria-label="Cards joined by lines">
      <rect className="scene-sky" width="640" height="240" rx="16" />
      <path className="scene-link" d="M150 70 H470" />
      <path className="scene-link" d="M150 120 H470" />
      <path className="scene-link" d="M150 170 H470" />
      {[70, 120, 170].map((y) => (
        <g key={y}>
          <rect className="scene-card" x="70" y={y - 22} width="110" height="44" rx="8" />
          <rect className="scene-card" x="450" y={y - 22} width="110" height="44" rx="8" />
        </g>
      ))}
    </svg>
  );
}

export function LoopArt() {
  return (
    <svg className="scene-svg" viewBox="0 0 640 240" role="img" aria-label="A person, a screen, then a reviewer">
      <rect className="scene-sky" width="640" height="240" rx="16" />
      <g className="scene-person">
        <circle cx="90" cy="90" r="18" />
        <path d="M70 180 C74 130 106 130 112 180" />
        <path d="M70 140 L40 110" />
      </g>
      <path className="scene-link" d="M140 120 H230" />
      <rect className="scene-card" x="240" y="70" width="120" height="90" rx="10" />
      <path className="scene-link" d="M250 100 H350 M250 120 H320 M250 140 H300" />
      <path className="scene-link" d="M370 120 H450" />
      <g className="scene-person" style={{ animationDelay: "200ms" }}>
        <circle cx="510" cy="88" r="18" />
        <path d="M488 180 C492 128 528 128 534 180" />
        <rect className="scene-card" x="470" y="118" width="36" height="28" rx="4" />
      </g>
    </svg>
  );
}

export function TableArt() {
  return (
    <svg className="scene-svg" viewBox="0 0 640 240" role="img" aria-label="A table of rows">
      <rect className="scene-sky" width="640" height="240" rx="16" />
      <rect className="scene-card" x="70" y="36" width="500" height="168" rx="12" />
      {[70, 102, 134, 166].map((y, index) => (
        <rect
          key={y}
          className={index % 2 === 0 ? "scene-row" : "scene-row is-copper"}
          x="96"
          y={y}
          width="448"
          height="18"
          rx="4"
        />
      ))}
    </svg>
  );
}

const art = {
  journey: JourneyArt,
  team: TeamArt,
  map: MapArt,
  loop: LoopArt,
  table: TableArt,
};

export function SceneBand({
  scene,
  pose,
  line,
}: {
  scene: keyof typeof art;
  pose: "wave" | "point" | "walk" | "think";
  line: string;
}) {
  const Art = art[scene];
  return (
    <figure className="scene-band">
      <Art />
      <Guide pose={pose} line={line} />
    </figure>
  );
}
