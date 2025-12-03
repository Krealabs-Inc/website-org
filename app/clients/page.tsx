"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Award, Zap, Users2 } from 'lucide-react';
import { CTASection } from '@/components/blocks/cta-section';

interface Client {
    id: number;
    name: string;
    logo: string;
    website: string;
    industry: string;
    description: string;
    stats: {
        label: string;
        value: string;
    }[];
    featured?: boolean;
}

interface ClientsPageProps {
    clients?: Client[];
    title?: string;
    subtitle?: string;
}

const defaultClients: Client[] = [
    {
        id: 1,
        name: 'TechCorp Solutions',
        logo: 'TC',
        website: 'https://techcorp.example.com',
        industry: 'Technologie',
        description: 'Plateforme de solutions logicielles d\'entreprise avec portée mondiale et produits innovants.',
        stats: [
            { label: 'Croissance', value: '+245%' },
            { label: 'Utilisateurs', value: '2M+' },
        ],
        featured: true,
    },
    {
        id: 2,
        name: 'GreenLeaf Organics',
        logo: 'GL',
        website: 'https://greenleaf.example.com',
        industry: 'E-commerce',
        description: 'Sustainable organic products marketplace connecting farmers with conscious consumers.',
        stats: [
            { label: 'Revenue', value: '+180%' },
            { label: 'Orders', value: '500K+' },
        ],
        featured: true,
    },
    {
        id: 3,
        name: 'FinanceHub Pro',
        logo: 'FH',
        website: 'https://financehub.example.com',
        industry: 'Finance',
        description: 'Modern financial management platform for small and medium businesses.',
        stats: [
            { label: 'Clients', value: '10K+' },
            { label: 'Transactions', value: '$50M+' },
        ],
    },
    {
        id: 4,
        name: 'HealthFirst Medical',
        logo: 'HF',
        website: 'https://healthfirst.example.com',
        industry: 'Healthcare',
        description: 'Digital health platform revolutionizing patient care and medical records management.',
        stats: [
            { label: 'Patients', value: '100K+' },
            { label: 'Providers', value: '500+' },
        ],
    },
    {
        id: 5,
        name: 'EduLearn Academy',
        logo: 'EA',
        website: 'https://edulearn.example.com',
        industry: 'Education',
        description: 'Online learning platform offering courses from industry experts worldwide.',
        stats: [
            { label: 'Students', value: '250K+' },
            { label: 'Courses', value: '1,200+' },
        ],
    },
    {
        id: 6,
        name: 'StyleHub Fashion',
        logo: 'SH',
        website: 'https://stylehub.example.com',
        industry: 'Fashion',
        description: 'Premium fashion marketplace connecting designers with fashion enthusiasts.',
        stats: [
            { label: 'Designers', value: '800+' },
            { label: 'Products', value: '50K+' },
        ],
    },
    {
        id: 7,
        name: 'CloudSync Systems',
        logo: 'CS',
        website: 'https://cloudsync.example.com',
        industry: 'SaaS',
        description: 'Cloud infrastructure and data synchronization solutions for enterprises.',
        stats: [
            { label: 'Uptime', value: '99.9%' },
            { label: 'Data', value: '5PB+' },
        ],
    },
    {
        id: 8,
        name: 'FoodieDelight',
        logo: 'FD',
        website: 'https://foodiedelight.example.com',
        industry: 'Food & Beverage',
        description: 'Restaurant management and food delivery platform serving multiple cities.',
        stats: [
            { label: 'Restaurants', value: '2,500+' },
            { label: 'Deliveries', value: '1M+' },
        ],
    },
];

