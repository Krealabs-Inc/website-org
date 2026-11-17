"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useReducedMotion, useScroll, type MotionValue } from "motion/react";

import { cn } from "@/lib/utils";
import type { GlassLayout, GlassShape } from "./glass-scene";

// three.js only loads in the browser, after the text is on screen.
const GlassScene = dynamic(() => import("./glass-scene"), { ssr: false });

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * The glass object layer, shared by every 3D hero.
 * - Mounts once the browser is idle: compiling the glass shader blocks the
 *   main thread for a moment, so the text is readable and clickable first.
 * - Stops rendering while `observe` is off screen.
 * - Fades in once the first frame is ready.
 */
export function GlassLayer({
  shape,
  layout,
  progress,
  observe,
}: {
  shape: GlassShape;
  layout: GlassLayout;
  progress: MotionValue<number>;
  observe: RefObject<HTMLElement | null>;
}) {
  const reduced = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const start = () => setMounted(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 300);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const el = observe.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [observe]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      initial={false}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: EASE_OUT }}
    >
      {mounted && (
        <GlassScene
          shape={shape}
          layout={layout}
          progress={progress}
          reduced={reduced}
          active={active}
          onReady={() => setReady(true)}
        />
      )}
    </motion.div>
  );
}

/**
 * A glass object standing on the right of an inner-page hero, turning as
 * the hero scrolls away. Place it inside a `relative` section.
 */
export function GlassAside({ shape, className }: { shape: GlassShape; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <GlassLayer shape={shape} layout="aside" progress={scrollYProgress} observe={ref} />
    </div>
  );
}
