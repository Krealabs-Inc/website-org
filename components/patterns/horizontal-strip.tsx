"use client";

import { Children, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { ScrollHint } from "@/components/animations/scroll-hint";

interface HorizontalStripProps {
  /** Opening panel: eyebrow, title, a line of intro. */
  intro: ReactNode;
  /** The cards, already rendered (server components welcome). */
  children: ReactNode;
  /** Closing panel, usually a call to action. */
  end?: ReactNode;
  /** Size of each card slot. */
  itemClassName?: string;
  className?: string;
}

/**
 * Défilement: the section pins and vertical scroll drives a horizontal
 * track. Cards lean with scroll speed and settle flat when the visitor
 * stops, so the tilt reads as feedback, not decoration. Reduced motion
 * gets the same content as a plain grid.
 */
export function HorizontalStrip({
  intro,
  children,
  end,
  itemClassName = "h-[min(62vh,500px)] w-[min(500px,82vw)]",
  className,
}: HorizontalStripProps) {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const items = Children.toArray(children);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setTravel(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduced]);

  const { scrollYProgress, scrollY } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * travel);
  const lean = useSpring(useTransform(useVelocity(scrollY), [-2500, 0, 2500], [9, 0, -9], { clamp: true }), {
    stiffness: 260,
    damping: 32,
  });
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  if (reduced) {
    return (
      <section className={cn("section-y border-t border-[var(--border-strong)]", className)}>
        <Container>
          <div className="max-w-2xl">{intro}</div>
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {items.map((item, i) => (
              <div key={i} className="min-h-[280px]">
                {item}
              </div>
            ))}
          </div>
          {end && <div className="mt-16">{end}</div>}
        </Container>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className={cn("relative border-t border-[var(--border-strong)]", className)}
      style={{ height: `calc(100vh + ${travel}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />

        <motion.div
          ref={trackRef}
          className="relative flex h-full w-max items-center gap-6 pr-[8vw]"
          style={{ x, perspective: "1200px" }}
        >
          <div className="flex h-full w-[min(100vw,44rem)] shrink-0 items-center">
            <Container className="pt-16">{intro}</Container>
          </div>

          {items.map((item, i) => (
            <motion.div key={i} className={cn("shrink-0", itemClassName)} style={{ rotateY: lean, transformOrigin: "50% 50%" }}>
              {item}
            </motion.div>
          ))}

          {end && <div className="flex w-[min(460px,82vw)] shrink-0 flex-col justify-center pl-8">{end}</div>}
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--border-strong)]">
          <motion.div className="h-full origin-left bg-[var(--accent)]" style={{ scaleX: scrollYProgress }} />
        </div>
        <motion.div className="absolute bottom-10 right-[clamp(1rem,4vw,2rem)]" style={{ opacity: hintOpacity }}>
          <ScrollHint label="Faites défiler, ça avance à l’horizontale" />
        </motion.div>
      </div>
    </section>
  );
}
