"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { ArrowRight, Check, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const REQUEST_TYPES = [
  { id: "devis", label: "Un devis pour un projet" },
  { id: "contact", label: "Une question" },
  { id: "partenariat", label: "Un partenariat" },
] as const;

const PROJECT_TYPES = [
  { id: "site-web", label: "Un site web" },
  { id: "app-mobile", label: "Une application mobile" },
  { id: "logiciel", label: "Un logiciel sur mesure" },
  { id: "refonte-seo", label: "Une refonte / du SEO" },
  { id: "", label: "Je ne sais pas encore" },
] as const;

type Data = {
  requestType: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  pricingOption: string;
  message: string;
  callbackRequested: "" | "yes";
};
type StepId = "type" | "project" | "message" | "name" | "reach" | "send";

const EMPTY: Data = {
  requestType: "devis",
  name: "",
  email: "",
  phone: "",
  company: "",
  pricingOption: "",
  message: "",
  callbackRequested: "",
};

// Reading the URL forces client rendering up to the nearest Suspense
// boundary; isolating it keeps the rest of the page prerendered.
function RequestTypeFromUrl({ onType }: { onType: (type: string) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const t = searchParams.get("type");
    if (t === "partenariat" || t === "contact" || t === "devis") onType(t);
  }, [searchParams, onType]);
  return null;
}

function question(id: StepId, d: Data): string {
  switch (id) {
    case "type":
      return "Bonjour ! Que peut-on faire pour vous ?";
    case "project":
      return "Quel type de projet avez-vous en tête ?";
    case "message":
      return d.requestType === "devis"
        ? "Racontez-nous votre projet en quelques lignes."
        : d.requestType === "contact"
          ? "Quelle est votre question ?"
          : "Parlez-nous de votre proposition.";
    case "name":
      return "À qui avons-nous le plaisir de répondre ?";
    case "reach":
      return "Où pouvons-nous vous répondre ?";
    case "send":
      return "Tout est prêt.";
  }
}

function answer(id: StepId, d: Data): string {
  switch (id) {
    case "type":
      return REQUEST_TYPES.find((t) => t.id === d.requestType)?.label ?? "";
    case "project":
      return PROJECT_TYPES.find((p) => p.id === d.pricingOption)?.label ?? "";
    case "message":
      return d.message.length > 140 ? `${d.message.slice(0, 140)}…` : d.message;
    case "name":
      return d.company ? `${d.name}, ${d.company}` : d.name;
    case "reach":
      return [d.email, d.phone, d.callbackRequested === "yes" ? "rappel souhaité" : ""].filter(Boolean).join(" · ");
    default:
      return "";
  }
}

/**
 * Contact as a conversation: one question at a time, previous answers kept
 * above and editable. Posts the same fields to /api/contact as before.
 */
