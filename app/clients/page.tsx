"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Globe, Users, TrendingUp, Award } from 'lucide-react';

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
        industry: 'Technology',
        description: 'Leading enterprise software solutions provider with global reach and innovative products.',
        stats: [
            { label: 'Growth', value: '+245%' },
            { label: 'Users', value: '2M+' },
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
                                                     title = 'Trusted by Industry Leaders',
                                                     subtitle = 'We partner with innovative companies across various industries to deliver exceptional digital experiences and drive measurable results.',
                                                 }) => {
    const handleVisitWebsite = (website: string) => {
        window.open(website, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="border-b border-border bg-gradient-to-b from-muted/50 to-background">
                <div className="container mx-auto px-4 py-16 md:py-24">
                    <div className="max-w-3xl mx-auto text-center space-y-4">
                        <Badge variant="secondary" className="mb-2">
                            <Users className="w-3 h-3 mr-1" />
                            Our Clients
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                            {title}
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground">
                            {subtitle}
                        </p>
                    </div>

                    {/* Stats Bar */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        <div className="text-center space-y-1">
                            <div className="text-3xl md:text-4xl font-bold text-foreground">
                                {clients.length}+
                            </div>
                            <div className="text-sm text-muted-foreground">Happy Clients</div>
                        </div>
                        <div className="text-center space-y-1">
                            <div className="text-3xl md:text-4xl font-bold text-foreground">
                                98%
                            </div>
                            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                        </div>
                        <div className="text-center space-y-1">
                            <div className="text-3xl md:text-4xl font-bold text-foreground">
                                150+
                            </div>
                            <div className="text-sm text-muted-foreground">Projects Delivered</div>
                        </div>
                        <div className="text-center space-y-1">
                            <div className="text-3xl md:text-4xl font-bold text-foreground">
                                12
                            </div>
                            <div className="text-sm text-muted-foreground">Industries Served</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Clients */}
            {clients.some((client) => client.featured) && (
                <div className="container mx-auto px-4 py-16">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-primary" />
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                Featured Success Stories
                            </h2>
                        </div>
                        <p className="text-muted-foreground">
                            Highlighting our most impactful partnerships
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {clients
                            .filter((client) => client.featured)
                            .map((client) => (
                                <Card
                                    key={client.id}
                                    className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">
                                                {client.logo}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl font-bold text-foreground mb-1">
                                                    {client.name}
                                                </h3>
                                                <Badge variant="outline" className="text-xs">
                                                    {client.industry}
                                                </Badge>
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground mb-4 line-clamp-2">
                                            {client.description}
                                        </p>

                                        <div className="flex gap-4 mb-4">
                                            {client.stats.map((stat, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <TrendingUp className="w-4 h-4 text-primary" />
                                                    <div>
                                                        <div className="text-lg font-bold text-foreground">
                                                            {stat.value}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {stat.label}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <Button
                                            variant="outline"
                                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                                            onClick={() => handleVisitWebsite(client.website)}
                                        >
                                            <Globe className="w-4 h-4 mr-2" />
                                            Visit Website
                                            <ExternalLink className="w-4 h-4 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </div>
            )}

            {/* All Clients Grid */}
            <div className="container mx-auto px-4 pb-16">
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        All Our Clients
                    </h2>
                    <p className="text-muted-foreground">
                        Explore the diverse range of companies we've helped succeed
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {clients.map((client) => (
                        <Card
                            key={client.id}
                            className="group hover:shadow-md transition-all duration-300 hover:border-primary/30"
                        >
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-2xl group-hover:scale-110 transition-transform">
                                        {client.logo}
                                    </div>

                                    <div className="space-y-2 w-full">
                                        <h3 className="text-lg font-bold text-foreground">
                                            {client.name}
                                        </h3>
                                        <Badge variant="secondary" className="text-xs">
                                            {client.industry}
                                        </Badge>
                                    </div>

                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {client.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-2 w-full pt-2 border-t border-border">
                                        {client.stats.map((stat, index) => (
                                            <div key={index} className="text-center">
                                                <div className="text-sm font-bold text-foreground">
                                                    {stat.value}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full group-hover:bg-primary/10"
                                        onClick={() => handleVisitWebsite(client.website)}
                                    >
                                        <Globe className="w-4 h-4 mr-2" />
                                        Visit Site
                                        <ExternalLink className="w-3 h-3 ml-2" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-border bg-muted/30">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-2xl mx-auto text-center space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            Ready to Join Our Success Stories?
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Let's collaborate to create exceptional digital experiences that drive
                            real business results.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="text-base">
                                Start Your Project
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-base">
                                View Case Studies
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientsPage;
