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

  dieppe: {
    slug: "dieppe",
    path: "/agence-web-dieppe",
    name: "Dieppe",
    cityArticle: "à Dieppe",
    cityPossessive: "de Dieppe",
    adjective: "dieppoise",
    adjectivePlural: "dieppoises",
    postalCode: "76200",
    region: "Normandie",
    department: "Seine-Maritime",
    inseeCode: "76217",
    population: "29 040",
    metropole: "Communauté d'Agglomération Dieppe-Maritime (76 000 hab)",
    cciName: "CCI Rouen Métropole (antenne Dieppe)",
    geo: { lat: 49.9229, lng: 1.0775 },
    distanceFromRouen: 70,
    heroIntro:
      "Krealabs accompagne les entreprises dieppoises depuis Rouen — 1h15 de route. Dieppe, ville portuaire de Seine-Maritime, concentre une économie tournée vers la pêche, le tourisme balnéaire, les ferries vers l'Angleterre (Newhaven) et un tissu PME local. Nous y intervenons sur la création de sites internet, la refonte SEO et le développement d'applications pour des structures à taille humaine.",
    zonesActivite: [
      "Centre-ville",
      "Quartier du Pollet",
      "Janval",
      "Le Pollet",
      "Saint-Pierre-en-Port (limitrophe)",
      "Zone d'activité du Bois Robin",
    ],
    topSectors: [
      "Tourisme balnéaire",
      "Pêche & aquaculture",
      "Transport maritime",
      "Restauration & hôtellerie",
      "Commerce de proximité",
      "Industrie",
      "Logistique portuaire",
      "Services B2B",
      "BTP",
      "Santé",
      "Associations",
      "Collectivités",
    ],
    landmarks: [
      "Port de Dieppe",
      "Château-musée de Dieppe",
      "Plage de Dieppe",
      "Cité de la Mer",
      "Église Saint-Jacques",
    ],
    title: "Agence web à Dieppe — Création de sites en Seine-Maritime",
    description:
      "Agence web à Dieppe et en Seine-Maritime. Krealabs développe sites internet, applications mobiles et logiciels sur mesure pour les PME dieppoises et normandes. WordPress, Next.js, React Native.",
    keywords: [
      "agence web dieppe",
      "agence digitale dieppe",
      "création site internet dieppe",
      "développement web dieppe",
      "site internet dieppe",
      "agence wordpress dieppe",
      "agence web seine maritime",
      "agence web normandie",
    ],
    cityReason:
      "Dieppe est à 1h15 de notre QG rouennais. Ville portuaire dynamique, elle accueille des entreprises tournées vers la mer, le tourisme et le commerce de proximité — des besoins web spécifiques (saisonnalité, multilingue FR/EN pour les ferries anglais, gestion des réservations). Notre expérience du secteur tourisme balnéaire normand fait la différence.",
  },

  fecamp: {
    slug: "fecamp",
    path: "/agence-web-fecamp",
    name: "Fécamp",
    cityArticle: "à Fécamp",
    cityPossessive: "de Fécamp",
    adjective: "fécampoise",
    adjectivePlural: "fécampoises",
    postalCode: "76400",
    region: "Normandie",
    department: "Seine-Maritime",
    inseeCode: "76259",
    population: "18 540",
    metropole: "Communauté d'agglomération Fécamp Caux Littoral (39 000 hab)",
    cciName: "CCI Rouen Métropole",
    geo: { lat: 49.7558, lng: 0.3713 },
    distanceFromRouen: 90,
    heroIntro:
      "Krealabs intervient à Fécamp et sur la Côte d'Albâtre pour la création de sites internet, applications mobiles et outils métier sur mesure. Cette cité historique du Pays de Caux — connue pour sa Bénédictine, son port de pêche et son patrimoine maritime — concentre des PME et artisans qui méritent une présence web à la hauteur. Nous travaillons depuis Rouen, à 1h30 de Fécamp.",
    zonesActivite: [
      "Centre-ville",
      "Quartier du Port",
      "Saint-Léonard",
      "Quartier de la Plage",
      "Zone d'activité de l'Estran",
    ],
    topSectors: [
      "Tourisme côtier",
      "Pêche & conserverie",
      "Spiritueux (Bénédictine)",
      "Hôtellerie & restauration",
      "Commerce de proximité",
      "Patrimoine & culture",
      "BTP",
      "Services B2B",
      "Santé",
      "Associations",
      "Artisanat",
      "Agroalimentaire",
    ],
    landmarks: [
      "Palais Bénédictine",
      "Port de Fécamp",
      "Plage de Fécamp",
      "Abbatiale de la Sainte-Trinité",
      "Côte d'Albâtre",
    ],
    title: "Agence web à Fécamp — Sites internet & Côte d'Albâtre",
    description:
      "Agence web à Fécamp et sur la Côte d'Albâtre. Krealabs crée des sites internet, applications mobiles et logiciels métier pour les entreprises fécampoises et normandes. WordPress, Next.js.",
    keywords: [
      "agence web fécamp",
      "création site internet fécamp",
      "agence digitale fécamp",
      "développement web fécamp",
      "agence web côte d'albâtre",
      "agence web seine maritime",
      "site internet fécamp",
    ],
    cityReason:
      "Fécamp et la Côte d'Albâtre sont à 1h30 de notre QG rouennais. La ville concentre des PME du tourisme, de l'agroalimentaire (Bénédictine, conserveries) et de la pêche. Ces secteurs ont des besoins web spécifiques : saisonnalité touristique, contenu visuel premium, intégrations e-commerce pour les producteurs locaux. Notre expérience normande est un atout.",
  },

  bayeux: {
    slug: "bayeux",
    path: "/agence-web-bayeux",
    name: "Bayeux",
    cityArticle: "à Bayeux",
    cityPossessive: "de Bayeux",
    adjective: "bayeusaine",
    adjectivePlural: "bayeusaines",
    postalCode: "14400",
    region: "Normandie",
    department: "Calvados",
    inseeCode: "14047",
    population: "13 015",
    metropole: "Bayeux Intercom (29 000 hab)",
    cciName: "CCI Caen Normandie",
    geo: { lat: 49.2764, lng: -0.7027 },
    distanceFromRouen: 145,
    heroIntro:
      "Krealabs intervient à Bayeux et dans le Bessin pour des projets web ambitieux. Cité historique mondialement connue pour sa Tapisserie et son rôle dans le Débarquement, Bayeux concentre un tourisme international fort et un tissu PME tourné vers l'artisanat, la culture, l'hôtellerie haut de gamme et les services aux visiteurs étrangers. Nos clients bayeusains ont des besoins multilingues et une exigence patrimoniale forte.",
    zonesActivite: [
      "Centre historique",
      "Quartier Saint-Patrice",
      "Saint-Vigor-le-Grand (limitrophe)",
      "Zone d'activité de Bellefontaine",
    ],
    topSectors: [
      "Tourisme international",
      "Hôtellerie haut de gamme",
      "Restauration",
      "Artisanat d'art",
      "Patrimoine & musées",
      "Agriculture & élevage",
      "Commerce de proximité",
      "BTP",
      "Services B2B",
      "Santé",
      "Associations",
      "Collectivités",
    ],
    landmarks: [
      "Tapisserie de Bayeux",
      "Cathédrale Notre-Dame de Bayeux",
      "MAHB (Musée d'Art et d'Histoire)",
      "Cimetière militaire britannique",
      "Plages du Débarquement (proximité)",
    ],
    title: "Agence web à Bayeux — Sites internet & multilingue Calvados",
    description:
      "Agence web à Bayeux et dans le Calvados. Krealabs crée des sites internet multilingues, applications et plateformes pour hôtels, restaurants, artisans bayeusains. WordPress, Next.js.",
    keywords: [
      "agence web bayeux",
      "création site internet bayeux",
      "agence digitale bayeux",
      "agence web calvados",
      "site internet bayeux",
      "agence web normandie",
      "site multilingue bayeux",
    ],
    cityReason:
      "Bayeux est à 2h30 de notre QG rouennais. C'est une destination patrimoniale mondiale : la moitié des visiteurs sont étrangers (Anglo-saxons, Japonais, Allemands). Les sites web bayeusains doivent obligatoirement être multilingues (FR / EN minimum, idéalement DE / JA), avec une qualité visuelle premium pour rivaliser avec le standing patrimonial. Notre expérience en sites multilingues fait la différence.",
  },

  cherbourg: {
    slug: "cherbourg",
    path: "/agence-web-cherbourg",
    name: "Cherbourg-en-Cotentin",
    cityArticle: "à Cherbourg",
    cityPossessive: "de Cherbourg",
    adjective: "cherbourgeoise",
    adjectivePlural: "cherbourgeoises",
    postalCode: "50100",
    region: "Normandie",
    department: "Manche",
    inseeCode: "50129",
    population: "78 549",
    metropole: "Communauté d'Agglomération du Cotentin (180 000 hab)",
    cciName: "CCI Ouest Normandie",
    geo: { lat: 49.6336, lng: -1.622 },
    distanceFromRouen: 250,
    heroIntro:
      "Krealabs accompagne les entreprises cherbourgeoises et cotentines à distance, avec déplacements ponctuels selon les besoins. Cherbourg-en-Cotentin, deuxième pôle économique normand, concentre l'industrie navale (Naval Group), le nucléaire (Orano La Hague), un port militaire et commercial majeur, et un écosystème PME dynamique. Nos clients cherbourgeois bénéficient de notre stack moderne pour des projets web sérieux.",
    zonesActivite: [
      "Centre-ville (ex-Cherbourg)",
      "Tourlaville",
      "La Glacerie",
      "Octeville",
      "Équeurdreville-Hainneville",
      "Querqueville",
      "Zone industrialo-portuaire",
    ],
    topSectors: [
      "Industrie navale",
      "Nucléaire (Orano La Hague)",
      "Logistique portuaire",
      "Tourisme & Cité de la Mer",
      "BTP",
      "Services B2B",
      "Hôtellerie & restauration",
      "Pêche",
      "Commerce de proximité",
      "Santé",
      "Associations",
      "Collectivités",
    ],
    landmarks: [
      "Cité de la Mer",
      "Port de Cherbourg",
      "Naval Group",
      "Arsenal de Cherbourg",
      "Théâtre à l'italienne",
    ],
    title: "Agence web à Cherbourg-en-Cotentin — Sites & applications Manche",
    description:
      "Agence web à Cherbourg-en-Cotentin et dans la Manche. Krealabs crée sites internet, applications mobiles et plateformes pour PME et industriels cherbourgeois. WordPress, Next.js, React Native.",
    keywords: [
      "agence web cherbourg",
      "agence web cotentin",
      "création site internet cherbourg",
      "agence digitale manche",
      "site internet cherbourg",
      "agence web normandie",
      "développeur cherbourg",
    ],
    cityReason:
      "Cherbourg est à 2h30 de notre QG rouennais, ce qui permet 1-2 déplacements par projet. Pour les missions au quotidien, nous travaillons en visio + Slack — méthode parfaitement rodée. La spécificité industrielle de Cherbourg (Naval Group, Orano) demande une compréhension B2B technique forte : intégrations ERP, sites institutionnels, plateformes intranet. Stack Next.js + TypeScript adaptée.",
  },

  granville: {
    slug: "granville",
    path: "/agence-web-granville",
    name: "Granville",
    cityArticle: "à Granville",
    cityPossessive: "de Granville",
    adjective: "granvillaise",
    adjectivePlural: "granvillaises",
    postalCode: "50400",
    region: "Normandie",
    department: "Manche",
    inseeCode: "50218",
    population: "12 730",
    metropole: "Communauté de Communes Granville Terre et Mer (28 000 hab)",
    cciName: "CCI Ouest Normandie",
    geo: { lat: 48.8378, lng: -1.5949 },
    distanceFromRouen: 235,
    heroIntro:
      "Krealabs accompagne les entreprises granvillaises et de Granville Terre et Mer à distance, avec déplacements selon les besoins. Granville, surnommée la \"Monaco du Nord\", est un port balnéaire actif avec une économie tournée vers le tourisme, la pêche (premier port coquillier de France), la conchyliculture et le commerce de proximité. Cité de Christian Dior, elle attire une clientèle haut de gamme.",
    zonesActivite: [
      "Centre-ville haute",
      "Centre-ville basse",
      "Port de Granville",
      "Quartier des Saints",
      "Donville-les-Bains (limitrophe)",
      "Zone d'activité de la Tonnellerie",
    ],
    topSectors: [
      "Tourisme balnéaire",
      "Pêche & conchyliculture",
      "Hôtellerie & restauration",
      "Commerce haut de gamme",
      "Artisanat",
      "Patrimoine (Christian Dior)",
      "Nautisme",
      "Services B2B",
      "BTP",
      "Santé",
      "Associations",
      "Collectivités",
    ],
    landmarks: [
      "Port de Granville",
      "Musée Christian Dior",
      "Haute Ville fortifiée",
      "Pointe du Roc",
      "Îles Chausey (au large)",
    ],
    title: "Agence web à Granville — Sites internet & Manche balnéaire",
    description:
      "Agence web à Granville et dans la Manche. Krealabs crée des sites internet, applications et plateformes pour PME granvillaises : tourisme, conchyliculture, commerce. WordPress et Next.js.",
    keywords: [
      "agence web granville",
      "création site internet granville",
      "agence digitale granville",
      "agence web manche",
      "site internet granville",
      "agence web normandie",
      "agence web granville terre et mer",
    ],
    cityReason:
      "Granville est à 2h30 de notre QG rouennais — collaboration majoritairement en visio + Slack, avec 1-2 déplacements clés par projet. Le tissu économique granvillais est dominé par le tourisme balnéaire haut de gamme et la pêche/conchyliculture (Coquilles Saint-Jacques, huîtres, moules). Les sites web granvillais doivent allier image premium, multilingue (FR/EN/DE) et fonctionnalités e-commerce pour la vente directe de produits de la mer.",
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
