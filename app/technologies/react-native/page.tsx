import { Metadata } from "next";
import {
  Smartphone,
  Zap,
  Cloud,
  RefreshCw,
  Bell,
  Map,
  Briefcase,
  ShoppingBag,
  HeartPulse,
} from "lucide-react";

export const metadata: Metadata = {
  title: "React Native à Rouen — Apps iOS & Android cross-platform",
  description:
    "Développement React Native à Rouen. Applications mobiles iOS et Android avec une seule base de code. Performance native, OTA, notifications push.",
  alternates: { canonical: "https://krealabs.fr/technologies/react-native" },
};

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceCta } from "@/components/services/service-cta";

const FEATURES = [
  { icon: Smartphone, title: "iOS & Android", description: "Une seule base de code, deux apps installables sur les stores." },
  { icon: Zap, title: "Performance native", description: "Rendu via les composants natifs, pas un wrapper WebView." },
  { icon: Cloud, title: "Expo & EAS", description: "Build cloud, preview channels, partage facile avec les beta-testers." },
  { icon: RefreshCw, title: "Mises à jour OTA", description: "Patches déployés sans repasser par l'App Store ou le Play Store." },
  { icon: Bell, title: "Notifications push", description: "Expo Push, Firebase, OneSignal. Segmentation, scheduling, deep links." },
  { icon: Map, title: "APIs natives", description: "Géolocalisation, caméra, biométrie, paiements Apple/Google Pay." },
];

const USE_CASES = [
  { icon: ShoppingBag, title: "Apps e-commerce", description: "Catalogues, panier, paiements, push marketing. UX native." },
  { icon: HeartPulse, title: "Apps santé & fitness", description: "Tracking, intégration HealthKit/Google Fit, monitoring." },
  { icon: Briefcase, title: "Outils internes", description: "Apps métier pour terrain, équipes mobiles, ventes externes." },
];

export default function ReactNativePage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <ServiceHero
        number="03"
        eyebrow="Technologie · Mobile"
        title={
          <>
            <em>React Native</em> : iOS & Android,
            <br />
            une seule équipe.
          </>
        }
        description="Le framework cross-platform le plus mature pour développer des applications mobiles natives. Une base de code, deux App Stores, l'expérience utilisateur fidèle à chaque plateforme."
      />

      <ServiceFeatures
        number="01"
        eyebrow="Pourquoi React Native"
        title={
          <>
            Six atouts <em>décisifs</em>.
          </>
        }
        features={FEATURES}
      />

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-16">
            <Eyebrow number="02" className="mb-6">Cas d'usage</Eyebrow>
            <h2 className="text-h1">
              Trois <em>terrains</em> de prédilection.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {USE_CASES.map((u) => {
              const Icon = u.icon;
              return (
                <div key={u.title} className="bg-[var(--background)] p-8">
                  <div className="size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center mb-6">
                    <Icon className="size-4 text-[var(--accent)]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-h4 mb-2">{u.title}</h3>
                  <p className="text-body-sm text-[var(--muted-foreground)]">{u.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Une app <em>mobile</em> à concevoir ?
          </>
        }
      />
    </main>
  );
}
