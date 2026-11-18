import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { STUDIO_URL } from "@/lib/studio";

interface ServiceCtaProps {
  /** Titre avec balises <em> autorisées */
  title: React.ReactNode;
  description?: string;
  primaryLabel?: string;
  eyebrow?: string;
  secondaryLabel?: string | null;
}

export function ServiceCta({
  title,
  description = "Le premier échange est gratuit et sans engagement. Décrivez votre projet, on vous répond sous 24h.",
  primaryLabel = "Parler de mon projet",
  eyebrow = "Votre projet",
  secondaryLabel = "Voir ce qu’on peut faire pour vous",
}: ServiceCtaProps) {
  return (
    <section id="parlons-projet" className="contact-invitation">
      <Container>
        <div className="contact-invitation-panel" data-scroll data-reveal="up">
          <div className="contact-invitation-copy">
            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
            <h2 className="contact-invitation-title">{title}</h2>
            <p className="text-body text-[var(--muted-foreground)] mt-5 max-w-xl">{description}</p>
          </div>
          <div className="contact-invitation-actions">
            <Button size="lg" asChild className="w-full whitespace-normal text-center">
              <Link href="/contact">{primaryLabel}<ArrowRight aria-hidden /></Link>
            </Button>
            {secondaryLabel && (
              <Button size="lg" variant="outline" asChild className="w-full whitespace-normal text-center">
                <Link href="/services">{secondaryLabel}</Link>
              </Button>
            )}
          </div>
          <p className="studio-aside">
            Vous préférez voir avant d’en parler ?
            <a href={STUDIO_URL} target="_blank" rel="noopener noreferrer">
              Créez une maquette gratuite de votre site
              <ArrowUpRight className="size-4" aria-hidden />
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
