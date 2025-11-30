"use client";

import { motion } from "framer-motion";
import { Zap, Check, ArrowRight, TrendingUp, Search, Target, Gauge, LineChart, FileSearch } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Gauge,
    title: "Core Web Vitals",
    description: "Optimisation LCP, FID, CLS pour des scores Lighthouse 95+ et meilleur classement Google"
  },
  {
    icon: Search,
    title: "SEO technique avancé",
    description: "Optimisation crawl, indexation, schema.org, meta tags et sitemap pour référencement optimal"
  },
  {
    icon: TrendingUp,
    title: "Performance web",
    description: "Temps de chargement ultra-rapides avec lazy loading, code splitting et compression"
  },
  {
    icon: Target,
    title: "SEO sémantique",
    description: "Optimisation du contenu, maillage interne et balises structurées pour pertinence maximale"
  },
  {
    icon: LineChart,
    title: "Analytics et suivi",
    description: "Google Analytics 4, Search Console et rapports détaillés pour mesurer les performances"
  },
  {
    icon: FileSearch,
    title: "Audit complet",
    description: "Analyse approfondie technique, on-page et off-page avec plan d'action détaillé"
  }
];

const metrics = [
  { name: "Lighthouse Performance", description: "Score de performance global de votre site" },
  { name: "LCP (Largest Contentful Paint)", description: "Temps de chargement du contenu principal" },
  { name: "FID (First Input Delay)", description: "Réactivité aux interactions utilisateur" },
  { name: "CLS (Cumulative Layout Shift)", description: "Stabilité visuelle pendant le chargement" },
  { name: "TTI (Time to Interactive)", description: "Temps avant interaction complète" },
  { name: "Speed Index", description: "Vitesse d'affichage du contenu visible" },
];

const processSteps = [
  {
    number: "01",
    title: "Audit initial complet",
    description: "Analyse Lighthouse, PageSpeed Insights, Search Console et audit technique SEO approfondi.",
    duration: "3-5 jours"
  },
  {
    number: "02",
    title: "Identification des bottlenecks",
    description: "Détection des problèmes de performance, erreurs SEO et opportunités d'optimisation.",
    duration: "2-3 jours"
  },
  {
    number: "03",
    title: "Plan d'optimisation",
    description: "Création d'une roadmap priorisée avec quick wins et optimisations structurelles.",
    duration: "1-2 jours"
  },
  {
    number: "04",
    title: "Optimisations techniques",
    description: "Implémentation des optimisations : images, fonts, code, caching, CDN et compression.",
    duration: "2-4 semaines"
  },
  {
    number: "05",
    title: "Optimisation SEO",
    description: "Meta tags, schema.org, sitemap, robots.txt, canonical et optimisation du contenu.",
    duration: "1-2 semaines"
  },
  {
    number: "06",
    title: "Monitoring continu",
    description: "Mise en place de monitoring automatique avec alertes et rapports mensuels.",
    duration: "Continue"
  }
];

const projects = [
  {
    title: "E-commerce mode",
    description: "Optimisation complète d'une boutique avec 10K+ produits et fort trafic",
    results: ["Score Lighthouse 98", "Trafic organique +180%", "Temps de chargement -70%"]
  },
  {
    title: "Blog tech",
    description: "Amélioration SEO et performance pour augmenter la visibilité et l'engagement",
    results: ["Top 3 Google sur 50+ mots-clés", "Sessions +250%", "Taux de rebond -45%"]
  },
  {
    title: "SaaS B2B",
    description: "Optimisation d'une application complexe avec dashboard temps réel",
    results: ["FCP < 1s", "Lead qualifiés +120%", "Core Web Vitals vert"]
  }
];

const optimizations = [
  {
    category: "Images",
    techniques: ["WebP/AVIF", "Lazy loading", "Responsive images", "Compression"]
  },
  {
    category: "Code",
    techniques: ["Code splitting", "Tree shaking", "Minification", "Bundle analysis"]
  },
  {
    category: "Réseau",
    techniques: ["CDN", "HTTP/2", "Compression Brotli", "Preload/Prefetch"]
  },
  {
    category: "Cache",
    techniques: ["Service Worker", "Cache headers", "Redis", "CDN cache"]
  }
];

