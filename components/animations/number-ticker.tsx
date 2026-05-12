"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

interface NumberTickerProps {
  /** Valeur finale numérique (ex: 50, 100, 2) */
  value: number;
  /** Texte ajouté après le nombre (ex: "+", "%", "k") */
  suffix?: string;
  /** Texte ajouté avant le nombre */
  prefix?: string;
  /** Durée de l'animation en secondes (défaut 1.5) */
  duration?: number;
  /** Décimales à afficher (défaut 0) */
  decimals?: number;
  className?: string;
}

/**
 * Compteur animé déclenché quand l'élément entre dans le viewport.
 * Ease-out cubic, respecte prefers-reduced-motion.
 */
export function NumberTicker({
  value,
  suffix = "",
  prefix = "",
  duration = 1.5,
  decimals = 0,
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setCurrent(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: DOMHighResTimeStamp) => {
      const progress = Math.min((t - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCurrent(eased * value);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCurrent(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced]);

  const formatted = current.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
