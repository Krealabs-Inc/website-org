"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "krealabs-cookie-consent";
const VERSION = "1";

interface ConsentState {
  version: string;
  decision: "accepted" | "rejected";
  timestamp: number;
}

/**
 * Banner cookie consent minimal RGPD-compliant.
 *
 * État actuel du site :
 *  - Vercel Web Analytics (cookieless, exempté CNIL) → s'affiche toujours
 *  - Vercel Speed Insights (cookieless, exempté) → s'affiche toujours
 *  - Pas d'autre traceur tiers pour le moment
 *
 * À quoi sert ce banner :
 *  - Affichage pédagogique de la politique (transparence)
 *  - Lecture de window.__cookieConsent côté Client Components
 *    pour activer des outils tiers payés (ex: hotjar, GA4) si on
 *    en ajoute un jour, sans avoir à recoder le banner
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setVisible(true);
        return;
      }
      const parsed = JSON.parse(raw) as ConsentState;
      if (parsed.version !== VERSION) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function decide(decision: "accepted" | "rejected") {
    const state: ConsentState = {
      version: VERSION,
      decision,
      timestamp: Date.now(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      // Expose côté Client pour les composants qui doivent réagir
      (window as unknown as { __cookieConsent?: ConsentState }).__cookieConsent =
        state;
      // Custom event pour les autres composants
      window.dispatchEvent(new CustomEvent("krealabs:cookie-consent", { detail: state }));
    } catch {
      // localStorage indispo (incognito strict) - on cache quand même
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookies et vie privée"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className={[
            // Mobile : petite carte flottante, marges latérales, au-dessus
            // de la barre iOS. Elle couvrait 30% de l'écran en pleine largeur.
            "fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[80]",
            // Desktop : card flottante en bas-droite
            "md:inset-x-auto md:bottom-6 md:right-6 md:max-w-md",
          ].join(" ")}
        >
          <div
            className={[
              "relative border border-[var(--border)] rounded-[var(--radius-lg)] shadow-2xl",
              // Fond opaque sur mobile : un backdrop-blur fixe se recalcule à
              // chaque frame de scroll sur téléphone.
              "bg-[var(--surface)] md:bg-[var(--surface)]/95 md:backdrop-blur-lg",
            ].join(" ")}
          >
            {/* Close X - desktop uniquement */}
            <button
              onClick={() => decide("rejected")}
              aria-label="Fermer"
              className="absolute top-3 right-3 size-8 rounded-full hover:bg-[var(--surface-hover)] items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors hidden md:flex"
            >
              <X className="size-4" />
            </button>

            {/* Mobile : une phrase + OK sur une seule rangée */}
            <div className="flex items-center gap-3 py-3 pl-4 pr-3 md:hidden">
              <p
                className="flex-1 text-body-sm text-[var(--muted-foreground)] leading-snug"
              >
                <span className="text-[var(--foreground)] font-medium">
                  Audience mesurée sans cookie,
                </span>{" "}
                aucun traceur.{" "}
                <Link
                  href="/legal/politique-confidentialite"
                  className="underline underline-offset-2 hover:text-[var(--foreground)] whitespace-nowrap"
                >
                  En savoir plus
                </Link>
              </p>
              <Button onClick={() => decide("accepted")} className="h-11 px-5 shrink-0">
                OK
              </Button>
            </div>

            <div className="hidden md:block p-6">
              {/* Icône + titre */}
              <div className="flex items-center gap-3 mb-3">
                <div className="inline-flex size-9 items-center justify-center rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] shrink-0">
                  <ShieldCheck className="size-4" strokeWidth={2} />
                </div>
                <h2 className="text-h4">Cookies &amp; vie privée</h2>
              </div>

              <p className="text-body-sm text-[var(--muted-foreground)] mb-5 leading-relaxed">
                Mesure d&apos;audience anonyme (Vercel Analytics,{" "}
                <strong className="text-[var(--foreground)] font-medium">
                  sans cookie
                </strong>
                ). Pas de traceur marketing.{" "}
                <Link
                  href="/legal/politique-confidentialite"
                  className="underline underline-offset-2 hover:text-[var(--foreground)] whitespace-nowrap"
                >
                  En savoir plus
                </Link>
                .
              </p>

              <div className="flex gap-2">
                <Button
                  onClick={() => decide("rejected")}
                  variant="outline"
                  className="flex-1 h-11"
                >
                  Préférences strictes
                </Button>
                <Button onClick={() => decide("accepted")} className="flex-1 h-11">
                  J&apos;ai compris
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook pour lire l'état du consentement côté composants tiers
 * (analytics avancés, marketing, etc.). À utiliser quand on aura
 * un outil qui demande consentement explicite.
 */
export function useCookieConsent(): "accepted" | "rejected" | "unknown" {
  const [state, setState] = useState<"accepted" | "rejected" | "unknown">("unknown");

  useEffect(() => {
    function read() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return setState("unknown");
        const parsed = JSON.parse(raw) as ConsentState;
        setState(parsed.decision);
      } catch {
        setState("unknown");
      }
    }
    read();
    const handler = () => read();
    window.addEventListener("krealabs:cookie-consent", handler);
    return () => window.removeEventListener("krealabs:cookie-consent", handler);
  }, []);

  return state;
}
