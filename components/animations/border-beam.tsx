import { cn } from "@/lib/utils";

interface BorderBeamProps {
  /** Durée d'un tour complet (secondes) */
  duration?: number;
  /** Délai au démarrage */
  delay?: number;
  /** Couleur du faisceau */
  color?: string;
  /** Taille du faisceau */
  size?: number;
  className?: string;
}

/**
 * Border beam — faisceau lumineux qui tourne le long de la bordure.
 * Utilise offset-path (rect rounded) pour suivre le contour parfaitement.
 * S'applique à un parent en position relative.
 */
export function BorderBeam({
  duration = 12,
  delay = 0,
  color = "var(--accent)",
  size = 60,
  className,
}: BorderBeamProps) {
  return (
    // Hidden sur mobile : animation infinie offset-path coûteuse,
    // pas de valeur visuelle nette sur petit écran.
    <div
      aria-hidden
      className={cn(
        "hidden md:block pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden",
        "[mask-image:linear-gradient(white,white)]",
        className,
      )}
    >
      <div
        className="absolute aspect-square motion-safe:animate-border-beam"
        style={{
          width: `${size}px`,
          background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
          filter: "blur(8px)",
          opacity: 0.7,
          offsetPath: `rect(0 100% 100% 0 round var(--radius))`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
}
