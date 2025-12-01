"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import {ThemeToggle} from "@/components/ui/theme-toggle";
import {Menu, X} from "lucide-react";
import {cn} from "@/lib/utils";
import Image from "next/image";

const navItems = [
    {name: "Accueil", href: "/"},
    {name: "Services", href: "/services"},
    {name: "Clients", href: "/clients"},
    {name: "Pricing", href: "/pricing"},
    {name: "Blog", href: "/blog"},
    {name: "Changelog", href: "/changelog"},
    {name: "Contact", href: "/contact"},
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{y: -100}}
            animate={{y: 0}}
            transition={{duration: 0.5}}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/80 dark:bg-[#030303]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/[0.08]"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <Image
                            src="/logo.png"
                            alt="Kréalabs Logo"
                            width={150}
                            height={40}
                            className="h-8 w-auto transition-opacity group-hover:opacity-80 invert dark:invert-0"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <div
                        className="hidden md:flex items-center justify-center space-x-8 absolute left-1/2 -translate-x-1/2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-white/60 dark:hover:text-white transition-colors relative group font-[family-name:var(--font-heading)]"
                            >
                                {item.name}
                                <span
                                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A543F1] group-hover:w-full transition-all duration-300"/>
                            </Link>
                        ))}
                    </div>

                    {/* Right side: Theme toggle + CTA */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle/>
                        <Link
                            href="#contact"
                            className={cn(
                                "px-4 py-2 rounded-lg font-medium text-sm",
                                "bg-[#A543F1]",
                                "text-white hover:shadow-lg hover:shadow-[#A543F1]/25",
                                "transition-all duration-200",
                                "font-[family-name:var(--font-heading)]"
                            )}
                        >
                            Démarrer un projet
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center space-x-2">
                        <ThemeToggle/>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] dark:bg-white/[0.05] dark:border-white/[0.1] transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5 text-gray-900 dark:text-white"/>
                            ) : (
                                <Menu className="w-5 h-5 text-gray-900 dark:text-white"/>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: "auto"}}
                    exit={{opacity: 0, height: 0}}
                    className="md:hidden border-t border-gray-200/50 dark:border-white/[0.08] bg-white/95 dark:bg-[#030303]/95 backdrop-blur-xl"
                >
                    <div className="container mx-auto px-4 py-4 space-y-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-white/60 dark:hover:text-white transition-colors font-[family-name:var(--font-heading)]"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="#contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "block text-center px-4 py-2 rounded-lg font-medium text-sm",
                                "bg-[#A543F1]",
                                "text-white",
                                "transition-all duration-200"
                            )}
                        >
                            Démarrer un projet
                        </Link>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
