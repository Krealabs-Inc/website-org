import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Développement Application Mobile React Native',
  description: 'Agence développement d\'applications mobiles iOS et Android avec React Native. Apps natives performantes, cross-platform. Expertise React Native à Rouen. Devis gratuit.',
  keywords: [
    'développement application mobile rouen',
    'agence react native',
    'application ios android',
    'développeur mobile react native',
    'app cross platform',
    'création application mobile',
    'react native normandie',
  ],
  openGraph: {
    title: 'Développement Application Mobile React Native | Krealabs',
    description: 'Applications mobiles iOS et Android performantes avec React Native.',
    type: 'website',
    url: 'https://krealabs.fr/services/applications-mobile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Développement Application Mobile React Native | Krealabs',
    description: 'Applications mobiles iOS et Android performantes avec React Native.',
  },
  alternates: {
    canonical: 'https://krealabs.fr/services/applications-mobile',
  },
}

export default function ApplicationsMobileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
