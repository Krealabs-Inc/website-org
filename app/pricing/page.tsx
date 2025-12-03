'use client';

import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/blocks/cta-section";

const addons = [
  {
    name: "Application Mobile",
    price: "À partir de 8 000€",
    description: "App native iOS et Android avec React Native",
  },
  {
    name: "E-commerce",
    price: "À partir de 3 500€",
    description: "Boutique en ligne avec paiement sécurisé",
  },
  {
    name: "Maintenance mensuelle",
    price: "À partir de 350€/mois",
    description: "Mises à jour, sécurité et support continu",
  },
  {
    name: "SEO Premium",
    price: "À partir de 1 200€",
    description: "Optimisation avancée pour le référencement",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#030303] transition-colors pt-20">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#A543F1]/5 via-transparent to-[#c5cbf9]/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A543F1]/10 border border-[#A543F1]/20 mb-4">
              <Sparkles className="w-4 h-4 text-[#A543F1]" />
              <span className="text-sm font-medium text-[#A543F1]">Tarifs transparents</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-[family-name:var(--font-heading)]">
              Des solutions pour chaque besoin
            </h1>
            <p className="text-lg text-gray-600 dark:text-white/70 font-[family-name:var(--font-sans)]">
              Choisissez la formule qui correspond à votre projet. Tous nos tarifs incluent un accompagnement personnalisé.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 md:py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-5xl"
          >
            <div className="bg-white dark:bg-[#0a0a0a] relative rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl shadow-zinc-950/5">
              <div className="grid items-center gap-8 divide-y divide-gray-200 dark:divide-white/10 p-8 md:p-10 md:grid-cols-2 md:divide-x md:divide-y-0">
                {/* Left Side - Price & CTA */}
                <div className="pb-8 text-center md:pb-0 md:pr-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
                    Solutions sur mesure
                  </h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-white/70">
                    Pour votre entreprise, quelle que soit sa taille
                  </p>
                  <div className="my-8">
                    <span className="inline-block text-5xl font-bold text-gray-900 dark:text-white">
                      <span className="text-3xl">À partir de </span>2 500€
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-[#A543F1] hover:bg-[#8b35d1] text-white"
                    >
                      <Link href="/contact">
                        Demander un devis
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>

                  <p className="text-gray-600 dark:text-white/70 mt-8 text-xs">
                    Inclus : Sécurité, Hébergement, Support, SEO
                  </p>
                </div>

                {/* Right Side - Features */}
                <div className="relative md:pl-8">
                  <ul role="list" className="space-y-3">
                    {[
                      'Design sur-mesure et responsive',
                      'Architecture scalable et performante',
                      'Optimisation SEO avancée',
                      'Intégrations API multiples',
                      'Formation et accompagnement complet',
                      'Support prioritaire et maintenance',
                      'Applications web et mobiles',
                      'Tests automatisés et CI/CD'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="size-4 text-[#A543F1] flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-white/70">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-gray-600 dark:text-white/70 mt-6 text-xs">
                    Des startups innovantes aux grandes entreprises nous font confiance
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 opacity-60 dark:opacity-40">
                    <img
                      className="h-4 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/nvidia.svg"
                      alt="Client Logo"
                      height="16"
                      width="auto"
                    />
                    <img
                      className="h-3 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/column.svg"
                      alt="Client Logo"
                      height="12"
                      width="auto"
                    />
                    <img
                      className="h-3 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/github.svg"
                      alt="Client Logo"
                      height="12"
                      width="auto"
                    />
                    <img
                      className="h-4 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/nike.svg"
                      alt="Client Logo"
                      height="16"
                      width="auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 font-[family-name:var(--font-heading)]">
              Options supplémentaires
            </h2>
            <p className="text-base text-gray-600 dark:text-white/70">
              Complétez votre projet avec nos services additionnels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {addons.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-[#030303] border border-gray-200 dark:border-white/10 rounded-xl p-5"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {addon.name}
                  </h3>
                  <span className="text-base font-semibold text-[#A543F1]">
                    {addon.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-white/70">
                  {addon.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center font-[family-name:var(--font-heading)]">
              Questions fréquentes
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Les prix incluent-ils l'hébergement ?",
                  a: "Oui, tous nos forfaits incluent 1 an d'hébergement offert sur des serveurs performants et sécurisés.",
                },
                {
                  q: "Proposez-vous des facilités de paiement ?",
                  a: "Oui, nous proposons un paiement en plusieurs fois sans frais pour les projets supérieurs à 3 000€.",
                },
                {
                  q: "Quel est le délai de réalisation ?",
                  a: "Le délai varie selon la complexité : 2-4 semaines pour un site vitrine, 6-12 semaines pour un projet complexe.",
                },
                {
                  q: "Puis-je modifier mon site après livraison ?",
                  a: "Absolument ! Nous vous formons à la gestion autonome de votre site et restons disponibles pour vos évolutions.",
                },
                {
                  q: "Que se passe-t-il après la période de support ?",
                  a: "Vous pouvez souscrire à notre forfait de maintenance mensuel ou nous solliciter ponctuellement selon vos besoins.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-xl p-5"
                >
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-white/70">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Besoin d'un devis personnalisé ?"
        description="Chaque projet est unique. Discutons ensemble de vos besoins pour vous proposer une solution sur-mesure."
        primaryCTA={{
          text: "Demander un devis gratuit",
          href: "/contact"
        }}
        secondaryCTA={{
          text: "Voir nos réalisations",
          href: "/clients"
        }}
      />
    </main>
  );
}
