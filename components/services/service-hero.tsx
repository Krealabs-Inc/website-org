import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

interface ServiceHeroProps {
  eyebrow: string;
  number: string;
  /** Titre avec balises <em> pour les mots en serif italique */
  title: React.ReactNode;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function ServiceHero({
  eyebrow,
  number,
  title,
  description,
  primaryCta = { label: "Démarrer un projet", href: "/contact" },
  secondaryCta = { label: "Tous les services", href: "/services" },
}: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />
      <div
        aria-hidden
        className="absolute -top-32 right-1/4 size-[500px] rounded-full blur-[120px] opacity-20"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />

      <Container className="relative">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-10"
        >
          <ArrowLeft className="size-3.5" />
          Retour aux services
        </Link>

        <div className="max-w-4xl">
          <Eyebrow number={number} dot className="mb-8">
            {eyebrow}
          </Eyebrow>
          <h1 className="text-display">{title}</h1>
          <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
            {description}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <Link href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
