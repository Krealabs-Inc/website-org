/**
 * LocalBusinessSchema — JSON-LD pour le SEO local Rouen.
 * Type ProfessionalService (subclass de LocalBusiness) optimisé pour Google.
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://krealabs.fr/#organization",
    name: "Krealabs",
    legalName: "Krealabs",
    url: "https://krealabs.fr",
    logo: "https://krealabs.fr/logo.png",
    image: "https://krealabs.fr/og-image.jpg",
    description:
      "Agence web à Rouen spécialisée en développement de sites internet, applications mobiles et logiciels sur mesure. Experts React, Next.js, React Native et TypeScript pour la Normandie.",
    email: "contact@krealabs.fr",
    foundingDate: "2020",
    slogan: "Sites web et logiciels sur mesure, conçus à Rouen.",

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

    areaServed: [
      { "@type": "City", name: "Rouen" },
      { "@type": "City", name: "Le Havre" },
      { "@type": "City", name: "Caen" },
      { "@type": "AdministrativeArea", name: "Normandie" },
      { "@type": "Country", name: "France" },
    ],

    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 49.4431,
        longitude: 1.0993,
      },
      geoRadius: "100000",
    },

    knowsAbout: [
      "WordPress",
      "WooCommerce",
      "Création de site WordPress",
      "Refonte WordPress",
      "Maintenance WordPress",
      "Sécurité WordPress",
      "Headless WordPress",
      "Développement web",
      "Création de site internet",
      "Application mobile",
      "Logiciel sur mesure",
      "PHP",
      "MySQL",
      "JavaScript",
      "TypeScript",
      "Python",
      "React",
      "Next.js",
      "React Native",
      "SEO",
      "SEO local Rouen",
      "Performance web",
      "Core Web Vitals",
      "Design UI/UX",
    ],

    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services Krealabs",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "WordPress sur mesure",
          url: "https://krealabs.fr/services/wordpress",
        },
        {
          "@type": "OfferCatalog",
          name: "Développement web custom",
          url: "https://krealabs.fr/services/developpement-web",
        },
        {
          "@type": "OfferCatalog",
          name: "Applications mobiles",
          url: "https://krealabs.fr/services/applications-mobile",
        },
        {
          "@type": "OfferCatalog",
          name: "Design UI/UX",
          url: "https://krealabs.fr/services/design-uiux",
        },
        {
          "@type": "OfferCatalog",
          name: "Performance & SEO",
          url: "https://krealabs.fr/services/performance-seo",
        },
      ],
    },

    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],

    priceRange: "€€",

    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        email: "contact@krealabs.fr",
        areaServed: "FR",
        availableLanguage: ["French", "English"],
      },
    ],

    sameAs: [
      "https://twitter.com/krealabs_",
      "https://linkedin.com/company/krealabs",
      "https://github.com/krealabs",
    ],
  };

  // AggregateRating env-driven : injecté SEULEMENT si les vars d'env existent.
  // À setter une fois qu'on a la note Google Business réelle (jamais inventer
  // une note — Google pénalise sévèrement les ratings fake).
  // Côté Vercel :
  //   NEXT_PUBLIC_RATING_VALUE=4.9
  //   NEXT_PUBLIC_RATING_COUNT=23
  const ratingValue = process.env.NEXT_PUBLIC_RATING_VALUE;
  const ratingCount = process.env.NEXT_PUBLIC_RATING_COUNT;
  if (ratingValue && ratingCount) {
    (schema as Record<string, unknown>).aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: parseFloat(ratingValue),
      reviewCount: parseInt(ratingCount, 10),
      bestRating: 5,
      worstRating: 1,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
