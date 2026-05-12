import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Devis Gratuit',
  description: 'Contactez Krealabs pour votre projet web ou mobile. Devis gratuit sous 48h. Agence à Rouen spécialisée React, Next.js et React Native. Réponse rapide garantie.',
  keywords: [
    'contact agence web rouen',
    'devis site internet',
    'demande de devis développement',
    'contact développeur react',
    'agence digitale rouen contact',
    'devis application mobile',
  ],
  openGraph: {
    title: 'Contactez-nous pour votre projet - Krealabs',
    description: 'Devis gratuit sous 48h pour votre projet web ou mobile. Agence à Rouen.',
    type: 'website',
    url: 'https://krealabs.fr/contact',
  },
  twitter: {
    card: 'summary',
    title: 'Contactez-nous pour votre projet - Krealabs',
    description: 'Devis gratuit sous 48h pour votre projet web ou mobile.',
  },
  alternates: {
    canonical: 'https://krealabs.fr/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
