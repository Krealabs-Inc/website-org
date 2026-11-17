"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Runs the CSS loops inside only while they are on screen: the class
 * "is-playing" sets animation-play-state (see globals.css, "tech-demo").
 */
export function PlayInView({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`tech-demo ${playing ? "is-playing" : ""} ${className ?? ""}`}>
      {children}
    </div>
  );
}
