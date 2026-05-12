"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Smooth scroll global via Lenis (desktop uniquement).
 * Sur mobile / touch device : Lenis n'est pas monté du tout — on garde
 * le scroll natif (plus fluide, moins consommateur de batterie).
 * Respecte automatiquement prefers-reduced-motion.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    // On active Lenis seulement si : pas touch device + écran ≥ 768px
    const isTouch = window.matchMedia("(hover: none)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    setEnable(!isTouch && !isMobile);
  }, []);

  if (!enable) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
