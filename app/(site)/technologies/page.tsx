import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Technologies - Stack technique Krealabs",
  description:
    "Les technologies que nous utilisons chez Krealabs : Next.js, React, React Native, TypeScript. Stack moderne pour des projets web et mobile maintenables et performants.",
  alternates: { canonical: "https://krealabs.fr/technologies" },
  openGraph: {
    title: "Technologies - Stack technique Krealabs",
    description:
      "Les technologies que nous utilisons chez Krealabs : Next.js, React, React Native, TypeScript. Stack moderne pour des projets web et mobile maintenables et performants.",
    url: "https://krealabs.fr/technologies",
    type: "website",
  },
};

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageCta } from "@/components/services/page-cta";
import { rich } from "@/components/ui/rich";
import { getPageTexts } from "@/lib/content/pages";
import { TECHNOLOGIES } from "@/lib/page-texts/technologies";
import { TechMap } from "@/components/tech/tech-map";


export default async function TechnologiesPage() {
  const t = await getPageTexts(TECHNOLOGIES);
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />
        <Container className="relative">
          <div className="max-w-4xl">
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

      {/* SIGNATURE: how the tools connect */}
      <section className="border-t border-[var(--border)] py-16 hidden md:block">
        <Container>
          <p className="text-caption mb-6">{t.mapHint}</p>
          <TechMap />
        </Container>
      </section>

      {/* The tools, one row each */}
      <section className="border-t border-[var(--border)]">
        <Container>
          <ul className="tech-rows">
            {t.tools.map((tool) => (
              <li key={tool.name}>
                <Link href={tool.href} className="tech-row group">
                  <span className="text-caption">{tool.kind}</span>
                  <span className="text-h2">{tool.name}</span>
                  <span className="text-body-sm text-[var(--muted-foreground)]">{tool.description}</span>
                  <ArrowUpRight className="size-6 text-[var(--subtle-foreground)] transition-colors group-hover:text-[var(--accent)]" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <PageCta t={t} />
    </main>
  );
}
