import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQSchema } from "@/components/seo/faq-schema";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes",
  description:
    "Réponses aux questions fréquentes sur nos services de développement web et mobile à Rouen. Délais, technologies, méthode, maintenance, SEO.",
  keywords: [
    "faq développement web",
    "questions agence web rouen",
    "délais site internet",
    "méthode agence digitale",
  ],
  alternates: { canonical: "https://krealabs.fr/faq" },
};

const FAQ_GROUPS: { title: string; items: { question: string; answer: string }[] }[] = [
  {
    title: "Le projet",
    items: [
      {
        question: "Quels sont vos délais de réalisation ?",
        answer:
          "Les délais varient selon la complexité. Un site vitrine est livré en 2 à 3 semaines, une application web complète en 4 à 8 semaines, une app mobile en 6 à 12 semaines. Vous recevez un planning détaillé dès la phase de devis.",
      },
      {
        question: "Comment se déroule un projet avec vous ?",
        answer:
          "Notre processus en 4 étapes : (1) cadrage et brief écrit, (2) maquettes Figma validées par vous, (3) développement en sprints avec démos régulières, (4) mise en ligne, formation et suivi. Vous êtes impliqué à chaque étape.",
      },
      {
        question: "Travaillez-vous avec des startups ?",
        answer:
          "Oui, nous accompagnons régulièrement des startups sur leur MVP. Nous proposons des cadrages courts pour valider rapidement un produit minimum viable, ainsi qu'un accompagnement long terme à mesure que le produit évolue.",
      },
    ],
  },
  {
    title: "Tarifs & devis",
    items: [
      {
        question: "Combien coûte un projet ?",
        answer:
          "Nos tarifs sont systématiquement sur devis car chaque projet est unique. Après un premier échange (gratuit, sans engagement), nous vous transmettons un devis détaillé sous 48 à 72h. Pas de tarifs cachés, pas de mauvaise surprise.",
      },
      {
        question: "Proposez-vous des formules de maintenance ?",
        answer:
          "Oui, nous proposons des contrats de maintenance mensuelle incluant mises à jour de sécurité, corrections, petites évolutions, monitoring et support technique. Chaque projet bénéficie aussi de 1 mois de support gratuit après livraison.",
      },
      {
        question: "Quels modes de paiement acceptez-vous ?",
        answer:
          "Virement bancaire principalement, avec un échelonnement classique : 30% à la signature, 30% à la validation des maquettes, 30% à la livraison, 10% un mois après mise en production.",
      },
    ],
  },
  {
    title: "Technologies & expertise",
    items: [
      {
        question: "Quelles technologies utilisez-vous ?",
        answer:
          "Stack moderne : React et Next.js pour le web, React Native pour le mobile, TypeScript pour la robustesse, Prisma + PostgreSQL pour les bases de données, Tailwind CSS pour le design. Nous choisissons la stack la plus adaptée à chaque projet.",
      },
      {
        question: "Proposez-vous du SEO ?",
        answer:
          "Oui, tous nos sites intègrent les fondations SEO dès le développement (structure, métadonnées, performance, schema.org). Nous proposons également des prestations SEO avancées : audit, optimisation, contenus, suivi des positions, SEO local Rouen.",
      },
      {
        question: "Fournissez-vous l'hébergement ?",
        answer:
          "Nous déployons sur des infrastructures performantes comme Vercel ou AWS, et vous aidons à choisir la meilleure option pour votre cas. L'hébergement n'est pas inclus dans nos forfaits (coûts variables selon le trafic), mais nous gérons la configuration et le déploiement continu.",
      },
    ],
  },
  {
    title: "Collaboration",
    items: [
      {
        question: "Êtes-vous basés à Rouen ?",
        answer:
          "Oui, notre équipe est basée à Rouen en Normandie. Nous travaillons principalement en remote, mais nous organisons volontiers des points en présentiel pour les clients locaux. Nous intervenons dans toute la France.",
      },
      {
        question: "Puis-je modifier mon site moi-même après livraison ?",
        answer:
          "Oui, nous construisons des sites faciles à maintenir. Pour le contenu, vous avez accès à un CMS simple. Pour le code, nous fournissons une documentation complète et proposons une formation. Notre support reste disponible.",
      },
      {
        question: "Que se passe-t-il si je ne suis pas satisfait ?",
        answer:
          "Nous travaillons en itérations avec validation à chaque étape pour éviter toute mauvaise surprise. Si une étape ne convient pas, nous la retravaillons jusqu'à validation. Nous offrons une garantie de 30 jours après livraison pour toute correction.",
      },
    ],
  },
];

export default function FaqPage() {
  const allItems = FAQ_GROUPS.flatMap((g) => g.items);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <FAQSchema items={allItems} speakable />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" aria-hidden />
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow dot className="mb-8">Questions fréquentes</Eyebrow>
            <h1 className="text-display">
              Tout ce qu'il faut <em>savoir</em>.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              Vos questions les plus courantes sur notre méthode, nos délais,
              notre stack technique et notre façon de travailler.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--border)]">
        <Container size="narrow">
          <div className="py-16 md:py-24 space-y-16">
            {FAQ_GROUPS.map((group, gi) => (
              <div key={group.title}>
                <Eyebrow number={String(gi + 1).padStart(2, "0")} className="mb-6">
                  {group.title}
                </Eyebrow>
                <Accordion type="single" collapsible className="space-y-2">
                  {group.items.map((item, i) => (
                    <AccordionItem
                      key={`${gi}-${i}`}
                      value={`item-${gi}-${i}`}
                      className="border border-[var(--border)] rounded-[var(--radius)] bg-[var(--surface)] px-6 data-[state=open]:border-[var(--border-strong)]"
                    >
                      <AccordionTrigger className="text-left text-h4 hover:no-underline py-5">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-body text-[var(--muted-foreground)] pb-5 pr-8 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
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
