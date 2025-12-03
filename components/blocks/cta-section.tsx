'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA
}: CTASectionProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#A543F1]/10 via-white dark:via-[#030303] to-[#c5cbf9]/10">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/60 mb-8 font-[family-name:var(--font-sans)]">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryCTA.href}>
              <Button className="bg-[#A543F1] hover:bg-[#A543F1]/90 text-white px-8 py-6 text-base shadow-lg shadow-[#A543F1]/25 hover:shadow-xl hover:shadow-[#A543F1]/30 transition-all font-[family-name:var(--font-heading)]">
                {primaryCTA.text}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            {secondaryCTA && (
              <Link href={secondaryCTA.href}>
                <Button variant="outline" className="border-gray-300 dark:border-white/[0.08] px-8 py-6 text-base font-[family-name:var(--font-heading)]">
                  {secondaryCTA.text}
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
