import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { Toaster } from "sonner";
import { WebSiteSchema } from "@/components/seo/website-schema";
import { ScrollProvider } from "@/components/animations/scroll-provider";
import { CookieConsent } from "@/components/legal/cookie-consent";
import { SearchModal } from "@/components/search/search-modal";

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
    default: 'Krealabs - Agence web à Rouen | Sites internet, applications mobiles, logiciels',
    template: '%s · Krealabs',
  },

  description: 'Agence web à Rouen : vos clients vous trouvent, vos équipes gagnent du temps. Sites internet, applications mobiles et logiciels sur mesure, développement web en Normandie. Devis gratuit sous 24h.',


  authors: [{ name: 'Krealabs', url: 'https://krealabs.fr' }],
  creator: 'Krealabs',
  publisher: 'Krealabs',

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  icons: {
    // app/favicon.ico est auto-détecté par Next.js - pas besoin de le redéclarer
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
    title: 'Krealabs - Agence web à Rouen',
    description: 'Un site qui vous amène des clients, des outils qui vous font gagner du temps. Agence web à Rouen, partout en France.',
    siteName: 'Krealabs',
  },

  // Pas de title/description ici : chaque page porte les siens en
  // openGraph, et X les reprend quand twitter:title est absent.
  twitter: {
    card: 'summary_large_image',
    creator: '@krealabs_',
    site: '@krealabs_',
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
    languages: {
      'fr-FR': 'https://krealabs.fr',
      'x-default': 'https://krealabs.fr',
    },
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
      className={fontVariables}
    >
      <body className="antialiased font-sans">
        {/* Skip-to-content : accessibilité clavier (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-[var(--radius)] focus:bg-[var(--accent)] focus:text-[#0a0a0a] focus:font-medium focus:shadow-lg"
        >
          Aller au contenu principal
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <ScrollProvider>
            <WebSiteSchema />
            <Navbar />
            <div id="main-content">{children}</div>
            <Footer />
            <Toaster position="top-right" richColors />
            <CookieConsent />
            <SearchModal />
          </ScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
