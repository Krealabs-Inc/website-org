import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Développement Web React & Next.js à Rouen',
  description: 'Agence de développement web à Rouen spécialisée React, Next.js, TypeScript. Création de sites performants, applications web, e-commerce. Stack moderne et scalable.',
  openGraph: {
    title: 'Développement Web React & Next.js à Rouen | Krealabs',
    description: 'Création de sites web performants avec React et Next.js. Agence à Rouen.',
    type: 'website',
    url: 'https://krealabs.fr/services/developpement-web',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Développement Web React & Next.js à Rouen | Krealabs',
    description: 'Création de sites web performants avec React et Next.js.',
  },
  alternates: {
    canonical: 'https://krealabs.fr/services/developpement-web',
  },
}

export default function DeveloppementWebLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
