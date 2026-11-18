import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Développement React - Agence React à Rouen',
  description: 'Experts React à Rouen. Développement d\'applications web modernes avec React 19, hooks, Server Components, Context API. Agence spécialisée React en Normandie.',
  openGraph: {
    title: 'Développement React - Agence React à Rouen | Krealabs',
    description: 'Experts React pour vos applications web modernes.',
    url: 'https://krealabs.fr/technologies/react',
  },
  alternates: { canonical: 'https://krealabs.fr/technologies/react' },
}

export default function ReactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
