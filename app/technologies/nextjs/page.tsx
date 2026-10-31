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

export const metadata: Metadata = {
  title: "Next.js à Rouen - Framework React production",
  description:
    "Expertise Next.js à Rouen. Server Components, App Router, SEO natif, performance extrême. Notre framework de prédilection pour les sites web modernes.",
  alternates: { canonical: "https://krealabs.fr/technologies/nextjs" },
};

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceCta } from "@/components/services/service-cta";

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
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <ServiceHero
        number="01"
        eyebrow="Technologie · Web"
        title={
          <>
            <em>Next.js</em> : le framework
            <br />
            React de production.
          </>
        }
        description="Un socle technique pour les sites et applications qui ont besoin de fonctionnalités sur mesure. Nous l’utilisons quand le projet demande davantage qu’un site de présentation."
      />

      <ServiceFeatures
        number="01"
        eyebrow="Pourquoi Next.js"
        title={
          <>
            Six raisons de <em>miser</em> dessus.
          </>
        }
        intro="Les fondations techniques qui font de Next.js le standard du web moderne."
        features={FEATURES}
      />

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-16">
            <Eyebrow number="02" className="mb-6">Cas d'usage</Eyebrow>
            <h2 className="text-h1">
              Idéal pour ces <em>projets</em>.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {USE_CASES.map((u) => {
              return (
                <div key={u.title} className="editorial-note">
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
            Un projet <em>Next.js</em> à lancer ?
          </>
        }
      />
    </main>
  );
}
