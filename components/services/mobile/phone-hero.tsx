"use client";

import { useRef, type ReactNode } from "react";
import { useScroll } from "motion/react";

import { GlassLayer } from "@/components/patterns/glass";

/**
 * Mobile apps hero: a centred headline with the glass phone standing
 * under it, turning toward you as you scroll.
 */
export function PhoneHero({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  return (
    <section ref={ref} className="relative min-h-[125vh] overflow-hidden pt-32 md:pt-40">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" aria-hidden />
      <GlassLayer shape="phone" layout="center" progress={scrollYProgress} observe={ref} />
      <div className="relative">{children}</div>
    </section>
  );
}
