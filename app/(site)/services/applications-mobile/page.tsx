import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Application mobile à Rouen - iOS & Android en React Native",
  description:
    "Vos clients vous ont dans leur poche : une application iOS et Android pour le budget d'une seule. Développement mobile React Native par une agence web à Rouen, en Normandie.",
  alternates: { canonical: "https://krealabs.fr/services/applications-mobile" },
};

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { PhoneHero } from "@/components/services/mobile/phone-hero";
import { PhoneScroll } from "@/components/services/mobile/phone-scroll";
import { PageCta } from "@/components/services/page-cta";
import { rich } from "@/components/ui/rich";
import { getPageTexts } from "@/lib/content/pages";
import { SERVICE_MOBILE } from "@/lib/page-texts/service-mobile";
import { ServiceResources } from "@/components/services/service-resources";
import { ServiceFAQ } from "@/components/services/service-faq";
import { ServiceSchema } from "@/components/seo/service-schema";

export default async function ApplicationsMobilePage() {
  const t = await getPageTexts(SERVICE_MOBILE);
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
      {/* HERO: centred headline, the glass phone standing under it */}
      <PhoneHero>
        <Container className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-10"
          >
            <ArrowLeft className="size-3.5" />
            Retour aux services
          </Link>
          <span className="flex justify-center">
            <Eyebrow number="02" dot className="mb-8">{t.heroEyebrow}</Eyebrow>
          </span>
          <h1 className="text-display">{rich(t.heroTitle)}</h1>
          <p className="text-body-lg text-[var(--muted-foreground)] mx-auto mt-8 max-w-2xl">{t.heroText}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/contact">
                {t.heroCta}
                <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">{t.heroSecondary}</Link>
            </Button>
          </div>
        </Container>
      </PhoneHero>

      {/* SIGNATURE: the pinned phone, one screen per feature */}
      <PhoneScroll
        heading={
          <>
            <Eyebrow number="03" className="mb-5">{t.featuresEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.featuresTitle)}</h2>
          </>
        }
        features={t.features}
      />

      {/* METHOD: steps as cards stacking on top of each other */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="mb-14 max-w-3xl" data-scroll data-reveal="up">
            <Eyebrow number="04" className="mb-6">{t.methodEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.methodTitle)}</h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6">{t.methodText}</p>
          </div>
          <ol className="stack-cards">
            {t.steps.map((step, i) => (
              <li key={step.title} className="stack-card" style={{ "--i": i } as React.CSSProperties}>
                <span className="font-[family-name:var(--font-geist-mono)] text-4xl text-[var(--accent)]">0{i + 1}</span>
                <div>
                  <h3 className="text-h2">{step.title}</h3>
                  <p className="text-body-lg text-[var(--muted-foreground)] mt-4 max-w-2xl">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* STACK: the app's spec sheet */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="mb-12 max-w-3xl" data-scroll data-reveal="up">
            <Eyebrow number="05" className="mb-6">{t.stackEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.stackTitle)}</h2>
          </div>
          <dl className="spec-sheet" data-scroll data-reveal="stagger">
            {t.stack.map((tech) => (
              <div key={tech.name}>
                <dt className="text-caption">{tech.kind}</dt>
                <dd className="text-h4">{tech.name}</dd>
                <dd className="text-body text-[var(--muted-foreground)]">{tech.tagline}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <ServiceFAQ
        title={rich(t.faqTitle)}
        items={t.faq}
      />


      <ServiceResources
        articles={[
          { href: "/blog/prix-application-mobile-2026", kicker: "Budget", title: "Prix d'une application mobile en 2026 : le vrai budget" },
          { href: "/blog/react-native-2026-etat-des-lieux", kicker: "React Native", title: "React Native en 2026 : où on en est vraiment" },
          { href: "/blog/expo-router-production-retours", kicker: "Expo Router", title: "Expo Router en production : retours d'expérience après 12 mois" },
          { href: "/blog/notifications-push-onesignal-firebase-expo", kicker: "Notifications push", title: "Notifications push mobile : OneSignal vs Firebase vs Expo" },
        ]}
      />

      <PageCta t={t} />
    </main>
  );
}
