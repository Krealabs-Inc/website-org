import { Metadata } from "next";
import {
  Smartphone,
  Bell,
  CloudOff,
  Lock,
  AppWindow,
  RefreshCw,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Application mobile à Rouen - iOS & Android en React Native",
  description:
    "Vos clients vous ont dans leur poche : une application iOS et Android pour le budget d'une seule. Développement mobile React Native par une agence web à Rouen, en Normandie.",
  alternates: { canonical: "https://krealabs.fr/services/applications-mobile" },
};

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceCta } from "@/components/services/service-cta";
import { ServiceResources } from "@/components/services/service-resources";
import { ServiceFAQ } from "@/components/services/service-faq";
import { ServiceSchema } from "@/components/seo/service-schema";

export default function ApplicationsMobilePage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <ServiceSchema
        name="Développement d'application mobile"
        description="Applications iOS et Android en React Native, développées à Rouen. Une base de code, deux App Stores. Notifications push, mode offline, publication Apple/Google."
        url="https://krealabs.fr/services/applications-mobile"
        serviceType="Développement application mobile"
        priceRange="€€€"
        offers={[
          { name: "App native iOS & Android" },
          { name: "Notifications push" },
          { name: "Mode offline" },
          { name: "Publication App Store" },
          { name: "Mises à jour OTA" },
        ]}
      />
      <ServiceHero
        number="02"
        eyebrow="Application mobile · iOS & Android"
        title={
          <>
            Vos clients vous ont
            <br />
            <em>dans leur poche</em>.
          </>
        }
        description="Une application sur iOS et Android pour le budget d'une seule : une base de code React Native, deux App Stores, une expérience native. Vous réduisez vos coûts sans rogner sur la qualité."
      />

      <ServiceFeatures
        number="01"
        eyebrow="Ce que vous obtenez"
        title={
          <>
            Une app <em>complète</em>, prête à publier.
          </>
        }
        intro="Du prototype à la publication sur les stores, vous avez un seul interlocuteur pour toute la vie de votre application."
        features={FEATURES}
      />

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Eyebrow number="02" className="mb-6">Méthode</Eyebrow>
              <h2 className="text-h1 mb-6">
                Vous testez votre app <em>avant</em> qu’elle existe.
              </h2>
              <p className="text-body text-[var(--muted-foreground)]">
                Tout commence par un prototype navigable : vous testez
                l’expérience sur votre téléphone avant la moindre ligne de code.
              </p>
            </div>
            <ol className="lg:col-span-7 space-y-3">
              {STEPS.map((step, i) => (
                <li key={step.title} className="editorial-step">
                  <span className="editorial-ordinal">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-h3 mb-2">{step.title}</h3>
                    <p className="text-body-sm text-[var(--muted-foreground)]">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-16">
            <Eyebrow number="03" className="mb-6">Stack technique</Eyebrow>
            <h2 className="text-h1">
              Ce qui fait tourner <em>votre app</em>.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-0">
            {TECH.map((t) => (
              <div key={t.name} className="compact-note">
                <p className="text-caption mb-3">{t.kind}</p>
                <p className="text-h4 mb-2">{t.name}</p>
                <p className="text-body-sm text-[var(--muted-foreground)]">{t.tagline}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ServiceFAQ
        title={
          <>
            Vos questions sur le <em>développement mobile</em>.
          </>
        }
        items={FAQ}
      />


      <ServiceResources
        articles={[
          { href: "/blog/prix-application-mobile-2026", kicker: "Budget", title: "Prix d'une application mobile en 2026 : le vrai budget" },
          { href: "/blog/react-native-2026-etat-des-lieux", kicker: "React Native", title: "React Native en 2026 : où on en est vraiment" },
          { href: "/blog/expo-router-production-retours", kicker: "Expo Router", title: "Expo Router en production : retours d'expérience après 12 mois" },
          { href: "/blog/notifications-push-onesignal-firebase-expo", kicker: "Notifications push", title: "Notifications push mobile : OneSignal vs Firebase vs Expo" },
        ]}
      />

      <ServiceCta
        title={
          <>
            Et si vos clients vous <em>avaient en poche</em> ?
          </>
        }
      />
    </main>
  );
}

const FAQ = [
  {
    question: "Faut-il développer iOS et Android, ou une seule plateforme ?",
    answer:
      "En 2026, il est rare de ne livrer qu'une seule plateforme. Avec React Native, le coût marginal pour ajouter Android quand vous avez iOS (ou inversement) est de l'ordre de +20-30%, pas +100%. Notre conseil : sortir les 2 dès le MVP. Exception : audience cible 100% iOS (haut de gamme, B2B France) où Android peut être différé.",
  },
  {
    question: "React Native ou natif (Swift / Kotlin) ?",
    answer:
      "React Native pour 90% des apps : performance proche du natif, 1 base de code, time-to-market réduit de 30-40%. Natif (Swift/Kotlin) si vous avez besoin de fonctionnalités très spécifiques (AR, ML embarqué, traitement vidéo lourd, intégrations OS profondes). C'est le choix retenu pour la plupart des projets que nous accompagnons en Normandie.",
  },
  {
    question: "Combien coûte une application mobile à Rouen ?",
    answer:
      "MVP simple (5-8 écrans, login, 1-2 features) : 30-50 k€. App fonctionnelle (15-25 écrans, paiements, notifications push, géolocalisation) : 50-80 k€. App complexe (offline-first, sync, intégrations tierces multiples) : 80-150 k€. Ces fourchettes incluent iOS + Android grâce à React Native.",
  },
  {
    question: "Quels délais entre signature et publication App Store / Play Store ?",
    answer:
      "MVP : 12-16 semaines (dev 8-10 + tests TestFlight 2-3 + validation Apple 1-2 semaines, Google quelques jours). App complète : 20-26 semaines. Le goulot d'étranglement est souvent la validation Apple (App Review) - nous préparons la fiche App Store en amont pour minimiser les rejets.",
  },
  {
    question: "Comment se passent les mises à jour après publication ?",
    answer:
      "Mises à jour OTA via Expo EAS Update pour les changements JS/UX (instantanées, sans passer par les stores). Pour les changements natifs (nouvelle permission, version SDK), nouvelle release via App Store Connect + Google Play Console (validation Apple 24-72h en moyenne). Forfaits maintenance mobile à partir de 250 €/mois.",
  },
  {
    question: "Avez-vous déjà publié des apps sur les stores ?",
    answer:
      "Oui, plusieurs apps Krealabs sont en production sur l'App Store et Google Play. Côté technique, vous n'avez rien à gérer : compte développeur, fastlane, signature iOS, icônes, captures d'écran, fiches ASO. Vous restez propriétaire de vos comptes développeur, configurés ensemble.",
  },
];

const FEATURES = [
  {
    icon: Smartphone,
    title: "App native iOS & Android",
    description: "Vos utilisateurs installent une vraie app sur iPhone et Android, pas un site déguisé. Une seule base de code React Native.",
  },
  {
    icon: Bell,
    title: "Notifications push",
    description: "Vous relancez vos utilisateurs au bon moment, avec le bon message : Expo Push ou Firebase, segmentation, liens profonds.",
  },
  {
    icon: CloudOff,
    title: "Mode offline",
    description: "Votre app fonctionne même sans réseau, et se synchronise dès que la connexion revient.",
  },
  {
    icon: Lock,
    title: "Authentification",
    description: "Vos utilisateurs se connectent en un geste : email, Google ou Apple, Face ID ou Touch ID, en toute sécurité.",
  },
  {
    icon: AppWindow,
    title: "Publication App Store",
    description: "Votre app arrive sur l'App Store et Google Play sans que vous ayez à gérer les règles des stores.",
  },
  {
    icon: RefreshCw,
    title: "Mises à jour OTA",
    description: "Vos corrections arrivent chez vos utilisateurs sans repasser par la validation des stores (EAS Update).",
  },
];

const STEPS = [
  {
    title: "Cadrage produit",
    description: "Les écrans clés, les parcours et le contenu de votre V1, définis avec vous. Brief écrit validé ensemble.",
  },
  {
    title: "Prototype Figma",
    description: "Vous validez les maquettes et le prototype navigable avant le moindre code.",
  },
  {
    title: "Développement React Native",
    description: "Toutes les 2 semaines, une nouvelle version de test sur votre téléphone (TestFlight, Play Internal Testing).",
  },
  {
    title: "Publication & suivi",
    description: "Soumission aux stores, réponses aux reviews, mises à jour OTA, suivi des plantages.",
  },
];

const TECH = [
  { kind: "Framework", name: "React Native", tagline: "Une app pour iOS et Android" },
  { kind: "Build", name: "Expo / EAS", tagline: "Vos mises à jour sans attendre les stores" },
  { kind: "Langage", name: "TypeScript", tagline: "Moins de bugs, des évolutions sereines" },
  { kind: "Backend", name: "Supabase / API", tagline: "Comptes, données et fichiers sécurisés" },
];
