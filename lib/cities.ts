/**
 * Données city-specific pour les landing pages locales SEO.
 * Chaque ville a son propre contenu pour éviter le duplicate content :
 * intro, secteurs économiques pertinents, landmarks, raisons de proximité.
 */

export interface CityData {
  /** Slug URL : "rouen", "le-havre", "caen", "evreux" */
  slug: string;
  /** URL relative : "/agence-web-rouen" */
  path: string;
  /** Nom : "Rouen" */
  name: string;
  /** Préposition + nom : "à Rouen", "au Havre" */
  cityArticle: string;
  /** Préposition + nom + virgule : "de Rouen", "du Havre" */
  cityPossessive: string;
  /** Adjectif gentilé : "rouennaise", "havraise", "caennaise", "ébroïcienne" */
  adjective: string;
  /** Gentilé pluriel : "rouennaises", "havraises", etc. */
  adjectivePlural: string;
  /** Code postal principal : "76000" */
  postalCode: string;
  /** Région : "Normandie" */
  region: string;
  /** Département : "Seine-Maritime" */
  department: string;
  /** Code INSEE : "76540" */
  inseeCode: string;
  /** Population (ville seule) : "112 974" */
  population: string;
  /** Métropole / agglo : "Métropole Rouen Normandie (492 681 hab)" */
  metropole: string;
  /** CCI référente : "CCI Rouen Métropole" */
  cciName: string;
  /** Coordonnées GPS pour Schema LocalBusiness */
  geo: { lat: number; lng: number };
  /** Distance routière depuis Krealabs HQ Rouen (en km) */
  distanceFromRouen: number;
  /** Hero — intro paragraph unique pour cette ville */
  heroIntro: string;
  /** Liste de quartiers / zones d'activité */
  zonesActivite: string[];
  /** Top secteurs économiques de la ville */
  topSectors: string[];
  /** Landmarks notables pour signal pertinence locale */
  landmarks: string[];
  /** Title HTML */
  title: string;
  /** Meta description */
  description: string;
  /** Keywords meta */
  keywords: string[];
  /** Une ou deux raisons spécifiques à la ville (en plus des génériques) */
  cityReason: string;
}

