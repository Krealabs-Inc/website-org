"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

// A fictional request log, the way it tends to look in a shared sheet.
const ROWS = [
  { client: "boulangerie martin", demande: "devis site", montant: "1200", statut: "envoyé ?", relance: "#REF!" },
  { client: "Cabinet Roux", demande: "Devis site", montant: "1 200 €", statut: "OK", relance: "12/03" },
  { client: "cabinet roux", demande: "devis SITE", montant: "1200,00", statut: "doublon", relance: "" },
  { client: "Atelier Nord", demande: "Rappel", montant: "-", statut: "à voir", relance: "?" },
  { client: "Garage Lefèvre", demande: "Boutique", montant: "3400", statut: "En cours", relance: "#N/A" },
  { client: "atelier nord", demande: "question délais", montant: "", statut: "", relance: "lundi ?" },
];

const CARDS = [
  { client: "Boulangerie Martin", demande: "Devis · site vitrine", statut: "Envoyé", tone: "accent" },
  { client: "Cabinet Roux", demande: "Devis · site vitrine", statut: "Signé", tone: "done" },
  { client: "Atelier Nord", demande: "Rappel · délais", statut: "À rappeler", tone: "warn" },
  { client: "Garage Lefèvre", demande: "Boutique en ligne", statut: "En cours", tone: "accent" },
];

const STAGES = [
  { label: "Avant", title: "Un tableur partagé", text: "Formats différents, doublons, cellules en erreur : personne n’est sûr de la bonne version." },
  { label: "Pendant", title: "On structure vos données", text: "Chaque demande devient une fiche propre, sans doublon, avec un statut clair." },
  { label: "Après", title: "Un outil qui montre l’essentiel", text: "Vos demandes, vos relances et votre activité, au même endroit, à jour." },
];

const clampRange = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));

function SheetRow({ row, index, progress }: { row: (typeof ROWS)[number]; index: number; progress: MotionValue<number> }) {
  // Rows leave one after the other, then the sheet fades (in sequence
  // with the cards, never overlapping them).
  const at = 0.12 + index * 0.05;
  const opacity = useTransform(progress, [at, at + 0.06], [1, 0]);
  const x = useTransform(progress, [at, at + 0.06], [0, -30]);
  const cells = [row.client, row.demande, row.montant, row.statut, row.relance];
  return (
    <motion.div className="sheet2-row" style={{ opacity, x }}>
      {cells.map((c, i) => (
        <span key={i} className={c.startsWith("#") || c === "doublon" ? "is-error" : undefined}>
          {c}
        </span>
      ))}
    </motion.div>
  );
}

function RequestCard({ card, index, progress }: { card: (typeof CARDS)[number]; index: number; progress: MotionValue<number> }) {
  const at = 0.48 + index * 0.05;
  const opacity = useTransform(progress, [at, at + 0.08], [0, 1]);
  const y = useTransform(progress, [at, at + 0.08], [24, 0]);
  return (
    <motion.div className="dash-card" style={{ opacity, y }}>
      <div>
        <p className="text-body font-medium">{card.client}</p>
        <p className="text-body-sm text-[var(--muted-foreground)]">{card.demande}</p>
      </div>
      <span className={`dash-chip is-${card.tone}`}>{card.statut}</span>
    </motion.div>
  );
}

function Kpi({ label, value, at, progress }: { label: string; value: number; at: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [at, at + 0.06], [0, 1]);
  const count = useTransform(progress, (p) => Math.round(value * clampRange(p, at, at + 0.15)));
  return (
    <motion.div className="dash-kpi" style={{ opacity }}>
      <p className="text-caption">{label}</p>
      <motion.p className="dash-kpi-value">{count}</motion.p>
    </motion.div>
  );
}

function Stage({ stage, index, progress }: { stage: (typeof STAGES)[number]; index: number; progress: MotionValue<number> }) {
  const bounds = [
    [0, 0.42],
    [0.42, 0.68],
    [0.68, 1.01],
  ][index];
  const opacity = useTransform(progress, (p) => (p >= bounds[0] && p < bounds[1] ? 1 : 0.3));
  return (
    <motion.li style={{ opacity }}>
      <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--accent)]">{stage.label}</span>
      <h3 className="text-h4 mt-1">{stage.title}</h3>
      <p className="text-body-sm text-[var(--muted-foreground)] mt-1">{stage.text}</p>
    </motion.li>
  );
}

/**
 * Web development signature: a messy shared spreadsheet empties row by
 * row while the same requests come back as clean cards, then the
 * dashboard settles on top. Pinned and scroll-driven; reduced motion
 * shows the finished dashboard with the three stages listed.
 */
export function SheetToDashboard() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, (p) => (reduced ? 1 : p));
  const sheetOpacity = useTransform(progress, [0.42, 0.47], [1, 0]);
  const tableTitle = useTransform(progress, (p): string => (p < 0.47 ? "suivi-demandes-v4-FINAL.xlsx" : "Tableau de bord · Demandes"));

  return (
    <section ref={ref} className={`relative border-t border-[var(--border)] ${reduced ? "" : "h-[320vh]"}`}>
      <div className={reduced ? "section-y" : "sticky top-0 flex h-screen items-center overflow-hidden"}>
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow number="02" className="mb-6">Avant / après</Eyebrow>
              <h2 className="text-h1">
                Du tableur à <em>l’outil.</em>
              </h2>
              <ol className="mt-10 space-y-6">
                {STAGES.map((s, i) => (
                  <Stage key={s.label} stage={s} index={i} progress={progress} />
                ))}
              </ol>
            </div>
            <div className="lg:col-span-8">
              <div className="dash-window">
                <div className="dash-window-bar">
                  <motion.span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--muted-foreground)]">
                    {tableTitle}
                  </motion.span>
                </div>
                <div className="dash-window-body">
                  {/* The sheet, emptying row by row */}
                  <motion.div className="sheet2" style={{ opacity: sheetOpacity }} aria-hidden>
                    <div className="sheet2-row is-head">
                      {["Client", "Demande", "Montant", "Statut", "Relance"].map((h) => (
                        <span key={h}>{h}</span>
                      ))}
                    </div>
                    {ROWS.map((row, i) => (
                      <SheetRow key={i} row={row} index={i} progress={progress} />
                    ))}
                  </motion.div>

                  {/* The tool, building up */}
                  <div className="dash">
                    <div className="dash-kpis">
                      <Kpi label="Demandes ce mois-ci" value={12} at={0.7} progress={progress} />
                      <Kpi label="À relancer" value={3} at={0.75} progress={progress} />
                      <Kpi label="Devis signés" value={5} at={0.8} progress={progress} />
                    </div>
                    <div className="dash-cards">
                      {CARDS.map((card, i) => (
                        <RequestCard key={card.client} card={card} index={i} progress={progress} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-caption mt-3">Exemple fictif : données inventées pour l’illustration.</p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
