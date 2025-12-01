"use client";

import {
    PricingTable,
    PricingTableBody,
    PricingTableCell,
    PricingTableHead,
    PricingTableHeader,
    PricingTablePlan,
    PricingTableRow,
    type FeatureItem,
    type PricingPlanType,
} from "@/components/ui/pricing-table";
import { Sparkles, Rocket, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans: PricingPlanType[] = [
    {
        name: "Starter",
        icon: Sparkles,
        badge: "Idéal PME",
        price: "À partir de 2 500€",
    },
    {
        name: "Business",
        icon: Rocket,
        badge: "Populaire",
        price: "À partir de 5 000€",
    },
    {
        name: "Enterprise",
        icon: Crown,
        badge: "Sur mesure",
        price: "Sur devis",
    },
];

const features: FeatureItem[] = [
    {
        label: "Site web responsive",
        values: [true, true, true],
    },
    {
        label: "Design UI/UX personnalisé",
        values: [false, true, true],
    },
    {
        label: "Pages incluses",
        values: ["3-5", "5-10", "Illimité"],
    },
    {
        label: "Application mobile",
        values: [false, false, true],
    },
    {
        label: "CMS / Admin",
        values: [false, true, true],
    },
    {
        label: "Optimisation SEO",
        values: ["Basique", "Avancé", "Premium"],
    },
    {
        label: "Performance & Core Web Vitals",
        values: [true, true, true],
    },
    {
        label: "Intégrations API",
        values: ["2", "5", "Illimité"],
    },
    {
        label: "Animations & Interactions",
        values: [false, true, true],
    },
    {
        label: "Support & Maintenance",
        values: ["1 mois", "3 mois", "12 mois"],
    },
    {
        label: "Délai de livraison",
        values: ["2-3 semaines", "4-6 semaines", "Sur mesure"],
    },
    {
        label: "Formation incluse",
        values: [false, true, true],
    },
];

export function PricingSection() {
    return (
        <section id="pricing" className="relative py-24 bg-white dark:bg-[#030303] transition-colors">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#A543F1]/[0.02] to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/80 mb-4">
                            Nos Tarifs
                        </h2>
                        <p className="text-gray-600 dark:text-white/40 text-base md:text-lg max-w-2xl mx-auto">
                            Des formules adaptées à vos besoins, de la startup à l'entreprise
                        </p>
                    </div>

                    <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200 dark:border-white/[0.08]">
                        <PricingTable className="table-fixed">
                            <colgroup>
                                <col className="w-[40%]" />
                                <col className="w-[20%]" />
                                <col className="w-[20%]" />
                                <col className="w-[20%]" />
                            </colgroup>
                            <PricingTableHeader>
                                <PricingTableRow>
                                    <PricingTableHead className="bg-gray-50 dark:bg-white/[0.02] border-b-0">

                                    </PricingTableHead>
                                    {plans.map((plan, index) => (
                                        <PricingTableHead
                                            key={plan.name}
                                            className="text-center bg-gray-50 dark:bg-white/[0.02] p-0 border-b-0"
                                        >
                                            <div className="p-3">
                                                <PricingTablePlan
                                                    {...plan}
                                                    className={
                                                        index === 1
                                                            ? "border-[#A543F1] shadow-lg shadow-[#A543F1]/20"
                                                            : ""
                                                    }
                                                >
                                                    <Button
                                                        className={
                                                            index === 1
                                                                ? "w-full bg-[#A543F1] hover:bg-[#A543F1]/90"
                                                                : "w-full"
                                                        }
                                                        variant={index === 1 ? "default" : "outline"}
                                                    >
                                                        {plan.price === "Sur devis" ? "Nous contacter" : "Démarrer"}
                                                    </Button>
                                                </PricingTablePlan>
                                            </div>
                                        </PricingTableHead>
                                    ))}
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableHead className="bg-gray-50 dark:bg-white/[0.02]">
                                        Fonctionnalités
                                    </PricingTableHead>
                                    {plans.map((plan) => (
                                        <PricingTableHead
                                            key={plan.name}
                                            className="text-center bg-gray-50 dark:bg-white/[0.02]"
                                        >
                                            {plan.name}
                                        </PricingTableHead>
                                    ))}
                                </PricingTableRow>
                            </PricingTableHeader>
                            <PricingTableBody>
                                {features.map((feature) => (
                                    <PricingTableRow key={feature.label}>
                                        <PricingTableCell className="font-medium">
                                            {feature.label}
                                        </PricingTableCell>
                                        {feature.values.map((value, index) => (
                                            <PricingTableCell
                                                key={index}
                                                className="text-center"
                                            >
                                                {value}
                                            </PricingTableCell>
                                        ))}
                                    </PricingTableRow>
                                ))}
                            </PricingTableBody>
                        </PricingTable>
                    </div>

                    {/* Mobile View - Cards */}
                    <div className="md:hidden space-y-6">
                        {plans.map((plan, planIndex) => {
                            const Icon = plan.icon;
                            return (
                                <div
                                    key={plan.name}
                                    className={`rounded-xl border p-6 ${
                                        planIndex === 1
                                            ? "border-[#A543F1] bg-gradient-to-br from-[#A543F1]/5 to-transparent shadow-lg"
                                            : "border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#0a0a0a]"
                                    }`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon className={`w-5 h-5 ${planIndex === 1 ? "text-[#A543F1]" : "text-gray-600 dark:text-white/70"}`} />
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                                            </div>
                                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/70">
                                                {plan.badge}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-[#A543F1]">{plan.price}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        {features.map((feature, index) => {
                                            const value = feature.values[planIndex];
                                            return (
                                                <div key={index} className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-600 dark:text-white/70">{feature.label}</span>
                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                        {typeof value === 'boolean' ? (value ? '✓' : '✗') : value}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <Button
                                        className={`w-full ${planIndex === 1 ? "bg-[#A543F1] hover:bg-[#A543F1]/90" : ""}`}
                                        variant={planIndex === 1 ? "default" : "outline"}
                                    >
                                        {plan.price === "Sur devis" ? "Nous contacter" : "Démarrer"}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600 dark:text-white/40">
                            Tous nos projets incluent : code source, hébergement conseillé, SSL, et responsive design
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
