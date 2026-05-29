/**
 * FAQ localisées par ville pour les landing pages /agence-web-{city}.
 * 4 questions par ville couvrant : tarifs, organisation, secteurs locaux, SEO local.
 * Alimente le composant FAQ + le schéma FAQPage (rich results Google).
 */

export interface CityFAQItem {
  question: string;
  answer: string;
}

export const CITY_FAQ: Record<string, CityFAQItem[]> = {
  rouen: [
    {
      question: "Combien coûte un site internet à Rouen ?",
      answer:
        "Un site vitrine professionnel à Rouen est facturé entre 4 000 et 12 000 € selon la complexité. Une application mobile démarre à 30 000 € (React Native), un logiciel SaaS sur mesure à partir de 25 000 € pour un MVP. Le premier échange est offert, le devis est gratuit et rendu sous 24 heures ouvrées.",
    },
    {
      question: "Krealabs est-elle vraiment basée à Rouen ou tout se fait à distance ?",
      answer:
        "Krealabs est basée à Rouen — nous pouvons nous déplacer du Petit-Quevilly à Bois-Guillaume dans la journée. Les ateliers de cadrage, kick-offs et formations se tiennent en présentiel sur demande. Pour les phases de production, nous travaillons principalement en visio et sur les outils collaboratifs, ce qui n'enlève rien à la disponibilité.",
    },
    {
      question: "Quels secteurs rouennais accompagnez-vous le plus souvent ?",
      answer:
        "Notre portefeuille rouennais couvre l'industrie, l'immobilier, la santé, la logistique et les cabinets de conseil. Nous travaillons aussi avec des associations, des collectivités et des PME du BTP. La métropole Rouen Normandie, avec ses 492 000 habitants, génère une demande variée — sites vitrine, outils métier sur mesure et applications internes.",
    },
    {
      question: "Comment Krealabs améliore-t-elle la visibilité locale d'une entreprise rouennaise ?",
      answer:
        "Nous travaillons le référencement naturel (SEO on-page, maillage interne, Core Web Vitals) et le SEO local : balisage schema.org LocalBusiness, cohérence NAP, optimisation Google Business Profile. Pour une PME rouennaise, l'objectif est d'apparaître sur les requêtes géolocalisées — \"plombier Rouen\", \"cabinet comptable Rouen\" — et dans le pack local de Google.",
    },
  ],

  "le-havre": [
    {
      question: "Combien coûte un site internet au Havre ?",
      answer:
        "Les tarifs s'appliquent quelle que soit la ville : site vitrine entre 4 000 et 12 000 €, application mobile à partir de 30 000 €, logiciel SaaS dès 25 000 € en MVP. Pour les entreprises havraises du secteur portuaire ou logistique, les projets d'intégration ERP sont tarifés sur devis spécifique. Premier échange offert, réponse sous 24h.",
    },
    {
      question: "Vous déplacez-vous au Havre ou tout se passe en visio ?",
      answer:
        "Le Havre est à 88 km de notre QG rouennais — environ 1h de route. Nous nous déplaçons pour les kick-offs projet, les ateliers UX et les formations équipe sur site. La production au quotidien se gère en visio et Slack, mais la proximité normande permet des rencontres régulières quand elles apportent une vraie valeur.",
    },
    {
      question: "Avez-vous de l'expérience dans les secteurs industriels et portuaires du Havre ?",
      answer:
        "Oui. Le tissu havrais — logistique portuaire, industrie maritime, import-export, énergie et pétrochimie — génère des besoins B2B spécifiques : intégrations ERP, sites institutionnels techniques, portails fournisseurs, contenu en anglais. Nous savons cadrer ces projets complexes et avons l'habitude des interlocuteurs grands comptes tout comme des PME havraises.",
    },
    {
      question: "Comment référencer une entreprise havraise sur Google ?",
      answer:
        "Nous déployons une stratégie SEO local au Havre : optimisation Google Business Profile, balisage schema.org LocalBusiness avec les coordonnées havraises, travail des mots-clés géolocalisés (Seine-Maritime, communauté urbaine Le Havre Seine Métropole) et construction du maillage interne. Les entreprises du port et du commerce havrais gagnent en visibilité sur les recherches locales et B2B.",
    },
  ],

  caen: [
    {
      question: "Combien coûte un site internet à Caen ?",
      answer:
        "Un site vitrine caennais est facturé entre 4 000 et 12 000 € selon les fonctionnalités. Pour les structures académiques et spin-offs liées à l'Université de Caen ou au GANIL, une application ou plateforme sur mesure part de 25 000 € (MVP SaaS). Le devis est gratuit, le premier échange offert, retour sous 24 heures ouvrées.",
    },
    {
      question: "Comment se passe la collaboration avec une entreprise caennaise depuis Rouen ?",
      answer:
        "Caen est à 120 km — 1h30 de route. Nous planifions 1 à 2 déplacements par projet pour les phases stratégiques : cadrage, validation maquettes, formation. Le reste se gère à distance avec les mêmes outils qu'en présentiel. Ce mode de travail est habituel pour nous sur l'ensemble de la Normandie.",
    },
    {
      question: "Vous connaissez les secteurs spécifiques à Caen — agroalimentaire, recherche, santé ?",
      answer:
        "L'écosystème caennais est atypique : université et grandes écoles d'ingénieurs, GANIL, secteur agroalimentaire et pharma, tourisme mémoriel. Nous accompagnons des plateformes académiques, des sites pour PME agroalimentaires du Calvados et des structures de santé. Notre stack Next.js et TypeScript est bien adaptée aux projets techniques issus du milieu recherche.",
    },
    {
      question: "Comment Krealabs améliore-t-elle le référencement local d'une entreprise caennaise ?",
      answer:
        "Nous ciblons les requêtes locales propres au Calvados et à Caen la Mer : optimisation Google Business Profile, balisage schema.org avec les données de l'agglo, travail des contenus géolocalisés. Pour les structures qui rayonnent sur toute la Normandie, nous articulons SEO local caennais et SEO régional normand, avec une architecture de pages cohérente.",
    },
  ],

  dieppe: [
    {
      question: "Combien coûte un site internet à Dieppe ?",
      answer:
        "Un site vitrine pour une PME dieppoise est facturé entre 4 000 et 12 000 €. Pour les structures touristiques ou de transport maritime qui ont besoin d'un outil de réservation ou d'une version multilingue FR/EN, le périmètre est établi sur devis. Le premier échange est offert, devis gratuit sous 24h.",
    },
    {
      question: "Intervenez-vous sur place à Dieppe ou tout se fait à distance ?",
      answer:
        "Dieppe est à 70 km de Rouen — 1h15 de route. Nous pouvons nous déplacer pour les réunions importantes. Pour les projets à enjeu (tourisme balnéaire, hôtellerie, commerce de proximité), un déplacement de cadrage en début de mission est souvent utile pour comprendre le contexte local et l'ambiance que vous souhaitez transmettre.",
    },
    {
      question: "Vous connaissez les secteurs dieppois — tourisme, pêche, ferries ?",
      answer:
        "Oui. Dieppe concentre des PME du tourisme balnéaire, de la pêche, de l'aquaculture et du transport maritime vers Newhaven. Ces activités ont des contraintes spécifiques : saisonnalité forte, contenus bilingues FR/EN pour les voyageurs britanniques, gestion de réservations ou de calendriers. Notre expérience du secteur côtier normand nous permet de cadrer ces besoins sans partir de zéro.",
    },
    {
      question: "Comment référencer une entreprise dieppoise sur Google Maps et en local ?",
      answer:
        "Nous travaillons le SEO local dieppois : cohérence NAP (nom, adresse, téléphone) sur les annuaires, optimisation de la fiche Google Business Profile, balisage schema.org LocalBusiness pour la Seine-Maritime. Pour les activités saisonnières, nous ajustons aussi les balises d'heures d'ouverture et les contenus selon la période touristique.",
    },
  ],

  fecamp: [
    {
      question: "Combien coûte un site internet à Fécamp ?",
      answer:
        "Les tarifs sont les mêmes qu'à Rouen : site vitrine entre 4 000 et 12 000 €, application mobile à partir de 30 000 €, logiciel sur mesure dès 25 000 € (MVP). Pour les artisans, hôteliers et entreprises agroalimentaires fécampois, un site vitrine ou une boutique en ligne représente souvent l'investissement le plus adapté. Devis gratuit, réponse sous 24h.",
    },
    {
      question: "Vous déplacez-vous à Fécamp pour les réunions clients ?",
      answer:
        "Fécamp est à 90 km de Rouen — 1h30 de route en longeant la Côte d'Albâtre. Nous intervenons sur place pour les projets qui le justifient : cadrage initial, séances de direction artistique ou formation. Le travail quotidien se déroule à distance (visio, partage d'écran, outils de gestion de projet), ce qui ne change pas la qualité du suivi.",
    },
    {
      question: "Avez-vous une expérience des secteurs fécampois — tourisme côtier, Bénédictine, pêche ?",
      answer:
        "Le tissu fécampois est particulier : tourisme côtier, pêche et conserveries, spiritueux (Bénédictine), artisanat, hôtellerie-restauration. Ces secteurs ont besoin de sites à forte identité visuelle, parfois d'e-commerce pour la vente directe (produits de la mer, spiritueux), et d'une gestion de la saisonnalité. Notre connaissance de la Côte d'Albâtre normande est un point de départ solide.",
    },
    {
      question: "Comment améliorer la visibilité en ligne d'une entreprise fécampoise ?",
      answer:
        "Nous combinons SEO technique et SEO local pour les entreprises de Fécamp et du pays de Caux : optimisation Google Business Profile, balisage schema.org LocalBusiness ancré en Seine-Maritime, contenu géolocalisé ciblant les requêtes comme \"hôtel Fécamp\" ou \"restaurant Côte d'Albâtre\". Pour les activités à forte audience touristique estivale, le travail de visibilité doit anticiper la saisonnalité.",
    },
  ],

  bayeux: [
    {
      question: "Combien coûte un site internet à Bayeux ?",
      answer:
        "Un site vitrine multilingue pour une structure touristique bayeusaine (hôtel, restaurant, musée) est facturé entre 5 000 et 12 000 € selon le nombre de langues et les fonctionnalités. La dimension multilingue (FR / EN, parfois DE ou JA) est quasi systématique pour les acteurs du tourisme patrimonial bayeusain. Devis gratuit, premier échange offert.",
    },
    {
      question: "Comment travaillez-vous avec des clients à Bayeux, à 145 km de Rouen ?",
      answer:
        "Bayeux est à environ 2h30 de route. Nous fonctionnons principalement en visio pour le suivi courant, avec 1 à 2 déplacements par projet pour les moments clés. Les clients bayeusains de l'hôtellerie et du tourisme ont l'habitude de travailler avec des prestataires distants — ce mode de fonctionnement ne pose aucune difficulté en pratique.",
    },
    {
      question: "Comprenez-vous les enjeux du tourisme patrimonial et de l'artisanat d'art à Bayeux ?",
      answer:
        "Bayeux concentre tourisme international (Tapisserie, Mémorial, Plages du Débarquement), hôtellerie haut de gamme, artisanat d'art et commerce de proximité. Ces secteurs exigent des sites visuellement soignés, multilingues et optimisés pour une clientèle étrangère (Anglo-saxons, Japonais, Allemands). Nous intégrons ces contraintes dès la phase de conception, sans les traiter comme un cas particulier.",
    },
    {
      question: "Comment référencer une entreprise bayeusaine auprès des visiteurs étrangers et locaux ?",
      answer:
        "Le SEO à Bayeux a deux dimensions : local (Calvados, Bessin, Normandie) et international (requêtes en anglais, allemand). Nous travaillons les balises hreflang pour le multilingue, le balisage schema.org TouristAttraction ou LocalBusiness selon l'activité, et l'optimisation Google Business Profile avec des descriptions dans toutes les langues actives. La visibilité sur les requêtes anglaises est souvent sous-exploitée.",
    },
  ],

  cherbourg: [
    {
      question: "Combien coûte un site internet à Cherbourg ?",
      answer:
        "Nos tarifs sont identiques quelle que soit la localisation : site vitrine entre 4 000 et 12 000 €, application mobile à partir de 30 000 €, plateforme SaaS ou intranet dès 25 000 € (MVP). Pour les industriels cherbourgeois (Naval Group, sous-traitants Orano), les projets sont souvent des outils métier ou des plateformes institutionnelles — tarifés sur devis selon le périmètre fonctionnel.",
    },
    {
      question: "À 250 km de Rouen, comment organisez-vous les projets avec des clients cherbourgeois ?",
      answer:
        "Cherbourg est à 2h30 de route — la distance la plus importante de notre zone d'intervention normande. Nous planifions 1 à 2 déplacements par projet pour les moments stratégiques (kick-off, validation prototype). Le reste de la collaboration se fait en visio, Slack et outils de gestion de projet asynchrone. Ce mode de travail est totalement opérationnel pour des projets industriels sérieux.",
    },
    {
      question: "Vous connaissez les secteurs industriels et navals cherbourgeois ?",
      answer:
        "Cherbourg-en-Cotentin concentre l'industrie navale (Naval Group), le nucléaire (Orano La Hague), la logistique portuaire et un tissu de PME de sous-traitance industrielle. Ces entreprises ont besoin d'outils B2B sérieux : sites institutionnels en anglais, portails fournisseurs, intranets. Notre compréhension des contraintes B2B industrielles nous permet de cadrer ces projets sans phase de découverte inutilement longue.",
    },
    {
      question: "Comment améliorer la visibilité d'une entreprise cherbourgeoise dans la Manche ?",
      answer:
        "Nous travaillons le SEO local ancré dans la Manche et la communauté d'agglomération du Cotentin : balisage schema.org avec les coordonnées cherbourgeoises, optimisation Google Business Profile, contenu géolocalisé ciblant les requêtes du Cotentin. Pour les entreprises industrielles, l'objectif est souvent moins le pack local que la visibilité sur des requêtes B2B spécifiques — nous adaptons la stratégie en conséquence.",
    },
  ],

  granville: [
    {
      question: "Combien coûte un site internet à Granville ?",
      answer:
        "Un site vitrine pour une entreprise granvillaise est facturé entre 4 000 et 12 000 €. Pour les acteurs de la pêche, conchyliculture ou commerce haut de gamme qui souhaitent vendre en ligne, une boutique e-commerce ou un outil de commande directe (huîtres, coquilles Saint-Jacques) est chiffré sur devis. Premier échange offert, devis gratuit sous 24h.",
    },
    {
      question: "À 235 km de Rouen, comment collaborez-vous avec des clients granvillais ?",
      answer:
        "Granville est à 2h30 de route. La collaboration quotidienne se déroule en visio et Slack — un mode de travail rodé pour notre équipe. Nous prévoyons 1 à 2 déplacements par projet selon les besoins : cadrage initial, validation de maquettes sur site, ou formation de l'équipe cliente. La distance ne réduit pas la qualité du suivi.",
    },
    {
      question: "Comprenez-vous les spécificités du tourisme balnéaire et de la conchyliculture granvillaise ?",
      answer:
        "Granville concentre tourisme haut de gamme, pêche, conchyliculture (premier port coquillier de France), nautisme et commerce de qualité — avec la dimension Christian Dior en prime. Ces secteurs demandent des sites à image soignée, souvent multilingues FR/EN/DE, avec parfois de la vente directe de produits de la mer. Notre expérience côtière normande est directement applicable.",
    },
    {
      question: "Comment référencer une entreprise granvillaise sur Google et attirer une clientèle touristique ?",
      answer:
        "Le SEO granvillais cible deux audiences : les locaux de la Manche et les touristes qui cherchent en ligne avant de venir. Nous travaillons l'optimisation Google Business Profile, le balisage schema.org LocalBusiness, les contenus géolocalisés pour la Manche et Granville Terre et Mer. Pour les hébergements et restaurants, l'intégration des avis et la présence sur les requêtes saisonnières sont prioritaires.",
    },
  ],

  evreux: [
    {
      question: "Combien coûte un site internet à Évreux ?",
      answer:
        "Un site vitrine professionnel à Évreux coûte entre 4 000 et 12 000 €. Les PME industrielles ou pharmaceutiques ébroïciennes ont parfois besoin d'outils plus complexes — logiciel métier ou SaaS dès 25 000 € (MVP). L'Eure étant à mi-chemin entre Normandie et Île-de-France, nous pouvons calibrer le budget selon que vous ciblez un marché local ou que vous cherchez à rayonner jusqu'à Paris. Devis gratuit sous 24h.",
    },
    {
      question: "Comment travaillez-vous avec des entreprises à Évreux, à 56 km de Rouen ?",
      answer:
        "Évreux est à une heure de route de notre QG rouennais — la distance la plus courte parmi nos villes d'intervention hors Rouen. Nous nous déplaçons facilement pour les réunions importantes. La collaboration au quotidien se fait en visio, mais la proximité permet des rencontres régulières sans contrainte logistique particulière.",
    },
    {
      question: "Avez-vous une expérience des secteurs ébroïciens — industrie pharmaceutique, logistique, agroalimentaire ?",
      answer:
        "Le tissu économique d'Évreux est dominé par l'industrie pharmaceutique, l'agroalimentaire, la logistique et les services B2B. Ces entreprises ont des besoins spécifiques : sites institutionnels rigoureux, outils de gestion interne, intranets, et parfois des plateformes orientées RH ou supply chain. Notre expérience B2B industrielle nous permet d'aborder ces projets sans phase de découverte longue.",
    },
    {
      question: "Comment référencer une entreprise ébroïcienne à la fois sur Évreux et sur Paris ?",
      answer:
        "Évreux est à 1h30 de Paris — certains de nos clients ébroïciens veulent capter des prospects normands et franciliens. Nous structurons le SEO en conséquence : pages géolocalisées pour l'Eure et la Normandie, balisage schema.org ancré sur Évreux Portes de Normandie, tout en travaillant des requêtes sectorielles plus larges. L'architecture de contenu est pensée pour les deux marchés dès le départ.",
    },
  ],
};
