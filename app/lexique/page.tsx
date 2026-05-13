import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { ServiceCta } from "@/components/services/service-cta";
import { GLOSSARY, GLOSSARY_SLUGS } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Lexique du web — Définitions techniques · Krealabs",
  description:
    "Lexique technique web : headless WordPress, Core Web Vitals, schema.org, SEO local, Next.js, TypeScript, Lighthouse, E-E-A-T... Définitions claires par une agence web à Rouen.",
  keywords: [
    "lexique web",
    "glossaire technique web",
    "définition wordpress",
    "définition seo",
    "définition next.js",
  ],
  alternates: { canonical: "https://krealabs.fr/lexique" },
};

const CATEGORIES = ["WordPress", "Web", "Mobile", "SEO", "Infrastructure"];

export default function LexiqueIndexPage() {
  const entries = GLOSSARY_SLUGS.map((s) => GLOSSARY[s]);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />
        <Container className="relative">
          <div className="max-w-4xl">
            <Eyebrow dot className="mb-6">
              Lexique · Définitions web
            </Eyebrow>
            <h1 className="text-display">
              Le <em>web technique</em>
              <br />
              en clair.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-3xl">
              {entries.length} définitions des termes que nous utilisons en
              agence : headless WordPress, Core Web Vitals, schema.org, Next.js,
              SEO local... Pour comprendre les choix techniques qu&apos;on vous
              propose, et pour outiller votre vocabulaire web.
            </p>
          </div>
        </Container>
      </section>

      {CATEGORIES.map((cat) => {
        const items = entries.filter((e) => e.category === cat);
        if (items.length === 0) return null;
        return (
          <section
            key={cat}
            className="border-t border-[var(--border)] py-16 md:py-20"
          >
            <Container>
              <div className="flex items-baseline justify-between mb-10">
                <h2 className="text-h1">
                  <em>{cat}</em>
                </h2>
                <span className="text-caption">
                  {items.length} terme{items.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
                {items.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/lexique/${entry.slug}`}
                    className="group bg-[var(--background)] hover:bg-[var(--surface)] p-6 flex flex-col gap-3 transition-colors"
                  >
                    <Badge variant="outline" className="self-start">
                      {entry.category}
                    </Badge>
                    <h3 className="text-h4">{entry.term}</h3>
                    <p className="text-body-sm text-[var(--muted-foreground)] flex-1 leading-relaxed">
                      {entry.shortDef.slice(0, 130)}…
                    </p>
                    <span className="inline-flex items-center gap-2 text-body-sm font-medium text-[var(--accent)] mt-2">
                      Définition
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <ServiceCta
        title={
          <>
            Un projet à <em>discuter</em> ?
          </>
        }
        description="Premier échange offert pour cadrer votre projet — sites, apps, plateformes. On parle technique sans jargon."
        primaryLabel="Prendre rendez-vous"
      />
    </main>
  );
}