const ClientsPage: React.FC<ClientsPageProps> = ({
                                                     clients = defaultClients,
                                                     title = 'Ils nous font confiance',
                                                     subtitle = 'Nous collaborons avec des entreprises innovantes pour créer des expériences digitales exceptionnelles qui génèrent des résultats concrets.',
                                                 }) => {
    return (
        <main className="min-h-screen bg-white dark:bg-[#030303] transition-colors pt-20">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#A543F1]/10 via-white dark:via-[#030303] to-[#c5cbf9]/10 border-b border-gray-200 dark:border-white/[0.08]">
                <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A543F1]/10 border border-[#A543F1]/20 mb-6">
                            <Users2 className="w-4 h-4 text-[#A543F1]" />
                            <span className="text-sm font-medium text-[#A543F1] font-[family-name:var(--font-heading)]">
                                Nos Clients
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-heading)]">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A543F1] to-[#c5cbf9]">
                                {title}
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-white/60 max-w-3xl mx-auto font-[family-name:var(--font-sans)]">
                            {subtitle}
                        </p>
                    </motion.div>

                    {/* Stats Bar with animations */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            { icon: Users2, value: clients.length + '+', label: 'Clients satisfaits' },
                            { icon: Award, value: '98%', label: 'Taux de satisfaction' },
                            { icon: Zap, value: '150+', label: 'Projets livrés' },
                            { icon: TrendingUp, value: '12', label: 'Industries servies' }
                        ].map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="text-center p-6 bg-white dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.08] hover:border-[#A543F1]/30 transition-all group"
                                >
                                    <Icon className="w-8 h-8 mx-auto mb-3 text-[#A543F1] group-hover:scale-110 transition-transform" />
                                    <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A543F1] to-[#c5cbf9] mb-2 font-[family-name:var(--font-heading)]">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-white/60 font-[family-name:var(--font-sans)]">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Clients */}
            {clients.some((client) => client.featured) && (
                <section className="container mx-auto px-4 py-16 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A543F1]/10 border border-[#A543F1]/20 mb-4">
                            <Sparkles className="w-4 h-4 text-[#A543F1]" />
                            <span className="text-sm font-medium text-[#A543F1] font-[family-name:var(--font-heading)]">
                                Success Stories
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-heading)]">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A543F1] to-[#c5cbf9]">
                                Nos partenariats les plus marquants
                            </span>
                        </h2>
                        <p className="text-gray-600 dark:text-white/60 max-w-2xl mx-auto font-[family-name:var(--font-sans)]">
                            Découvrez comment nous avons aidé ces entreprises à atteindre leurs objectifs
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {clients
                            .filter((client) => client.featured)
                            .map((client, index) => (
                                <motion.div
                                    key={client.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="group relative"
                                >
                                    <div className="h-full p-8 bg-white dark:bg-white/[0.02] rounded-3xl border border-gray-200 dark:border-white/[0.08] hover:border-[#A543F1]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#A543F1]/10">
                                        {/* Logo and Header */}
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A543F1]/20 to-[#c5cbf9]/10 flex items-center justify-center font-bold text-2xl text-[#A543F1] group-hover:scale-110 transition-transform flex-shrink-0">
                                                {client.logo}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-[family-name:var(--font-heading)]">
                                                    {client.name}
                                                </h3>
                                                <Badge className="bg-[#A543F1]/10 text-[#A543F1] border-[#A543F1]/20 hover:bg-[#A543F1]/20">
                                                    {client.industry}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-600 dark:text-white/60 mb-6 leading-relaxed font-[family-name:var(--font-sans)]">
                                            {client.description}
                                        </p>

                                        {/* Stats */}
                                        <div className="flex gap-6 mb-6 pb-6 border-b border-gray-200 dark:border-white/[0.08]">
                                            {client.stats.map((stat, statIndex) => (
                                                <div key={statIndex} className="flex items-start gap-3">
                                                    <div className="p-2 rounded-lg bg-[#A543F1]/10">
                                                        <TrendingUp className="w-4 h-4 text-[#A543F1]" />
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A543F1] to-[#c5cbf9] font-[family-name:var(--font-heading)]">
                                                            {stat.value}
                                                        </div>
                                                        <div className="text-xs text-gray-600 dark:text-white/60 font-[family-name:var(--font-sans)]">
                                                            {stat.label}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA - Remove for showcase */}
                                        <div className="text-center text-sm text-gray-500 dark:text-white/40 font-[family-name:var(--font-sans)]">
                                            En savoir plus sur ce projet
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </section>
            )}

            {/* All Clients Grid */}
            <section className="container mx-auto px-4 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-heading)]">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A543F1] to-[#c5cbf9]">
                            Tous nos clients
                        </span>
                    </h2>
                    <p className="text-gray-600 dark:text-white/60 max-w-2xl mx-auto font-[family-name:var(--font-sans)]">
                        Découvrez la diversité des entreprises que nous accompagnons vers le succès
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {clients.map((client, index) => (
                        <motion.div
                            key={client.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="group relative"
                        >
                            <div className="h-full p-6 bg-white dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.08] hover:border-[#A543F1]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#A543F1]/5">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    {/* Logo */}
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#A543F1]/20 to-[#c5cbf9]/10 flex items-center justify-center font-bold text-2xl text-[#A543F1] group-hover:scale-110 transition-transform">
                                        {client.logo}
                                    </div>

                                    {/* Name and Industry */}
                                    <div className="space-y-2 w-full">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
                                            {client.name}
                                        </h3>
                                        <Badge className="bg-[#A543F1]/10 text-[#A543F1] border-[#A543F1]/20 text-xs">
                                            {client.industry}
                                        </Badge>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 dark:text-white/60 line-clamp-3 font-[family-name:var(--font-sans)]">
                                        {client.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-3 w-full pt-3 border-t border-gray-200 dark:border-white/[0.08]">
                                        {client.stats.map((stat, statIndex) => (
                                            <div key={statIndex} className="text-center">
                                                <div className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A543F1] to-[#c5cbf9] font-[family-name:var(--font-heading)]">
                                                    {stat.value}
                                                </div>
                                                <div className="text-xs text-gray-600 dark:text-white/60 font-[family-name:var(--font-sans)]">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <CTASection
                title="Prêt à rejoindre nos success stories ?"
                description="Collaborons ensemble pour créer des expériences digitales exceptionnelles qui génèrent des résultats concrets pour votre entreprise."
                primaryCTA={{
                    text: "Démarrer un projet",
                    href: "/contact"
                }}
                secondaryCTA={{
                    text: "Voir nos tarifs",
                    href: "/pricing"
                }}
            />
        </main>
    );
};

export default ClientsPage;
