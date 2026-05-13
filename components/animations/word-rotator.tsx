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
 * Respecte prefers-reduced-motion uniquement (animation très légère :
 * 1 setInterval + 1 fade Framer toutes les 2.5s, négligeable côté perf
 * même sur mobile bas de gamme).
 */
export function WordRotator({ words, interval = 2500, className }: WordRotatorProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduced]);

  if (reduced) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span
      className={cn(
        "relative inline-grid overflow-hidden align-middle",
        className,
      )}
    >
      {/* Ghosts : tous les mots empilés invisibles dans la même cellule
          grid. La cellule prend la largeur du plus large en pixels (pas
          la longueur en caractères) → "WooCommerce" et "React Native"
          tiennent tous les deux. */}
      {words.map((w) => (
        <span
          key={`ghost-${w}`}
          aria-hidden
          className="col-start-1 row-start-1 invisible whitespace-nowrap"
        >
          {w}
        </span>
      ))}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
