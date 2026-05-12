import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** Durée d'une boucle complète en secondes (plus haut = plus lent) */
  duration?: number;
  /** Sens de défilement */
  reverse?: boolean;
  /** Fade aux extrémités via CSS mask */
  fade?: boolean;
  /** Pause au survol */
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Marquee infini horizontal. Utilise l'animation CSS @keyframes marquee
 * déjà définie dans globals.css. Respecte motion-safe.
 */
export function Marquee({
  children,
  duration = 30,
  reverse = false,
  fade = true,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group/marquee flex overflow-hidden",
        fade &&
          "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
      style={{ ["--duration" as string]: `${duration}s` }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex shrink-0 items-center gap-8 motion-safe:animate-marquee pr-8",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
