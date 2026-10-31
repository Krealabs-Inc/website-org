export interface Project {
  slug: string;
  name: string;
  sector: string;
  format: string;
  url: string;
  domain: string;
  image: string;
  imageAlt: string;
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
    image: "/projects/iliass.jpg",
    imageAlt: "Façade du campus UniLaSalle Rouen, visuel du site ILIASS",
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
    image: "/projects/main-verte.jpg",
    imageAlt: "Terrasse aménagée par Main Verte, photographie présentée sur son site",
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
    image: "/projects/pas-de-serie.jpg",
    imageAlt: "Visuel de marque Pas de Série : lettrage bleu, tampons et création textile",
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
    image: "/projects/meli-melo.jpg",
    imageAlt: "L’atelier Méli-Mélo Studio, ses matières et ses créations artisanales",
    title: "Une adresse à soi pour des créations faites à la main.",
    summary: "Une boutique à soi pour vendre des créations de reliure, de crochet et de couture.",
    situation: "Méli-Mélo Studio crée des articles utilitaires grâce à des techniques artisanales : reliure, crochet et couture. L’enjeu : réunir la boutique, le portfolio et la présentation de l’atelier au même endroit.",
    work: "Une boutique en ligne à sa propre adresse, complétée par un portfolio, une présentation du studio, une foire aux questions et un contact direct avec la créatrice.",
    result: "La créatrice dispose de sa propre boutique pour vendre ses pièces en direct, avec son portfolio et ses réponses aux questions fréquentes au même endroit.",
    highlights: ["Boutique dédiée aux créations", "Portfolio et présentation du studio", "Contact direct avec la créatrice"],
  },
  {
    slug: "mbe-bihorel",
    name: "MBE Bihorel",
    sector: "Expédition & logistique",
    format: "Concept de refonte · Non contractuel",
    url: "https://mbe.krealabs.fr/",
    domain: "mbe.krealabs.fr",
    image: "/projects/mbe.svg",
    imageAlt: "Visuel de présentation du concept MBE Bihorel, dans ses tons rouge, noir et kraft",
    title: "Faire découvrir les services à travers le voyage d’un colis.",
    summary: "Un concept de refonte pour faire comprendre l’expédition, l’emballage et les services de proximité à travers le voyage d’un colis.",
    situation: "MBE Bihorel propose expédition, logistique, impression et domiciliation. Ce concept de refonte, présenté comme une maquette non contractuelle, explore comment rendre ces services concrets pour un visiteur.",
    work: "Un parcours qui suit les étapes d’un envoi, de l’emballage au départ, un globe pour explorer les destinations et un simulateur de colis en 3D avec un calcul indicatif du poids volumétrique.",
    result: "Maquette non contractuelle : il n’y a pas de résultat client à mesurer. Elle montre comment un site de services de proximité peut se faire comprendre en un seul parcours.",
    highlights: ["Maquette de démonstration, non contractuelle", "Voyage du colis et destinations interactives", "Simulateur 3D et calcul indicatif"],
  },
];
