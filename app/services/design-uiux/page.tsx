"use client";

import { motion } from "framer-motion";
import { Palette, Check, ArrowRight, Sparkles, Users, Eye, Accessibility, Layers, Figma } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Sparkles,
    title: "Design System complet",
    description: "Création de design systems évolutifs avec composants réutilisables et documentation"
  },
  {
    icon: Users,
    title: "Recherche utilisateur",
    description: "Analyse des besoins, personas, parcours utilisateur et tests d'utilisabilité"
  },
  {
    icon: Eye,
    title: "Prototypage interactif",
    description: "Prototypes haute-fidélité avec animations et interactions pour valider le concept"
  },
  {
    icon: Accessibility,
    title: "Accessibilité WCAG 2.1",
    description: "Interfaces conformes aux normes d'accessibilité pour tous les utilisateurs"
  },
  {
    icon: Layers,
    title: "Design responsive",
    description: "Adaptation parfaite sur mobile, tablette et desktop avec breakpoints optimisés"
  },
  {
    icon: Figma,
    title: "Collaboration temps réel",
    description: "Travail collaboratif sur Figma avec versioning et commentaires intégrés"
  }
];

const tools = [
  { name: "Figma", description: "Design et prototypage collaboratif en temps réel" },
  { name: "Adobe XD", description: "Design d'expérience et wireframing avancé" },
  { name: "Sketch", description: "Design d'interfaces pour écosystème Apple" },
  { name: "Framer", description: "Prototypage interactif avec code React" },
  { name: "Principle", description: "Animations et micro-interactions natives" },
  { name: "Zeplin", description: "Handoff développeur avec spécifications CSS" },
];

const processSteps = [
  {
    number: "01",
    title: "Audit et recherche",
    description: "Audit de l'existant, analyse concurrentielle, définition des personas et parcours utilisateurs types.",
    duration: "1-2 semaines"
  },
  {
    number: "02",
    title: "Wireframes et architecture",
    description: "Création de wireframes low-fi, architecture de l'information et flux utilisateurs.",
    duration: "1-2 semaines"
  },
  {
    number: "03",
    title: "Design visuel",
    description: "Charte graphique, maquettes haute-fidélité, iconographie et identité visuelle.",
    duration: "3-4 semaines"
  },
  {
    number: "04",
    title: "Prototypage et tests",
    description: "Création de prototypes interactifs, tests utilisateurs et itérations basées sur les retours.",
    duration: "2-3 semaines"
  },
  {
    number: "05",
    title: "Design system",
    description: "Documentation complète, bibliothèque de composants, guidelines et variables design tokens.",
    duration: "2-3 semaines"
  },
  {
    number: "06",
    title: "Handoff développement",
    description: "Spécifications techniques, assets exportés, accompagnement des développeurs.",
    duration: "1 semaine"
  }
];

const projects = [
  {
    title: "App bancaire",
    description: "Refonte complète de l'expérience mobile avec dashboard intuitif et onboarding simplifié",
    results: ["NPS +45 points", "Adoption 89%", "Temps de tâche -60%"]
  },
  {
    title: "Plateforme e-learning",
    description: "Interface d'apprentissage moderne avec gamification et suivi de progression",
    results: ["Engagement +120%", "Taux de complétion 78%", "Satisfaction 4.7/5"]
  },
  {
    title: "Dashboard analytics",
    description: "Visualisation de données complexes avec graphiques interactifs et filtres avancés",
    results: ["Prise de décision -40%", "Erreurs -75%", "Productivité +50%"]
  }
];

const principles = [
  {
    title: "User-centric",
    description: "L'utilisateur au centre de chaque décision de design"
  },
  {
    title: "Simplicité",
    description: "Des interfaces épurées et intuitives qui vont à l'essentiel"
  },
  {
    title: "Cohérence",
    description: "Design system unifié pour une expérience homogène"
  },
  {
    title: "Accessibilité",
    description: "Interfaces utilisables par tous, sans discrimination"
  }
];

export default function DesignUIUXPage() {
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
                <Palette className="w-4 h-4 text-[#A543F1] dark:text-[#A543F1]" />
                <span className="text-sm font-medium text-[#A543F1] dark:text-[#A543F1] font-[family-name:var(--font-heading)]">
                  Design UI/UX
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-heading)]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A543F1] to-[#c5cbf9] dark:from-[#A543F1] dark:to-[#c5cbf9]">
                  Des interfaces
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  qui convertissent
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-white/60 mb-8 leading-relaxed font-[family-name:var(--font-sans)]">
                Nous créons des expériences utilisateur mémorables qui allient esthétique et performance.
                Notre approche design-first garantit des interfaces intuitives et accessibles.
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
                <Palette className="w-full h-auto text-[#A543F1] dark:text-[#A543F1] opacity-20" strokeWidth={1} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
              Nos principes de design
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Les valeurs qui guident chacune de nos créations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-white dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.08]"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-[family-name:var(--font-heading)]">
                  {principle.title}
                </h3>
                <p className="text-gray-600 dark:text-white/60 font-[family-name:var(--font-sans)]">
                  {principle.description}
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
              Notre expertise design
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              De la recherche utilisateur au design system, nous couvrons tous les aspects du design UX/UI
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

      {/* Tools Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
              Nos outils de design
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Les meilleurs logiciels pour créer des interfaces exceptionnelles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-white/[0.02] rounded-xl border border-gray-200 dark:border-white/[0.08]"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-[family-name:var(--font-heading)]">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-white/60 font-[family-name:var(--font-sans)]">
                  {tool.description}
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
              De l'idée au design final
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Notre méthodologie éprouvée pour créer des interfaces qui enchantent vos utilisateurs
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
              Designs qui performent
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Des interfaces qui ont transformé l'expérience de milliers d'utilisateurs
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
              Créons une interface exceptionnelle
            </h2>
            <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto font-[family-name:var(--font-sans)]">
              Transformez votre vision en expérience utilisateur mémorable avec notre expertise design.
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
