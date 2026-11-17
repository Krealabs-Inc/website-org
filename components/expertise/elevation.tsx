const FLOORS = [
  { label: "Observabilité", note: "on voit avant vos utilisateurs" },
  { label: "CI/CD", note: "mises en ligne sans coupure" },
  { label: "Tests & qualité", note: "le code livré est testé" },
  { label: "Performance", note: "affiché en moins de 2 s" },
  { label: "Sécurité", note: "OWASP, secrets protégés" },
];

/**
 * Expertise hero: a cross-section of "your project" drawn like an
 * architect's elevation, foundations (architecture) at the bottom, each
 * floor one skill, with a title block. Draws itself on load (CSS);
 * shown drawn with reduced motion.
 */
export function Elevation() {
  const W = 420;
  const floorH = 54;
  const top = 70;
  const base = top + FLOORS.length * floorH;
  return (
    <figure className="elev" aria-label="Coupe de votre projet : fondations et étages, une compétence par niveau">
      <svg viewBox={`0 0 ${W + 170} ${base + 120}`}>
        {/* Roof */}
        <path className="elev-line" pathLength={1} d={`M20 ${top} L${W / 2 + 20} 20 L${W + 20} ${top}`} style={{ "--i": 0 } as React.CSSProperties} />
        {/* Floors */}
        {FLOORS.map((f, i) => {
          const y = top + i * floorH;
          return (
            <g key={f.label} style={{ "--i": i + 1 } as React.CSSProperties}>
              <rect className="elev-line" pathLength={1} x="20" y={y} width={W} height={floorH} />
              {[0, 1, 2, 3].map((k) => (
                <rect key={k} className="elev-win" x={50 + k * 95} y={y + 16} width="40" height="22" />
              ))}
              <line className="elev-tick" x1={W + 28} x2={W + 44} y1={y + floorH / 2} y2={y + floorH / 2} />
              <text className="elev-label" x={W + 50} y={y + floorH / 2 - 2}>
                {f.label}
              </text>
              <text className="elev-note" x={W + 50} y={y + floorH / 2 + 14}>
                {f.note}
              </text>
            </g>
          );
        })}
        {/* Foundations */}
        <g style={{ "--i": FLOORS.length + 1 } as React.CSSProperties}>
          <rect className="elev-line elev-found" pathLength={1} x="0" y={base} width={W + 40} height="34" />
          <text className="elev-found-text" x={W / 2 + 20} y={base + 22} textAnchor="middle">
            Fondations · Architecture
          </text>
        </g>
        {/* Ground */}
        <line className="elev-ground" x1="-10" x2={W + 170} y1={base + 34} y2={base + 34} />
        {/* Title block */}
        <g className="elev-block" transform={`translate(${W - 130} ${base + 52})`}>
          <rect width="300" height="56" />
          <line x1="0" x2="300" y1="28" y2="28" />
          <line x1="150" x2="150" y1="28" y2="56" />
          <text x="10" y="19">Plan n° 01 · Votre projet</text>
          <text x="10" y="47">Échelle 1:1</text>
          <text x="160" y="47">Dessiné à Rouen</text>
        </g>
      </svg>
    </figure>
  );
}
