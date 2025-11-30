import { WaitlistHero } from "@/components/ui/waitlist-hero";
import { MarqueeDemo } from "@/components/blocks/logos"
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { WorldMapDemo } from "@/components/blocks/world-map-demo";
import { PricingSection } from "@/components/blocks/pricing-section";
import TestimonialSlider from "@/components/blocks/testimonials";
import FAQSection from "@/components/blocks/faq-section";
import WaitlistBanner from "@/components/blocks/waitlist-banner";
import { CallToAction } from "@/components/ui/cta-3";
import { Features as Features2 } from "@/components/blocks/features-2";
import { Features as Features4 } from "@/components/blocks/features-4";
import { Features as Features5 } from "@/components/blocks/features-5";
import { Features as Features8 } from "@/components/blocks/features-8";
import { TrustedClients } from "@/components/blocks/trusted-clients";
import {
    Palette,
    Code,
    Rocket,
    Smartphone,
    Zap,
    Globe,
} from "lucide-react";

const serviceItems: BentoItem[] = [
    {
        title: "Design UI/UX",
        meta: "Design System",
        description:
            "Conception d'interfaces modernes et accessibles. De la maquette Figma au code, nous créons des expériences utilisateur mémorables",
        icon: <Palette className="w-4 h-4 text-[#A543F1]" />,
        status: "Populaire",
        tags: ["Figma", "Design System", "Accessibilité"],
        colSpan: 2,
        hasPersistentHover: true,
    },
    {
        title: "Développement Web",
        meta: "Full-stack",
        description: "Sites web et applications React/Next.js performants avec architecture scalable et code maintenable",
        icon: <Code className="w-4 h-4 text-emerald-500" />,
        status: "Expertise",
        tags: ["React", "Next.js", "TypeScript"],
    },
    {
        title: "Applications Mobile",
        meta: "iOS & Android",
        description: "Apps mobiles React Native cross-platform avec expérience native et performances optimales",
        icon: <Smartphone className="w-4 h-4 text-purple-500" />,
        tags: ["React Native", "Expo", "App Store"],
        colSpan: 2,
    },
    {
        title: "Performance & SEO",
        meta: "Core Web Vitals",
        description: "Optimisation technique pour Core Web Vitals, référencement naturel et temps de chargement < 2s",
        icon: <Zap className="w-4 h-4 text-amber-500" />,
        status: "Premium",
        tags: ["SEO", "Lighthouse", "Analytics"],
    },
];

export default function Home() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#030303] transition-colors">
            <WaitlistHero />

            <TrustedClients />

            <section id="technologies" className="relative py-24 bg-white dark:bg-[#030303] transition-colors">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#A543F1]/[0.02] to-transparent" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/80 mb-4 font-[family-name:var(--font-heading)]">
                            Notre Stack Technique
                        </h2>
                        <p className="text-gray-600 dark:text-white/40 text-lg max-w-2xl mx-auto font-[family-name:var(--font-sans)]">
                            Nous maîtrisons les technologies les plus performantes pour créer des applications web et mobile modernes, scalables et maintenables
                        </p>
                    </div>
                    <MarqueeDemo />
                </div>
            </section>

            <section id="services" className="relative py-24 bg-gray-50 dark:bg-[#030303] transition-colors">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/[0.02] to-transparent" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/80 mb-4 font-[family-name:var(--font-heading)]">
                                Nos Services
                            </h2>
                            <p className="text-gray-600 dark:text-white/40 text-lg font-[family-name:var(--font-sans)]">
                                Expertise complète du design à la mise en production
                            </p>
                        </div>

                        <BentoGrid items={serviceItems} />
                    </div>
                </div>
            </section>

            <Features2 />

            <Features4 />

            <WorldMapDemo />

            <Features5 />

            <div className="w-full flex items-center justify-center py-16 bg-white dark:bg-[#030303] transition-colors">
                <CallToAction />
            </div>

            <TestimonialSlider />

            <Features8 />

            <PricingSection />

            <FAQSection />

            <WaitlistBanner />
        </main>
    );
}
