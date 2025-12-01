"use client";

import { motion } from "framer-motion";
import { Code, Check, ArrowRight, Rocket, Search, Gauge, Globe, Layers, Server } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Search,
    title: "SEO optimisé",
    description: "Référencement naturel optimal grâce au rendu serveur et à la génération statique"
  },
  {
    icon: Gauge,
    title: "Performance extrême",
    description: "Chargement instantané avec optimisations automatiques et code splitting intelligent"
  },
  {
    icon: Rocket,
    title: "Déploiement simple",
    description: "Mise en production en quelques clics avec Vercel ou toute plateforme cloud"
  },
  {
    icon: Globe,
    title: "CDN global",
    description: "Distribution mondiale ultra-rapide de vos pages statiques et assets"
  },
  {
    icon: Server,
    title: "Server Components",
    description: "React Server Components pour des applications full-stack performantes"
  },
  {
    icon: Layers,
    title: "App Router",
    description: "Routing moderne avec layouts imbriqués et loading states élégants"
  }
];

const useCases = [
  {
    title: "Sites e-commerce",
    description: "Boutiques en ligne ultra-rapides avec SEO parfait et expérience utilisateur optimale",
    results: ["SEO score 100/100", "Core Web Vitals parfaits", "Conversions maximisées"]
  },
  {
    title: "Plateformes SaaS",
    description: "Applications web full-stack avec authentification, bases de données et APIs intégrées",
    results: ["Full-stack TypeScript", "API routes sécurisées", "Middleware avancés"]
  },
  {
    title: "Sites corporate",
    description: "Sites vitrine et institutionnels avec performance maximale et maintenance simplifiée",
    results: ["Temps de chargement < 1s", "Score Lighthouse 95+", "CMS headless intégré"]
  }
];

const techStack = [
  { name: "Next.js 15", description: "Dernière version avec React 19 et améliorations majeures de performance" },
  { name: "App Router", description: "Architecture moderne avec layouts, loading et error boundaries" },
  { name: "Server Actions", description: "Mutations côté serveur sans API routes explicites" },
  { name: "Image Optimization", description: "Optimisation automatique des images pour tous les formats" },
  { name: "Font Optimization", description: "Chargement optimal des polices sans layout shift" },
  { name: "Incremental Static Regeneration", description: "Pages statiques avec revalidation à la demande" },
];

export default function NextJsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#030303] transition-colors pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#A543F1]/10 via-white dark:via-[#030303] to-[#c5cbf9]/10 border-b border-gray-200 dark:border-white/[0.08]">
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A543F1]/10 border border-[#A543F1]/20 mb-6">
                <Code className="w-4 h-4 text-[#A543F1]" />
                <span className="text-sm font-medium text-[#A543F1] font-[family-name:var(--font-heading)]">
                  Next.js
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-heading)]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A543F1] to-[#c5cbf9]">
                  Next.js
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  sites ultra-rapides et SEO-friendly
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-white/60 mb-8 leading-relaxed font-[family-name:var(--font-sans)]">
                Créez des sites web et applications full-stack performants avec Next.js, le framework
                React de référence pour la production.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-[#A543F1] to-[#c5cbf9] hover:from-[#9333ea] hover:to-[#a78bfa] text-white px-8 py-6 text-base font-[family-name:var(--font-heading)]">
                    Démarrer un projet
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="#avantages">
                  <Button variant="outline" className="border-gray-300 dark:border-white/[0.08] px-8 py-6 text-base font-[family-name:var(--font-heading)]">
                    Découvrir Next.js
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-[#A543F1]/20 to-[#c5cbf9]/20 rounded-2xl p-8 border border-[#A543F1]/20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#A543F1] to-[#c5cbf9] opacity-5 rounded-2xl" />
                <Rocket className="w-full h-auto text-[#A543F1] opacity-20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="avantages" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/80 font-[family-name:var(--font-heading)]">
              Pourquoi Next.js ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Le framework React qui combine performance, SEO et expérience développeur
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-6 bg-gray-50 dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.08] hover:border-[#A543F1]/50 transition-all"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#A543F1]/10 mb-4 group-hover:bg-[#A543F1]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#A543F1]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-[family-name:var(--font-heading)]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-white/60 font-[family-name:var(--font-sans)]">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/80 font-[family-name:var(--font-heading)]">
              Notre expertise Next.js
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Maîtrise complète des fonctionnalités avancées pour des applications optimales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-white/[0.02] rounded-xl border border-gray-200 dark:border-white/[0.08]"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-[family-name:var(--font-heading)]">
                  {tech.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-white/60 font-[family-name:var(--font-sans)]">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/80 font-[family-name:var(--font-heading)]">
              Projets Next.js réalisés
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Des sites Next.js qui propulsent le business de nos clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-gray-50 dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.08]"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-[family-name:var(--font-heading)]">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 dark:text-white/60 mb-6 font-[family-name:var(--font-sans)]">
                  {useCase.description}
                </p>
                <div className="space-y-2">
                  {useCase.results.map((result, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#A543F1]" />
                      <span className="text-sm text-gray-700 dark:text-white/70 font-[family-name:var(--font-sans)]">
                        {result}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-[#A543F1] to-[#c5cbf9] p-8 md:p-12 rounded-2xl text-white text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-heading)]">
              Prêt à créer un site performant ?
            </h2>
            <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto font-[family-name:var(--font-sans)]">
              Développons ensemble un site Next.js rapide, optimisé SEO et qui convertit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-[#A543F1] hover:bg-white/90 px-8 py-6 text-base font-[family-name:var(--font-heading)]">
                  Obtenir un devis gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-base font-[family-name:var(--font-heading)]">
                  Voir nos services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
