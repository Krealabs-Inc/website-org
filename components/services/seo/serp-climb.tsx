"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

// Fictional results for a fictional search. No real business named.
const OTHERS = [
  { site: "Annuaire local", title: "Fleuristes à Rouen : adresses et avis" },
  { site: "Plateforme de livraison", title: "Livraison de fleurs à Rouen" },
  { site: "Comparateur", title: "Les 10 meilleurs fleuristes de Rouen" },
  { site: "Un concurrent", title: "Fleuriste rive droite, bouquets et deuil" },
  { site: "Forum", title: "Quel fleuriste à Rouen pour un mariage ?" },
];
const YOU = { site: "Votre site", title: "Fleuriste à Rouen, livraison le jour même" };
const LAST = OTHERS.length; // your starting position (0-based)

const STAGES = [
  { label: "Technique", text: "Pages rapides, bien balisées : Google peut enfin vous lire." },
  { label: "Local", text: "Fiche Google Business, adresse cohérente partout : Google sait où vous êtes." },
  { label: "Contenus", text: "Vos pages répondent aux questions de vos clients : Google vous recommande." },
];

/**
 * Performance & SEO signature: a fictional Google results page where your
 * site climbs from the bottom to first place as you scroll, one lever at a
 * time. Pinned; reduced motion shows the final ranking.
 */
export function SerpClimb() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const [rank, setRank] = useState(LAST);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    // Hold at the bottom, climb one place at a time, hold at the top.
    const climb = Math.min(1, Math.max(0, (p - 0.12) / 0.7));
    setRank(LAST - Math.round(climb * LAST));
  });
  const shown = reduced ? 0 : rank;
  const stage = shown >= 4 ? 0 : shown >= 2 ? 1 : 2;
  const done = shown === 0;

  const rows = [...OTHERS];
  rows.splice(shown, 0, YOU);

  return (
    <section ref={ref} className={cn("relative border-t border-[var(--border)]", !reduced && "h-[300vh]")}>
      <div className={reduced ? "section-y" : "sticky top-0 flex h-[100svh] items-center overflow-hidden"}>
        <Container>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Eyebrow number="01" className="mb-5">Ce qui change pour vous</Eyebrow>
              <h2 className="text-h1">
                Du bas de la page à <em>la première place.</em>
              </h2>
              <ol className="mt-8 hidden space-y-5 lg:block">
                {STAGES.map((s, i) => (
                  <li key={s.label} className={cn("serp-stage", i === stage && "is-active", i < stage && "is-done")}>
                    <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--accent)]">0{i + 1} · {s.label}</span>
                    <p className="text-body-sm text-[var(--muted-foreground)] mt-1">{s.text}</p>
                  </li>
                ))}
              </ol>
              <p className="text-body-sm text-[var(--muted-foreground)] mt-4 lg:hidden">
                <span className="text-[var(--accent)]">{STAGES[stage].label} · </span>
                {STAGES[stage].text}
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="serp">
                <div className="serp-search">
                  <span className="serp-g">G</span>
                  <span>fleuriste rouen</span>
                </div>
                <ol className="serp-list" aria-label="Résultats de recherche fictifs">
                  {rows.map((r) => {
                    const you = r === YOU;
                    return (
                      // layout: rows slide to their new place when the order changes.
                      <motion.li
                        key={r.site}
                        layout={!reduced}
                        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                        className={cn("serp-row", you && "is-you", you && done && "is-first")}
                      >
                        <span className="serp-site">{r.site}</span>
                        <span className="serp-title">{r.title}</span>
                      </motion.li>
                    );
                  })}
                </ol>
              </div>
              <p className="text-caption mt-3">
                Exemple fictif · votre position : <span className="text-[var(--accent)]">n°{shown + 1}</span>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
