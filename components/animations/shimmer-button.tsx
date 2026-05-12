"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  /** Durée du shimmer (s) */
  duration?: number;
  size?: "md" | "lg";
}

/**
 * Bouton CTA avec shimmer en background-image animé (pas d'overlay
 * span, donc compatible avec asChild + Radix Slot).
 * Respecte motion-safe.
 */
export const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  ({ className, asChild, duration = 3, size = "lg", children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
          "rounded-[var(--radius)] font-semibold tracking-[-0.01em]",
          "text-[var(--accent-foreground)]",
          "hover:brightness-110 active:translate-y-px",
          "transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
          "[&_svg]:size-4 [&_svg]:shrink-0",
          "motion-safe:animate-shimmer",
          size === "md" ? "h-10 px-5 text-sm" : "h-12 px-6 text-[0.95rem]",
          className,
        )}
        style={{
          backgroundImage:
            "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%), linear-gradient(var(--accent), var(--accent))",
          backgroundSize: "200% 100%, 100% 100%",
          backgroundPosition: "200% 0, 0 0",
          ["--shimmer-duration" as string]: `${duration}s`,
        }}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
ShimmerButton.displayName = "ShimmerButton";
