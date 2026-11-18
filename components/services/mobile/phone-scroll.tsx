"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  description: string;
}

/* One screen per feature. Fictional app content, drawn in DOM. */
function Screen({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <div className="ph-screen">
          <p className="ph-time">9:41</p>
          <p className="ph-app-title">Votre app</p>
          <div className="ph-grid">
            {["Commander", "Réserver", "Mon compte", "Fidélité", "Boutique", "Contact"].map((a) => (
              <span key={a} className="ph-tile">{a}</span>
            ))}
          </div>
        </div>
      );
    case 1:
      return (
        <div className="ph-screen ph-lock">
          <p className="ph-lock-time">9:41</p>
          <div className="ph-notif">
            <span className="ph-notif-icon" />
            <div>
              <p className="ph-notif-title">Votre commande est prête</p>
              <p className="ph-notif-text">Passez la récupérer quand vous voulez.</p>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="ph-screen">
          <span className="ph-pill">Hors connexion</span>
          <p className="ph-app-title">Vos commandes</p>
          {["Commande n°12", "Commande n°11", "Commande n°10"].map((c) => (
            <span key={c} className="ph-row">{c}</span>
          ))}
          <p className="ph-hint">Synchronisation dès le retour du réseau</p>
        </div>
      );
    case 3:
      return (
        <div className="ph-screen ph-center">
          <span className="ph-faceid" />
          <p className="ph-app-title">Connexion réussie</p>
          <p className="ph-hint">Face ID · en un regard</p>
        </div>
      );
    case 4:
      return (
        <div className="ph-screen">
          <div className="ph-store">
            <span className="ph-store-icon" />
            <div>
              <p className="ph-app-title !mt-0">Votre app</p>
              <p className="ph-hint !mt-1">App Store · Google Play</p>
            </div>
          </div>
          <span className="ph-store-cta">Obtenir</span>
          <div className="ph-shots">
            <span />
            <span />
            <span />
          </div>
        </div>
      );
    default:
      return (
        <div className="ph-screen ph-center">
          <span className="ph-progress"><span /></span>
          <p className="ph-app-title">Mise à jour installée ✓</p>
          <p className="ph-hint">Sans repasser par les stores</p>
        </div>
      );
  }
}

/**
 * Mobile apps signature: a phone pinned in the middle of the screen whose
 * display changes with each feature as you scroll; the feature's text on
 * the left, the list of features on the right. Small screens and reduced
 * motion get the screens and texts as a simple list.
 */
export function PhoneScroll({ heading, features }: { heading: ReactNode; features: Feature[] }) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [wide, setWide] = useState(true);
  useEffect(() => {
    // A pinned phone plus its text does not fit a phone's own screen.
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(features.length - 1, Math.floor(p * features.length)));
  });

  if (reduced || !wide) {
    return (
      <section ref={ref} className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="mb-12 max-w-3xl">{heading}</div>
          <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <li key={f.title}>
                <div className="ph-device ph-device-sm">
                  <Screen index={i} />
                </div>
                <h3 className="text-h4 mt-6">{f.title}</h3>
                <p className="text-body-sm text-[var(--muted-foreground)] mt-2">{f.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    );
  }

  const feature = features[active];
  return (
    <section ref={ref} className="relative border-t border-[var(--border)]" style={{ height: `${100 + features.length * 55}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Container>
          <div className="mb-8 max-w-2xl">{heading}</div>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
            <div className="order-2 lg:order-1">
              <p className="font-[family-name:var(--font-geist-mono)] text-sm text-[var(--accent)]">
                0{active + 1} / 0{features.length}
              </p>
              <h3 key={feature.title} className="ph-caption text-h2 mt-3">{feature.title}</h3>
              <p className="text-body-lg text-[var(--muted-foreground)] mt-4 max-w-md">{feature.description}</p>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="ph-device">
                <div key={active} className="ph-swap">
                  <Screen index={active} />
                </div>
              </div>
            </div>
            <ol className="order-3 hidden lg:grid gap-3 justify-self-end">
              {features.map((f, i) => (
                <li key={f.title} className={cn("ph-index", i === active && "is-active")}>
                  {f.title}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}
