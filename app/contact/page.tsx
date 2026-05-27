"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import {
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Check,
  FileText,
  MessageSquare,
  Briefcase,
  Globe,
  Smartphone,
  Cpu,
  Search,
  Shield,
  ListChecks,
  Route,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

const REQUEST_TYPES = [
  { id: "devis", label: "Demande de devis", icon: FileText },
  { id: "contact", label: "Question / Renseignement", icon: MessageSquare },
  { id: "partenariat", label: "Partenariat", icon: Briefcase },
] as const;

const PROJECT_TYPES = [
  { id: "site-web", label: "Site web", icon: Globe },
  { id: "app-mobile", label: "Application mobile", icon: Smartphone },
  { id: "logiciel", label: "Logiciel sur mesure", icon: Cpu },
  { id: "refonte-seo", label: "Refonte / SEO", icon: Search },
] as const;

function ContactPageInner() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") === "partenariat" ? "partenariat" : "devis";

  const [formData, setFormData] = useState({
    requestType: initialType,
    name: "",
    email: "",
    phone: "",
    company: "",
    pricingOption: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const t = searchParams.get("type");
    if (t === "partenariat" || t === "contact" || t === "devis") {
      setFormData((d) => ({ ...d, requestType: t }));
    }
  }, [searchParams]);

  const update = <K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) =>
    setFormData((d) => ({ ...d, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));

      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error("Envoi échoué", {
          description: err.error || "Une erreur est survenue. Réessayez ou écrivez-nous à contact@krealabs.fr.",
        });
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
        return;
      }

      setStatus("success");
      toast.success("Message envoyé", {
        description: "Nous revenons vers vous sous 24h ouvrées.",
      });
      // Petit confetti aux couleurs Krealabs pour célébrer
      if (typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const colors = ["#8F99ED", "#7782E1", "#FAFAFA"];
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors,
          ticks: 200,
          scalar: 0.9,
        });
        setTimeout(() => {
          confetti({
            particleCount: 40,
            spread: 100,
            angle: 60,
            origin: { x: 0, y: 0.7 },
            colors,
          });
          confetti({
            particleCount: 40,
            spread: 100,
            angle: 120,
            origin: { x: 1, y: 0.7 },
            colors,
          });
        }, 200);
      }
      setFormData({
        requestType: "devis",
        name: "",
        email: "",
        phone: "",
        company: "",
        pricingOption: "",
        message: "",
      });
    } catch {
      setStatus("error");
      toast.error("Connexion impossible", {
        description: "Vérifiez votre connexion et réessayez.",
      });
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] pt-32 pb-32">
      <Container>
        {/* Header */}
        <header className="mb-16 max-w-4xl">
          <Eyebrow dot className="mb-6">Parlons de votre projet</Eyebrow>
          <h1 className="text-display">
            <em>Décrivez-nous</em> votre besoin.
          </h1>
          <p className="text-body-lg text-[var(--muted-foreground)] mt-6 max-w-2xl">
            Site vitrine, application mobile, logiciel métier ou refonte SEO :
            partagez-nous votre contexte. Nous revenons vers vous sous 24h
            ouvrées avec un premier retour concret.
          </p>
        </header>

        {/* ============== EXPECTATIONS BLOCK (brief checklist + ladder + reassurance) ============== */}
        <section className="mb-16 border-y border-[var(--border)] py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {/* LEFT — Brief checklist */}
            <div className="bg-[var(--background)] p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-9 shrink-0 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center">
                  <ListChecks className="size-4 text-[var(--accent)]" strokeWidth={1.75} />
                </div>
                <h2 className="text-h4">
                  Ce qu&apos;il faut nous <em>dire</em>
                </h2>
              </div>
              <p className="text-body-sm text-[var(--muted-foreground)] mb-6">
                Plus le brief est précis, plus notre premier retour est utile.
                Pas besoin de tout savoir — partagez ce que vous avez :
              </p>
              <ul className="space-y-3 text-body-sm">
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1 rounded-full bg-[var(--accent)] shrink-0" />
                  <span>
                    <strong className="text-[var(--foreground)] font-medium">
                      Le contexte
                    </strong>{" "}
                    : votre activité, votre marché, ce qui déclenche le projet
                    aujourd&apos;hui (refonte, lancement, problème
                    spécifique…).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1 rounded-full bg-[var(--accent)] shrink-0" />
                  <span>
                    <strong className="text-[var(--foreground)] font-medium">
                      L&apos;objectif
                    </strong>{" "}
                    : ce que vous voulez obtenir concrètement (plus de leads,
                    automatiser un process, outiller une équipe…).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1 rounded-full bg-[var(--accent)] shrink-0" />
                  <span>
                    <strong className="text-[var(--foreground)] font-medium">
                      Le périmètre
                    </strong>{" "}
                    : type de projet (site, app, logiciel), fonctionnalités
                    incontournables, intégrations attendues.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1 rounded-full bg-[var(--accent)] shrink-0" />
                  <span>
                    <strong className="text-[var(--foreground)] font-medium">
                      Les contraintes
                    </strong>{" "}
                    : deadline, budget envisagé (même approximatif), existant
                    technique, équipe interne disponible.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1 rounded-full bg-[var(--accent)] shrink-0" />
                  <span>
                    <strong className="text-[var(--foreground)] font-medium">
                      Les pièces utiles
                    </strong>{" "}
                    : maquettes, cahier des charges, références
                    d&apos;inspiration — à joindre par retour de mail si vous
                    en avez.
                  </span>
                </li>
              </ul>
            </div>

            {/* RIGHT — Process ladder */}
            <div className="bg-[var(--background)] p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-9 shrink-0 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center">
                  <Route className="size-4 text-[var(--accent)]" strokeWidth={1.75} />
                </div>
                <h2 className="text-h4">
                  Ce qui se <em>passe</em> ensuite
                </h2>
              </div>
              <p className="text-body-sm text-[var(--muted-foreground)] mb-6">
                Aucune surprise. Trois étapes claires, vous décidez à chacune
                d&apos;elles :
              </p>
              <ol className="space-y-5">
                <li className="flex gap-4">
                  <span className="shrink-0 size-7 rounded-full border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-eyebrow text-[var(--accent)]">
                    1
                  </span>
                  <div>
                    <p className="text-body-sm font-medium mb-1">
                      Premier retour sous 24h ouvrées
                    </p>
                    <p className="text-body-sm text-[var(--muted-foreground)]">
                      Lecture de votre brief, questions de clarification, et un
                      avis honnête sur la faisabilité — y compris si on
                      n&apos;est pas la bonne équipe pour vous.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 size-7 rounded-full border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-eyebrow text-[var(--accent)]">
                    2
                  </span>
                  <div>
                    <p className="text-body-sm font-medium mb-1">
                      RDV de cadrage gratuit (30-45 min)
                    </p>
                    <p className="text-body-sm text-[var(--muted-foreground)]">
                      Visio ou présentiel à Rouen. On creuse le besoin, on
                      challenge votre approche si nécessaire, on dégrossit le
                      périmètre et le planning.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 size-7 rounded-full border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-eyebrow text-[var(--accent)]">
                    3
                  </span>
                  <div>
                    <p className="text-body-sm font-medium mb-1">
                      Devis détaillé à prix fixe
                    </p>
                    <p className="text-body-sm text-[var(--muted-foreground)]">
                      Sous 5 jours ouvrés après le cadrage : périmètre,
                      livrables, jalons, prix engageant. Pas de régie déguisée,
                      pas de ligne floue.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Reassurance row */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <ReassuranceCard
              icon={Shield}
              title="NDA sur demande"
              detail="Nous signons votre accord de confidentialité avant tout échange détaillé si votre projet l'exige."
            />
            <ReassuranceCard
              icon={Check}
              title="RGPD-friendly"
              detail="Vos données ne servent qu'à vous répondre. Aucun tracking publicitaire, aucun transfert hors UE."
            />
            <ReassuranceCard
              icon={MessageSquare}
              title="Sans engagement"
              detail="Le premier retour et le RDV de cadrage sont offerts. Vous repartez avec des éléments concrets, même sans suite."
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ============== LEFT : Info ============== */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start space-y-6">
            <InfoCard
              icon={Mail}
              eyebrow="Email"
              value="contact@krealabs.fr"
              href="mailto:contact@krealabs.fr"
            />
            <InfoCard
              icon={MapPin}
              eyebrow="Localisation"
              value="Rouen, Normandie"
              detail="Intervention France entière"
            />

            {/* Map embed — signal local visuel, iframe lazy-loaded pour ne
                pas peser sur le LCP. Pas d'API key requise (URL embed publique).
                CSP: maps.google.com whitelisté dans frame-src de next.config.ts. */}
            <div className="rounded-[var(--radius)] border border-[var(--border)] overflow-hidden bg-[var(--surface)]">
              <iframe
                title="Krealabs — Rouen, Normandie"
                src="https://maps.google.com/maps?q=Rouen+76000+France&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="220"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: "block" }}
                aria-label="Localisation Krealabs sur Google Maps — Rouen, France"
              />
            </div>

            <InfoCard
              icon={Clock}
              eyebrow="Délai de réponse"
              value="Sous 24h ouvrées"
              detail="Du lundi au vendredi"
            />

            <div className="p-6 rounded-[var(--radius)] border border-[var(--accent-subtle)] bg-[var(--accent-subtle)]/40">
              <p className="text-eyebrow text-[var(--accent)] mb-3">Bon à savoir</p>
              <p className="text-body-sm text-[var(--foreground)]">
                Le premier échange est <strong className="font-medium">gratuit et sans engagement</strong>.
                Nous prenons le temps de comprendre votre projet avant tout devis.
              </p>
            </div>
          </aside>

          {/* ============== RIGHT : Form ============== */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-8 space-y-12 p-8 md:p-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)]"
          >
            {/* Section: Type de demande */}
            <Section number="01" title="Type de demande">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {REQUEST_TYPES.map((t) => {
                  const active = formData.requestType === t.id;
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => update("requestType", t.id)}
                      className={cn(
                        "flex flex-col gap-2 items-start p-4 rounded-[var(--radius)] border text-left transition-colors",
                        active
                          ? "border-[var(--accent)] bg-[var(--accent-subtle)]"
                          : "border-[var(--border)] bg-[var(--background)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)]",
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-4",
                          active ? "text-[var(--accent)]" : "text-[var(--muted-foreground)]",
                        )}
                      />
                      <span className="text-body-sm font-medium">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </Section>

            {/* Section: Identité */}
            <Section number="02" title="Vos coordonnées">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Nom complet" required>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Jean Dupont"
                  />
                </Field>
                <Field label="Email" required>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="jean@entreprise.fr"
                  />
                </Field>
                <Field label="Téléphone (optionnel)">
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="06 12 34 56 78"
                  />
                </Field>
                <Field label="Entreprise (optionnel)">
                  <Input
                    value={formData.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="Acme SAS"
                  />
                </Field>
              </div>
            </Section>

            {/* Section: Type de projet (only if devis) */}
            {formData.requestType === "devis" && (
              <Section number="03" title="Type de projet">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {PROJECT_TYPES.map((p) => {
                    const active = formData.pricingOption === p.id;
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() =>
                          update("pricingOption", active ? "" : p.id)
                        }
                        className={cn(
                          "flex flex-col gap-2 items-start p-4 rounded-[var(--radius)] border text-left transition-colors",
                          active
                            ? "border-[var(--accent)] bg-[var(--accent-subtle)]"
                            : "border-[var(--border)] bg-[var(--background)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)]",
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-4",
                            active ? "text-[var(--accent)]" : "text-[var(--muted-foreground)]",
                          )}
                        />
                        <span className="text-body-sm font-medium">{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </Section>
            )}

            {/* Section: Message */}
            <Section
              number={formData.requestType === "devis" ? "04" : "03"}
              title="Votre message"
            >
              <Field label="Décrivez votre projet" required>
                <Textarea
                  required
                  rows={6}
                  minLength={20}
                  value={formData.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Contexte, objectifs, contraintes, délai souhaité, budget envisagé... Si vous avez un brief ou des maquettes, vous pourrez nous les transmettre par retour de mail."
                />
              </Field>
            </Section>

            {/* Submit */}
            <div className="pt-6 border-t border-[var(--border)] flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-caption">
                En envoyant ce formulaire, vous acceptez d'être contacté par
                Krealabs.
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={status === "loading" || status === "success"}
              >
                {status === "loading" && "Envoi en cours…"}
                {status === "idle" && (
                  <>
                    Envoyer la demande
                    <ArrowRight />
                  </>
                )}
                {status === "success" && (
                  <>
                    <Check className="size-4" />
                    Message envoyé
                  </>
                )}
                {status === "error" && "Réessayer"}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="pt-32"><Container><p className="text-body text-[var(--muted-foreground)]">Chargement…</p></Container></div>}>
      <ContactPageInner />
    </Suspense>
  );
}

// ============================================================
// LOCAL HELPERS
// ============================================================

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-5">
        <Eyebrow number={number}>{title}</Eyebrow>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-eyebrow">
        {label}
        {required && <span className="text-[var(--accent)] ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function ReassuranceCard({
  icon: Icon,
  title,
  detail,
}: {
  icon: typeof Shield;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex gap-4 p-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)]">
      <div className="size-8 shrink-0 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] flex items-center justify-center">
        <Icon className="size-3.5 text-[var(--accent)]" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-body-sm font-medium mb-1">{title}</p>
        <p className="text-body-sm text-[var(--muted-foreground)] leading-relaxed">
          {detail}
        </p>
      </div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  eyebrow,
  value,
  detail,
  href,
}: {
  icon: typeof Mail;
  eyebrow: string;
  value: string;
  detail?: string;
  href?: string;
}) {
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href ? { href } : {};
  return (
    <Wrapper
      {...(wrapperProps as object)}
      className={cn(
        "block p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)]",
        href && "hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] transition-colors",
      )}
    >
      <div className="flex items-start gap-4">
        <div className="size-10 shrink-0 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] flex items-center justify-center">
          <Icon className="size-4 text-[var(--accent)]" strokeWidth={1.75} />
        </div>
        <div className="space-y-1 min-w-0">
          <p className="text-eyebrow">{eyebrow}</p>
          <p className="text-body font-medium truncate">{value}</p>
          {detail && (
            <p className="text-body-sm text-[var(--muted-foreground)]">{detail}</p>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
