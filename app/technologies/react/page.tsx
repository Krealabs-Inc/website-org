'use client';

import { motion } from "framer-motion";
import { Code, Zap, Users, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ReactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#030303] pt-20">
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#A543F1]/5 via-transparent to-[#c5cbf9]/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Développement React
            </h1>
            <p className="text-xl text-gray-600 dark:text-white/70 mb-8">
              Applications web modernes et performantes avec React
            </p>
            <Link href="/contact">
              <Button size="lg">
                Démarrer votre projet
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {[
              { icon: Zap, title: "Performance optimale", desc: "Interfaces rapides et réactives" },
              { icon: Code, title: "Code maintenable", desc: "Architecture modulaire et scalable" },
              { icon: Users, title: "UX exceptionnelle", desc: "Expériences utilisateur fluides" },
              { icon: Shield, title: "Fiabilité", desc: "Applications robustes et testées" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-xl p-6"
              >
                <item.icon className="w-12 h-12 text-[#A543F1] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-white/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#A543F1] to-[#8b35d1]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à démarrer votre projet React ?
          </h2>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-[#A543F1] hover:bg-white/90">
              Demander un devis
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
