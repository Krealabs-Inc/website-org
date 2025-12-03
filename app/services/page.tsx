"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Code,
  Smartphone,
  Zap,
  Shield,
  Users,
  Check,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/blocks/cta-section";

const services = [
  {
    id: "design-uiux",
    icon: Palette,
    title: "Design UI/UX",
    tagline: "Des interfaces qui convertissent",
    description: "Nous créons des expériences utilisateur mémorables qui allient esthétique et performance. Notre approche design-first garantit des interfaces intuitives et accessibles.",
    features: [
      "Maquettes Figma haute fidélité",
      "Design System personnalisé",
      "Prototypage interactif",
      "Tests utilisateurs",
      "Accessibilité WCAG 2.1",
      "Responsive design",
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "Framer"],
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    id: "developpement-web",
    icon: Code,
    title: "Développement Web",
    tagline: "Applications web modernes et performantes",
    description: "Nous développons des applications web robustes avec les technologies les plus récentes. Performance, scalabilité et maintenabilité sont au coeur de notre approche.",
    features: [
      "React et Next.js 15",
      "TypeScript strict",
      "Server Components",
      "API REST et GraphQL",
      "Authentification sécurisée",
      "Déploiement continu",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "applications-mobile",
    icon: Smartphone,
    title: "Applications Mobile",
    tagline: "iOS et Android avec une seule codebase",
    description: "Développement d'applications mobiles cross-platform avec React Native. Performance native, code partagé, maintenance simplifiée.",
    features: [
      "React Native et Expo",
      "Performance native",
      "Push notifications",
      "Offline-first",
      "App Store et Play Store",
      "Updates OTA",
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Firebase"],
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "performance-seo",
    icon: Zap,
    title: "Performance & SEO",
    tagline: "Optimisation pour les moteurs de recherche",
    description: "Audit complet et optimisation de vos Core Web Vitals pour un meilleur référencement. Temps de chargement réduit, score Lighthouse optimisé.",
    features: [
      "Audit Lighthouse complet",
      "Optimisation Core Web Vitals",
      "SEO technique avancé",
      "Schéma.org et rich snippets",
      "Sitemap et robots.txt",
      "Analytics et tracking",
    ],
    technologies: ["Google Analytics", "Search Console", "Lighthouse", "PageSpeed"],
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    id: "consulting",
    icon: Users,
    title: "Conseil & Accompagnement",
    tagline: "Expertise technique à vos côtés",
    description: "Accompagnement sur vos projets techniques : architecture, choix technologiques, code review, formation de vos équipes.",
    features: [
      "Audit de code",
      "Architecture logicielle",
      "Choix technologiques",
      "Formation des équipes",
      "Code review",
      "Mentorat technique",
    ],
    technologies: ["Best practices", "Clean Code", "Architecture"],
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    id: "maintenance",
    icon: Shield,
    title: "Maintenance & Support",
    tagline: "Votre application entre de bonnes mains",
    description: "Maintenance préventive et corrective de vos applications. Mises à jour de sécurité, monitoring 24/7, support technique réactif.",
    features: [
      "Monitoring 24/7",
      "Mises à jour de sécurité",
      "Corrections de bugs",
      "Optimisations continues",
      "Backup automatisé",
      "Support technique",
    ],
    technologies: ["Vercel", "AWS", "Docker", "Kubernetes"],
    color: "from-red-500 to-rose-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    iconColor: "text-red-600 dark:text-red-400",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#030303] transition-colors pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#A543F1]/10 via-white dark:via-[#030303] to-[#c5cbf9]/10 border-b border-gray-200 dark:border-white/[0.08]">
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A543F1]/10 border border-[#A543F1]/20 mb-6">
              <span className="text-sm font-medium text-[#A543F1] font-[family-name:var(--font-heading)]">
                Nos Services
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-heading)]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A543F1] to-[#c5cbf9]">
                Expertise complète
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                en développement digital
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              De la conception à la mise en production, nous vous accompagnons à chaque étape de votre projet digital.
              Design, développement, performance et maintenance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Cards Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const hasDetailPage = ["design-uiux", "developpement-web", "applications-mobile", "performance-seo"].includes(service.id);

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative h-full bg-gray-50 dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.08] hover:border-[#A543F1]/50 transition-all overflow-hidden">
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                    <div className="relative p-8 flex flex-col h-full">
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${service.bgColor} mb-6`}>
                        <Icon className={`w-7 h-7 ${service.iconColor}`} />
                      </div>

                      {/* Title and Tagline */}
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-[family-name:var(--font-heading)]">
                        {service.title}
                      </h2>
                      <p className="text-[#A543F1] font-medium mb-4 text-sm font-[family-name:var(--font-heading)]">
                        {service.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-white/60 leading-relaxed mb-6 font-[family-name:var(--font-sans)]">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6 flex-1">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-3 font-[family-name:var(--font-heading)]">
                          Points clés
                        </h3>
                        <ul className="space-y-2">
                          {service.features.slice(0, 4).map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-[#A543F1] flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700 dark:text-white/70 font-[family-name:var(--font-sans)]">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 text-xs font-medium rounded-full bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-white/70 font-[family-name:var(--font-mono)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      {hasDetailPage ? (
                        <Link href={`/services/${service.id}`}>
                          <Button
                            variant="outline"
                            className="w-full border-gray-300 dark:border-white/[0.08] hover:border-[#A543F1] hover:bg-[#A543F1]/5 group-hover:border-[#A543F1] transition-colors font-[family-name:var(--font-heading)]"
                          >
                            En savoir plus
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      ) : (
                        <Link href="/contact">
                          <Button
                            variant="outline"
                            className="w-full border-gray-300 dark:border-white/[0.08] hover:border-[#A543F1] hover:bg-[#A543F1]/5 group-hover:border-[#A543F1] transition-colors font-[family-name:var(--font-heading)]"
                          >
                            Nous contacter
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
              Des résultats concrets
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 font-[family-name:var(--font-sans)]">
              Notre expertise au service de votre réussite
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Projets livrés", subtext: "avec succès" },
              { value: "100%", label: "Satisfaction client", subtext: "garantie" },
              { value: "95+", label: "Score Lighthouse", subtext: "en moyenne" },
              { value: "24/7", label: "Support disponible", subtext: "pour nos clients" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-white dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.08] hover:border-[#A543F1]/30 transition-all"
              >
                <div className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A543F1] to-[#c5cbf9] mb-2 font-[family-name:var(--font-heading)]">
                  {stat.value}
                </div>
                <div className="text-gray-900 dark:text-white font-semibold mb-1 font-[family-name:var(--font-heading)]">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-white/60 font-[family-name:var(--font-sans)]">
                  {stat.subtext}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
              Notre méthodologie
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
              Un processus éprouvé pour garantir la réussite de votre projet
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Analyse", description: "Audit de vos besoins et définition des objectifs" },
              { step: "02", title: "Conception", description: "Design et architecture de la solution" },
              { step: "03", title: "Développement", description: "Réalisation avec méthode agile" },
              { step: "04", title: "Déploiement", description: "Mise en production et suivi continu" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-[#A543F1]/10 dark:text-[#A543F1]/20 mb-4 font-[family-name:var(--font-heading)]">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-[family-name:var(--font-heading)]">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-white/60 font-[family-name:var(--font-sans)]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Prêt à démarrer votre projet ?"
        description="Discutons de vos besoins et trouvons ensemble la solution idéale pour votre projet digital."
        primaryCTA={{
          text: "Contactez-nous",
          href: "/contact"
        }}
        secondaryCTA={{
          text: "Voir nos articles",
          href: "/blog"
        }}
      />
    </main>
  );
}
