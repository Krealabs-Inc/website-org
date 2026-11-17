"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Blog article signature: a reading bar across the top of the screen and,
 * on wide screens, a table of contents that follows you and marks the
 * section you are reading.
 */
export function ArticleReader({ sections }: { sections: string[] }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = sections.map((_, i) => document.getElementById(`s-${i + 1}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number(e.target.id.slice(2)) - 1);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <>
      <motion.div className="read-bar" style={{ scaleX }} aria-hidden />
      <nav className="read-toc" aria-label="Sommaire de l’article">
        <p className="text-caption mb-4">Sommaire</p>
        <ol>
          {sections.map((title, i) => (
            <li key={title}>
              <a href={`#s-${i + 1}`} className={cn(i === active && "is-active")} aria-current={i === active ? "true" : undefined}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
