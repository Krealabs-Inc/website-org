"use client";

import { Children, useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

import { Container } from "@/components/ui/container";

// Distance between two planes. The camera travels through all of them.
const STEP = 700;
// Phases of a plane by its distance to the screen (0 = at the screen,
// negative = further away, positive = already behind the camera).
const FADE_OUT = STEP * 0.25;
const SOLID = STEP * 0.35;
const FAR = STEP * 0.75;
const GHOST = 0.05;
const HIDDEN = STEP * 1.2; // two planes away: not shown at all

/**
 * A plane only becomes readable once the previous one has gone, and only
 * the next plane shows as a ghost, so big type never stacks up.
 */
function usePlaneOpacity(progress: MotionValue<number>, depth: number, travel: number) {
  return useTransform(progress, (p) => {
    const d = depth + p * travel;
    if (d > FADE_OUT) return 0;
    if (d > 0) return 1 - d / FADE_OUT;
    if (d > -SOLID) return 1;
    if (d > -FAR) return GHOST + (1 - GHOST) * ((FAR + d) / (FAR - SOLID));
    if (d > -HIDDEN) return GHOST;
    return 0;
  });
}

function Plane({
  progress,
  index,
  travel,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  travel: number;
  children: ReactNode;
}) {
  const opacity = usePlaneOpacity(progress, -STEP * index, travel);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.6 ? "auto" : "none"));
  const visibility = useTransform(opacity, (o) => (o > 0 ? "visible" : "hidden"));
  return (
    <motion.div
      className="depth-plane absolute left-1/2 top-1/2 w-[min(92vw,56rem)] text-center"
      style={{ opacity, pointerEvents, visibility, x: "-50%", y: "-50%", z: -STEP * index }}
    >
      {children}
    </motion.div>
  );
}

interface DepthSequenceProps {
  /** First plane: eyebrow, title, intro. */
  heading: ReactNode;
  /** One rendered node per step, in order (server components welcome). */
  children: ReactNode;
}

/**
 * Profondeur: each step is a plane further down the z-axis and scrolling
 * moves the camera through them, so moving down the page reads as moving
 * forward. Pure CSS 3D on the site's grid floor. Reduced motion gets the
 * heading and the steps as a plain list.
 */
export function DepthSequence({ heading, children }: DepthSequenceProps) {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const steps = Children.toArray(children);
  const travel = STEP * steps.length;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const worldZ = useTransform(scrollYProgress, [0, 1], [0, travel]);

  if (reduced) {
    return (
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-2xl">{heading}</div>
          <ol className="home-method-steps mt-12">
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </Container>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-[var(--border)]"
      style={{ height: `${100 + steps.length * 70}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden" style={{ perspective: "900px", perspectiveOrigin: "50% 45%" }}>
        <motion.div className="absolute inset-0" style={{ z: worldZ, transformStyle: "preserve-3d" }}>
          {/* Floor: the site's own grid, laid flat and running into the distance. */}
          <div
            aria-hidden
            className="absolute left-1/2 top-[70%] h-[4200px] w-[200vw] bg-grid opacity-50"
            style={{
              transform: "translate(-50%, -100%) rotateX(90deg)",
              transformOrigin: "50% 100%",
              maskImage: "linear-gradient(to top, black 30%, transparent)",
            }}
          />

          <Plane progress={scrollYProgress} index={0} travel={travel}>
            {heading}
          </Plane>

          {/* display: contents keeps the list semantics without breaking the 3D context. */}
          <ol role="list" style={{ display: "contents" }}>
            {steps.map((step, i) => (
              <li key={i} role="listitem" style={{ display: "contents" }}>
                <Plane progress={scrollYProgress} index={i + 1} travel={travel}>
                  {step}
                </Plane>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
