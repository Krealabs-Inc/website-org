"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
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
  Paperclip,
  X,
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
  const [files, setFiles] = useState<File[]>([]);
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
      files.forEach((f) => fd.append("files", f));

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
      setFormData({
        requestType: "devis",
        name: "",
        email: "",
        phone: "",
        company: "",
        pricingOption: "",
        message: "",
      });
      setFiles([]);
    } catch {
      setStatus("error");
      toast.error("Connexion impossible", {
        description: "Vérifiez votre connexion et réessayez.",
      });
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next = Array.from(incoming).filter((f) => f.size <= 10 * 1024 * 1024);
    setFiles((curr) => [...curr, ...next].slice(0, 5));
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
                  placeholder="Contexte, objectifs, contraintes, délai souhaité, budget envisagé..."
                />
              </Field>

              {/* File drop zone */}
              <div className="space-y-2">
                <label className="text-eyebrow">Pièces jointes (optionnel)</label>
                <label
                  htmlFor="files-input"
                  className="flex items-center justify-center gap-2 px-4 py-6 rounded-[var(--radius)] border border-dashed border-[var(--border-strong)] bg-[var(--background)] cursor-pointer hover:bg-[var(--surface-hover)] transition-colors"
                >
                  <Paperclip className="size-4 text-[var(--muted-foreground)]" />
                  <span className="text-body-sm text-[var(--muted-foreground)]">
                    Glissez-déposez ou cliquez · 5 fichiers max · 10 Mo chacun
                  </span>
                </label>
                <input
                  id="files-input"
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                {files.length > 0 && (
                  <ul className="space-y-1 mt-2">
                    {files.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-2 px-3 py-2 text-body-sm rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)]"
                      >
                        <span className="truncate">{f.name}</span>
                        <button
                          type="button"
                          onClick={() => setFiles((curr) => curr.filter((_, idx) => idx !== i))}
                          aria-label={`Retirer ${f.name}`}
                          className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                        >
                          <X className="size-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
