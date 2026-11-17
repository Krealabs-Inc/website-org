/**
 * The "Galet" character, same drawing as the Remotion videos
 * (krealabs-videos/src/characters-v2.tsx): a soft pebble body, a face and
 * floating hands. Idle motion (breathing, blinking) is CSS, see
 * globals.css "galet".
 */
export function Galet({ color, glasses = false }: { color: string; glasses?: boolean }) {
  return (
    <svg viewBox="-130 -260 260 280" className="galet" aria-hidden>
      <ellipse className="galet-shadow" cx={0} cy={4} rx={86} ry={12} fill="rgba(0,0,0,0.35)" />
      <g className="galet-body">
        <path d="M -84 -60 Q -92 -236 0 -240 Q 92 -236 84 -60 Q 80 0 0 0 Q -80 0 -84 -60 Z" fill={color} />
        <path d="M 30 -232 Q 92 -220 84 -60 Q 80 -8 40 -2 Q 70 -110 30 -232 Z" fill="#000" opacity={0.12} />
        <g transform="translate(0 -150)">
          <g className="galet-eyes" fill="#0a0a0a">
            <ellipse cx={-24} cy={0} rx={10} ry={14} />
            <ellipse cx={24} cy={0} rx={10} ry={14} />
          </g>
          {glasses && (
            <g fill="none" stroke="#0a0a0a" strokeWidth={5}>
              <circle cx={-24} cy={0} r={22} />
              <circle cx={24} cy={0} r={22} />
              <path d="M -2 -2 L 2 -2" />
            </g>
          )}
          <path d="M -18 26 Q 0 50 18 26 Z" fill="#0a0a0a" />
        </g>
        <circle className="galet-hand is-left" cx={-104} cy={-120} r={20} fill={color} />
        <circle className="galet-hand is-right" cx={104} cy={-60} r={20} fill={color} />
      </g>
    </svg>
  );
}

/** Team colours, as in the videos. */
export const GALET_TEAM_COLORS = ["#8f99ed", "#a9b1f4", "#7f89e0", "#6a75d6"];
