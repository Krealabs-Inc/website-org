"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

const COLS = 8;
const ROWS = 12;
// What everyone's shared spreadsheet looks like. Fictional content.
const SAMPLES = ["Devis 0142", "À relancer", "#REF!", "=SOMME(", "v4-FINAL", "1 240,00", "Client ?", "14/03", "OK", "doublon", "Envoyé", "#N/A", "TVA ?", "à voir", "3 h", "Payé"];

// Deterministic pseudo-random order, so server and client agree.
function rand(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function Cell({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const at = rand(index) * 0.8;
  const opacity = useTransform(progress, [at, at + 0.15], [1, 0]);
  const y = useTransform(progress, [at, at + 0.15], [0, -12]);
  const text = rand(index + 99) > 0.55 ? SAMPLES[Math.floor(rand(index + 7) * SAMPLES.length)] : "";
  const isError = text.startsWith("#");
  return (
    <motion.span className={`sheet-cell ${isError ? "is-error" : ""}`} style={{ opacity, y }}>
      {text}
    </motion.span>
  );
}

/**
 * Web development hero: the shared spreadsheet sits behind the headline
 * and its cells dissolve one by one, in no particular order, as you
 * scroll away from it. Reduced motion keeps a faint, still sheet.
 */
export function SheetHero({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useTransform(scrollYProgress, (p) => (reduced ? 0 : p * 1.4));

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="sheet-backdrop" aria-hidden>
        <div className="sheet-head">
          <span />
          {Array.from({ length: COLS }).map((_, c) => (
            <span key={c}>{String.fromCharCode(65 + c)}</span>
          ))}
        </div>
        {Array.from({ length: ROWS }).map((_, r) => (
          <div key={r} className="sheet-row">
            <span className="sheet-index">{r + 1}</span>
            {Array.from({ length: COLS }).map((_, c) => (
              <Cell key={c} index={r * COLS + c} progress={progress} />
            ))}
          </div>
        ))}
      </div>
      <div className="relative">{children}</div>
    </section>
  );
}
