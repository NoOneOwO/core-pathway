import { useReducedMotion } from "../lib/useReducedMotion.ts";

export function GuideCharacter({
  pose,
}: {
  pose: "wave" | "point" | "walk" | "think";
}) {
  const reduced = useReducedMotion();
  return (
    <svg
      className={reduced ? `guide-svg is-${pose} is-still` : `guide-svg is-${pose}`}
      viewBox="0 0 180 240"
      aria-hidden="true"
    >
      <ellipse className="guide-shadow" cx="90" cy="226" rx="34" ry="7" />
      <g className="guide-bob">
        <g className="guide-leg guide-leg-a">
          <path d="M78 148 C74 170 68 188 66 204" />
          <ellipse cx="62" cy="208" rx="14" ry="6" />
        </g>
        <g className="guide-leg guide-leg-b">
          <path d="M102 148 C108 170 114 188 116 204" />
          <ellipse cx="120" cy="208" rx="14" ry="6" />
        </g>
        <path
          className="guide-sweater"
          d="M58 92 C58 84 70 78 90 78 C110 78 122 84 122 92 L128 150 C128 158 112 164 90 164 C68 164 52 158 52 150 Z"
        />
        <path className="guide-collar" d="M78 86 H102 L96 98 H84 Z" />
        <g className="guide-arm guide-arm-a">
          <path d="M58 100 C40 108 28 128 34 146" />
          <circle cx="34" cy="150" r="7" />
        </g>
        <g className="guide-arm guide-arm-b">
          <path d="M122 100 C142 96 158 78 150 62" />
          <circle cx="146" cy="56" r="7" />
        </g>
        <g className="guide-head">
          <circle cx="90" cy="52" r="30" />
          <path className="guide-hair" d="M62 48 C64 22 116 18 122 50 C110 36 74 34 62 48 Z" />
          <g className="guide-eyes">
            <ellipse className="guide-eye" cx="78" cy="54" rx="4" ry="5" />
            <ellipse className="guide-eye" cx="102" cy="54" rx="4" ry="5" />
          </g>
          <path className="guide-glasses" d="M66 54 H88 M92 54 H114 M88 54 H92" />
          <path className="guide-smile" d="M80 68 C86 74 96 74 102 68" />
        </g>
      </g>
    </svg>
  );
}

export function Guide({
  pose,
  line,
}: {
  pose: "wave" | "point" | "walk" | "think";
  line: string;
}) {
  return (
    <div className="guide">
      <GuideCharacter pose={pose} />
      <p className="guide-line">{line}</p>
    </div>
  );
}
