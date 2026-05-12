"use client";

import { useMemo } from "react";

interface ParticlesBgProps {
  /** Nombre de particules (défaut 24) */
  count?: number;
  /** Taille min en px */
  minSize?: number;
  /** Taille max en px */
  maxSize?: number;
  /** Couleur (par défaut accent) */
  color?: string;
}

/**
 * Particules subtiles en arrière-plan — DOM-based (pas de canvas).
 * Position aléatoire stable (seed via index), float vertical lent.
 * Pas d'animation si prefers-reduced-motion (CSS media query).
 */
export function ParticlesBg({
  count = 24,
  minSize = 2,
  maxSize = 5,
  color = "var(--accent)",
}: ParticlesBgProps) {
  const particles = useMemo(() => {
    // Pseudo-random stable basé sur index (pas de Math.random pour SSR)
    return Array.from({ length: count }, (_, i) => {
      const hash = (n: number) => {
        const x = Math.sin(n) * 10000;
        return x - Math.floor(x);
      };
      const seed = i + 1;
      return {
        left: hash(seed) * 100,
        top: hash(seed * 2.3) * 100,
        size: minSize + hash(seed * 3.7) * (maxSize - minSize),
        delay: hash(seed * 4.1) * 6,
        duration: 8 + hash(seed * 5.3) * 8,
        opacity: 0.15 + hash(seed * 6.7) * 0.35,
      };
    });
  }, [count, minSize, maxSize]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full motion-safe:animate-particle-float"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: color,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
