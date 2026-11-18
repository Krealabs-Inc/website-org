"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import "locomotive-scroll/locomotive-scroll.css";

/**
 * Site-wide scroll engine: Locomotive Scroll v5 (smooth wheel scroll via
 * Lenis, plus the data-scroll attributes: in-view classes, parallax speed,
 * scroll progress).
 *
 * - Touch keeps native scrolling (Lenis only smooths the wheel).
 * - prefers-reduced-motion: no smoothing, and the `has-scroll-fx` class
 *   that arms reveal animations is never set, so content just shows.
 * - Reveals only hide content once this has run: without JavaScript,
 *   everything stays visible.
 * - Next swaps pages without a reload. By then the old page's elements are
 *   already out of the DOM, so instead of patching the element list the
 *   instance is rebuilt per page: destroy() releases everything it held.
 */
export function ScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    if (!reduced) root.classList.add("has-scroll-fx");

    let cancelled = false;
    let scroll: { destroy(): void } | null = null;
    import("locomotive-scroll").then(({ default: Locomotive }) => {
      if (cancelled) return;
      scroll = new Locomotive({
        lenisOptions: { lerp: 0.1, smoothWheel: !reduced },
        // Reveal a little before the element reaches the viewport edge.
        triggerRootMargin: "-8% 0px -8% 0px",
      });
    });

    return () => {
      cancelled = true;
      scroll?.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
