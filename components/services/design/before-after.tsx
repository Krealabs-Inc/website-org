"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

/** The same fictional page, as a wireframe or as the finished design. */
function Mock({ variant }: { variant: "wire" | "final" }) {
  const wire = variant === "wire";
  return (
    <div className={`ba-mock ${wire ? "is-wire" : "is-final"}`} aria-hidden>
      <div className="ba-nav">
        <span className="ba-logo">{wire ? "Logo" : "Fleurs & Co"}</span>
        <span className="ba-links">
          {wire ? (
            <>
              <i />
              <i />
              <i />
            </>
          ) : (
            <>
              <span>Bouquets</span>
              <span>Abonnements</span>
              <span>Contact</span>
            </>
          )}
        </span>
      </div>
      <div className="ba-hero">
        <div>
          <p className="ba-title">{wire ? "Titre principal" : "Des bouquets livrés le jour même."}</p>
          <p className="ba-sub">{wire ? "Sous-titre · 1 à 2 lignes" : "Composés le matin, chez vous l’après-midi, partout à Rouen."}</p>
          <span className="ba-button">{wire ? "Bouton" : "Commander un bouquet"}</span>
        </div>
        <div className="ba-image">{wire && "Image"}</div>
      </div>
      <div className="ba-cards">
        {["Bouquet du jour", "Abonnement", "Événements"].map((c) => (
          <div key={c} className="ba-card">
            <span className="ba-card-img" />
            <span className="ba-card-title">{wire ? "Carte" : c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Design signature: one page, wireframe on the left of the handle and
 * final design on the right. The split follows the scroll until the
 * visitor grabs the handle (pointer or touch) or uses the arrow keys.
 */
export function BeforeAfter() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const dragging = useRef(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!touched && !reduced) setPos(Math.round(15 + Math.min(1, Math.max(0, (p - 0.2) / 0.6)) * 70));
  });

  const setFromClientX = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.round(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))));
  };

  return (
    <div
      ref={ref}
      className="ba"
      style={{ "--pos": `${pos}%` } as React.CSSProperties}
      onPointerDown={(e) => {
        dragging.current = true;
        setTouched(true);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Mock variant="final" />
      <div className="ba-wire-layer">
        <Mock variant="wire" />
      </div>
      <span className="ba-label is-left">Maquette fil de fer</span>
      <span className="ba-label is-right">Maquette finale</span>
      <div
        className="ba-handle"
        role="slider"
        tabIndex={0}
        aria-label="Comparer la maquette fil de fer et la maquette finale"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pos}
        onKeyDown={(e) => {
          if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
          e.preventDefault();
          setTouched(true);
          setPos((p) => Math.min(100, Math.max(0, p + (e.key === "ArrowRight" ? 5 : -5))));
        }}
      >
        <span className="ba-knob">↔</span>
      </div>
    </div>
  );
}
