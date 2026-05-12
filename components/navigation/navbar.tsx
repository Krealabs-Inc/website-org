"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Services", href: "/services" },
  { name: "Expertise", href: "/expertise" },
  { name: "Équipe", href: "/equipe" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
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
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
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
              className="group flex items-center -ml-1 px-1 py-1 rounded-[var(--radius)] hover:bg-[var(--surface)] transition-colors"
              aria-label="Krealabs — Accueil"
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
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-3 py-1.5 text-[0.9rem] font-medium rounded-[var(--radius)] transition-colors",
                      active
                        ? "text-[var(--foreground)] bg-[var(--surface)]"
                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right cluster */}
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <Button size="md" asChild>
                <Link href="/contact">
                  Nous contacter
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>

            {/* Mobile cluster */}
            <div className="flex md:hidden items-center gap-2">
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

      {/* Mobile sheet — CSS-only transitions (pas de framer-motion) */}
      <div
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        className={cn(
          "fixed inset-0 z-40 md:hidden bg-[var(--background)]/95 backdrop-blur-xl pt-20",
          "transition-opacity duration-200 ease-out",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
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
            <div className="pt-6">
              <Button size="lg" className="w-full" asChild>
                <Link href="/contact">
                  Nous contacter
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