export function ConversationForm() {
  const [d, setD] = useState<Data>(EMPTY);
  const [at, setAt] = useState(0);
  // Furthest step reached: after editing an earlier answer, go straight back.
  const [furthest, setFurthest] = useState(0);
  const goTo = (to: number) => {
    moved.current = true;
    setAt(to);
    setFurthest(to);
  };
  const advance = (from: number) => goTo(Math.max(from + 1, furthest));
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [sentName, setSentName] = useState("");
  const current = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  const steps: StepId[] =
    d.requestType === "devis" ? ["type", "project", "message", "name", "reach", "send"] : ["type", "message", "name", "reach", "send"];
  const step = steps[Math.min(at, steps.length - 1)];

  const applyUrlType = useCallback((requestType: string) => setD((x) => ({ ...x, requestType })), []);
  const update = <K extends keyof Data>(key: K, value: Data[K]) => setD((x) => ({ ...x, [key]: value }));

  // After the visitor moves on, focus the new question's first field.
  useEffect(() => {
    if (!moved.current) return;
    const el = current.current?.querySelector<HTMLElement>("input, textarea, button[data-choice], button[type=submit]");
    el?.focus({ preventScroll: true });
    current.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [at]);

  const next = () => {
    const fields = current.current?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea") ?? [];
    for (const f of fields) if (!f.reportValidity()) return;
    advance(at);
  };

  const choose = <K extends "requestType" | "pricingOption">(key: K, value: string) => {
    // Changing the kind of request changes the questions that follow.
    if (key === "requestType" && value !== d.requestType) {
      update(key, value);
      goTo(at + 1);
      return;
    }
    update(key, value);
    advance(at);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== "send") {
      next();
      return;
    }
    setStatus("loading");
    try {
      const fd = new FormData();
      Object.entries(d).forEach(([k, v]) => fd.append(k, v));
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error("Envoi échoué", {
          description: err.error || "Une erreur est survenue. Réessayez ou écrivez-nous à contact@krealabs.fr.",
        });
        setStatus("error");
        return;
      }
      setSentName(d.name.split(" ")[0]);
      setStatus("success");
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 }, colors: ["#8F99ED", "#7782E1", "#FAFAFA"], scalar: 0.9 });
      }
      setD(EMPTY);
      setAt(0);
      setFurthest(0);
    } catch {
      setStatus("error");
      toast.error("Connexion impossible", { description: "Vérifiez votre connexion et réessayez." });
    }
  };

  if (status === "success") {
    return (
      <div className="chat-done" role="status">
        <span className="chat-done-icon">
          <Check className="size-6" />
        </span>
        <p className="text-h2 mt-6">Merci {sentName}, c’est envoyé.</p>
        <p className="text-body-lg text-[var(--muted-foreground)] mt-4 max-w-md">
          Vous recevez un premier retour sous 24h ouvrées, à l’adresse que vous nous avez donnée.
        </p>
        <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
          Envoyer une autre demande
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="chat">
      <Suspense fallback={null}>
        <RequestTypeFromUrl onType={applyUrlType} />
      </Suspense>

      {/* Answered questions, editable */}
      {steps.slice(0, at).map((id, i) => (
        <div key={id} className="chat-turn is-done">
          <p className="chat-q">{question(id, d)}</p>
          <div className="chat-a">
            <span>{answer(id, d)}</span>
            <button type="button" className="chat-edit" onClick={() => setAt(i)} aria-label={`Modifier : ${question(id, d)}`}>
              <Pencil className="size-3.5" />
            </button>
          </div>
        </div>
      ))}

      {/* Current question */}
      <div ref={current} key={step} className="chat-turn is-current">
        <p className="chat-q">{question(step, d)}</p>

        {step === "type" && (
          <div className="chat-choices">
            {REQUEST_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                data-choice
                className={cn("chat-choice", d.requestType === t.id && "is-selected")}
                onClick={() => choose("requestType", t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        {step === "project" && (
          <div className="chat-choices">
            {PROJECT_TYPES.map((p) => (
              <button
                key={p.label}
                type="button"
                data-choice
                className={cn("chat-choice", p.id !== "" && d.pricingOption === p.id && "is-selected")}
                onClick={() => choose("pricingOption", p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}

        {step === "message" && (
          <div className="chat-fields">
            {d.requestType === "devis" && (
              <p className="text-body-sm text-[var(--muted-foreground)]">
                Le contexte, ce que vous voulez obtenir, ce que le projet doit faire, vos contraintes (délai, budget même approximatif). Pas besoin de tout savoir : partagez ce que vous avez.
              </p>
            )}
            <label className="sr-only" htmlFor="c-message">Votre message</label>
            <Textarea
              id="c-message"
              required
              rows={6}
              minLength={20}
              value={d.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Quelques lignes suffisent…"
            />
          </div>
        )}

        {step === "name" && (
          <div className="chat-fields md:grid-cols-2">
            <label className="chat-label">
              Nom complet
              <Input required autoComplete="name" value={d.name} onChange={(e) => update("name", e.target.value)} placeholder="Jean Dupont" />
            </label>
            <label className="chat-label">
              Entreprise <span className="text-[var(--subtle-foreground)]">(optionnel)</span>
              <Input autoComplete="organization" value={d.company} onChange={(e) => update("company", e.target.value)} placeholder="Acme SAS" />
            </label>
          </div>
        )}

        {step === "reach" && (
          <div className="chat-fields md:grid-cols-2">
            <label className="chat-label">
              Email
              <Input required type="email" autoComplete="email" value={d.email} onChange={(e) => update("email", e.target.value)} placeholder="jean@entreprise.fr" />
            </label>
            <label className="chat-label">
              Téléphone {d.callbackRequested !== "yes" && <span className="text-[var(--subtle-foreground)]">(optionnel)</span>}
              <Input
                type="tel"
                autoComplete="tel"
                required={d.callbackRequested === "yes"}
                value={d.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="06 12 34 56 78"
              />
            </label>
            <label className="flex w-fit cursor-pointer items-center gap-2.5 text-body-sm md:col-span-2">
              <input
                type="checkbox"
                className="size-4 accent-[var(--accent)]"
                checked={d.callbackRequested === "yes"}
                onChange={(e) => update("callbackRequested", e.target.checked ? "yes" : "")}
              />
              Je préfère être rappelé(e)
              {d.callbackRequested === "yes" && <span className="text-[var(--muted-foreground)]">· sous 1h ouvrée, lun–ven 9h–18h</span>}
            </label>
          </div>
        )}

        {step === "send" && (
          <p className="text-body text-[var(--muted-foreground)]">
            Relisez vos réponses ci-dessus si besoin. Vous recevez un premier retour sous 24h ouvrées.
          </p>
        )}

        {step !== "type" && step !== "project" && (
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button type="submit" size="lg" disabled={status === "loading"}>
              {step === "send"
                ? status === "loading"
                  ? "Envoi en cours…"
                  : status === "error"
                    ? "Réessayer"
                    : d.requestType === "devis"
                      ? "Recevoir mon devis"
                      : "Envoyer ma question"
                : "Continuer"}
              {status !== "loading" && <ArrowRight />}
            </Button>
            {step === "send" && (
              <p className="text-caption">En envoyant, vous acceptez d’être contacté par Krealabs.</p>
            )}
          </div>
        )}
      </div>

      <p className="chat-progress" aria-live="polite">
        Étape {Math.min(at + 1, steps.length)} sur {steps.length}
      </p>
    </form>
  );
}
