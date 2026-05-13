import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Désinscription newsletter — Krealabs",
  description: "Confirmation de désinscription de la newsletter Krealabs.",
  robots: { index: false, follow: true },
};

export default async function NewsletterUnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; email?: string }>;
}) {
  const { status, email } = await searchParams;

  const states = {
    success: {
      icon: CheckCircle2,
      tone: "text-[var(--accent)]",
      title: "Désinscription confirmée",
      message: email
        ? `L'adresse ${email} a été retirée de la newsletter Krealabs.`
        : "Votre désinscription est confirmée.",
      sub: "Vous ne recevrez plus aucun email de notre part. Si c'est une erreur, vous pouvez vous ré-inscrire à tout moment via le formulaire du site.",
    },
    invalid: {
      icon: AlertCircle,
      tone: "text-[color:rgba(255,193,7,0.9)]",
      title: "Lien invalide ou expiré",
      message:
        "Le lien de désinscription est invalide. Si vous voulez tout de même vous désinscrire, écrivez-nous à contact@krealabs.fr.",
      sub: "Possibilité : le lien a déjà été utilisé, ou il a été tronqué dans votre client mail.",
    },
    error: {
      icon: XCircle,
      tone: "text-[color:rgba(239,68,68,0.9)]",
      title: "Erreur côté serveur",
      message:
        "Notre serveur n'a pas pu traiter votre désinscription. Réessayez dans quelques minutes ou écrivez-nous.",
      sub: "Si ça persiste, contactez-nous directement à contact@krealabs.fr — on vous retire à la main.",
    },
  } as const;

  const state =
    status === "success"
      ? states.success
      : status === "error"
        ? states.error
        : states.invalid;

  const Icon = state.icon;

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" aria-hidden />
        <Container className="relative">
          <div className="max-w-2xl mx-auto text-center">
            <div
              className={`inline-flex size-16 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] mb-8 ${state.tone}`}
            >
              <Icon className="size-7" />
            </div>
            <Eyebrow dot className="mb-6 justify-center">
              Newsletter Krealabs
            </Eyebrow>
            <h1 className="text-display mb-6">{state.title}</h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mb-4">
              {state.message}
            </p>
            <p className="text-body text-[var(--muted-foreground)] mb-12">
              {state.sub}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild>
                <Link href="/">Retour à l&apos;accueil</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/blog">Lire le blog</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
