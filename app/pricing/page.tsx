'use client';

import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const pricingTiers = [
  {
    name: "Starter",
    icon: Sparkles,
    price: "À partir de 2 500€",
    description: "Parfait pour les petites entreprises et startups",
    features: [
      "Site vitrine responsive (5 pages)",
      "Design sur-mesure",
      "Optimisation SEO de base",
      "Formulaire de contact",
      "Hébergement 1 an offert",
      "Formation à la gestion du site",
      "Support email 3 mois",
    ],
    cta: "Commencer",
    highlighted: false,
  },
  {
    name: "Professional",
    icon: Zap,
    price: "À partir de 5 500€",
    description: "Pour les entreprises en croissance",
    features: [
      "Site web avancé (jusqu'à 15 pages)",
      "Design premium personnalisé",
      "SEO avancé et analytics",
      "Blog intégré",
      "Espace client / Dashboard",
      "Intégrations API (CRM, paiement...)",
      "Formation complète",
      "Support prioritaire 6 mois",
      "Maintenance 3 mois offerte",
    ],
    cta: "Démarrer maintenant",
    highlighted: true,
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "Sur devis",
    description: "Solutions sur-mesure pour grandes entreprises",
    features: [
      "Application web complexe",
      "Architecture scalable",
      "Design system personnalisé",
      "Intégrations multiples",
      "App mobile (iOS + Android)",
      "API REST/GraphQL",
      "Tests automatisés",
      "CI/CD et DevOps",
      "Support 24/7 dédié",
      "SLA garanti",
      "Formation équipe complète",
    ],
    cta: "Nous contacter",
    highlighted: false,
  },
];

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
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#A543F1]/5 via-transparent to-[#c5cbf9]/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A543F1]/10 border border-[#A543F1]/20 mb-6">
              <Sparkles className="w-4 h-4 text-[#A543F1]" />
              <span className="text-sm font-medium text-[#A543F1]">Tarifs transparents</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-[family-name:var(--font-heading)]">
              Des solutions pour chaque besoin
            </h1>
            <p className="text-xl text-gray-600 dark:text-white/70 mb-8 font-[family-name:var(--font-sans)]">
              Choisissez la formule qui correspond à votre projet. Tous nos tarifs incluent un accompagnement personnalisé.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingTiers.map((tier, index) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative rounded-2xl p-8 ${
                    tier.highlighted
                      ? "bg-gradient-to-br from-[#A543F1] to-[#8b35d1] text-white scale-105 shadow-2xl"
                      : "bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-[#A543F1] text-sm font-semibold rounded-full">
                      Le plus populaire
                    </div>
                  )}

                  <div className="mb-6">
                    <div className={`inline-flex p-3 rounded-xl mb-4 ${
                      tier.highlighted ? "bg-white/20" : "bg-[#A543F1]/10"
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        tier.highlighted ? "text-white" : "text-[#A543F1]"
                      }`} />
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 ${
                      tier.highlighted ? "text-white" : "text-gray-900 dark:text-white"
                    }`}>
                      {tier.name}
                    </h3>
                    <p className={`text-sm mb-4 ${
                      tier.highlighted ? "text-white/80" : "text-gray-600 dark:text-white/70"
                    }`}>
                      {tier.description}
                    </p>
                    <div className={`text-4xl font-bold mb-6 ${
                      tier.highlighted ? "text-white" : "text-gray-900 dark:text-white"
                    }`}>
                      {tier.price}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          tier.highlighted ? "text-white" : "text-[#A543F1]"
                        }`} />
                        <span className={`text-sm ${
                          tier.highlighted ? "text-white" : "text-gray-600 dark:text-white/70"
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact" className="block">
                    <Button
                      className={`w-full ${
                        tier.highlighted
                          ? "bg-white text-[#A543F1] hover:bg-white/90"
                          : ""
                      }`}
                      variant={tier.highlighted ? "default" : "outline"}
                    >
                      {tier.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-[family-name:var(--font-heading)]">
              Options supplémentaires
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/70">
              Complétez votre projet avec nos services additionnels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {addons.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-[#030303] border border-gray-200 dark:border-white/10 rounded-xl p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {addon.name}
                  </h3>
                  <span className="text-lg font-semibold text-[#A543F1]">
                    {addon.price}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-white/70">
                  {addon.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center font-[family-name:var(--font-heading)]">
              Questions fréquentes
            </h2>

            <div className="space-y-6">
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
                  className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 dark:text-white/70">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#A543F1] to-[#8b35d1] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-[family-name:var(--font-heading)]">
              Besoin d'un devis personnalisé ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Chaque projet est unique. Discutons ensemble de vos besoins pour vous proposer une solution sur-mesure.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-[#A543F1] hover:bg-white/90 text-lg px-8"
              >
                Demander un devis gratuit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
