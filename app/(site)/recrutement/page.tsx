import { Metadata } from "next";
import Link from "next/link";

import { rich } from "@/components/ui/rich";
import { getPageTexts } from "@/lib/content/pages";
import { RECRUITMENT } from "@/lib/page-texts/recruitment";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Recrutement - Agence web à Rouen",
  description:
    "Aucun poste ouvert pour le moment chez Krealabs, agence web à Rouen. Développeur, designer ou alternant en Normandie : vous pouvez tout de même nous écrire.",
  alternates: { canonical: "https://krealabs.fr/recrutement" },
  openGraph: {
    title: "Recrutement - Krealabs, agence web Rouen",
    description:
      "Aucun poste ouvert pour le moment. Vous pouvez tout de même nous écrire.",
    url: "https://krealabs.fr/recrutement",
    type: "website",
  },
};

export default async function RecrutementPage() {
  const t = await getPageTexts(RECRUITMENT);
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* HERO: the honest count */}
      <section className="pt-32 pb-20 md:pt-40">
        <Container>
          <div className="hire">
            <div className="hire-count" aria-hidden>0</div>
            <div>
              <Eyebrow dot className="mb-6">{t.eyebrow}</Eyebrow>
              <h1 className="text-h1 md:text-display">{rich(t.title)}</h1>
              <p className="text-body-lg text-[var(--muted-foreground)] mt-6 max-w-xl">{t.intro}</p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href="mailto:contact@krealabs.fr?subject=Candidature%20spontan%C3%A9e">
                    {t.cta}
                    <ArrowRight />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/equipe">{t.secondary}</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* WHAT YOU WOULD FIND */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <p className="text-caption mb-8">{t.pointsIntro}</p>
          <ul className="hire-points">
            {t.points.map((point) => (
              <li key={point.title}>
                <p className="text-h3">{point.title}</p>
                <p className="text-body text-[var(--muted-foreground)] mt-2">{point.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* CANDIDATURE SPONTANÉE */}
      <section className="section-y border-t border-[var(--border)]">
        <Container size="narrow">
          <div className="max-w-3xl">
            <Eyebrow className="mb-6">{t.applyEyebrow}</Eyebrow>
            <h2 className="text-h2 mb-6">{rich(t.applyTitle)}</h2>
            <p className="text-body text-[var(--muted-foreground)] mb-4 leading-relaxed">{rich(t.applyText1)}</p>
            <p className="text-body text-[var(--muted-foreground)] leading-relaxed">{rich(t.applyText2)}</p>
          </div>
        </Container>
      </section>
    </main>
  );
}

