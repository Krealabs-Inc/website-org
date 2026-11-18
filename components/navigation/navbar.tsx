"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, PanelsTopLeft } from "lucide-react";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * Offre verticale hébergée sur un sous-domaine : les cabinets soumis au secret
 * professionnel n'ont pas les mêmes questions qu'un client d'agence, et ne
 * doivent pas atterrir sur une page de services généralistes.
 */
const KREIA_URL = "https://kreia.krealabs.fr";

const navItems = [
  { name: "Réalisations", href: "/clients" },
  { name: "Services", href: "/services" },
  { name: "Expertise", href: "/expertise" },
  { name: "Équipe", href: "/equipe" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Get out of the way while reading down (pinned sections need the full
  // screen), come back as soon as the visitor scrolls up.
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 16);
      const delta = y - lastY;
      if (Math.abs(delta) < 6) return;
      setIsHidden(delta > 0 && y > 160);
      lastY = y;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] focus-within:translate-y-0",
          isHidden && !isMobileMenuOpen && "-translate-y-full",
          isScrolled
            ? "bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="group flex shrink-0 items-center -ml-1 px-1 py-1 rounded-[var(--radius)] hover:bg-[var(--surface)] transition-colors"
              aria-label="Krealabs - Accueil"
            >
              <Image
                src="/logo.png"
                alt="Krealabs"
                width={139}
                height={87}
                priority
                className="h-7 md:h-8 w-auto dark:invert-0 invert transition-opacity group-hover:opacity-80"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0 xl:gap-1">
              {navItems.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-2 xl:px-3 py-2 text-[0.9rem] font-medium rounded-full transition-colors",
                      active
                        ? "text-[var(--accent)] bg-[var(--accent-subtle)]"
                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right cluster */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                href="/studio"
                className="studio-pill"
                aria-current={pathname === "/studio" ? "page" : undefined}
                title="KreaStudio : décrivez votre projet, recevez une maquette de votre site en quelques minutes"
              >
                <PanelsTopLeft className="size-4" aria-hidden />
                Maquette gratuite
              </Link>
              <a
                href={KREIA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="kreia-pill"
                title="IA locale pour cabinets d’expertise comptable et d’avocats"
              >
                <span className="kreia-spark" aria-hidden />
                KréIA
                <span className="kreia-tag">IA locale</span>
                <ArrowUpRight className="kreia-arrow size-3.5" aria-hidden />
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
              <ThemeToggle />
              <Button size="md" asChild>
                <Link href="/contact">
                  Parler de mon projet
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>

            {/* Mobile cluster */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] flex items-center justify-center transition-colors"
                aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="size-4 text-[var(--foreground)]" />
                ) : (
                  <Menu className="size-4 text-[var(--foreground)]" />
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile sheet - CSS-only transitions (pas de framer-motion) */}
      <div
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        className={cn(
          "fixed inset-0 z-40 lg:hidden bg-[var(--background)]/95 backdrop-blur-xl pt-20",
          "transition-[opacity,visibility] duration-200 ease-out",
          // invisible et pas seulement opacity-0 : fermé, le backdrop-blur
          // plein écran restait calculé à chaque frame de scroll, et ses
          // liens restaient atteignables au clavier.
          isMobileMenuOpen
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none",
        )}
      >
        <Container>
          <nav
            className={cn(
              "flex flex-col gap-1 transition-transform duration-300 ease-out",
              isMobileMenuOpen ? "translate-y-0" : "-translate-y-2",
            )}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center justify-between py-4 border-b border-[var(--border)] text-h3 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
              >
                {item.name}
                <ArrowUpRight className="size-5 text-[var(--subtle-foreground)]" />
              </Link>
            ))}
            <Link href="/studio" className="kreia-card">
              <span>
                <span className="inline-flex items-center gap-2">
                  <PanelsTopLeft className="size-5 text-[var(--accent)]" aria-hidden />
                  Maquette gratuite
                </span>
                <span className="block text-body-sm text-[var(--muted-foreground)] font-normal">
                  Décrivez votre projet, voyez votre site en quelques minutes
                </span>
              </span>
              <ArrowUpRight className="size-5 text-[var(--accent)]" />
            </Link>
            <a
              href={KREIA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="kreia-card"
            >
              <span>
                <span className="inline-flex items-center gap-2">
                  <span className="kreia-spark" aria-hidden />
                  KréIA
                </span>
                <span className="block text-body-sm text-[var(--muted-foreground)] font-normal">
                  IA locale pour cabinets d&apos;expertise comptable et
                  d&apos;avocats
                </span>
              </span>
              <ArrowUpRight className="size-5 text-[var(--accent)]" />
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
            <div className="pt-6">
              <Button size="lg" className="w-full" asChild>
                <Link href="/contact">
                  Parler de mon projet
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </>
  );
}
