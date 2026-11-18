import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Notre histoire - Agence web à Rouen depuis 2020",
  description:
    "Découvrez Krealabs, agence digitale fondée à Rouen en 2020. Notre parcours, nos valeurs, notre méthode artisanale au service des entreprises de Normandie.",
  alternates: { canonical: "https://krealabs.fr/notre-histoire" },
  openGraph: {
    title: "Notre histoire - Agence web à Rouen depuis 2020 - Krealabs",
    description:
      "Découvrez Krealabs, agence digitale fondée à Rouen en 2020. Notre parcours, nos valeurs, notre méthode artisanale au service des entreprises de Normandie.",
    url: "https://krealabs.fr/notre-histoire",
    type: "website",
  },
};

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageCta } from "@/components/services/page-cta";
import { rich } from "@/components/ui/rich";
import { getPageTexts } from "@/lib/content/pages";
import { HISTORY } from "@/lib/page-texts/history";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { getTeam } from "@/lib/content/team";
import { YearReel } from "@/components/history/year-reel";



export default async function NotreHistoirePage() {
  const team = await getTeam();
  const t = await getPageTexts(HISTORY);
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <OrganizationSchema />
      {/* HERO: the founding year, outlined, behind the promise */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <span className="history-ghost" aria-hidden>2020</span>
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow dot className="mb-8">{t.eyebrow}</Eyebrow>
            <h1 className="text-display">{rich(t.title)}</h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">{t.intro}</p>
            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/contact">
                  {t.cta}
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SIGNATURE: the year rolls as the story passes */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="mb-10 max-w-2xl">
            <Eyebrow number="01" className="mb-6">{t.timelineEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.timelineTitle)}</h2>
          </div>
          <YearReel chapters={t.timeline} />
        </Container>
      </section>

      {/* VALUES: a manifesto, one line each */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <Eyebrow number="02" className="mb-10">{t.valuesEyebrow}</Eyebrow>
          <ol className="manifesto" data-scroll data-reveal="stagger">
            {t.values.map((v) => (
              <li key={v.title}>
                <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--accent)]">{v.label}</span>
                <p className="manifesto-line">{v.title}.</p>
                <p className="text-body text-[var(--muted-foreground)] max-w-xl">{v.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* TEAM: a short nod, the full page lives at /equipe */}
      <section className="border-t border-[var(--border)] py-16">
        <Container>
          <Link href="/equipe" className="history-team">
            <span className="flex -space-x-3">
              {team.map((m) => (
                <span key={m.name} className="history-avatar">{m.initials}</span>
              ))}
            </span>
            <span className="text-h3">
              {team.length} {rich(t.teamLine)}
            </span>
            <span className="ml-auto inline-flex items-center gap-2 text-body text-[var(--accent)]">
              {t.teamLink}
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </Container>
      </section>

      <PageCta t={t} />
    </main>
  );
}
