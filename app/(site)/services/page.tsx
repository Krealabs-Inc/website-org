import { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageCta } from "@/components/services/page-cta";
import { rich } from "@/components/ui/rich";
import { getPageTexts } from "@/lib/content/pages";
import { SERVICES_INDEX } from "@/lib/page-texts/services";
import { ServiceSwitchboard } from "@/components/services/switchboard";

export const metadata: Metadata = {
  title: "Services web à Rouen : sites, apps, SEO",
  description:
    "Agence web à Rouen : un site que vous gérez vous-même, des outils qui vous font gagner du temps, une place dans Google. Développement web en Normandie, un seul interlocuteur du devis à la mise en ligne.",
  alternates: { canonical: "https://krealabs.fr/services" },
  openGraph: {
    title: "Ce qu’on peut faire pour vous - Krealabs, agence web Rouen",
    description:
      "Agence web à Rouen : un site que vous gérez vous-même, des outils qui vous font gagner du temps, une place dans Google. Développement web en Normandie, un seul interlocuteur.",
    url: "https://krealabs.fr/services",
    type: "website",
  },
};

export default async function ServicesIndexPage() {
  const t = await getPageTexts(SERVICES_INDEX);
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* SWITCHBOARD: the page opens straight on the five needs */}
      <section className="pt-32 pb-20 md:pt-40">
        <Container>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow dot className="mb-6">{t.eyebrow}</Eyebrow>
              <h1 className="text-h1 md:text-display max-w-3xl">{rich(t.title)}</h1>
            </div>
            <p className="text-body text-[var(--muted-foreground)] max-w-sm">{t.intro}</p>
          </div>
          <ServiceSwitchboard services={t.services} />
        </Container>
      </section>

      {/* COMMITMENTS: three short lines */}
      <section className="border-t border-[var(--border)] py-16">
        <Container>
          <ul className="sw-commit">
            {t.commitments.map((c) => (
              <li key={c.title}>
                <span className="text-caption text-[var(--accent)]">{c.label}</span>
                <span className="text-h4">{c.title}</span>
                <span className="text-body-sm text-[var(--muted-foreground)]">{c.description}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <PageCta t={t} />
    </main>
  );
}
