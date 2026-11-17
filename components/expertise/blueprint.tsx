"use client";

import { useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface Skill {
  title: string;
  description: string;
  points: string[];
}

// One room per skill on a 600 × 420 plan.
const ROOMS = [
  { x: 20, y: 20, w: 240, h: 180 },
  { x: 260, y: 20, w: 180, h: 180 },
  { x: 440, y: 20, w: 140, h: 180 },
  { x: 20, y: 200, w: 180, h: 200 },
  { x: 200, y: 200, w: 220, h: 200 },
  { x: 420, y: 200, w: 160, h: 200 },
];

/**
 * Expertise signature: the skills drawn as an architect's plan of your
 * project, one room each. The plan draws itself when it comes into view;
 * choosing a skill in the legend lights its room (and the other way
 * round). Reduced motion shows the plan already drawn.
 */
export function Blueprint({ skills }: { skills: Skill[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const drawn = useInView(ref, { once: true, amount: 0.4 });
  const [active, setActive] = useState(0);

  return (
    <div ref={ref} className={cn("bp", drawn && "is-drawn")}>
      <div className="bp-sheet">
        <svg viewBox="0 0 600 440" className="bp-svg" role="img" aria-label="Plan de votre projet : une pièce par compétence">
          {/* Dimension line */}
          <path className="bp-dim" pathLength={1} d="M20 432 H580 M20 426 V438 M580 426 V438" />
          <text x="300" y="428" className="bp-dim-text" textAnchor="middle">
            Votre projet · échelle 1:1
          </text>
          {ROOMS.map((r, i) => (
            <g
              key={i}
              className={cn("bp-room", i === active && "is-active")}
              onPointerEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              style={{ "--i": i } as React.CSSProperties}
            >
              <rect x={r.x} y={r.y} width={r.w} height={r.h} pathLength={1} />
              {/* A door on each room, as on a real plan */}
              <path className="bp-door" pathLength={1} d={`M${r.x + 24} ${r.y + r.h} a 22 22 0 0 1 22 -22`} />
              <text x={r.x + 14} y={r.y + 26} className="bp-num">
                0{i + 1}
              </text>
              <text x={r.x + 14} y={r.y + 48} className="bp-label">
                {skills[i]?.title}
              </text>
            </g>
          ))}
          <rect className="bp-wall" x="20" y="20" width="560" height="380" pathLength={1} />
        </svg>
      </div>

      <ol className="bp-legend">
        {skills.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              className={cn("bp-key", i === active && "is-active")}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--accent)]">0{i + 1}</span>
              <span className="text-h4">{s.title}</span>
            </button>
            {i === active && (
              <div className="bp-detail">
                <p className="text-body-sm text-[var(--muted-foreground)]">{s.description}</p>
                <p className="mt-3 font-[family-name:var(--font-geist-mono)] text-xs text-[var(--accent)]">{s.points.join(" · ")}</p>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
