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

import { TechPage } from "@/components/tech/tech-page";
import { ReactNativeDemo } from "@/components/tech/demos";

export const metadata: Metadata = {
  title: "React Native à Rouen - Apps iOS & Android cross-platform",
  description:
    "Développement React Native à Rouen. Applications mobiles iOS et Android avec une seule base de code. Performance native, OTA, notifications push.",
  alternates: { canonical: "https://krealabs.fr/technologies/react-native" },
};


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
    <TechPage
      number="03"
      kind="Technologie · Mobile"
      title={<>
            <em>React Native</em> : iOS & Android,
            <br />
            une seule équipe.
          </>}
      description="Le framework cross-platform le plus mature pour développer des applications mobiles natives. Une base de code, deux App Stores, l’expérience utilisateur fidèle à chaque plateforme."
      demo={<ReactNativeDemo />}
      whyTitle={<>
            Six atouts <em>décisifs</em>.
          </>}
      reasons={FEATURES.map(({ title, description }) => ({ title, description }))}
      uses={USE_CASES.map(({ title, description }) => ({ title, description }))}
      ctaTitle={<>
            Une app <em>mobile</em> à concevoir ?
          </>}
    />
  );
}
