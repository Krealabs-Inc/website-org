"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export interface MethodStep {
  title: string;
  description: string;
}

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
  children: React.ReactNode;
}) {
  const opacity = usePlaneOpacity(progress, -STEP * index, travel);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.6 ? "auto" : "none"));
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[min(92vw,56rem)] text-center"
      style={{ opacity, pointerEvents, x: "-50%", y: "-50%", z: -STEP * index }}
    >
      {children}
    </motion.div>
  );
}

const heading = (
  <>
    <span className="mb-6 flex justify-center">
      <Eyebrow>Votre projet, étape par étape</Eyebrow>
    </span>
    <h2 className="text-display">
      Vous savez toujours
      <br />
      <em className="text-[var(--accent)]">où l’on en est.</em>
    </h2>
  </>
);

const methodLink = (
  <Link href="/expertise" className="home-text-link">
    Comment se passe votre projet
    <ArrowRight className="size-4" aria-hidden />
  </Link>
);

/**
 * The method as a journey in depth: each step is a plane further down the
 * z-axis and scrolling moves the camera through them, so moving forward in
 * the page reads as moving forward in the project.
 */
export function MethodDepth({ steps }: { steps: MethodStep[] }) {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const travel = STEP * steps.length;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const worldZ = useTransform(scrollYProgress, [0, 1], [0, travel]);

  if (reduced) {
    return (
      <section className="home-method-section">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div className="text-left [&_h2]:text-h2 [&_span]:justify-start">{heading}</div>
            {methodLink}
          </div>
          <ol className="home-method-steps">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="text-caption">0{index + 1}</span>
                <h3 className="text-h4 mt-4 mb-3">{step.title}</h3>
                <p className="text-body-sm text-[var(--muted-foreground)]">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${100 + steps.length * 70}vh` }}>
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
              <li key={step.title} role="listitem" style={{ display: "contents" }}>
                <Plane progress={scrollYProgress} index={i + 1} travel={travel}>
                  <span className="font-[family-name:var(--font-geist-mono)] text-sm text-[var(--accent)]">
                    0{i + 1} / 0{steps.length}
                  </span>
                  <h3 className="text-display mt-6">{step.title}</h3>
                  <p className="text-body-lg text-[var(--muted-foreground)] mx-auto mt-6 max-w-xl">{step.description}</p>
                  {i === steps.length - 1 && <div className="mt-10 flex justify-center">{methodLink}</div>}
                </Plane>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
