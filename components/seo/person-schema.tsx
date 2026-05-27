interface PersonInput {
  name: string;
  jobTitle: string;
  image?: string;
  url?: string;
  sameAs?: string[];
  knowsAbout?: string[];
  bio?: string;
}

interface PersonSchemaProps {
  /** Personnes à baliser */
  persons: PersonInput[];
}

/**
 * PersonSchema — JSON-LD pour les membres de l'équipe.
 * Aide Google à construire le Knowledge Graph autour des co-fondateurs
 * et améliore la visibilité dans les recherches nominatives.
 */
export function PersonSchema({ persons }: PersonSchemaProps) {
  const baseUrl = "https://krealabs.fr";
  const schemas = persons.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.jobTitle,
    image: p.image,
    url: p.url,
    description: p.bio,
    sameAs: p.sameAs?.filter(Boolean),
    knowsAbout: p.knowsAbout,
    // Référence à l'org émise sur / et /notre-histoire. Pas de duplication.
    worksFor: { "@id": `${baseUrl}/#organization` },
    nationality: { "@type": "Country", name: "France" },
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Rouen",
        addressRegion: "Normandie",
        addressCountry: "FR",
      },
    },
  }));

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
