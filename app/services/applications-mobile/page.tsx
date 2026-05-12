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
  keywords: [
    "application mobile rouen",
    "développement application mobile normandie",
    "react native rouen",
    "agence mobile rouen",
    "app ios android rouen",
  ],
  alternates: { canonical: "https://krealabs.fr/services/applications-mobile" },
};

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceCta } from "@/components/services/service-cta";
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
