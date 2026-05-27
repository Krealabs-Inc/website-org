interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  /** Type spécifique (ex: "Création de site WordPress") */
  serviceType?: string;
  /** Catégorie (ex: "WebDesign", "MobileApplication") */
  serviceOutput?: string;
  /** Sous-offres pour OfferCatalog */
  offers?: Array<{ name: string; description?: string }>;
  /** Prix indicatif si pertinent */
  priceRange?: string;
}

/**
 * ServiceSchema — JSON-LD pour une page service.
 * Aide Google à comprendre le catalogue d'offres précis.
 */
export function ServiceSchema({
  name,
  description,
  url,
  serviceType,
  serviceOutput,
  offers,
  priceRange,
}: ServiceSchemaProps) {
  const baseUrl = "https://krealabs.fr";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    ...(serviceType && { serviceType }),
    ...(serviceOutput && { serviceOutput }),
    // Référence à l'org émise sur / et /notre-histoire. Pas de duplication.
    provider: { "@id": `${baseUrl}/#organization` },
    areaServed: [
      { "@type": "City", name: "Rouen" },
      { "@type": "City", name: "Le Havre" },
      { "@type": "City", name: "Caen" },
      { "@type": "AdministrativeArea", name: "Normandie" },
      { "@type": "Country", name: "France" },
    ],
    ...(priceRange && { priceRange }),
    ...(offers &&
      offers.length > 0 && {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Offres ${name}`,
          itemListElement: offers.map((o, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: {
              "@type": "Service",
              name: o.name,
              ...(o.description && { description: o.description }),
            },
          })),
        },
      }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
