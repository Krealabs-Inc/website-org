"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  PROJECT_TYPES,
  FEATURES,
  URGENCY_MULTIPLIERS,
  calculateEstimate,
  formatPrice,
  type ProjectType,
  type Urgency,
} from "@/lib/quote-calculator";

type Step = 1 | 2 | 3 | 4;

export function QuoteCalculator() {
  const [step, setStep] = useState<Step>(1);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [featureSlugs, setFeatureSlugs] = useState<string[]>([]);
  const [urgency, setUrgency] = useState<Urgency>("normal");
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const applicableFeatures = useMemo(
    () =>
      projectType
        ? FEATURES.filter((f) => f.applicableTo.includes(projectType))
        : [],
    [projectType],
  );

  const estimate = useMemo(() => {
    if (!projectType) return null;
    return calculateEstimate({ projectType, featureSlugs, urgency });
  }, [projectType, featureSlugs, urgency]);

  function toggleFeature(slug: string) {
    setFeatureSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!projectType || !estimate) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      formData.set("requestType", "devis");
      formData.set("name", contact.name);
      formData.set("email", contact.email);
      formData.set(
        "message",
        [
          `[Calculateur] Type de projet : ${estimate.projectType.label}`,
          `Fonctionnalités : ${estimate.features.map((f) => f.label).join(", ") || "(aucune)"}`,
          `Urgence : ${URGENCY_MULTIPLIERS[urgency].label}`,
          `Fourchette estimée : ${formatPrice(estimate.min)} - ${formatPrice(estimate.max)}`,
          "",
          "Message du visiteur :",
          contact.message || "(aucun)",
        ].join("\n"),
      );
      formData.set("pricingOption", estimate.projectType.slug);

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Erreur inconnue",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-[var(--accent)]/30 bg-[var(--accent-subtle)] p-10 text-center">
        <div className="inline-flex size-14 items-center justify-center rounded-full bg-[var(--accent)] text-[#0a0a0a] mb-6">
          <Check className="size-7" />
        </div>
        <h2 className="text-h2 mb-4">Demande envoyée</h2>
        <p className="text-body-lg text-[var(--muted-foreground)] max-w-xl mx-auto">
          On revient vers vous sous 24h ouvrées par email à{" "}
          <strong className="text-[var(--foreground)]">{contact.email}</strong>.
          La fourchette estimée vous a été récapitulée — on pourra l&apos;affiner
          ensemble lors d&apos;un premier RDV gratuit.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]/30 overflow-hidden">
      {/* Progress bar */}
      <div className="grid grid-cols-4 bg-[var(--surface)] border-b border-[var(--border)]">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={cn(
              "px-4 py-3 text-center text-eyebrow border-r border-[var(--border)] last:border-r-0",
              step >= s
                ? "bg-[var(--accent-subtle)] text-[var(--accent)]"
                : "text-[var(--muted-foreground)]",
            )}
          >
            <span className="hidden md:inline">Étape </span>
            {String(s).padStart(2, "0")}
            <span className="hidden md:inline">
              {" — "}
              {STEP_LABELS[s as Step]}
            </span>
          </div>
        ))}
      </div>

      <div className="p-6 md:p-10">
        {step === 1 && (
          <Step1
            value={projectType}
            onChange={(v) => {
              setProjectType(v);
              setFeatureSlugs([]); // reset features quand on change type
            }}
          />
        )}
        {step === 2 && projectType && (
          <Step2
            features={applicableFeatures}
            selected={featureSlugs}
            onToggle={toggleFeature}
          />
        )}
        {step === 3 && (
          <Step3 value={urgency} onChange={setUrgency} estimate={estimate} />
        )}
        {step === 4 && estimate && (
          <Step4
            estimate={estimate}
            contact={contact}
            setContact={setContact}
            onSubmit={handleSubmit}
            submitting={submitting}
            error={submitError}
          />
        )}

        {/* Nav */}
        {step < 4 && (
          <div className="mt-10 flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={() => setStep((step - 1) as Step)}
              >
                <ArrowLeft className="size-4" />
                Précédent
              </Button>
            ) : (
              <div />
            )}
            <Button
              onClick={() => setStep((step + 1) as Step)}
              disabled={
                (step === 1 && !projectType) || (step === 2 && false)
              }
            >
              {step === 3 ? "Voir l'estimation" : "Suivant"}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const STEP_LABELS: Record<Step, string> = {
  1: "Projet",
  2: "Fonctionnalités",
  3: "Délai",
  4: "Estimation",
};

