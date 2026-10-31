import * as React from "react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FAQSchema } from "@/components/seo/faq-schema";

export interface ServiceFAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  title?: React.ReactNode;
  eyebrow?: string;
  items: ServiceFAQItem[];
}

/**
 * Section FAQ réutilisable pour les pages services :
 *  - Visuel : accordion <details>/<summary> natif (sans JS)
 *  - SEO : injection automatique du FAQPage schema JSON-LD
 *
 * Une seule source de vérité (le tableau items) pour le rendu visuel
 * et le markup structuré → impossible d'avoir un désaccord entre les
 * deux (cause classique de pénalités Google).
 */
export function ServiceFAQ({ title, eyebrow = "Questions fréquentes", items }: ServiceFAQProps) {
  return (
    <>
      <FAQSchema items={items} />
      <section className="section-y border-t border-[var(--border)]">
        <Container size="narrow">
          <div className="mb-12 text-center">
            <Eyebrow className="mb-6 justify-center">{eyebrow}</Eyebrow>
            <h2 className="text-h1">{title ?? "Questions fréquentes"}</h2>
          </div>
          <div className="border-t border-[var(--border-strong)]">
            {items.map((item) => (
              <details
                key={item.question}
                className="editorial-question group"
              >
                <summary className="cursor-pointer list-none px-1 py-6 flex items-center justify-between gap-4">
                  <span className="text-h4">{item.question}</span>
                  <span
                    aria-hidden
                    className="text-h3 text-[var(--accent)] group-open:rotate-45 transition-transform"
                  >
                    +
                  </span>
                </summary>
                <p className="px-1 pb-7 text-body text-[var(--muted-foreground)] whitespace-pre-line">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
