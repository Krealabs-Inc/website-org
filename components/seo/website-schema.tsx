/**
 * WebSiteSchema — JSON-LD WebSite avec SearchAction.
 * Cible : sitelinks search box pour les requêtes branded "krealabs" dans Google.
 * Pointe vers /search?q={query} (route SSR existante).
 */
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://krealabs.fr/#website",
    url: "https://krealabs.fr",
    name: "Krealabs",
    alternateName: "Krealabs — Agence web Rouen",
    description:
      "Agence digitale à Rouen — sites web, applications mobiles, logiciels sur mesure.",
    inLanguage: "fr-FR",
    publisher: { "@id": "https://krealabs.fr/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://krealabs.fr/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
