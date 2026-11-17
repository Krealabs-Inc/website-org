import { Metadata } from "next";
import { FAQSchema } from "@/components/seo/faq-schema";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";
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
  const allItems = groups.flatMap((g) => g.items);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <FAQSchema items={allItems} speakable />

      {/* HERO */}
      <section className="pt-32 pb-24 md:pt-40">
        <Container size="narrow">
          <Eyebrow dot className="mb-8">Questions fréquentes</Eyebrow>
          <h1 className="text-h1 md:text-display mb-10">
            Votre question a sûrement <em>sa réponse</em>.
          </h1>
          <FaqSearch groups={groups} />
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Une autre <em>question</em> ?
          </>
        }
        description="Vous ne trouvez pas votre réponse ? Écrivez-nous directement, nous revenons vers vous sous 24h."
        primaryLabel="Poser ma question"
      />
    </main>
  );
}
