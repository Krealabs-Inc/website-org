import type { CSSProperties } from "react";

const GAUGES = [
  { label: "Performance", value: 98 },
  { label: "Accessibilité", value: 100 },
  { label: "Bonnes pratiques", value: 100 },
  { label: "SEO", value: 100 },
];

/**
 * Performance & SEO hero: four Lighthouse-style gauges filling up.
 * Pure CSS (globals.css, "gauge"): arcs and numbers animate from first
 * paint; reduced motion shows the final values.
 */
export function Gauges() {
  return (
    <figure>
      <div className="gauges">
        {GAUGES.map((g, i) => (
          <div key={g.label} className="gauge" style={{ "--v": g.value, "--delay": `${200 + i * 120}ms` } as CSSProperties}>
            <svg viewBox="0 0 100 100" aria-hidden>
              <circle cx="50" cy="50" r="42" className="gauge-track" />
              <circle cx="50" cy="50" r="42" className="gauge-arc" />
            </svg>
            <span className="gauge-num" aria-hidden />
            <span className="sr-only">{`${g.label} : ${g.value} sur 100`}</span>
            <span className="gauge-label">{g.label}</span>
          </div>
        ))}
      </div>
      <figcaption className="text-caption mt-6">Illustration : les scores Lighthouse que nous visons pour votre site.</figcaption>
    </figure>
  );
}
