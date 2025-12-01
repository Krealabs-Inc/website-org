'use client';

import { motion } from "framer-motion";
import { Sparkles, Heart, Rocket, Users, Target, Award } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotreHistoirePage() {
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
              <span className="text-sm font-medium text-[#A543F1]">Notre Histoire</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-[family-name:var(--font-heading)]">
              Créer des expériences digitales exceptionnelles
            </h1>

            <p className="text-xl text-gray-600 dark:text-white/70 mb-8 font-[family-name:var(--font-sans)]">
              Depuis 2020, nous transformons les idées en solutions digitales innovantes et performantes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center font-[family-name:var(--font-heading)]">
              Notre Parcours
            </h2>

            <div className="space-y-12">
              {/* 2020 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex gap-8"
              >
                <div className="flex-shrink-0 w-32">
                  <div className="text-3xl font-bold text-[#A543F1]">2020</div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 dark:bg-white/[0.02] p-6 rounded-xl border border-gray-200 dark:border-white/[0.08]">
                    <div className="flex items-center gap-3 mb-3">
                      <Rocket className="w-6 h-6 text-[#A543F1]" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Le Début</h3>
                    </div>
                    <p className="text-gray-600 dark:text-white/70">
                      Fondation de Kréalabs avec une vision claire : créer des solutions web et mobile de qualité pour les entreprises innovantes. Premiers projets avec des startups locales à Rouen.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 2021 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex gap-8"
              >
                <div className="flex-shrink-0 w-32">
                  <div className="text-3xl font-bold text-[#A543F1]">2021</div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 dark:bg-white/[0.02] p-6 rounded-xl border border-gray-200 dark:border-white/[0.08]">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-6 h-6 text-[#A543F1]" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Croissance</h3>
                    </div>
                    <p className="text-gray-600 dark:text-white/70">
                      Agrandissement de l'équipe et diversification des services. Spécialisation dans React, Next.js et React Native. Collaboration avec des entreprises régionales et nationales.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 2022 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex gap-8"
              >
                <div className="flex-shrink-0 w-32">
                  <div className="text-3xl font-bold text-[#A543F1]">2022</div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 dark:bg-white/[0.02] p-6 rounded-xl border border-gray-200 dark:border-white/[0.08]">
                    <div className="flex items-center gap-3 mb-3">
                      <Target className="w-6 h-6 text-[#A543F1]" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Excellence</h3>
                    </div>
                    <p className="text-gray-600 dark:text-white/70">
                      Focus sur l'excellence technique et l'expérience utilisateur. Mise en place de processus qualité rigoureux et adoption des dernières technologies. Plus de 50 projets livrés avec succès.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 2023 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex gap-8"
              >
                <div className="flex-shrink-0 w-32">
                  <div className="text-3xl font-bold text-[#A543F1]">2023</div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 dark:bg-white/[0.02] p-6 rounded-xl border border-gray-200 dark:border-white/[0.08]">
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="w-6 h-6 text-[#A543F1]" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Innovation</h3>
                    </div>
                    <p className="text-gray-600 dark:text-white/70">
                      Intégration de l'IA dans nos processus de développement. Partenariats stratégiques avec des leaders technologiques. Reconnaissance comme agence de référence en Auvergne-Rhône-Alpes.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 2024 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex gap-8"
              >
                <div className="flex-shrink-0 w-32">
                  <div className="text-3xl font-bold text-[#A543F1]">2024</div>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-[#A543F1]/10 to-[#c5cbf9]/10 p-6 rounded-xl border border-[#A543F1]/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="w-6 h-6 text-[#A543F1]" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Aujourd'hui</h3>
                    </div>
                    <p className="text-gray-600 dark:text-white/70">
                      Consolidation de notre expertise et expansion de nos services. Accompagnement de projets d'envergure avec des technologies de pointe. L'aventure continue avec toujours la même passion !
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-[family-name:var(--font-heading)]">
                Nos Valeurs
              </h2>
              <p className="text-xl text-gray-600 dark:text-white/70 font-[family-name:var(--font-sans)]">
                Les principes qui guident chacune de nos actions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#A543F1]/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-[#A543F1]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Passion</h3>
                <p className="text-gray-600 dark:text-white/70">
                  Nous aimons ce que nous faisons et ça se voit dans chaque projet que nous livrons.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#A543F1]/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-[#A543F1]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Excellence</h3>
                <p className="text-gray-600 dark:text-white/70">
                  La qualité n'est pas négociable. Nous visons l'excellence dans chaque ligne de code.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#A543F1]/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-[#A543F1]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Collaboration</h3>
                <p className="text-gray-600 dark:text-white/70">
                  Votre succès est notre succès. Nous travaillons main dans la main avec nos clients.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-[family-name:var(--font-heading)]">
              Prêt à écrire votre histoire avec nous ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-white/70 mb-8 font-[family-name:var(--font-sans)]">
              Discutons de votre projet et découvrons comment nous pouvons vous aider à atteindre vos objectifs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#A543F1] hover:bg-[#A543F1]/90">
                <Link href="/contact">
                  Démarrer un projet
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">
                  Découvrir nos services
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
