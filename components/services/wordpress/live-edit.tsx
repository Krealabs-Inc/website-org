"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

const STEPS = [
  { menu: "Pages", title: "Vous changez un texte", text: "Un nouveau titre sur votre page d’accueil, en quelques secondes." },
  { menu: "Médias", title: "Vous ajoutez une photo", text: "Vous la choisissez dans votre médiathèque, elle s’affiche à la bonne taille." },
  { menu: "Produits", title: "Vous publiez un produit", text: "Un nom, un prix, une photo : il rejoint votre boutique." },
  { menu: "Articles", title: "Vous publiez une actualité", text: "Horaires, nouveauté, fermeture : vos clients sont prévenus." },
];
const MENU = ["Tableau de bord", "Pages", "Articles", "Produits", "Médias"];
const OLD_TITLE = "Bienvenue";
const NEW_TITLE = "Ouvert le dimanche matin";
const SWATCHES = ["#8f99ed", "#c9b08a", "#7fb59a", "#e3a56f", "#a9b1f4", "#6a75d6"];

/** Progress (0 → 1) within the current step. */
function useSteps(sectionRef: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const [state, setState] = useState({ step: 0, local: 0 });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const scaled = Math.min(STEPS.length - 0.0001, Math.max(0, p * STEPS.length));
    setState({ step: Math.floor(scaled), local: scaled - Math.floor(scaled) });
  });
  return state;
}

/** Steps fully done (for the final, static composition). */
const DONE = { step: STEPS.length - 1, local: 1 };

function Admin({ step, local }: { step: number; local: number }) {
  const typed = step > 0 ? NEW_TITLE : NEW_TITLE.slice(0, Math.round(NEW_TITLE.length * Math.min(1, local / 0.7)));
  const pressed = local > 0.7;
  return (
    <div className="wp-pane">
      <div className="wp-admin">
        <nav className="wp-admin-menu" aria-hidden>
          {MENU.map((m) => (
            <span key={m} className={cn(m === STEPS[step].menu && "is-active")}>
              {m}
            </span>
          ))}
        </nav>
        <div className="wp-admin-main">
          {step === 0 && (
            <>
              <p className="text-caption">Pages › Accueil</p>
              <label className="wp-field">
                <span>Titre</span>
                <span className="wp-input">
                  {local < 0.05 ? OLD_TITLE : typed}
                  <span className="wp-editor-caret is-typing" />
                </span>
              </label>
              <span className={cn("wp-button", pressed && "is-pressed")}>{pressed ? "Mis à jour ✓" : "Mettre à jour"}</span>
            </>
          )}
          {step === 1 && (
            <>
              <p className="text-caption">Médias › Médiathèque</p>
              <div className="wp-media-grid">
                {SWATCHES.map((c, i) => (
                  <span key={c} className={cn("wp-media-tile", i === 2 && local > 0.3 && "is-selected")} style={{ background: c }} />
                ))}
              </div>
              <span className={cn("wp-button", pressed && "is-pressed")}>{pressed ? "Insérée ✓" : "Insérer dans la page"}</span>
            </>
          )}
          {step === 2 && (
            <>
              <p className="text-caption">Produits › Ajouter</p>
              <label className="wp-field">
                <span>Nom</span>
                <span className="wp-input">{local > 0.15 ? "Coffret découverte" : ""}</span>
              </label>
              <label className="wp-field">
                <span>Prix</span>
                <span className="wp-input">{local > 0.4 ? "24 €" : ""}</span>
              </label>
              <span className={cn("wp-button", pressed && "is-pressed")}>{pressed ? "Publié ✓" : "Publier"}</span>
            </>
          )}
          {step === 3 && (
            <>
              <p className="text-caption">Articles › Nouvel article</p>
              <label className="wp-field">
                <span>Titre</span>
                <span className="wp-input">{local > 0.15 ? "Nos horaires d’été" : ""}</span>
              </label>
              <div className="space-y-2">
                {[90, 70].map((w) => (
                  <span key={w} className="wp-editor-line" style={{ width: `${w}%`, opacity: local > 0.35 ? 1 : 0 }} />
                ))}
              </div>
              <span className={cn("wp-button", pressed && "is-pressed")}>{pressed ? "Publié ✓" : "Publier"}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Preview({ step, local }: { step: number; local: number }) {
  const done = (s: number) => step > s || (step === s && local > 0.7);
  const title = done(0) ? NEW_TITLE : OLD_TITLE;
  return (
    <div className="wp-pane">
      <div className="wp-site">
        <div className="wp-site-bar">
          <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--muted-foreground)]">votre-site.fr</span>
        </div>
        <div className="wp-site-body">
          <p className="text-caption">Votre entreprise</p>
          <p className={cn("wp-site-title", done(0) && step === 0 && "is-fresh")}>{title}</p>
          <div className={cn("wp-site-photo", done(1) && "has-photo", step === 1 && done(1) && "is-fresh")}>
            {!done(1) && <span className="text-caption">Aucune image</span>}
          </div>
          <div className="wp-site-products">
            {["Carte cadeau", "Atelier du samedi"].map((p) => (
              <span key={p} className="wp-site-product">
                <span className="wp-site-product-img" />
                {p}
              </span>
            ))}
            {done(2) && (
              <span className={cn("wp-site-product", step === 2 && "is-fresh")}>
                <span className="wp-site-product-img" style={{ background: SWATCHES[0] }} />
                Coffret découverte · 24 €
              </span>
            )}
          </div>
          <div className="wp-site-news">
            {done(3) && (
              <p className={cn(step === 3 && "is-fresh")}>
                <span className="wp-site-badge">Nouveau</span> Nos horaires d’été
              </p>
            )}
            <p>Retour sur notre atelier de printemps</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The WordPress signature section: the admin on the left, the site on the
 * right. Scrolling performs four everyday edits and the site follows each
 * one. Pinned on large screens; small screens and reduced motion get the
 * steps as a list beside the finished site.
 */
export function LiveEdit() {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const [wide, setWide] = useState(true);
  const live = useSteps(sectionRef);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const heading = (
    <>
      <Eyebrow className="mb-5">À vous la main</Eyebrow>
      <h2 className="text-h1">
        Vous modifiez, <em>votre site suit.</em>
      </h2>
    </>
  );

  if (reduced || !wide) {
    return (
      <section ref={sectionRef} className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="mb-12">{heading}</div>
          <div className="grid gap-10 lg:grid-cols-2">
            <ol className="space-y-6">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="text-caption">0{i + 1}</span>
                  <h3 className="text-h4 mt-2">{s.title}</h3>
                  <p className="text-body-sm text-[var(--muted-foreground)] mt-1">{s.text}</p>
                </li>
              ))}
            </ol>
            <Preview {...DONE} />
          </div>
        </Container>
      </section>
    );
  }

  const current = STEPS[live.step];
  return (
    <section ref={sectionRef} className="relative h-[420vh] border-t border-[var(--border)]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-10">
            <div>{heading}</div>
            <div className="max-w-sm text-right">
              <p className="font-[family-name:var(--font-geist-mono)] text-sm text-[var(--accent)]">
                0{live.step + 1} / 0{STEPS.length}
              </p>
              <p className="text-h4 mt-2">{current.title}</p>
              <p className="text-body-sm text-[var(--muted-foreground)] mt-1">{current.text}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Admin {...live} />
            <Preview {...live} />
          </div>
          <div className="mt-6 h-px bg-[var(--border-strong)]">
            <div
              className="h-full origin-left bg-[var(--accent)]"
              style={{ transform: `scaleX(${(live.step + live.local) / STEPS.length})` }}
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
