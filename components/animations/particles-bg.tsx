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
    // Pseudo-random stable basé sur index (pas de Math.random pour SSR).
    // On arrondit à 2 décimales pour éviter les mismatchs d'hydratation
    // entre la sérialisation float côté serveur vs client.
    const round2 = (n: number) => Math.round(n * 100) / 100;
    const hash = (n: number) => {
      const x = Math.sin(n) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: count }, (_, i) => {
      const seed = i + 1;
      return {
        left: round2(hash(seed) * 100),
        top: round2(hash(seed * 2.3) * 100),
        size: round2(minSize + hash(seed * 3.7) * (maxSize - minSize)),
        delay: round2(hash(seed * 4.1) * 6),
        duration: round2(8 + hash(seed * 5.3) * 8),
        opacity: round2(0.15 + hash(seed * 6.7) * 0.35),
      };
    });
  }, [count, minSize, maxSize]);

  return (
    // Hidden sur mobile : les 30 particules consomment trop de DOM/CPU
    // sans apporter de valeur visuelle sur petit écran.
    <div aria-hidden className="hidden md:block pointer-events-none absolute inset-0 overflow-hidden">
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
