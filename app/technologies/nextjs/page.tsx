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
  title: "Next.js à Rouen — Framework React production",
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
  { icon: Search, title: "SEO natif", description: "Rendu serveur, métadonnées dynamiques, sitemap auto. Google adore." },
  { icon: Gauge, title: "Performance extrême", description: "Code splitting, lazy loading, image optimization. Sites instantanés." },
  { icon: Rocket, title: "Déploiement simple", description: "Vercel en un clic, ou Docker / AWS / OVH selon vos contraintes." },
  { icon: Globe, title: "CDN global", description: "Pages distribuées dans le monde, latence minimale partout." },
  { icon: Server, title: "Server Components", description: "Logique serveur dans le composant. Moins de JS côté client." },
  { icon: Layers, title: "App Router", description: "Layouts imbriqués, loading states élégants, parallel routes." },
];

const USE_CASES = [
  { icon: Newspaper, title: "Sites éditoriaux & vitrines", description: "Sites institutionnels, blogs, magazines. SEO parfait par défaut." },
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
        description="Le framework React le plus mature et le plus performant en 2025. Server Components, App Router, optimisations automatiques. Notre choix par défaut pour les sites web modernes."
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
            Un projet <em>Next.js</em> à lancer ?
          </>
        }
      />
    </main>
  );
}
