"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

function Item({ index, title, description }: { index: number; title: string; description: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const [checked, setChecked] = useState(false);
  // Ticks once the item reaches the middle of the screen, unticks above it.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 62%", "start 52%"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setChecked(p > 0.5));

  return (
    <li ref={ref} className={cn("check-item", checked && "is-checked")}>
      <span className="check-box" aria-hidden>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </span>
      <div>
        <p className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--accent)]">Étape 0{index + 1}</p>
        <h3 className="text-h3 mt-1">{title}</h3>
        <p className="text-body text-[var(--muted-foreground)] mt-2 max-w-xl">{description}</p>
      </div>
    </li>
  );
}

/** Performance & SEO method: a checklist that ticks itself as you scroll. */
export function Checklist({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <ol className="checklist">
      {steps.map((s, i) => (
        <Item key={s.title} index={i} title={s.title} description={s.description} />
      ))}
    </ol>
  );
}
