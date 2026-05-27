import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Développement React Native - Apps iOS & Android',
  description: 'Agence React Native à Rouen. Développement d\'applications mobiles iOS et Android natives. Expo, React Native 0.76, performance optimale.',
  openGraph: {
    title: 'Développement React Native - Apps iOS & Android | Krealabs',
    description: 'Applications mobiles natives iOS et Android avec React Native.',
    url: 'https://krealabs.fr/technologies/react-native',
  },
  alternates: { canonical: 'https://krealabs.fr/technologies/react-native' },
}

export default function ReactNativeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
