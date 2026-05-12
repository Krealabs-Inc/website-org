"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TextHighlighterProps {
  children: ReactNode;
  /** Couleur du surlignage (par défaut accent du DS) */
  color?: string;
  /** Délai en secondes avant le tracé */
  delay?: number;
  /** Durée du tracé en secondes */
  duration?: number;
  /** Épaisseur du trait */
  thickness?: number;
  className?: string;
}

/**
 * Surligne un texte avec un trait au feutre animé (SVG path),
 * tracé une seule fois quand l'élément entre dans le viewport.
 * Respecte prefers-reduced-motion (apparaît instantanément).
 */
export function TextHighlighter({
  children,
  color = "var(--accent)",
  delay = 0.3,
  duration = 0.9,
  thickness = 12,
  className,
}: TextHighlighterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();

  const drawn = reduced || inView;

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute -bottom-1 left-0 w-full h-[0.45em] z-0 overflow-visible"
        viewBox="0 0 100 14"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M2,9 Q25,2 50,8 T98,7"
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          opacity={0.35}
          style={{
            strokeDasharray: 120,
            strokeDashoffset: drawn ? 0 : 120,
            transition: reduced
              ? "none"
              : `stroke-dashoffset ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
          }}
        />
      </svg>
    </span>
  );
}
