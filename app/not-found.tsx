"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#030303] transition-colors flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Number */}
          <div className="relative mb-8">
            <h1 className="text-[150px] md:text-[200px] font-bold leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#A543F1] to-[#c5cbf9]">
              404
            </h1>
            <div className="absolute inset-0 blur-3xl opacity-30">
              <div className="w-full h-full bg-gradient-to-r from-[#A543F1] to-[#c5cbf9]" />
            </div>
          </div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
              Page introuvable
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 mb-8 font-[family-name:var(--font-sans)]">
              Oups ! La page que vous recherchez n'existe pas ou a ete deplacee.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/">
              <Button className="bg-[#A543F1] hover:bg-[#A543F1]/90 text-white px-6 py-6 text-base">
                <Home className="w-5 h-5 mr-2" />
                Retour a l'accueil
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" className="border-gray-300 dark:border-white/[0.08] px-6 py-6 text-base">
                <Search className="w-5 h-5 mr-2" />
                Voir le blog
              </Button>
            </Link>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 p-6 bg-gray-50 dark:bg-white/[0.02] rounded-xl border border-gray-200 dark:border-white/[0.08]"
          >
            <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">
              Pages populaires
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/#services"
                className="text-sm text-gray-600 dark:text-white/60 hover:text-[#A543F1] transition-colors"
              >
                Services
              </Link>
              <span className="text-gray-300 dark:text-white/20">•</span>
              <Link
                href="/blog"
                className="text-sm text-gray-600 dark:text-white/60 hover:text-[#A543F1] transition-colors"
              >
                Blog
              </Link>
              <span className="text-gray-300 dark:text-white/20">•</span>
              <Link
                href="/changelog"
                className="text-sm text-gray-600 dark:text-white/60 hover:text-[#A543F1] transition-colors"
              >
                Changelog
              </Link>
              <span className="text-gray-300 dark:text-white/20">•</span>
              <Link
                href="/contact"
                className="text-sm text-gray-600 dark:text-white/60 hover:text-[#A543F1] transition-colors"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
