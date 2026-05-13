import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

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
  { name: "LinkedIn", href: "https://linkedin.com/company/krealabs", icon: Linkedin },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--background)]">
      <Container>
        <div className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand block */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="inline-flex items-center" aria-label="Krealabs — Accueil">
              <Image
                src="/logo.png"
                alt="Krealabs"
                width={139}
                height={87}
                className="h-8 w-auto dark:invert-0 invert"
              />
            </Link>

            <p className="text-body text-[var(--muted-foreground)] max-w-sm">
              Agence digitale à <strong className="text-[var(--foreground)] font-medium">Rouen</strong>.
              Conception et développement de sites web, applications mobiles et
              logiciels sur mesure pour les entreprises de Normandie.
            </p>

            {/* Address — SEO local */}
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-2 text-body-sm text-[var(--muted-foreground)]">
                <MapPin className="size-4 mt-0.5 text-[var(--accent)] shrink-0" />
                <div>
                  <p className="text-[var(--foreground)] font-medium">Krealabs</p>
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
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
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

        {/* Bottom bar */}
        <div className="py-6 border-t border-[var(--border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-caption">
            © {year} Krealabs · Tous droits réservés · Rouen, France
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
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

      {/* Decorative oversized wordmark — stacked layers + twinkle sparkles */}
      <FooterWordmark />
    </footer>
  );
}

/**
 * Wordmark XXL avec effet d'empilement (4 calques fantômes + 1 calque principal)
 * et scintillement (sparkles ponctuels animés). Les sparkles sont desktop-only
 * pour économiser la batterie sur mobile (cf. règle anim mobile du projet).
 */
function FooterWordmark() {
  const stack = [
    { translate: "-translate-y-[18%]", blur: "blur-[3px]", opacity: "0.012" },
    { translate: "-translate-y-[12%]", blur: "blur-[2px]", opacity: "0.018" },
    { translate: "-translate-y-[7%]", blur: "blur-[1px]", opacity: "0.028" },
    { translate: "-translate-y-[3%]", blur: "", opacity: "0.042" },
  ];

  return (
    <div
      aria-hidden
      className="pointer-events-none overflow-hidden relative"
    >
      <Container>
        <div className="relative pb-4 -mb-6">
          {stack.map((layer, i) => (
            <span
              key={i}
              className={`absolute inset-x-0 bottom-0 text-[clamp(4rem,18vw,16rem)] font-medium leading-[0.85] tracking-[-0.05em] select-none ${layer.translate} ${layer.blur}`}
              style={{ color: `color-mix(in srgb, var(--foreground) ${parseFloat(layer.opacity) * 100}%, transparent)` }}
            >
              krealabs
              <em className="font-[var(--font-instrument-serif)] italic">
                .fr
              </em>
            </span>
          ))}

          <p className="relative text-[clamp(4rem,18vw,16rem)] font-medium leading-[0.85] tracking-[-0.05em] text-[var(--foreground)]/[0.06] select-none">
            krealabs
            <em className="font-[var(--font-instrument-serif)] italic text-[var(--foreground)]/[0.085]">
              .fr
            </em>
          </p>

          <FooterSparkles />
        </div>
      </Container>
    </div>
  );
}

/**
 * Sparkles décoratifs animés (scintillement) — hidden < md pour respecter
 * la contrainte "pas d'animations sur mobile" du projet.
 */
const SPARKLES = [
  { left: "8%", top: "30%", size: 3, delay: "0s", dur: "3.2s" },
  { left: "18%", top: "65%", size: 2, delay: "1.4s", dur: "2.6s" },
  { left: "26%", top: "20%", size: 4, delay: "0.6s", dur: "3.8s" },
  { left: "34%", top: "78%", size: 2, delay: "2.1s", dur: "2.9s" },
  { left: "42%", top: "42%", size: 3, delay: "0.2s", dur: "3.4s" },
  { left: "51%", top: "12%", size: 2, delay: "1.8s", dur: "2.4s" },
  { left: "58%", top: "70%", size: 3, delay: "0.9s", dur: "3.1s" },
  { left: "67%", top: "32%", size: 4, delay: "2.6s", dur: "3.6s" },
  { left: "74%", top: "58%", size: 2, delay: "0.4s", dur: "2.7s" },
  { left: "82%", top: "22%", size: 3, delay: "1.2s", dur: "3.3s" },
  { left: "89%", top: "68%", size: 2, delay: "2.3s", dur: "2.5s" },
  { left: "95%", top: "40%", size: 3, delay: "1.6s", dur: "3.5s" },
];

function FooterSparkles() {
  return (
    <div className="hidden md:block motion-reduce:hidden absolute inset-0 pointer-events-none">
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
            boxShadow: `0 0 ${s.size * 3}px color-mix(in srgb, var(--accent) 60%, transparent)`,
          }}
        />
      ))}
    </div>
  );
}
