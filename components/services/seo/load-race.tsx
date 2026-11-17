"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";

const LANES = [
  { label: "Site non optimisé", loadAt: 4200 },
  { label: "Votre site optimisé", loadAt: 900 },
];
const END = 4600;

function Lane({ label, loadAt, t, fast }: { label: string; loadAt: number; t: number; fast: boolean }) {
  const phase = t < loadAt * 0.35 ? "blank" : t < loadAt ? "skeleton" : "ready";
  return (
    <div className={`race-lane ${fast ? "is-fast" : ""}`}>
      <div className="race-bar">
        <span className="race-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="race-label">{label}</span>
        <span className="race-time">{(Math.min(t, loadAt) / 1000).toFixed(1)} s</span>
      </div>
      <div className="race-page" data-phase={phase} aria-hidden>
        {phase === "blank" ? null : (
          <>
            <span className="race-hero" />
            <span className="race-line w-3/4" />
            <span className="race-line w-1/2" />
            <span className="race-cards">
              <span />
              <span />
              <span />
            </span>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Two pages loading side by side: the race starts when it scrolls into
 * view and can be replayed. Reduced motion shows the finished race.
 */
export function LoadRace() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [run, setRun] = useState(0);
  const [t, setT] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      setT(Math.min(END, elapsed));
      if (elapsed < END) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, run]);

  const time = reduced ? END : t;
  return (
    <div ref={ref}>
      <div className="race">
        {LANES.map((l, i) => (
          <Lane key={l.label} label={l.label} loadAt={l.loadAt} t={time} fast={i === 1} />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-caption">Illustration : temps de chargement indicatifs.</p>
        {!reduced && (
          <button
            type="button"
            onClick={() => {
              setT(0);
              setRun((r) => r + 1);
            }}
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <RotateCcw className="size-3.5" />
            Rejouer
          </button>
        )}
      </div>
    </div>
  );
}
