import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Développement Next.js - Agence Next.js à Rouen',
  description: 'Agence Next.js à Rouen. Création de sites ultra-rapides avec Next.js 16, App Router, Server Components, SSR, SSG. Experts Next.js certifiés.',
  openGraph: {
    title: 'Développement Next.js - Agence Next.js à Rouen | Krealabs',
    description: 'Sites ultra-rapides avec Next.js 16 et App Router.',
    url: 'https://krealabs.fr/technologies/nextjs',
  },
  alternates: { canonical: 'https://krealabs.fr/technologies/nextjs' },
}

export default function NextJSLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
