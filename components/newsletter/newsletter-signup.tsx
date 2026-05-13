"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error" | "already";

interface NewsletterSignupProps {
  /** Source d'inscription envoyée à l'API pour analytics */
  source?: string;
  /** Variante visuelle — `compact` pour le footer, `card` pour landing pages */
  variant?: "compact" | "card";
  className?: string;
}

/**
 * Formulaire d'inscription newsletter Krealabs.
 * POST /api/newsletter → DB + Resend Audience + welcome email.
 */
export function NewsletterSignup({
  source = "website",
  variant = "compact",
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  const isLoading = status === "loading";
  const isSuccess = status === "success" || status === "already";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || isLoading) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Inscription confirmée.");
        setEmail("");
      } else if (res.status === 409) {
        setStatus("already");
        setMessage("Cet email est déjà inscrit. Merci !");
      } else {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue.");
      }
    } catch {
      setStatus("error");
      setMessage("Impossible de joindre le serveur. Réessayez.");
    }
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10",
          className,
        )}
      >
        <p className="text-eyebrow text-[var(--accent)] mb-3">
          Newsletter Krealabs
        </p>
        <h3 className="text-h2 mb-4">
          1 email par mois, <em>zéro spam</em>.
        </h3>
        <p className="text-body text-[var(--muted-foreground)] mb-8">
          Articles techniques, retours d&apos;expérience d&apos;agence et études
          de cas. Désinscription en un clic.
        </p>
        <NewsletterForm
          email={email}
          setEmail={setEmail}
          isLoading={isLoading}
          isSuccess={isSuccess}
          status={status}
          message={message}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }

  return (
    <div className={cn("", className)}>
      <NewsletterForm
        email={email}
        setEmail={setEmail}
        isLoading={isLoading}
        isSuccess={isSuccess}
        status={status}
        message={message}
        onSubmit={handleSubmit}
        compact
      />
    </div>
  );
}

function NewsletterForm({
  email,
  setEmail,
  isLoading,
  isSuccess,
  status,
  message,
  onSubmit,
  compact,
}: {
  email: string;
  setEmail: (v: string) => void;
  isLoading: boolean;
  isSuccess: boolean;
  status: Status;
  message: string;
  onSubmit: (e: React.FormEvent) => void;
  compact?: boolean;
}) {
  if (isSuccess) {
    return (
      <div className="flex items-start gap-3 rounded-[var(--radius)] border border-[var(--accent)]/30 bg-[var(--accent-subtle)] p-4">
        <CheckCircle2 className="size-5 text-[var(--accent)] mt-0.5 shrink-0" />
        <div>
          <p className="text-body-sm font-medium text-[var(--foreground)]">
            {message}
          </p>
          <p className="text-caption mt-1">
            Désinscription possible à tout moment via le lien en bas de chaque
            email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="votre@email.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] text-body text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 transition-colors disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading || !email}
          className={cn(
            "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[var(--radius)] font-medium text-body-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
            "bg-[var(--accent)] text-[#0a0a0a] hover:bg-[var(--accent)]/90",
          )}
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              S&apos;inscrire
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </div>
      {!compact && (
        <p className="text-caption">
          En vous inscrivant, vous acceptez de recevoir 1 newsletter par mois max.
          Désinscription en un clic, données conformes RGPD.
        </p>
      )}
      {status === "error" && (
        <p className="text-caption text-[color:rgba(239,68,68,0.9)]">
          {message}
        </p>
      )}
    </form>
  );
}
