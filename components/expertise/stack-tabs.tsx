"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Category {
  title: string;
  items: { kind: string; name: string; tagline: string }[];
}

/** Expertise stack: one tab per family of tools, arrow keys to switch. */
export function StackTabs({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cat = categories[active];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + categories.length) % categories.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Familles d’outils" className="stack-tablist" onKeyDown={onKey}>
        {categories.map((c, i) => (
          <button
            key={c.title}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`stack-tab-${i}`}
            aria-selected={i === active}
            aria-controls="stack-panel"
            tabIndex={i === active ? 0 : -1}
            className={cn("stack-tab", i === active && "is-active")}
            onClick={() => setActive(i)}
          >
            {c.title}
            <span className="stack-count">{c.items.length}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" id="stack-panel" aria-labelledby={`stack-tab-${active}`} key={active} className="stack-panel">
        {cat.items.map((item) => (
          <div key={item.name} className="stack-item">
            <p className="text-caption">{item.kind}</p>
            <p className="text-body font-semibold mt-1.5">{item.name}</p>
            <p className="text-body-sm text-[var(--muted-foreground)] mt-1">{item.tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
