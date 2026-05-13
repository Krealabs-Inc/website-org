"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";

const nav = {
  services: [
    { name: "Développement web", href: "/services/developpement-web" },
    { name: "Applications mobile", href: "/services/applications-mobile" },
    { name: "Design UI/UX", href: "/services/design-uiux" },
    { name: "Performance & SEO", href: "/services/performance-seo" },
  ],
  technologies: [
    { name: "Next.js", href: "/technologies/nextjs" },
    { name: "React Native", href: "/technologies/react-native" },
    { name: "TypeScript", href: "/technologies/typescript" },
    { name: "React", href: "/technologies/react" },
  ],
  agence: [
    { name: "Notre histoire", href: "/notre-histoire" },
    { name: "L'équipe", href: "/equipe" },
    { name: "Expertise & savoir-faire", href: "/expertise" },
    { name: "Travaux clients", href: "/clients" },
    { name: "Blog & expertise", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Mentions légales", href: "/legal/mentions-legales" },
    { name: "Confidentialité", href: "/legal/politique-confidentialite" },
    { name: "CGV", href: "/legal/cgv" },
  ],
};

const social = [
  { name: "GitHub", href: "https://github.com/krealabs", icon: Github },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/krealabs",
    icon: Linkedin,
  },
];

/**
 * Curtain-reveal footer (pattern inspiré du motion-footer easemize/21st.dev) :
 * le wrapper externe est en flow normal avec une hauteur de 100vh et un
 * clip-path rectangle. Le <footer> à l'intérieur est `position: fixed` au
 * bas du viewport mais ne s'affiche QUE dans les bounds du wrapper, grâce
 * au clip-path qui crée un nouveau contexte de clipping. Au scroll, la
 * page glisse "par-dessus" le footer fixe → effet de carte révélée.
 *
 * Animations : parallax du wordmark XXL + aurora qui respire (breathe).
 * Lenis (smooth scroll global) s'intègre nativement avec ce pattern.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end end"],
  });

  const wordmarkY = useTransform(scrollYProgress, [0, 1], ["12vh", "0vh"]);
  const wordmarkScale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full md:h-screen md:min-h-[760px]"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <footer className="relative md:fixed md:bottom-0 md:left-0 md:right-0 flex w-full flex-col overflow-hidden border-t border-[var(--border)] bg-[var(--background)] md:h-screen md:min-h-[760px]">
        {/* Aurora breathing glow — desktop only (perf mobile) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[80vw] rounded-full blur-[100px] hidden md:block animate-footer-breathe"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in oklch, var(--accent) 18%, transparent) 0%, color-mix(in oklch, var(--accent) 6%, transparent) 40%, transparent 70%)",
          }}
        />

        {/* Grid mask — visible mobile mais plus discret */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundSize: "64px 64px",
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px)",
            maskImage:
              "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
          }}
        />

        {/* Giant wordmark — desktop only (parallax + stroke + gradient clip).
            Caché sur mobile : pas de curtain reveal donc l'effet n'a pas
            de sens, et le 26vw écrasait/masquait le contenu lisible. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-[6vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap font-black tracking-[-0.05em] hidden md:block"
          style={{
            y: wordmarkY,
            scale: wordmarkScale,
            opacity: wordmarkOpacity,
            fontSize: "26vw",
            lineHeight: 0.75,
            color: "transparent",
            WebkitTextStroke:
              "1px color-mix(in oklch, var(--foreground) 6%, transparent)",
            backgroundImage:
              "linear-gradient(180deg, color-mix(in oklch, var(--foreground) 10%, transparent) 0%, transparent 60%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          krealabs
        </motion.div>

        {/* Sparkles overlay (desktop + motion-safe) */}
        <FooterSparkles />

        {/* Newsletter signup ribbon */}
        <Container className="relative z-10 pt-10 md:pt-16 lg:pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center pb-10 md:pb-16 border-b border-[var(--border)]">
            <div className="lg:col-span-5">
              <Eyebrow dot className="mb-4">Newsletter</Eyebrow>
              <h3 className="text-h3 md:text-h2">
                1 mail par mois,{" "}
                <em>zéro spam</em>.
              </h3>
              <p className="text-body-sm md:text-body text-[var(--muted-foreground)] mt-4 max-w-md">
                Articles, retours d&apos;expérience, études de cas chiffrées
                sur les projets Krealabs. Désinscription en un clic.
              </p>
            </div>
            <div className="lg:col-span-7">
              <NewsletterSignup source="footer" variant="compact" />
              <p className="text-caption mt-3">
                En vous inscrivant, vous acceptez de recevoir notre newsletter
                mensuelle. Données conformes RGPD.
              </p>
            </div>
          </div>
        </Container>

        {/* Main content — brand + link columns */}
        <Container className="relative z-10 flex flex-1 flex-col justify-end">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-8 py-10 md:py-16 lg:py-20">
            {/* Brand block */}
            <div className="lg:col-span-5 space-y-8">
              <Link
                href="/"
                className="inline-flex items-center"
                aria-label="Krealabs — Accueil"
              >
                <Image
                  src="/logo.png"
                  alt="Krealabs"
                  width={139}
                  height={87}
                  className="h-8 w-auto dark:invert-0 invert"
                />
              </Link>

              <p className="text-body text-[var(--muted-foreground)] max-w-sm">
                Agence digitale à{" "}
                <strong className="text-[var(--foreground)] font-medium">
                  Rouen
                </strong>
                . Conception et développement de sites web, applications
                mobiles et logiciels sur mesure pour les entreprises de
                Normandie.
              </p>

              {/* Address — SEO local */}
              <address className="not-italic space-y-3">
                <div className="flex items-start gap-2 text-body-sm text-[var(--muted-foreground)]">
                  <MapPin className="size-4 mt-0.5 text-[var(--accent)] shrink-0" />
                  <div>
                    <p className="text-[var(--foreground)] font-medium">
                      Krealabs
                    </p>
                    <p>Rouen, Normandie, France</p>
                  </div>
                </div>
                <a
                  href="mailto:contact@krealabs.fr"
                  className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  <Mail className="size-4 text-[var(--accent)]" />
                  contact@krealabs.fr
                </a>
              </address>

              {/* Social */}
              <div className="flex items-center gap-2">
                {social.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="size-9 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    <s.icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              <div className="space-y-4">
                <Eyebrow>Services</Eyebrow>
                <ul className="space-y-2.5">
                  {nav.services.map((l) => (
                    <li key={l.name}>
                      <Link
                        href={l.href}
                        className="text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                      >
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <Eyebrow>Technologies</Eyebrow>
                <ul className="space-y-2.5">
                  {nav.technologies.map((l) => (
                    <li key={l.name}>
                      <Link
                        href={l.href}
                        className="text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                      >
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <Eyebrow>Agence</Eyebrow>
                <ul className="space-y-2.5">
                  {nav.agence.map((l) => (
                    <li key={l.name}>
                      <Link
                        href={l.href}
                        className="text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                      >
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>

        {/* Bottom bar */}
        <div className="relative z-10 border-t border-[var(--border)]">
          <Container>
            <div className="py-5 md:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
              <p className="text-caption">
                © {year} Krealabs · Tous droits réservés · Rouen, France
              </p>
              <ul className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2">
                {nav.legal.map((l) => (
                  <li key={l.name}>
                    <Link
                      href={l.href}
                      className="text-caption hover:text-[var(--foreground)] transition-colors"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </div>
      </footer>
    </div>
  );
}

/**
 * Sparkles décoratifs (scintillement) répartis sur l'aire du footer. Hidden
 * sur mobile + motion-reduce pour respecter la contrainte anim mobile + a11y.
 */
const SPARKLES = [
  { left: "8%", top: "22%", size: 3, delay: "0s", dur: "3.2s" },
  { left: "16%", top: "55%", size: 2, delay: "1.4s", dur: "2.6s" },
  { left: "24%", top: "78%", size: 4, delay: "0.6s", dur: "3.8s" },
  { left: "32%", top: "30%", size: 2, delay: "2.1s", dur: "2.9s" },
  { left: "40%", top: "62%", size: 3, delay: "0.2s", dur: "3.4s" },
  { left: "48%", top: "18%", size: 2, delay: "1.8s", dur: "2.4s" },
  { left: "56%", top: "68%", size: 3, delay: "0.9s", dur: "3.1s" },
  { left: "64%", top: "40%", size: 4, delay: "2.6s", dur: "3.6s" },
  { left: "72%", top: "72%", size: 2, delay: "0.4s", dur: "2.7s" },
  { left: "80%", top: "26%", size: 3, delay: "1.2s", dur: "3.3s" },
  { left: "88%", top: "58%", size: 2, delay: "2.3s", dur: "2.5s" },
  { left: "94%", top: "38%", size: 3, delay: "1.6s", dur: "3.5s" },
];

function FooterSparkles() {
  return (
    <div className="hidden md:block motion-reduce:hidden absolute inset-0 z-0 pointer-events-none">
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[var(--accent)] animate-twinkle"
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: s.delay,
            animationDuration: s.dur,
            boxShadow: `0 0 ${s.size * 4}px color-mix(in srgb, var(--accent) 60%, transparent)`,
          }}
        />
      ))}
    </div>
  );
}