export const CITIES: Record<string, CityData> = {
  rouen: {
    slug: "rouen",
    path: "/agence-web-rouen",
    name: "Rouen",
    cityArticle: "à Rouen",
    cityPossessive: "de Rouen",
    adjective: "rouennaise",
    adjectivePlural: "rouennaises",
    postalCode: "76000",
    region: "Normandie",
    department: "Seine-Maritime",
    inseeCode: "76540",
    population: "112 974",
    metropole: "Métropole Rouen Normandie (492 681 hab)",
    cciName: "CCI Rouen Métropole",
    geo: { lat: 49.4431, lng: 1.0993 },
    distanceFromRouen: 0,
    heroIntro:
      "Krealabs est une agence digitale basée à Rouen, spécialisée dans la création de sites internet, le développement d'applications mobiles et de logiciels sur mesure. Nous accompagnons les PME, startups et grandes entreprises rouennaises et normandes dans leur transformation digitale.",
    zonesActivite: [
      "Centre-ville",
      "Saint-Sever",
      "Mont-Saint-Aignan",
      "Petit-Quevilly",
      "Saint-Étienne-du-Rouvray",
      "Madrillet",
      "Bois-Guillaume",
    ],
    topSectors: [
      "Industrie",
      "Immobilier",
      "Santé",
      "Restauration",
      "Commerce",
      "BTP",
      "Services B2B",
      "Associations",
      "Collectivités",
      "Tourisme",
      "Logistique",
      "Cabinet conseil",
    ],
    landmarks: [
      "Place du Vieux-Marché",
      "Cathédrale Notre-Dame",
      "Gros-Horloge",
      "Métropole Rouen Normandie",
      "Université de Rouen",
    ],
    title: "Agence web à Rouen — Création de sites & applications",
    description:
      "Krealabs, agence web à Rouen en Normandie. Création de sites internet, applications mobiles et logiciels sur mesure pour les entreprises rouennaises. Devis gratuit sous 24h.",
    keywords: [
      "agence web rouen",
      "agence digitale rouen",
      "création site internet rouen",
      "développement web rouen",
      "agence web normandie",
      "création site internet normandie",
      "agence digitale normandie",
      "développeur rouen",
      "agence rouen",
      "site internet rouen",
    ],
    cityReason:
      "Basés en plein centre de Rouen, nous pouvons nous déplacer dans la journée chez nos clients du Petit-Quevilly à Bois-Guillaume, et participer aux événements FrenchTech Normandie et CCI Rouen Métropole.",
  },

  "le-havre": {
    slug: "le-havre",
    path: "/agence-web-le-havre",
    name: "Le Havre",
    cityArticle: "au Havre",
    cityPossessive: "du Havre",
    adjective: "havraise",
    adjectivePlural: "havraises",
    postalCode: "76600",
    region: "Normandie",
    department: "Seine-Maritime",
    inseeCode: "76351",
    population: "165 830",
    metropole: "Communauté urbaine Le Havre Seine Métropole (267 526 hab)",
    cciName: "CCI Seine Estuaire",
    geo: { lat: 49.4944, lng: 0.1079 },
    distanceFromRouen: 88,
    heroIntro:
      "Krealabs est une agence web normande qui accompagne les entreprises havraises dans la création de leurs sites internet, applications mobiles et logiciels métier. Port industriel majeur, Le Havre concentre des PME et grands comptes des secteurs logistique, énergie, maritime et industrie — des besoins spécifiques que nous savons cadrer.",
    zonesActivite: [
      "Ville haute",
      "Port autonome",
      "Caucriauville",
      "Plateau Nord",
      "Sainte-Adresse (limitrophe)",
      "Harfleur (limitrophe)",
    ],
    topSectors: [
      "Logistique portuaire",
      "Industrie maritime",
      "Énergie",
      "Pétrochimie",
      "Import-export",
      "Tourisme balnéaire",
      "BTP",
      "Services B2B",
      "Commerce",
      "Restauration",
      "Santé",
      "Associations",
    ],
    landmarks: [
      "Port autonome du Havre",
      "Volcan / Bibliothèque Niemeyer",
      "Plage du Havre",
      "Université Le Havre Normandie",
      "Quartier Saint-François",
    ],
    title: "Agence web au Havre — Création de sites & applications en Normandie",
    description:
      "Agence web au Havre et en Normandie. Krealabs accompagne les entreprises havraises : sites internet, applications mobiles, logiciels sur mesure. Spécialiste WordPress, Next.js, React Native. Devis 24h.",
    keywords: [
      "agence web le havre",
      "agence digitale le havre",
      "création site internet le havre",
      "développement web le havre",
      "agence web normandie",
      "développeur le havre",
      "site internet le havre",
      "agence web seine maritime",
      "agence wordpress le havre",
    ],
    cityReason:
      "Le Havre est à 1h de route de notre QG rouennais. Nous nous déplaçons régulièrement pour nos clients havrais — kick-off projet, ateliers UX, formations équipe sur site. La spécificité industrielle et portuaire de la ville demande une connaissance terrain : intégrations ERP, contraintes logistiques, contenu B2B technique.",
  },

  caen: {
    slug: "caen",
    path: "/agence-web-caen",
    name: "Caen",
    cityArticle: "à Caen",
    cityPossessive: "de Caen",
    adjective: "caennaise",
    adjectivePlural: "caennaises",
    postalCode: "14000",
    region: "Normandie",
    department: "Calvados",
    inseeCode: "14118",
    population: "105 354",
    metropole: "Caen la Mer (266 800 hab)",
    cciName: "CCI Caen Normandie",
    geo: { lat: 49.1829, lng: -0.3707 },
    distanceFromRouen: 120,
    heroIntro:
      "Krealabs est une agence web qui sert les entreprises caennaises depuis Rouen — 1h30 de route, accessibilité fluide pour les RDV stratégiques. Caen concentre un tissu PME dynamique sur l'agroalimentaire, la recherche (GANIL, Université), la santé et les services. Nous intervenons sur la création de sites internet, le développement d'applications et la refonte SEO pour des structures de toutes tailles.",
    zonesActivite: [
      "Centre-ville",
      "Hérouville-Saint-Clair",
      "Mondeville",
      "Ifs",
      "Bretteville-sur-Odon",
      "Cormelles-le-Royal",
      "Bénouville",
    ],
    topSectors: [
      "Agroalimentaire",
      "Recherche & enseignement",
      "Santé & pharma",
      "Tourisme",
      "Industrie",
      "Services B2B",
      "Commerce",
      "Restauration",
      "Immobilier",
      "BTP",
      "Associations",
      "Collectivités",
    ],
    landmarks: [
      "Mémorial de Caen",
      "Château ducal",
      "Abbaye aux Hommes",
      "Université Caen Normandie",
      "GANIL (recherche nucléaire)",
    ],
    title: "Agence web à Caen — Création de sites & applications en Normandie",
    description:
      "Agence web à Caen et en Normandie. Krealabs développe sites internet, applications mobiles et logiciels sur mesure pour les PME et startups caennaises. Spécialiste WordPress, Next.js. Devis gratuit sous 24h.",
    keywords: [
      "agence web caen",
      "agence digitale caen",
      "création site internet caen",
      "développement web caen",
      "agence web calvados",
      "développeur caen",
      "site internet caen",
      "agence wordpress caen",
      "agence web normandie",
    ],
    cityReason:
      "Caen est la deuxième ville de Normandie après Le Havre, avec un écosystème universitaire et de recherche très fort (Université de Caen, GANIL, écoles d'ingénieurs). Cela génère des besoins spécifiques en plateformes web académiques, applications scientifiques, et outils métier pour spin-offs. Notre stack moderne (Next.js, TypeScript, Python) est particulièrement adaptée.",
  },

  evreux: {
    slug: "evreux",
    path: "/agence-web-evreux",
    name: "Évreux",
    cityArticle: "à Évreux",
    cityPossessive: "d'Évreux",
    adjective: "ébroïcienne",
    adjectivePlural: "ébroïciennes",
    postalCode: "27000",
    region: "Normandie",
    department: "Eure",
    inseeCode: "27229",
    population: "47 470",
    metropole: "Évreux Portes de Normandie (113 000 hab)",
    cciName: "CCI Portes de Normandie",
    geo: { lat: 49.0241, lng: 1.1508 },
    distanceFromRouen: 56,
    heroIntro:
      "Krealabs accompagne les entreprises ébroïciennes et euroises depuis Rouen, à 1h de route d'Évreux. Préfecture de l'Eure et carrefour entre la Normandie, l'Île-de-France et le Centre-Val de Loire, Évreux concentre PME industrielles, commerce, santé et services publics. Nous y intervenons en création de sites web, refonte SEO et logiciels métier pour des structures à taille humaine.",
    zonesActivite: [
      "Centre-ville",
      "Nétreville",
      "La Madeleine",
      "Cambolle",
      "Saint-Michel",
      "Navarre",
      "Zone d'activité du Long Buisson",
    ],
    topSectors: [
      "Industrie pharmaceutique",
      "Agroalimentaire",
      "Logistique",
      "Commerce de proximité",
      "Santé",
      "Services publics",
      "BTP",
      "Services B2B",
      "Restauration",
      "Tourisme",
      "Associations",
      "Cabinet conseil",
    ],
    landmarks: [
      "Cathédrale Notre-Dame",
      "Musée d'Art, Histoire et Archéologie",
      "Base aérienne 105",
      "CHI Eure-Seine",
      "Préfecture de l'Eure",
    ],
    title: "Agence web à Évreux — Création de sites & applications en Eure / Normandie",
    description:
      "Agence web à Évreux et dans l'Eure. Krealabs développe sites internet, applications mobiles et logiciels sur mesure pour les PME ébroïciennes et euroises. WordPress, Next.js, React Native. Devis 24h.",
    keywords: [
      "agence web évreux",
      "agence digitale évreux",
      "création site internet évreux",
      "développement web évreux",
      "agence web eure",
      "agence web normandie",
      "site internet évreux",
      "agence wordpress évreux",
      "développeur évreux",
    ],
    cityReason:
      "Évreux est à 1h de Rouen et 1h30 de Paris — un positionnement stratégique pour des PME qui veulent rayonner sur les 2 marchés. Le tissu économique ébroïcien est dominé par l'industrie pharmaceutique (GSK, Sanofi à proximité), l'agroalimentaire et la logistique. Nos clients ébroïciens cherchent souvent à combiner SEO local (Évreux, Eure) et capacité à attirer des prospects parisiens.",
  },
};

export const CITY_SLUGS = Object.keys(CITIES);
