"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

import { Container } from "@/components/ui/container";

function Step({
  index,
  total,
  progress,
  title,
  description,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  title: string;
  description: string;
}) {
  // A step lights up once the traced line reaches its dot.
  const at = total > 1 ? index / (total - 1) : 0;
  const lit = useTransform(progress, (p): number => (p >= at - 0.02 ? 1 : 0));
  const textOpacity = useTransform(lit, [0, 1], [0.35, 1]);
  const dotScale = useTransform(lit, [0, 1], [0.7, 1]);
  const dotOpacity = useTransform(lit, [0, 1], [0.5, 1]);
  return (
    <li className="wp-timeline-step">
      <motion.span className="wp-timeline-dot" style={{ scale: dotScale, opacity: dotOpacity }} />
      <motion.div style={{ opacity: textOpacity }}>
        <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--accent)]">0{index + 1}</span>
        <h3 className="text-h3 mt-2">{title}</h3>
        <p className="text-body text-[var(--muted-foreground)] mt-3 max-w-lg">{description}</p>
      </motion.div>
    </li>
  );
}

/**
 * WordPress method: a vertical timeline whose line is drawn by the scroll,
 * each step lighting up as the line reaches it. The heading stays pinned
 * beside it on large screens.
 */
export function TimelineTrace({
  heading,
  steps,
}: {
  heading: ReactNode;
  steps: { title: string; description: string }[];
}) {
  const reduced = useReducedMotion() ?? false;
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useTransform(scrollYProgress, (p) => (reduced ? 1 : p));

  return (
    <section className="section-y border-t border-[var(--border)]">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">{heading}</div>
          </div>
          <ol ref={listRef} className="wp-timeline lg:col-span-7">
            <span className="wp-timeline-track" aria-hidden>
              <motion.span className="wp-timeline-fill" style={{ scaleY: progress }} />
            </span>
            {steps.map((s, i) => (
              <Step key={s.title} index={i} total={steps.length} progress={progress} title={s.title} description={s.description} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
