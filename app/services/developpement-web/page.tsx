"use client";

import { motion } from "framer-motion";
import { Code, Check, ArrowRight, Zap, Shield, Smartphone, Database, Cloud, Globe, GitBranch } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Zap,
    title: "Performance optimale",
    description: "Applications ultra-rapides avec Next.js 15, React Server Components et optimisations avancées"
  },
  {
    icon: Shield,
    title: "Sécurité renforcée",
    description: "Protection contre XSS, CSRF, injections SQL avec les meilleures pratiques de sécurité"
  },
  {
    icon: Smartphone,
    title: "Responsive design",
    description: "Interfaces parfaitement adaptées à tous les écrans, du mobile au desktop"
  },
  {
    icon: Database,
    title: "API robustes",
    description: "REST et GraphQL avec authentification JWT, validation et documentation complète"
  },
  {
    icon: Cloud,
    title: "Déploiement cloud",
    description: "Infrastructure serverless sur Vercel, AWS ou Azure pour une scalabilité infinie"
  },
  {
    icon: GitBranch,
    title: "CI/CD automatisé",
    description: "Tests automatisés, code review et déploiement continu pour une qualité garantie"
  }
];

const technologies = [
  { name: "React 19", description: "Framework UI moderne avec hooks et Server Components" },
  { name: "Next.js 15", description: "Framework fullstack avec App Router et optimisations SEO" },
  { name: "TypeScript", description: "Typage statique pour un code robuste et maintenable" },
  { name: "Tailwind CSS", description: "Framework CSS utility-first pour un design rapide" },
  { name: "Prisma", description: "ORM type-safe pour PostgreSQL, MySQL ou MongoDB" },
  { name: "tRPC", description: "API end-to-end typesafe sans génération de code" },
];

const processSteps = [
  {
    number: "01",
    title: "Analyse & Planning",
    description: "Nous analysons vos besoins, définissons l'architecture technique et planifions les sprints de développement.",
    duration: "1-2 semaines"
  },
  {
    number: "02",
    title: "Design & Prototypage",
    description: "Création des maquettes UI/UX, validation du design system et prototypage interactif.",
    duration: "2-3 semaines"
  },
  {
    number: "03",
    title: "Développement",
    description: "Développement itératif avec revues de code régulières, tests automatisés et démos hebdomadaires.",
    duration: "6-12 semaines"
  },
  {
    number: "04",
    title: "Tests & Optimisation",
    description: "Tests fonctionnels, tests de performance, optimisation SEO et audit de sécurité complet.",
    duration: "2-3 semaines"
  },
  {
    number: "05",
    title: "Déploiement & Formation",
    description: "Mise en production progressive, formation de vos équipes et documentation technique complète.",
    duration: "1-2 semaines"
  },
  {
    number: "06",
    title: "Support & Maintenance",
    description: "Support technique réactif, monitoring 24/7, mises à jour de sécurité et évolutions fonctionnelles.",
    duration: "Continue"
  }
];

const projects = [
  {
    title: "Plateforme SaaS",
    description: "Application de gestion de projet avec dashboard temps réel, collaboration et facturation",
    results: ["500+ utilisateurs actifs", "99.9% uptime", "Score Lighthouse 95+"]
  },
  {
    title: "E-commerce",
    description: "Boutique en ligne avec panier intelligent, paiement sécurisé et gestion des stocks",
    results: ["2M€ de CA annuel", "+150% conversion", "Temps de chargement < 1s"]
  },
  {
    title: "Intranet entreprise",
    description: "Portail collaboratif avec SSO, gestion documentaire et workflows automatisés",
    results: ["1000+ employés", "Adoption 95%", "Productivité +30%"]
  }
];

export default function DeveloppementWebPage() {
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
                <Code className="w-4 h-4 text-[#A543F1] dark:text-[#A543F1]" />
                <span className="text-sm font-medium text-[#A543F1] dark:text-[#A543F1] font-[family-name:var(--font-heading)]">
                  Développement Web
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-heading)]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A543F1] to-[#c5cbf9] dark:from-[#A543F1] dark:to-[#c5cbf9]">
                  Applications web
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  modernes et performantes
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-white/60 mb-8 leading-relaxed font-[family-name:var(--font-sans)]">
                Nous développons des applications web robustes et scalables avec React, Next.js et TypeScript.
                Performance, sécurité et expérience utilisateur au coeur de notre approche.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-[#A543F1] to-[#c5cbf9] hover:from-[#9333ea] hover:to-[#a78bfa] text-white px-8 py-6 text-base font-[family-name:var(--font-heading)]">
                    Démarrer un projet
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="#processus">
                  <Button variant="outline" className="border-gray-300 dark:border-white/[0.08] px-8 py-6 text-base font-[family-name:var(--font-heading)]">
                    Notre processus
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
                <Globe className="w-full h-auto text-[#A543F1] dark:text-[#A543F1] opacity-20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
              Ce qui fait notre différence
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Des applications web qui allient performance technique et excellence en expérience utilisateur
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

      {/* Technologies Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
              Technologies de pointe
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Nous utilisons les technologies les plus récentes pour garantir performance et pérennité
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
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

      {/* Process Section */}
      <section id="processus" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
              Notre processus de développement
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Une méthodologie éprouvée pour transformer vos idées en applications performantes
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
              Projets réalisés
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Des applications web qui ont transformé les activités de nos clients
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
              Prêt à lancer votre projet web ?
            </h2>
            <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto font-[family-name:var(--font-sans)]">
              Discutons de vos besoins et créons ensemble une application web performante et évolutive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-[#A543F1] hover:bg-white/90 px-8 py-6 text-base font-[family-name:var(--font-heading)]">
                  Obtenir un devis gratuit
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
