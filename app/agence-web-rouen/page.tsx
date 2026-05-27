import { Metadata } from "next";

import { CityLanding } from "@/components/local/city-landing";
import { CITIES } from "@/lib/cities";

const city = CITIES.rouen;

export const metadata: Metadata = {
  title: city.title,
  description: city.description,
  alternates: { canonical: `https://krealabs.fr${city.path}` },
  openGraph: {
    title: `${city.title} — Krealabs`,
    description: city.description,
    url: `https://krealabs.fr${city.path}`,
    type: "website",
  },
};

// LocalBusiness "branch" schema spécifique à la page HQ Rouen.
// Référence l'org canonique (#organization) via branchOf — pas de duplication
// de l'adresse, juste l'ancrage que cette page = le landing local Rouen.
const rouenBranchSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://krealabs.fr/agence-web-rouen/#localbusiness",
  name: "Krealabs — Agence web à Rouen",
  url: "https://krealabs.fr/agence-web-rouen",
  branchOf: { "@id": "https://krealabs.fr/#organization" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rouen",
    postalCode: "76000",
    addressRegion: "Normandie",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.4431,
    longitude: 1.0993,
  },
  areaServed: { "@type": "City", name: "Rouen" },
};

export default function AgenceWebRouenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rouenBranchSchema) }}
      />
      <CityLanding city={city} />
    </>
  );
}
