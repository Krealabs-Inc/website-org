import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design UI/UX - Agence Design à Rouen',
  description: 'Agence de design UI/UX à Rouen. Création d\'interfaces modernes, wireframes, prototypes Figma, maquettes web et mobile. Experts React et Next.js. Devis gratuit.',
  keywords: [
    'design ui ux rouen',
    'agence design normandie',
    'designer figma rouen',
    'maquette web',
    'prototype application',
    'design interface utilisateur',
    'ux designer rouen',
  ],
  openGraph: {
    title: 'Design UI/UX - Agence Design à Rouen | Krealabs',
    description: 'Création d\'interfaces modernes et prototypes Figma. Agence design UI/UX à Rouen.',
    type: 'website',
    url: 'https://krealabs.fr/services/design-uiux',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design UI/UX - Agence Design à Rouen | Krealabs',
    description: 'Création d\'interfaces modernes et prototypes Figma.',
  },
  alternates: {
    canonical: 'https://krealabs.fr/services/design-uiux',
  },
}

export default function DesignUIUXLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
