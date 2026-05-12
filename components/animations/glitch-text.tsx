"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  /** Intervalle entre glitches (ms) */
  interval?: number;
  className?: string;
}

/**
 * Effet glitch léger : décalage RGB + flash occasionnel.
 * Respecte prefers-reduced-motion (statique si activé).
 */
export function GlitchText({ text, interval = 3000, className }: GlitchTextProps) {
  const reduced = useReducedMotion();
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setGlitching(true);
      const reset = setTimeout(() => setGlitching(false), 250);
      return () => clearTimeout(reset);
    }, interval);
    return () => clearInterval(id);
  }, [interval, reduced]);

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={cn("relative inline-block", className)}>
      <span className={cn("relative z-10", glitching && "motion-safe:animate-glitch-flicker")}>
        {text}
      </span>
      {/* Layer cyan (offset gauche) */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 z-0 select-none pointer-events-none",
          "text-cyan-400 mix-blend-screen",
          glitching ? "motion-safe:animate-glitch-cyan opacity-70" : "opacity-0",
        )}
      >
        {text}
      </span>
      {/* Layer rouge (offset droite) */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 z-0 select-none pointer-events-none",
          "text-rose-500 mix-blend-screen",
          glitching ? "motion-safe:animate-glitch-red opacity-70" : "opacity-0",
        )}
      >
        {text}
      </span>
    </span>
  );
}
