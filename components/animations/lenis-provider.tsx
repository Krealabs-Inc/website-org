"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Smooth scroll global via Lenis.
 * Lenis détecte et respecte automatiquement prefers-reduced-motion.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        // Lenis désactive automatiquement si prefers-reduced-motion est actif
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
