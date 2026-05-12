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

      {/* Decorative oversized wordmark */}
      <div
        aria-hidden
        className="pointer-events-none overflow-hidden"
      >
        <Container>
          <p className="text-[clamp(4rem,18vw,16rem)] font-medium leading-[0.85] tracking-[-0.05em] text-[var(--foreground)]/[0.04] pb-4 -mb-6 select-none">
            krealabs<em className="font-[var(--font-instrument-serif)] italic text-[var(--foreground)]/[0.06]">.fr</em>
          </p>
        </Container>
      </div>
    </footer>
  );
}
