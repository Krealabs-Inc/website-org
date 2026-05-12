"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MotionRevealProps {
  children: ReactNode;
  /** Délai en secondes avant le début de l'animation */
  delay?: number;
  /** Direction du fade-in */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Distance en pixels (par défaut 16) */
  distance?: number;
  /** Stagger pour les enfants directs (utiliser dans un parent puis MotionRevealItem) */
  stagger?: boolean;
  className?: string;
}

const buildVariants = (direction: NonNullable<MotionRevealProps["direction"]>, distance: number): Variants => {
  const map: Record<typeof direction, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };
  return {
    hidden: { opacity: 0, ...map[direction] },
    visible: { opacity: 1, x: 0, y: 0 },
  };
};

/**
 * Wrapper Motion qui révèle son contenu au scroll (once: true).
 * Respecte prefers-reduced-motion : si activé, render direct sans animation.
 */
export function MotionReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 16,
  stagger = false,
  className,
}: MotionRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={buildVariants(direction, distance)}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: stagger ? 0.08 : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Enfant à utiliser dans un MotionReveal avec stagger=true.
 * Hérite des variants du parent.
 */
export function MotionRevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
