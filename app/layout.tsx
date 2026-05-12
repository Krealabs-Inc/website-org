import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { Toaster } from "sonner";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { LenisProvider } from "@/components/animations/lenis-provider";
import { Analytics } from "@vercel/analytics/react";

// Switzer — sans-serif principale (auto-hébergée, Fontshare)
const switzer = localFont({
  variable: "--font-switzer",
  display: "swap",
  src: [
    { path: "../public/fonts/switzer/switzer-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/switzer/switzer-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/switzer/switzer-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/switzer/switzer-700.woff2", weight: "700", style: "normal" },
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://krealabs.fr'),

  title: {
    default: 'Krealabs — Agence web à Rouen | Sites internet, applications mobiles, logiciels',
    template: '%s · Krealabs',
  },

  description: 'Agence web à Rouen en Normandie. Création de sites internet, applications mobiles et logiciels sur mesure. Experts React, Next.js, React Native, TypeScript. Devis gratuit sous 24h.',

  keywords: [
    // SEO local agence
    'agence web rouen',
    'agence digitale rouen',
    'agence web normandie',
    'création site internet rouen',
    'développement web rouen',
    'développeur rouen',
    // Spécialité WordPress
    'agence wordpress rouen',
    'agence wordpress normandie',
    'création site wordpress rouen',
    'refonte wordpress',
    'développeur wordpress rouen',
    'maintenance wordpress',
    'sécurité wordpress',
    'seo wordpress rouen',
    'woocommerce rouen',
    'e-commerce wordpress rouen',
    'headless wordpress',
    // Stack moderne
    'next.js normandie',
    'react native rouen',
    'typescript rouen',
    'python rouen',
    // Services divers
    'logiciel sur mesure rouen',
    'application mobile rouen',
    'agence seo rouen',
    'création site internet normandie',
    'développement logiciel rouen',
  ],

  authors: [{ name: 'Krealabs', url: 'https://krealabs.fr' }],
  creator: 'Krealabs',
  publisher: 'Krealabs',

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  icons: {
    // app/favicon.ico est auto-détecté par Next.js — pas besoin de le redéclarer
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  manifest: '/site.webmanifest',

  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://krealabs.fr',
    title: 'Krealabs — Agence web à Rouen',
    description: 'Sites internet, applications mobiles et logiciels sur mesure. Agence basée à Rouen, intervention France entière.',
    siteName: 'Krealabs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Krealabs · Agence web à Rouen',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Krealabs — Agence web à Rouen',
    description: 'Sites internet, applications mobiles et logiciels sur mesure en Normandie.',
    creator: '@krealabs',
    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Vérification GSC via DNS TXT record (méthode choisie).
  // Si tu ajoutes une 2ème méthode meta-tag pour Bing/Yandex,
  // décommente et remplis ci-dessous :
  // verification: {
  //   google: 'xxxxx',
  //   bing: 'xxxxx',
  //   yandex: 'xxxxx',
  // },

  alternates: {
    canonical: 'https://krealabs.fr',
  },

  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${switzer.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <LenisProvider>
            <OrganizationSchema />
            <Navbar />
            {children}
            <Footer />
            <Toaster position="top-right" richColors />
          </LenisProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
