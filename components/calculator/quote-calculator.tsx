"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eyebrow } from "@/components/ui/eyebrow";
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

/**
 * Calculator as a receipt: every choice is visible on the left (no
 * wizard), and each one prints a new line on the ticket on the right,
 * down to the estimated total. The ticket can then be sent by email.
 */
export function QuoteCalculator() {
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [featureSlugs, setFeatureSlugs] = useState<string[]>([]);
  const [urgency, setUrgency] = useState<Urgency>("normal");
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const applicable = useMemo(() => (projectType ? FEATURES.filter((f) => f.applicableTo.includes(projectType)) : []), [projectType]);
  const estimate = useMemo(
    () => (projectType ? calculateEstimate({ projectType, featureSlugs, urgency }) : null),
    [projectType, featureSlugs, urgency],
  );
  const toggle = (slug: string) => setFeatureSlugs((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!estimate) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const fd = new FormData();
      fd.set("requestType", "devis");
      fd.set("name", contact.name);
      fd.set("email", contact.email);
      fd.set(
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
      fd.set("pricingOption", estimate.projectType.slug);
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setSubmitting(false);
    }
  }

  const urgencyMeta = URGENCY_MULTIPLIERS[urgency];
  const pct = Math.round((urgencyMeta.multiplier - 1) * 100);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
      {/* ===== Choices ===== */}
      <div className="space-y-14 lg:col-span-7">
        <fieldset>
          <legend className="mb-6">
            <Eyebrow number="01">Votre projet</Eyebrow>
          </legend>
          <div className="calc-options">
            {PROJECT_TYPES.map((p) => (
              <label key={p.slug} className={cn("calc-option", projectType === p.slug && "is-on")}>
                <input
                  type="radio"
                  name="project"
                  className="sr-only"
                  checked={projectType === p.slug}
                  onChange={() => {
                    setProjectType(p.slug);
                    setFeatureSlugs([]);
                  }}
                />
                <span className="calc-mark is-radio" aria-hidden />
                <span className="min-w-0">
                  <span className="block font-medium">{p.label}</span>
                  <span className="block text-body-sm text-[var(--muted-foreground)] mt-1">{p.shortDescription}</span>
                </span>
                <span className="calc-price">dès {formatPrice(p.baseRange[0])}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset disabled={!projectType}>
          <legend className="mb-6">
            <Eyebrow number="02">Options</Eyebrow>
          </legend>
          {!projectType ? (
            <p className="text-body-sm text-[var(--muted-foreground)]">Choisissez d’abord votre projet : les options possibles en dépendent.</p>
          ) : applicable.length === 0 ? (
            <p className="text-body-sm text-[var(--muted-foreground)]">Pas d’option à ajouter pour ce type de projet.</p>
          ) : (
            <div className="calc-options">
              {applicable.map((f) => {
                const on = featureSlugs.includes(f.slug);
                return (
                  <label key={f.slug} className={cn("calc-option", on && "is-on")}>
                    <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(f.slug)} />
                    <span className="calc-mark" aria-hidden>
                      {on && <Check className="size-3" />}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium">{f.label}</span>
                      <span className="block text-body-sm text-[var(--muted-foreground)] mt-1">{f.description}</span>
                    </span>
                    <span className="calc-price">+{formatPrice(f.costRange[0])}</span>
                  </label>
                );
              })}
            </div>
          )}
        </fieldset>

        <fieldset>
          <legend className="mb-6">
            <Eyebrow number="03">Votre délai</Eyebrow>
          </legend>
          <div className="calc-segments">
            {(Object.keys(URGENCY_MULTIPLIERS) as Urgency[]).map((u) => (
              <label key={u} className={cn("calc-segment", urgency === u && "is-on")}>
                <input type="radio" name="urgency" className="sr-only" checked={urgency === u} onChange={() => setUrgency(u)} />
                <span className="font-medium">{URGENCY_MULTIPLIERS[u].label}</span>
                <span className="text-body-sm text-[var(--muted-foreground)]">{URGENCY_MULTIPLIERS[u].description}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* ===== The receipt ===== */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="rcpt-slot" aria-hidden />
          <div className="rcpt" aria-live="polite">
            <p className="rcpt-brand">KREALABS</p>
            <p className="rcpt-sub">Ticket d’estimation · Rouen, Normandie</p>
            <p className="rcpt-rule" aria-hidden />

            {!estimate ? (
              <p className="rcpt-wait">En attente de votre projet<span className="rcpt-caret" aria-hidden>_</span></p>
            ) : (
              <>
                <div key={estimate.projectType.slug} className="rcpt-line">
                  <span>{estimate.projectType.label}</span>
                  <span>
                    {formatPrice(estimate.projectType.baseRange[0])} – {formatPrice(estimate.projectType.baseRange[1])}
                  </span>
                </div>
                {estimate.features.map((f) => (
                  <div key={f.slug} className="rcpt-line is-option">
                    <span>+ {f.label}</span>
                    <span>
                      {formatPrice(f.costRange[0])} – {formatPrice(f.costRange[1])}
                    </span>
                  </div>
                ))}
                {pct !== 0 && (
                  <div key={urgency} className="rcpt-line is-option">
                    <span>{urgencyMeta.label}</span>
                    <span>{pct > 0 ? `+${pct} %` : `${pct} %`}</span>
                  </div>
                )}
                <p className="rcpt-rule" aria-hidden />
                <div key={`${estimate.min}-${estimate.max}`} className="rcpt-total">
                  <span>Total estimé HT</span>
                  <span>
                    {formatPrice(estimate.min)} – {formatPrice(estimate.max)}
                  </span>
                </div>
                <div className="rcpt-line is-meta">
                  <span>Délai indicatif</span>
                  <span>{estimate.timeline}</span>
                </div>
              </>
            )}
            <p className="rcpt-rule" aria-hidden />
            <p className="rcpt-note">Estimation indicative, pas un devis. Prix ferme après un premier rendez-vous offert.</p>
            <p className="rcpt-barcode" aria-hidden />
          </div>

          {/* Send the ticket */}
          {estimate &&
            (submitted ? (
              <div className="calc-sent" role="status">
                <Check className="size-5 text-[var(--accent)]" />
                <p className="text-body-sm">
                  Envoyé à <strong className="font-medium">{contact.email}</strong>. On revient vers vous sous 24h ouvrées.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="calc-send">
                <p className="font-medium">Recevoir ce ticket par email</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Input required autoComplete="name" placeholder="Prénom et nom" aria-label="Prénom et nom" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
                  <Input required type="email" autoComplete="email" placeholder="votre@email.fr" aria-label="Email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                </div>
                <Textarea rows={2} placeholder="Un mot sur votre contexte (optionnel)" aria-label="Message (optionnel)" value={contact.message} onChange={(e) => setContact({ ...contact, message: e.target.value })} />
                {submitError && <p className="text-caption text-[color:rgba(239,68,68,0.9)]">{submitError}</p>}
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      Recevoir mon estimation
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
                <p className="text-caption">
                  Vos données servent uniquement à vous répondre.{" "}
                  <a href="/legal/politique-confidentialite" className="underline underline-offset-2">
                    Confidentialité
                  </a>
                </p>
              </form>
            ))}
        </div>
      </div>
    </div>
  );
}
