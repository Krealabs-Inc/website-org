"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Chapter {
  year: string;
  title: string;
  description: string;
}

/** A year shown as rolling digits, like a mechanical counter. */
function Odometer({ value }: { value: string }) {
  return (
    <span className="odo" aria-hidden>
      {[...value].map((d, i) => (
        <span key={i} className="odo-digit">
          <span className="odo-strip" style={{ transform: `translateY(-${Number(d) * 10}%)` }}>
            {"0123456789".split("").map((n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * History page signature: a giant year pinned on the left that rolls to
 * the next one as each chapter of the story passes on the right.
 */
export function YearReel({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // The chapter crossing the middle of the screen sets the year.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-[calc(50vh-9rem)]">
          <p className="text-caption mb-2">Chapitre 0{active + 1} / 0{chapters.length}</p>
          <Odometer value={chapters[active].year} />
        </div>
      </div>
      <ol className="lg:col-span-6">
        {chapters.map((c, i) => (
          <li
            key={c.year}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className={cn("reel-chapter", i === active && "is-active")}
          >
            <p className="font-[family-name:var(--font-geist-mono)] text-sm text-[var(--accent)]">{c.year}</p>
            <h3 className="text-h2 mt-3">{c.title}</h3>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-5">{c.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
