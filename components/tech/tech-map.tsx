"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Positions on a 1000 × 480 map.
const NODES = [
  { id: "wordpress", label: "WordPress", href: "/services/wordpress", x: 130, y: 110, note: "Notre spécialité" },
  { id: "nextjs", label: "Next.js", href: "/technologies/nextjs", x: 450, y: 100 },
  { id: "react", label: "React", href: "/technologies/react", x: 560, y: 290 },
  { id: "rn", label: "React Native", href: "/technologies/react-native", x: 290, y: 400 },
  { id: "ts", label: "TypeScript", href: "/technologies/typescript", x: 860, y: 230 },
];
const EDGES: { a: string; b: string; label: string }[] = [
  { a: "wordpress", b: "nextjs", label: "en headless" },
  { a: "react", b: "nextjs", label: "base de" },
  { a: "react", b: "rn", label: "base de" },
  { a: "ts", b: "nextjs", label: "type" },
  { a: "ts", b: "react", label: "type" },
  { a: "ts", b: "rn", label: "type" },
];

/**
 * Technologies index signature: the tools as a map of how they connect.
 * Hovering or focusing a tool lights the tools it works with.
 */
export function TechMap() {
  const [hover, setHover] = useState<string | null>(null);
  const node = (id: string) => NODES.find((n) => n.id === id)!;
  const linked = (id: string) => !hover || hover === id || EDGES.some((e) => (e.a === hover && e.b === id) || (e.b === hover && e.a === id));

  return (
    <div className="tmap" onPointerLeave={() => setHover(null)}>
      <svg viewBox="0 0 1000 480" className="tmap-lines" aria-hidden>
        {EDGES.map((e) => {
          const A = node(e.a);
          const B = node(e.b);
          const on = !hover || e.a === hover || e.b === hover;
          return (
            <g key={`${e.a}-${e.b}`} className={cn("tmap-edge", on && hover && "is-on", !on && "is-off")}>
              <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} />
              <text x={(A.x + B.x) / 2} y={(A.y + B.y) / 2 - 8} textAnchor="middle">
                {e.label}
              </text>
            </g>
          );
        })}
      </svg>
      {NODES.map((n) => (
        <Link
          key={n.id}
          href={n.href}
          className={cn("tmap-node", hover === n.id && "is-hover", !linked(n.id) && "is-off")}
          style={{ left: `${n.x / 10}%`, top: `${(n.y / 480) * 100}%` }}
          onPointerEnter={() => setHover(n.id)}
          onFocus={() => setHover(n.id)}
          onBlur={() => setHover(null)}
        >
          {n.label}
          {n.note && <span className="tmap-note">{n.note}</span>}
        </Link>
      ))}
    </div>
  );
}
