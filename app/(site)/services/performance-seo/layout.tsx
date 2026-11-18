import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Optimisation SEO & Performance Web à Rouen',
  description: 'Agence SEO à Rouen spécialisée en optimisation performance web. Core Web Vitals, référencement naturel, audit SEO technique, amélioration vitesse site. Résultats garantis.',
  openGraph: {
    title: 'Optimisation SEO & Performance Web à Rouen | Krealabs',
    description: 'Optimisation SEO et performance web. Core Web Vitals, référencement naturel.',
    type: 'website',
    url: 'https://krealabs.fr/services/performance-seo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Optimisation SEO & Performance Web à Rouen | Krealabs',
    description: 'Optimisation SEO et performance web. Core Web Vitals, référencement naturel.',
  },
  alternates: {
    canonical: 'https://krealabs.fr/services/performance-seo',
  },
}

export default function PerformanceSEOLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
