# Design: Care pathway register

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: editorial
- Shape of the first page: app screen, overview composed as Index-First (draw 0be9d5). Hero posture Corridor. The working views are the register itself: pathway, team, map, limits, care loop, presentation.
- Theme: custom warm editorial. Ivory paper, Fraunces display, Newsreader prose, one copper accent. The gray Almanac slate was replaced because it read as a dry handbook.
- Axes: light/roman-serif/chromatic-copper · posture: restrained
- Inferences: audience is students and educators; the action is to open the pathway and present it; tone is editorial. No photographs, quotes, or statistics were supplied, so none are invented.

## Tokens
`src/tokens.css` is the source of truth. The roles:

```css
:root {
  --color-paper: oklch(96.8% 0.012 85);  --color-paper-2: oklch(94.2% 0.016 82);  --color-paper-3: oklch(90.5% 0.02 75);
  --color-ink: oklch(24% 0.03 55);  --color-ink-2: oklch(32% 0.028 55);  --color-muted: oklch(42% 0.03 60);
  --color-rule: oklch(86% 0.02 80);  --color-rule-2: oklch(34% 0.04 55);
  --color-accent: oklch(42% 0.11 48);  --color-accent-2: oklch(36% 0.1 48);
  --color-accent-ink: oklch(98% 0.01 85);  --color-focus: oklch(48% 0.13 48);
  --color-sheet: oklch(99% 0.006 85);
  --font-display: "Fraunces", ui-serif, Georgia, serif;
  --font-body: "Newsreader", ui-serif, Georgia, serif;
  --font-outlier: "IBM Plex Mono", ui-monospace, monospace;
  --radius-card: 16px;  --radius-pill: 12px;  --rule-hair: 1px;  --shadow-card: 0 18px 40px oklch(30% 0.03 55 / 0.08);
}
```

The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `tokens.css`. Tailwind v4 maps the colour, font, text, tracking, radius, shadow, and ease tokens through `@theme static`, so utilities such as `bg-paper`, `text-ink`, and `font-display` read the same roles.

## Type
- Display and controls: Hanken Grotesk 600 for headings, 500 for buttons. Sentence case. Tracking only via `--tracking-display` on headings.
- Prose, field names, table heads, captions: Newsreader.
- Figures only: IBM Plex Mono, tabular numerals, for stage numbers and the slide counter. Mono is never a label.

## Controls
- Primary: magenta fill, accent ink text, 2px radius, 40px height. One primary on a screen (Present, or the pathway action).
- Secondary: ink hairline on transparent, same radius and height.
- Current selection: a 2px ink or accent rule plus a word (Current, Selected, In this role). Colour is never the only signal.

## Decision marks
Three tiers, each a shape, an icon, and a name. All three use ink, not the accent.
- AI-supported: dashed ring, waypoints icon.
- Human-supervised: double ring, eye icon.
- Human-only: solid square, person icon.

## Motion
- Character: still, except the care-loop connectors, which pulse opacity and can be switched off. Under reduced motion the pulse does not run.
- Transitions use colour and transform only, on `--dur-micro` and `--ease-out`.

## Chrome
- Nav: a top bar. Under 60rem it retracts behind a Menu button. Seven destinations, so no sidebar.
- Footer: index columns for views and stages, plus a fixed ink strip carrying the verbatim disclaimer on every view.
- Signature: the six-stage register, a numbered list on the pale sheet.

## Exports
`src/tokens.css` and `src/base.css`. Tailwind utilities come from the `@theme static` block in `tokens.css`.
