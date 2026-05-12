"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface WordRotatorProps {
  words: string[];
  /** Intervalle entre changements en ms (défaut 2500) */
  interval?: number;
  className?: string;
}

/**
 * Cycle entre plusieurs mots avec une transition slide+fade.
 * Respecte prefers-reduced-motion. Sur mobile (< md), affichage
 * statique du premier mot pour économiser CPU/batterie.
 */
export function WordRotator({ words, interval = 2500, className }: WordRotatorProps) {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);

  // Détection mobile côté client uniquement (évite mismatch hydratation)
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (reduced || isMobile || words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduced, isMobile]);

  // Mobile ou reduced motion → statique
  if (reduced || isMobile) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className={cn("relative inline-flex overflow-hidden align-middle", className)}>
      {/* Mot fantôme pour réserver la largeur du plus long */}
      <span className="invisible whitespace-nowrap" aria-hidden>
        {words.reduce((longest, w) => (w.length > longest.length ? w : longest), "")}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
