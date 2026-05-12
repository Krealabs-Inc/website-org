import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

interface ServiceCtaProps {
  /** Titre avec balises <em> autorisées */
  title: React.ReactNode;
  description?: string;
  primaryLabel?: string;
}

export function ServiceCta({
  title,
  description = "Le premier échange est gratuit et sans engagement. Décrivez-nous votre projet, nous revenons vers vous sous 24h.",
  primaryLabel = "Démarrer un projet",
}: ServiceCtaProps) {
  return (
    <section className="section-y border-t border-[var(--border)]">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow className="mb-8 justify-center">Passons à l'action</Eyebrow>
          <h2 className="text-display">{title}</h2>
          <p className="text-body-lg text-[var(--muted-foreground)] mt-8 mb-10">
            {description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/contact">
                {primaryLabel}
                <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">Voir tous les services</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
