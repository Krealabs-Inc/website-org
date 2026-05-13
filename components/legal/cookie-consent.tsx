"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

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
      // localStorage indispo (incognito strict) — on cache quand même
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:bottom-6 md:right-6 md:max-w-md z-[80] rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] backdrop-blur-md shadow-2xl"
    >
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 id="cookie-consent-title" className="text-h4">
            Cookies &amp; vie privée
          </h2>
          <button
            onClick={() => decide("rejected")}
            aria-label="Refuser et fermer"
            className="size-7 rounded-full hover:bg-[var(--surface-hover)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
        <p
          id="cookie-consent-description"
          className="text-body-sm text-[var(--muted-foreground)] mb-5 leading-relaxed"
        >
          Krealabs utilise une mesure d&apos;audience anonyme (Vercel Analytics,
          sans cookie) qui ne nécessite pas votre consentement. Aucun traceur
          marketing n&apos;est actuellement actif. Détails dans notre{" "}
          <Link
            href="/legal/politique-confidentialite"
            className="underline underline-offset-2 hover:text-[var(--foreground)]"
          >
            politique de confidentialité
          </Link>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => decide("accepted")}
            size="sm"
            className="flex-1"
          >
            J&apos;ai compris
          </Button>
          <Button
            onClick={() => decide("rejected")}
            size="sm"
            variant="outline"
            className="flex-1"
          >
            Préférences strictes
          </Button>
        </div>
      </div>
    </div>
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