function Step1({
  value,
  onChange,
}: {
  value: ProjectType | null;
  onChange: (v: ProjectType) => void;
}) {
  return (
    <div>
      <h2 className="text-h2 mb-2">Quel type de projet ?</h2>
      <p className="text-body text-[var(--muted-foreground)] mb-8">
        Choisissez la nature de votre projet. La fourchette de base dépend de ça.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {PROJECT_TYPES.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => onChange(p.slug)}
            className={cn(
              "text-left rounded-[var(--radius)] border p-5 transition-colors",
              value === p.slug
                ? "border-[var(--accent)] bg-[var(--accent-subtle)]/40"
                : "border-[var(--border)] bg-[var(--background)] hover:bg-[var(--surface)] hover:border-[var(--border-strong)]",
            )}
          >
            <h3 className="text-h4 mb-2 flex items-center justify-between gap-2">
              {p.label}
              {value === p.slug && (
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-[var(--accent)] text-[#0a0a0a]">
                  <Check className="size-3" />
                </span>
              )}
            </h3>
            <p className="text-body-sm text-[var(--muted-foreground)] mb-3">
              {p.shortDescription}
            </p>
            <p className="text-caption text-[var(--accent)]">
              {formatPrice(p.baseRange[0])} - {formatPrice(p.baseRange[1])} ·{" "}
              {p.baseTimelineWeeks}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2({
  features,
  selected,
  onToggle,
}: {
  features: (typeof FEATURES)[number][];
  selected: string[];
  onToggle: (slug: string) => void;
}) {
  if (features.length === 0) {
    return (
      <div>
        <h2 className="text-h2 mb-2">Pas de fonctionnalité optionnelle</h2>
        <p className="text-body text-[var(--muted-foreground)]">
          Pour ce type de projet, on continue directement à l&apos;étape
          suivante.
        </p>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-h2 mb-2">Fonctionnalités optionnelles</h2>
      <p className="text-body text-[var(--muted-foreground)] mb-8">
        Cochez ce qui s&apos;applique à votre projet. Chaque option ajoute une
        fourchette de coût additionnelle.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {features.map((f) => {
          const isSelected = selected.includes(f.slug);
          return (
            <button
              key={f.slug}
              type="button"
              onClick={() => onToggle(f.slug)}
              className={cn(
                "text-left rounded-[var(--radius)] border p-4 transition-colors",
                isSelected
                  ? "border-[var(--accent)] bg-[var(--accent-subtle)]/40"
                  : "border-[var(--border)] bg-[var(--background)] hover:bg-[var(--surface)] hover:border-[var(--border-strong)]",
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "size-5 mt-1 rounded border flex items-center justify-center shrink-0 transition-colors",
                    isSelected
                      ? "bg-[var(--accent)] border-[var(--accent)] text-[#0a0a0a]"
                      : "border-[var(--border)] bg-[var(--background)]",
                  )}
                >
                  {isSelected && <Check className="size-3" />}
                </span>
                <div className="flex-1">
                  <h3 className="text-body font-semibold mb-1">{f.label}</h3>
                  <p className="text-body-sm text-[var(--muted-foreground)] mb-2">
                    {f.description}
                  </p>
                  <Badge variant="outline" className="text-caption">
                    +{formatPrice(f.costRange[0])} à +{formatPrice(f.costRange[1])}
                  </Badge>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step3({
  value,
  onChange,
  estimate,
}: {
  value: Urgency;
  onChange: (v: Urgency) => void;
  estimate: ReturnType<typeof calculateEstimate> | null;
}) {
  return (
    <div>
      <h2 className="text-h2 mb-2">Quel délai vous arrange ?</h2>
      <p className="text-body text-[var(--muted-foreground)] mb-8">
        L&apos;urgence influence le tarif : un délai serré demande de
        mobiliser l&apos;équipe en priorité.
      </p>
      <div className="space-y-3">
        {(Object.keys(URGENCY_MULTIPLIERS) as Urgency[]).map((u) => {
          const meta = URGENCY_MULTIPLIERS[u];
          const isSelected = value === u;
          return (
            <button
              key={u}
              type="button"
              onClick={() => onChange(u)}
              className={cn(
                "w-full text-left rounded-[var(--radius)] border p-5 transition-colors",
                isSelected
                  ? "border-[var(--accent)] bg-[var(--accent-subtle)]/40"
                  : "border-[var(--border)] bg-[var(--background)] hover:bg-[var(--surface)] hover:border-[var(--border-strong)]",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-h4 mb-1">{meta.label}</h3>
                  <p className="text-body-sm text-[var(--muted-foreground)]">
                    {meta.description}
                  </p>
                </div>
                {isSelected && (
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-[var(--accent)] text-[#0a0a0a]">
                    <Check className="size-4" />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {estimate && (
        <div className="mt-8 p-5 rounded-[var(--radius)] border border-[var(--accent)]/20 bg-[var(--accent-subtle)]/30">
          <p className="text-caption mb-1">Aperçu fourchette en l&apos;état</p>
          <p className="text-h3 text-[var(--accent)]">
            {formatPrice(estimate.min)} - {formatPrice(estimate.max)}{" "}
            <span className="text-caption text-[var(--muted-foreground)]">HT</span>
          </p>
        </div>
      )}
    </div>
  );
}

function Step4({
  estimate,
  contact,
  setContact,
  onSubmit,
  submitting,
  error,
}: {
  estimate: ReturnType<typeof calculateEstimate>;
  contact: { name: string; email: string; message: string };
  setContact: (c: { name: string; email: string; message: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
  error: string | null;
}) {
  return (
    <div>
      <h2 className="text-h2 mb-2">Votre fourchette indicative</h2>
      <p className="text-body text-[var(--muted-foreground)] mb-8">
        Cette estimation est basée sur le marché normand 2026, hors TVA. Elle
        n&apos;est pas contractuelle — le devis définitif demandera un cadrage
        plus précis.
      </p>

      {/* Récap fourchette */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--accent)]/30 bg-[var(--accent-subtle)]/40 p-6 mb-8">
        <p className="text-caption mb-2">Estimation</p>
        <p className="text-display-sm text-[var(--accent)] mb-4">
          {formatPrice(estimate.min)} - {formatPrice(estimate.max)}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-[var(--accent)]/20 text-body-sm">
          <div>
            <p className="text-caption mb-1">Projet</p>
            <p className="font-medium">{estimate.projectType.label}</p>
          </div>
          <div>
            <p className="text-caption mb-1">Délai indicatif</p>
            <p className="font-medium">{estimate.timeline}</p>
          </div>
          <div>
            <p className="text-caption mb-1">Options</p>
            <p className="font-medium">
              {estimate.features.length} fonctionnalité
              {estimate.features.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Form contact */}
      <form onSubmit={onSubmit} className="space-y-4">
        <h3 className="text-h4">Recevez l&apos;estimation par email</h3>
        <p className="text-body-sm text-[var(--muted-foreground)]">
          On vous renvoie le détail de cette estimation + on revient sous 24h
          pour discuter de votre projet (premier échange offert).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            required
            placeholder="Votre prénom + nom"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            className="px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] text-body focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30"
          />
          <input
            type="email"
            required
            placeholder="votre@email.fr"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            className="px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] text-body focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30"
          />
        </div>
        <textarea
          placeholder="Message (optionnel) — précisez votre contexte si vous le souhaitez"
          rows={3}
          value={contact.message}
          onChange={(e) => setContact({ ...contact, message: e.target.value })}
          className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] text-body focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 resize-y"
        />
        {error && (
          <p className="text-caption text-[color:rgba(239,68,68,0.9)]">{error}</p>
        )}
        <Button
          type="submit"
          disabled={submitting}
          size="lg"
          className="w-full sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              Recevoir l&apos;estimation détaillée
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
        <p className="text-caption">
          Vos données sont uniquement utilisées pour vous répondre. Voir notre{" "}
          <a
            href="/legal/politique-confidentialite"
            className="underline underline-offset-2 hover:text-[var(--foreground)]"
          >
            politique de confidentialité
          </a>
          .
        </p>
      </form>
    </div>
  );
}
