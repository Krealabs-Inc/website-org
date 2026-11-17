import { Metadata } from "next";
import {
  Search,
  Gauge,
  Rocket,
  Globe,
  Server,
  Layers,
  ShoppingCart,
  Newspaper,
  Briefcase,
} from "lucide-react";

import { TechPage } from "@/components/tech/tech-page";
import { NextDemo } from "@/components/tech/demos";

export const metadata: Metadata = {
  title: "Next.js à Rouen - Framework React production",
  description:
    "Expertise Next.js à Rouen. Server Components, App Router, SEO natif, performance extrême. Notre framework de prédilection pour les sites web modernes.",
  alternates: { canonical: "https://krealabs.fr/technologies/nextjs" },
};


const FEATURES = [
  { icon: Search, title: "SEO natif", description: "Rendu serveur, métadonnées dynamiques, sitemap auto. Des contenus accessibles aux moteurs de recherche." },
  { icon: Gauge, title: "Performance extrême", description: "Code splitting, lazy loading, image optimization. Chargement des ressources adapté aux pages." },
  { icon: Rocket, title: "Déploiement simple", description: "Vercel en un clic, ou Docker / AWS / OVH selon vos contraintes." },
  { icon: Globe, title: "CDN global", description: "Pages distribuées dans le monde, latence minimale partout." },
  { icon: Server, title: "Server Components", description: "Logique serveur dans le composant. Moins de JS côté client." },
  { icon: Layers, title: "App Router", description: "Layouts imbriqués, loading states élégants, parallel routes." },
];

const USE_CASES = [
  { icon: Newspaper, title: "Sites éditoriaux & vitrines", description: "Sites institutionnels, blogs, magazines. Une base adaptée à une stratégie de référencement." },
  { icon: ShoppingCart, title: "E-commerce performant", description: "Boutiques rapides avec checkout fluide, intégrations Stripe/Mollie." },
  { icon: Briefcase, title: "Plateformes SaaS", description: "Applications full-stack avec auth, base de données et API intégrées." },
];

export default function NextjsPage() {
  return (
    <TechPage
      number="01"
      kind="Technologie · Web"
      title={<>
            <em>Next.js</em> : le framework
            <br />
            React de production.
          </>}
      description="Un socle technique pour les sites et applications qui ont besoin de fonctionnalités sur mesure. Nous l’utilisons quand le projet demande davantage qu’un site de présentation."
      demo={<NextDemo />}
      whyTitle={<>
            Six raisons de <em>miser</em> dessus.
          </>}
      reasons={FEATURES.map(({ title, description }) => ({ title, description }))}
      uses={USE_CASES.map(({ title, description }) => ({ title, description }))}
      ctaTitle={<>
            Un projet <em>Next.js</em> à lancer ?
          </>}
    />
  );
}
