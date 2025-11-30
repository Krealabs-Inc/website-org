"use client";

import { motion } from "framer-motion";
import { Smartphone, Check, ArrowRight, Zap, Bell, CloudOff, AppWindow, Users, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Smartphone,
    title: "Cross-platform natif",
    description: "Une seule codebase React Native pour iOS et Android avec performance native garantie"
  },
  {
    icon: Zap,
    title: "Performance optimale",
    description: "60 FPS garantis avec optimisations natives et bundle size réduit au minimum"
  },
  {
    icon: Bell,
    title: "Push notifications",
    description: "Notifications push personnalisées avec Firebase Cloud Messaging et deep linking"
  },
  {
    icon: CloudOff,
    title: "Mode offline",
    description: "Applications fonctionnelles sans connexion avec synchronisation intelligente"
  },
  {
    icon: AppWindow,
    title: "UI native",
    description: "Composants natifs iOS et Android pour une expérience utilisateur parfaite"
  },
  {
    icon: Download,
    title: "OTA Updates",
    description: "Mises à jour instantanées sans passer par les stores grâce à Expo Updates"
  }
];

const technologies = [
  { name: "React Native", description: "Framework cross-platform avec performance native" },
  { name: "Expo", description: "Toolchain moderne pour développement et déploiement rapide" },
  { name: "TypeScript", description: "Typage statique pour un code robuste et maintenable" },
  { name: "Firebase", description: "Backend cloud pour auth, database et push notifications" },
  { name: "Redux Toolkit", description: "State management prédictible et performant" },
  { name: "React Navigation", description: "Navigation fluide avec transitions natives" },
];

const processSteps = [
  {
    number: "01",
    title: "Conception mobile-first",
    description: "Analyse des besoins mobiles spécifiques, définition de l'architecture et des fonctionnalités natives nécessaires.",
    duration: "1-2 semaines"
  },
  {
    number: "02",
    title: "Design natif",
    description: "Création de maquettes respectant les guidelines iOS (Human Interface) et Android (Material Design).",
    duration: "2-3 semaines"
  },
  {
    number: "03",
    title: "Développement cross-platform",
    description: "Développement avec React Native et Expo, tests sur simulateurs et appareils réels iOS et Android.",
    duration: "6-12 semaines"
  },
  {
    number: "04",
    title: "Tests et optimisation",
    description: "Tests fonctionnels, tests de performance, optimisation de la batterie et du réseau.",
    duration: "2-3 semaines"
  },
  {
    number: "05",
    title: "Publication sur les stores",
    description: "Soumission sur App Store et Google Play Store avec gestion des métadonnées et screenshots.",
    duration: "1-2 semaines"
  },
  {
    number: "06",
    title: "Maintenance et évolutions",
    description: "Mises à jour OTA, nouvelles fonctionnalités, support des nouvelles versions iOS/Android.",
    duration: "Continue"
  }
];

const projects = [
  {
    title: "App de fitness",
    description: "Application de suivi d'entraînement avec plans personnalisés, tracking GPS et coaching",
    results: ["50K+ téléchargements", "Note 4.8/5", "Engagement quotidien 65%"]
  },
  {
    title: "Marketplace local",
    description: "Application de vente entre particuliers avec messagerie, paiement et livraison",
    results: ["100K+ utilisateurs", "10M€ de transactions", "Temps de chargement < 2s"]
  },
  {
    title: "App de réservation",
    description: "Plateforme de réservation de services avec calendrier, paiement et notifications",
    results: ["30K+ réservations/mois", "Disponibilité 99.9%", "Satisfaction 92%"]
  }
];

const platforms = [
  {
    name: "iOS",
    description: "App Store",
    features: ["Swift UI components", "Apple Pay", "HealthKit", "Push Notifications"]
  },
  {
    name: "Android",
    description: "Google Play",
    features: ["Material Design 3", "Google Pay", "WorkManager", "Firebase"]
  }
];

export default function ApplicationsMobilePage() {
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
                <Smartphone className="w-4 h-4 text-[#A543F1] dark:text-[#A543F1]" />
                <span className="text-sm font-medium text-[#A543F1] dark:text-[#A543F1] font-[family-name:var(--font-heading)]">
                  Applications Mobile
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-heading)]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A543F1] to-[#c5cbf9] dark:from-[#A543F1] dark:to-[#c5cbf9]">
                  iOS et Android
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  avec une seule codebase
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-white/60 mb-8 leading-relaxed font-[family-name:var(--font-sans)]">
                Développement d'applications mobiles cross-platform avec React Native et Expo.
                Performance native, code partagé, maintenance simplifiée.
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
                <Smartphone className="w-full h-auto text-[#A543F1] dark:text-[#A543F1] opacity-20" strokeWidth={1} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
              Compatible iOS et Android
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Une seule application qui fonctionne parfaitement sur les deux plateformes majeures
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-white dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.08]"
              >
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-[family-name:var(--font-heading)]">
                  {platform.name}
                </h3>
                <p className="text-[#A543F1] dark:text-[#A543F1] mb-6 font-[family-name:var(--font-heading)]">
                  {platform.description}
                </p>
                <div className="space-y-3">
                  {platform.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#A543F1] dark:text-[#A543F1] flex-shrink-0" />
                      <span className="text-gray-700 dark:text-white/70 font-[family-name:var(--font-sans)]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
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
              Fonctionnalités avancées
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Des applications mobiles riches en fonctionnalités avec expérience native
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
              Stack technique moderne
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Les meilleures technologies pour créer des applications mobiles performantes
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
              De l'idée au App Store
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Un processus éprouvé pour publier votre application sur les stores
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
              Applications développées
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Des applications mobiles qui cartonnent sur les stores
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
              Lancez votre application mobile
            </h2>
            <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto font-[family-name:var(--font-sans)]">
              Transformez votre idée en application iOS et Android disponible sur les stores.
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
