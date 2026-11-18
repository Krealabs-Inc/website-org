import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Votre devis gratuit sous 24h - Agence web Rouen',
  description: 'Votre site, votre application ou votre logiciel : décrivez votre projet, on vous répond sous 24h ouvrées. Agence web à Rouen, développement web en Normandie. Devis gratuit, sans engagement.',
  openGraph: {
    title: 'Recevez votre devis gratuit - Krealabs, agence web Rouen',
    description: 'Un premier retour sous 24h ouvrées pour votre projet web ou mobile. Agence web à Rouen.',
    type: 'website',
    url: 'https://krealabs.fr/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recevez votre devis gratuit - Krealabs, agence web Rouen',
    description: 'Un premier retour sous 24h ouvrées pour votre projet web ou mobile.',
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
