import { Metadata } from "next";
import { FAQSchema } from "@/components/seo/faq-schema";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { rich } from "@/components/ui/rich";
import { getPageTexts } from "@/lib/content/pages";
import { FAQ_PAGE } from "@/lib/page-texts/faq-page";
import { PageCta } from "@/components/services/page-cta";
import { FaqSearch } from "@/components/faq/faq-search";
import { getFaqGroups } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: "FAQ - Questions fréquentes",
  description:
    "Réponses aux questions fréquentes sur nos services de développement web et mobile à Rouen. Délais, technologies, méthode, maintenance, SEO.",
  alternates: { canonical: "https://krealabs.fr/faq" },
  openGraph: {
    title: "FAQ - Questions fréquentes - Krealabs",
    description:
      "Réponses aux questions fréquentes sur nos services de développement web et mobile à Rouen. Délais, technologies, méthode, maintenance, SEO.",
    url: "https://krealabs.fr/faq",
    type: "website",
  },
};


export default async function FaqPage() {
  const groups = await getFaqGroups();
  const t = await getPageTexts(FAQ_PAGE);
  const allItems = groups.flatMap((g) => g.items);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <FAQSchema items={allItems} speakable />

      {/* HERO */}
      <section className="pt-32 pb-24 md:pt-40">
        <Container size="narrow">
          <Eyebrow dot className="mb-8">{t.eyebrow}</Eyebrow>
          <h1 className="text-h1 md:text-display mb-10">{rich(t.title)}</h1>
          <FaqSearch groups={groups} />
        </Container>
      </section>

      <PageCta t={t} />
    </main>
  );
}
