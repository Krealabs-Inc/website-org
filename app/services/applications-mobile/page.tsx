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
  title: "Applications mobiles à Rouen — React Native iOS & Android",
  description:
    "Développement d'applications mobiles iOS et Android à Rouen. Apps cross-platform en React Native. Une base de code, deux App Stores. Publication, OTA, notifications push.",
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
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";

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
        eyebrow="Service · Mobile"
        title={
          <>
            Applications mobiles iOS & Android,
            <br />
            <em>une seule équipe</em>.
          </>
        }
        description="Apps cross-platform en React Native. Une base de code, deux App Stores, une expérience native. Idéal pour réduire les coûts sans sacrifier la qualité."
      />

      <ServiceFeatures
        number="01"
        eyebrow="Ce que vous obtenez"
        title={
          <>
            Une app <em>complète</em>, prête à publier.
          </>
        }
        intro="Du prototype au déploiement sur les stores, nous gérons l'ensemble du cycle de vie de votre application mobile."
        features={FEATURES}
      />

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Eyebrow number="02" className="mb-6">Méthode</Eyebrow>
              <h2 className="text-h1 mb-6">
                Du <em>prototype</em> au store.
              </h2>
              <p className="text-body text-[var(--muted-foreground)]">
                Nous démarrons toujours par un prototype navigable. Vous testez
                l'expérience avant qu'on développe la logique métier.
              </p>
            </div>
            <ol className="lg:col-span-7 space-y-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
              {STEPS.map((step, i) => (
                <li key={step.title} className="bg-[var(--background)] p-8 grid grid-cols-[auto_1fr] gap-8 items-start">
                  <span className="text-eyebrow text-[var(--accent)] pt-1.5">{String(i + 1).padStart(2, "0")}</span>
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
              Les outils <em>natifs</em> de demain.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TECH.map((t) => (
              <div key={t.name} className="p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)]">
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

      <section className="section-y border-t border-[var(--border)]">
        <Container size="narrow">
          <NewsletterSignup variant="card" source="services-mobile" />
        </Container>
      </section>

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
            Une app à <em>concevoir</em> ?
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
      "React Native pour 90% des apps : performance proche du natif, 1 base de code, time-to-market réduit de 30-40%. Natif (Swift/Kotlin) si vous avez besoin de fonctionnalités très spécifiques (AR, ML embarqué, traitement vidéo lourd, intégrations OS profondes). À Krealabs nous codons en React Native + Expo pour la majorité de nos clients normands.",
  },
  {
    question: "Combien coûte une application mobile à Rouen ?",
    answer:
      "MVP simple (5-8 écrans, login, 1-2 features) : 30-50 k€. App fonctionnelle (15-25 écrans, paiements, notifications push, géolocalisation) : 50-80 k€. App complexe (offline-first, sync, intégrations tierces multiples) : 80-150 k€. Ces fourchettes incluent iOS + Android grâce à React Native.",
  },
  {
    question: "Quels délais entre signature et publication App Store / Play Store ?",
    answer:
      "MVP : 12-16 semaines (dev 8-10 + tests TestFlight 2-3 + validation Apple 1-2 semaines, Google quelques jours). App complète : 20-26 semaines. Le goulot d'étranglement est souvent la validation Apple (App Review) — nous préparons la fiche App Store en amont pour minimiser les rejets.",
  },
  {
    question: "Comment se passent les mises à jour après publication ?",
    answer:
      "Mises à jour OTA via Expo EAS Update pour les changements JS/UX (instantanées, sans passer par les stores). Pour les changements natifs (nouvelle permission, version SDK), nouvelle release via App Store Connect + Google Play Console (validation Apple 24-72h en moyenne). Forfaits maintenance mobile à partir de 250 €/mois.",
  },
  {
    question: "Avez-vous déjà publié des apps sur les stores ?",
    answer:
      "Oui, plusieurs apps Krealabs sont actuellement en production sur l'App Store et Google Play. Nous gérons tout le pipeline : compte développeur, fastlane, signing iOS, app icon multi-tailles, screenshots App Store, fiches descriptives ASO. Vous restez propriétaire des comptes développeurs, on les configure ensemble.",
  },
];

const FEATURES = [
  {
    icon: Smartphone,
    title: "App native iOS & Android",
    description: "Une seule base de code React Native, deux apps installables. Performance native, pas un wrapper web.",
  },
  {
    icon: Bell,
    title: "Notifications push",
    description: "Notifications ciblées via Expo Push ou Firebase. Segmentation, scheduling, deep linking.",
  },
  {
    icon: CloudOff,
    title: "Mode offline",
    description: "Synchronisation différée, cache local, file d'attente pour les requêtes. L'app fonctionne sans réseau.",
  },
  {
    icon: Lock,
    title: "Authentification",
    description: "Login email/password, social login, biométrie Touch ID / Face ID, persistance sécurisée.",
  },
  {
    icon: AppWindow,
    title: "Publication App Store",
    description: "Soumission Apple App Store et Google Play, gestion des comptes développeur, suivi des reviews.",
  },
  {
    icon: RefreshCw,
    title: "Mises à jour OTA",
    description: "Patches déployés en over-the-air via EAS Update — pas de re-soumission au store pour les corrections.",
  },
];

const STEPS = [
  {
    title: "Cadrage produit",
    description: "Définition des écrans clés, parcours utilisateur, scope de la V1. Brief écrit validé ensemble.",
  },
  {
    title: "Prototype Figma",
    description: "Maquettes haute fidélité, prototype navigable. Validation UX avant le moindre code.",
  },
  {
    title: "Développement React Native",
    description: "Sprints de 2 semaines, builds TestFlight et Play Internal Testing à chaque sprint.",
  },
  {
    title: "Publication & suivi",
    description: "Soumission aux stores, gestion des reviews, mises à jour OTA, monitoring crashes Sentry.",
  },
];

const TECH = [
  { kind: "Framework", name: "React Native", tagline: "Cross-platform iOS & Android" },
  { kind: "Build", name: "Expo / EAS", tagline: "Build cloud, OTA updates" },
  { kind: "Langage", name: "TypeScript", tagline: "Typage strict, refactoring serein" },
  { kind: "Backend", name: "Supabase / API", tagline: "Auth, base de données, fichiers" },
];
