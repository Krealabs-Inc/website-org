export interface Project {
  slug: string;
  name: string;
  sector: string;
  format: string;
  // Optional: a product still in development may have no public address.
  url?: string;
  domain?: string;
  title: string;
  summary: string;
  situation: string;
  work: string;
  result: string;
  highlights: string[];
}

// Descriptions based on the public sites. Results describe what the client
// can now do with the site, never traffic, sales or performance figures:
// add numbers only once the client supplies measurements.
export const PROJECTS: Project[] = [
  {
    slug: "iliass",
    name: "ILIASS · UniLaSalle",
    sector: "Enseignement & recherche",
    format: "Plateforme multilingue",
    url: "https://iliass.unilasalle.fr/",
    domain: "iliass.unilasalle.fr",
    title: "Faire circuler les savoirs, au-delà des frontières.",
    summary: "Un espace commun où chercheurs, enseignants et partenaires du réseau lasallien se retrouvent, en trois langues.",
    situation: "Le réseau lasallien réunit chercheurs, enseignants et partenaires de plusieurs pays autour de la recherche, de l’éducation et de la durabilité. L’enjeu : rendre cette activité accessible à une communauté internationale.",
    work: "Une plateforme organisée par sujets et types de contenus (projets, événements, cours, ressources, partenaires), en français, anglais et espagnol, avec un espace de connexion pour les membres.",
    result: "Le réseau dispose d’un point d’entrée unique : chaque membre retrouve projets, événements et ressources au même endroit, en français, en anglais ou en espagnol.",
    highlights: ["Français, anglais et espagnol", "Projets, événements et ressources", "Espace de connexion pour les membres"],
  },
  {
    slug: "main-verte",
    name: "Main Verte",
    sector: "Paysage & aménagement",
    format: "Site vitrine WordPress",
    url: "https://www.main-verte28.fr/",
    domain: "main-verte28.fr",
    title: "Donner à un savoir-faire de terrain sa place en ligne.",
    summary: "Les chantiers d’un paysagiste d’Eure-et-Loir mis en valeur, et la demande de devis à portée de clic.",
    situation: "Pour une entreprise de paysage, la confiance se gagne en montrant ses chantiers. L’enjeu pour Main Verte : présenter son équipe, ses métiers et ses zones d’intervention de façon à rassurer ses futurs clients.",
    work: "Un site vitrine WordPress avec une page par prestation, une galerie de chantiers, des comparaisons avant/après et une demande de devis accessible tout au long du parcours.",
    result: "Les visiteurs voient le travail de Main Verte avant de la contacter, et peuvent demander leur devis depuis n’importe quelle page, sans chercher le formulaire.",
    highlights: ["Galerie de réalisations et avant/après", "Prestations et zones d’intervention", "Demande de devis et contact direct"],
  },
  {
    slug: "pas-de-serie",
    name: "Pas de Série",
    sector: "Mode & création artisanale",
    format: "Site de marque interactif",
    url: "https://pas-de-serie.vercel.app/",
    domain: "pas-de-serie.vercel.app",
    title: "Une pièce unique mérite un univers qui lui ressemble.",
    summary: "Un univers à la hauteur de vêtements peints, brodés et cousus à la main à Rouen.",
    situation: "Pas de Série transforme des vêtements à la main, en pièces uniques et petites séries. L’enjeu : faire sentir le geste de l’atelier autant que montrer les créations disponibles.",
    work: "Un site de marque avec un catalogue visuel, les coulisses de fabrication, un parcours pour apporter son propre vêtement et une composition de stickers à manipuler qui prolonge l’univers de l’atelier.",
    result: "Les visiteurs découvrent l’atelier avant même d’acheter, et peuvent demander une pièce sur mesure ou proposer leur propre vêtement directement depuis le site.",
    highlights: ["Catalogue de pièces et éditions limitées", "Coulisses et demandes sur mesure", "Composition interactive de stickers"],
  },
  {
    slug: "meli-melo",
    name: "Méli-Mélo Studio",
    sector: "Artisanat & création",
    format: "Boutique en ligne",
    url: "https://meli-melo.vercel.app/fr/boutique",
    domain: "meli-melo.vercel.app/fr/boutique",
    title: "Une adresse à soi pour des créations faites à la main.",
    summary: "Une boutique à soi pour vendre des créations de reliure, de crochet et de couture.",
    situation: "Méli-Mélo Studio crée des articles utilitaires grâce à des techniques artisanales : reliure, crochet et couture. L’enjeu : réunir la boutique, le portfolio et la présentation de l’atelier au même endroit.",
    work: "Une boutique en ligne à sa propre adresse, complétée par un portfolio, une présentation du studio, une foire aux questions et un contact direct avec la créatrice.",
    result: "La créatrice dispose de sa propre boutique pour vendre ses pièces en direct, avec son portfolio et ses réponses aux questions fréquentes au même endroit.",
    highlights: ["Boutique dédiée aux créations", "Portfolio et présentation du studio", "Contact direct avec la créatrice"],
  },
  {
    slug: "traversia",
    name: "Traversia",
    sector: "Tourisme & plein air",
    format: "Site vitrine & réservation",
    url: "https://traversia.vercel.app/",
    domain: "traversia.vercel.app",
    title: "Faire comprendre une aventure avant même de la réserver.",
    summary: "Des packs randonnée et canoë en Normandie, présentés parcours par parcours, jusqu’à la réservation en ligne.",
    situation: "Traversia conçoit des journées qui associent une randonnée et une descente en canoë sur un même territoire normand. L’enjeu : faire comprendre ce format peu courant, et donner envie de réserver une date.",
    work: "Un site qui explique le principe d’une journée type, présente trois parcours (Suisse normande, Roche d’Oëtre, Boucle des Andelys) avec distance, dénivelé, durée, taille de groupe et tarif, et mène à la réservation en ligne.",
    result: "Les visiteurs comprennent le principe et comparent les parcours sur des critères concrets avant de réserver, sans avoir à poser la question par téléphone.",
    highlights: ["Trois parcours détaillés et comparables", "Carte des parcours", "Réservation en ligne"],
  },
  {
    slug: "mbe-bihorel",
    name: "MBE Bihorel",
    sector: "Expédition & logistique",
    format: "Concept de refonte · Non contractuel",
    url: "https://mbe.krealabs.fr/",
    domain: "mbe.krealabs.fr",
    title: "Faire découvrir les services à travers le voyage d’un colis.",
    summary: "Un concept de refonte pour faire comprendre l’expédition, l’emballage et les services de proximité à travers le voyage d’un colis.",
    situation: "MBE Bihorel propose expédition, logistique, impression et domiciliation. Ce concept de refonte, présenté comme une maquette non contractuelle, explore comment rendre ces services concrets pour un visiteur.",
    work: "Un parcours qui suit les étapes d’un envoi, de l’emballage au départ, un globe pour explorer les destinations et un simulateur de colis en 3D avec un calcul indicatif du poids volumétrique.",
    result: "Maquette non contractuelle : il n’y a pas de résultat client à mesurer. Elle montre comment un site de services de proximité peut se faire comprendre en un seul parcours.",
    highlights: ["Maquette de démonstration, non contractuelle", "Voyage du colis et destinations interactives", "Simulateur 3D et calcul indicatif"],
  },
  {
    slug: "ardoise",
    name: "Ardoise",
    sector: "Gestion & facturation",
    format: "Produit Krealabs · En développement",
    title: "Facturer, relancer et suivre sa trésorerie au même endroit.",
    summary: "Notre application de facturation pour indépendants, conçue et développée en interne, sur ordinateur comme sur mobile.",
    situation: "Pour un indépendant, facturer, relancer un client en retard et suivre sa trésorerie se fait souvent entre un tableur, un traitement de texte et sa boîte mail. Ardoise est notre réponse : une seule application pensée pour les indépendants français.",
    work: "Une application web installable sur ordinateur et mobile, avec ses règles de calcul testées (montants, totaux, numérotation, statuts), la liste et le détail des factures, la création de facture avec totaux en direct, et son site vitrine. Devis, relances planifiées, dépenses et trésorerie arrivent ensuite.",
    result: "Produit en cours de développement : il n’y a pas encore de résultat utilisateur à mesurer. Il montre comment nous concevons un logiciel métier de bout en bout, des règles de calcul jusqu’à l’interface.",
    highlights: ["Produit conçu et développé par Krealabs", "Une seule app pour ordinateur et mobile", "Factures : création, liste, filtres et détail"],
  },
];
