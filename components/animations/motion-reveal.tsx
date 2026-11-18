import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MotionRevealProps {
  children: ReactNode;
  /** Délai en secondes avant le début de l'animation */
  delay?: number;
  /** Direction du fade-in */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Distance en pixels (par défaut 24) */
  distance?: number;
  /** Fait apparaître les enfants directs l'un après l'autre */
  stagger?: boolean;
  className?: string;
}

/**
 * Révèle son contenu quand il entre à l'écran (une seule fois).
 *
 * Purement déclaratif : Locomotive Scroll (ScrollProvider) pose la classe
 * `is-inview` sur les éléments [data-scroll], et le CSS (globals.css,
 * section "Scroll reveal") fait le reste. Composant serveur, aucun JS
 * propre : sans JavaScript ou avec prefers-reduced-motion, le contenu est
 * simplement visible.
 */
export function MotionReveal({
  children,
  delay = 0,
  direction = "up",
  distance,
  stagger = false,
  className,
}: MotionRevealProps) {
  const style = {
    ...(delay ? { "--reveal-delay": `${Math.round(delay * 1000)}ms` } : {}),
    ...(distance !== undefined ? { "--reveal-distance": `${distance}px` } : {}),
  } as CSSProperties;

  return (
    <div
      className={cn(className)}
      data-scroll
      data-reveal={stagger ? "stagger" : direction}
      style={style}
    >
      {children}
    </div>
  );
}

/** Enfant d'un MotionReveal stagger : il hérite de l'apparition en cascade. */
export function MotionRevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
