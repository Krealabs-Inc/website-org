import { cn } from "@/lib/utils";

interface MeshGradientProps {
  className?: string;
  /** Intensité du gradient (opacité globale) */
  intensity?: number;
}

/**
 * Mesh gradient animé en CSS pur (3 blobs radial-gradient qui flottent).
 * Respecte motion-safe : les animations sont coupées si reduced-motion.
 * À placer en absolute inset-0 sur un parent relative + overflow-hidden.
 */
export function MeshGradient({ className, intensity = 0.4 }: MeshGradientProps) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      style={{ opacity: intensity }}
    >
      <div
        className="absolute size-[600px] rounded-full blur-3xl motion-safe:animate-mesh-1"
        style={{
          left: "10%",
          top: "20%",
          background: "radial-gradient(circle, var(--accent), transparent 60%)",
        }}
      />
      <div
        className="absolute size-[500px] rounded-full blur-3xl motion-safe:animate-mesh-2"
        style={{
          right: "10%",
          top: "40%",
          background: "radial-gradient(circle, #f43f5e, transparent 60%)",
        }}
      />
      <div
        className="absolute size-[550px] rounded-full blur-3xl motion-safe:animate-mesh-3"
        style={{
          left: "30%",
          bottom: "10%",
          background: "radial-gradient(circle, #3b82f6, transparent 60%)",
        }}
      />
    </div>
  );
}