export default function PerformanceSEOPage() {
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
                <Zap className="w-4 h-4 text-[#A543F1] dark:text-[#A543F1]" />
                <span className="text-sm font-medium text-[#A543F1] dark:text-[#A543F1] font-[family-name:var(--font-heading)]">
                  Performance & SEO
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-heading)]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A543F1] to-[#c5cbf9] dark:from-[#A543F1] dark:to-[#c5cbf9]">
                  Optimisation pour
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  les moteurs de recherche
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-white/60 mb-8 leading-relaxed font-[family-name:var(--font-sans)]">
                Audit complet et optimisation de vos Core Web Vitals pour un meilleur référencement.
                Temps de chargement réduit, score Lighthouse optimisé, visibilité maximale.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-[#A543F1] to-[#c5cbf9] hover:from-[#9333ea] hover:to-[#a78bfa] text-white px-8 py-6 text-base font-[family-name:var(--font-heading)]">
                    Audit gratuit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="#processus">
                  <Button variant="outline" className="border-gray-300 dark:border-white/[0.08] px-8 py-6 text-base font-[family-name:var(--font-heading)]">
                    Notre méthode
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
                <TrendingUp className="w-full h-auto text-[#A543F1] dark:text-[#A543F1] opacity-20" strokeWidth={1} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
              Métriques que nous optimisons
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Les indicateurs clés de Google qui impactent directement votre référencement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-white/[0.02] rounded-xl border border-gray-200 dark:border-white/[0.08]"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-[family-name:var(--font-mono)]">
                  {metric.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-white/60 font-[family-name:var(--font-sans)]">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
              Notre expertise complète
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Performance web et SEO technique pour propulser votre site en première page
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
                    <Icon className="w-6 h-6 text-[#A543F1] dark:text-[#A543F1]" />
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

      {/* Optimizations Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
              Techniques d'optimisation
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Les optimisations que nous implémentons pour maximiser la performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {optimizations.map((opt, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.08]"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 font-[family-name:var(--font-heading)]">
                  {opt.category}
                </h3>
                <div className="space-y-2">
                  {opt.techniques.map((technique, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#A543F1] dark:text-[#A543F1] flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-white/70 font-[family-name:var(--font-sans)]">
                        {technique}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="processus" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
              Notre méthode d'optimisation
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Un processus structuré pour des résultats mesurables et durables
            </p>
          </div>

          <div className="grid gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="flex flex-col md:flex-row gap-6 p-8 bg-gray-50 dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.08] hover:border-[#A543F1]/50 transition-all">
                  <div className="flex-shrink-0">
                    <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-[#A543F1] to-[#c5cbf9] dark:from-[#A543F1] dark:to-[#c5cbf9] font-[family-name:var(--font-heading)]">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
                        {step.title}
                      </h3>
                      <span className="text-sm font-medium text-[#A543F1] dark:text-[#A543F1] bg-[#A543F1]/10 px-3 py-1 rounded-full font-[family-name:var(--font-mono)]">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-white/60 leading-relaxed font-[family-name:var(--font-sans)]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
              Résultats concrets
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Des optimisations qui ont transformé les performances de nos clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-white dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.08]"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-[family-name:var(--font-heading)]">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-white/60 mb-6 font-[family-name:var(--font-sans)]">
                  {project.description}
                </p>
                <div className="space-y-2">
                  {project.results.map((result, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#A543F1] dark:text-[#A543F1]" />
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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-[#A543F1] to-[#c5cbf9] p-8 md:p-12 rounded-2xl text-white text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-heading)]">
              Boostez vos performances
            </h2>
            <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto font-[family-name:var(--font-sans)]">
              Obtenez un audit gratuit et découvrez comment améliorer vos Core Web Vitals et votre référencement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-[#A543F1] hover:bg-white/90 px-8 py-6 text-base font-[family-name:var(--font-heading)]">
                  Audit gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-base font-[family-name:var(--font-heading)]">
                  Voir nos articles
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
