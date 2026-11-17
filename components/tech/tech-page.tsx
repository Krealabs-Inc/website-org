import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";

interface Item {
  title: string;
  description: string;
}

/**
 * Skeleton shared by the technology pages; each one brings its own demo,
 * so the pages share a family look without being copies of each other.
 */
export function TechPage({
  number,
  kind,
  title,
  description,
  demo,
  whyTitle,
  reasons,
  uses,
  ctaTitle,
}: {
  number: string;
  kind: string;
  title: ReactNode;
  description: string;
  demo: ReactNode;
  whyTitle: ReactNode;
  reasons: Item[];
  uses: Item[];
  ctaTitle: ReactNode;
}) {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <Container>
          <Link
            href="/technologies"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-10"
          >
            <ArrowLeft className="size-3.5" />
            Toutes les technologies
          </Link>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow number={number} dot className="mb-8">
                {kind}
              </Eyebrow>
              <h1 className="text-h1 md:text-display">{title}</h1>
              <p className="text-body-lg text-[var(--muted-foreground)] mt-8">{description}</p>
              <div className="mt-10">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Parler de mon projet
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-6">{demo}</div>
          </div>
        </Container>
      </section>

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow number="01" className="mb-6">Pourquoi</Eyebrow>
              <h2 className="text-h1">{whyTitle}</h2>
            </div>
            <ol className="tech-reasons lg:col-span-8" data-scroll data-reveal="stagger">
              {reasons.map((r, i) => (
                <li key={r.title}>
                  <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--accent)]">0{i + 1}</span>
                  <h3 className="text-h4 mt-2">{r.title}</h3>
                  <p className="text-body-sm text-[var(--muted-foreground)] mt-2">{r.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <Eyebrow number="02" className="mb-6">Cas d’usage</Eyebrow>
          <ul className="tech-uses" data-scroll data-reveal="stagger">
            {uses.map((u) => (
              <li key={u.title}>
                <h3 className="text-h2">{u.title}</h3>
                <p className="text-body text-[var(--muted-foreground)]">{u.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ServiceCta title={ctaTitle} />
    </main>
  );
}
