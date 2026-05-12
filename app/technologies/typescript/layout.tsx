import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Développement TypeScript - Code Type-Safe',
  description: 'Experts TypeScript à Rouen. Développement avec TypeScript 5.x, code robuste et maintenable. Agence spécialisée types avancés et patterns TypeScript.',
  keywords: ['développeur typescript rouen', 'agence typescript', 'expert typescript', 'typescript 5', 'type-safe'],
  openGraph: {
    title: 'Développement TypeScript - Code Type-Safe | Krealabs',
    description: 'Code robuste et maintenable avec TypeScript 5.x.',
    url: 'https://krealabs.fr/technologies/typescript',
  },
  alternates: { canonical: 'https://krealabs.fr/technologies/typescript' },
}

export default function TypeScriptLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
