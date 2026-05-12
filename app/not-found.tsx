import Link from "next/link";
import { Home, ArrowRight, MessagesSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GlitchText } from "@/components/animations/glitch-text";

const SUGGESTIONS = [
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[640px] rounded-full blur-[120px] opacity-15"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />

      <Container className="relative py-32">
        <div className="max-w-2xl mx-auto text-center">
          <Eyebrow className="mb-8 justify-center">Erreur 404</Eyebrow>

          <h1
            aria-hidden
            className="text-[clamp(6rem,18vw,14rem)] leading-[0.85] font-medium tracking-[-0.05em] text-[var(--foreground)]/[0.12] mb-2 select-none"
          >
            <GlitchText text="404" interval={4000} />
          </h1>

          <h2 className="text-h1 -mt-12 relative">
            Page <em>introuvable</em>.
          </h2>
          <p className="text-body-lg text-[var(--muted-foreground)] mt-6">
            La page que vous cherchez a été déplacée, renommée, ou n'a jamais
            existé. Aucun mal — voici par où poursuivre.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/">
                <Home className="size-4" />
                Retour à l'accueil
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                <MessagesSquare className="size-4" />
                Nous contacter
              </Link>
            </Button>
          </div>

          <div className="mt-16 pt-8 border-t border-[var(--border)]">
            <Eyebrow className="mb-4 justify-center">Pages utiles</Eyebrow>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {SUGGESTIONS.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1.5"
                  >
                    {s.label}
                    <ArrowRight className="size-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </main>
  );
}
