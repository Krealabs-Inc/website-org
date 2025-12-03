'use client';

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function BlogHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Développement", "Design", "Performance", "IA", "Mobile"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full relative bg-gradient-to-br from-[#A543F1]/10 via-white dark:via-[#030303] to-[#c5cbf9]/10 border-b border-gray-200 dark:border-white/[0.08]">
      <div className="container mx-auto px-4">
        <div className="flex gap-4 py-12 md:py-16 items-center justify-center flex-col">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A543F1]/10 border border-[#A543F1]/20">
              <Sparkles className="w-4 h-4 text-[#A543F1]" />
              <span className="text-sm font-medium text-[#A543F1] font-[family-name:var(--font-heading)]">
                Blog
              </span>
            </div>
          </div>

          <div className="flex gap-3 flex-col">
            <h1 className="text-3xl md:text-5xl max-w-3xl tracking-tight text-center font-bold font-[family-name:var(--font-heading)]">
              <span className="text-gray-900 dark:text-white">Actualités & Tutoriels</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-3 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A543F1] to-[#c5cbf9]"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed tracking-tight text-gray-600 dark:text-white/60 max-w-3xl text-center font-[family-name:var(--font-sans)]">
              Découvrez nos articles sur le développement web, mobile, le design et les dernières technologies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
