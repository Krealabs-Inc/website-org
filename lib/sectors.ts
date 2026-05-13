/**
 * Données par secteur d'activité pour les landing pages programmatic SEO.
 * Chaque secteur génère une page /agence-web-rouen/[slug] qui cible la
 * longue traîne "agence web pour [secteur] à Rouen".
 */

export interface SectorData {
  slug: string;
  /** Nom au singulier : "restaurant", "cabinet d'avocats" */
  name: string;
  /** Pluriel : "restaurants" */
  namePlural: string;
  /** Article + pluriel : "les restaurants" */
  nameLabeled: string;
  /** Title HTML 60 chars max */
  title: string;
  /** Description meta 150-160 chars */
  description: string;
  /** Intro paragraph (200-300 mots) */
  intro: string;
  /** 3-4 challenges spécifiques du secteur */
  challenges: { title: string; description: string }[];
  /** 4 fonctionnalités/services adaptés */
  features: { title: string; description: string }[];
  /** Stack technique recommandée pour ce secteur */
  recommendedStack: string;
  /** 2-3 questions FAQ secteur-specifique */
  faq: { question: string; answer: string }[];
  /** Tags / keywords */
  keywords: string[];
}

export const SECTORS: Record<string, SectorData> = {
  restaurant: {
    slug: "restaurant",
    name: "restaurant",
    namePlural: "restaurants",
    nameLabeled: "les restaurants",
    title: "Agence web pour restaurant à Rouen — Sites & réservation",
    description:
      "Création de sites internet pour restaurants à Rouen et en Normandie : carte en ligne, réservation, click & collect, SEO local. Spécialiste WordPress et Next.js.",
    intro:
      "Vous tenez un restaurant à Rouen et vous cherchez une agence web qui comprend les contraintes du secteur ? Les restaurateurs rouennais ont des besoins très spécifiques : afficher leur carte de manière lisible (et la mettre à jour souvent), prendre des réservations sans payer 30% à TheFork, gérer le click & collect, capter le trafic local sur \"restaurant Rouen\". Cet article résume notre approche pour les restaurants — de la pizzeria de quartier au bistronomique du centre-ville, en passant par les chaînes locales.",
    challenges: [
      {
        title: "Mise à jour de la carte fréquente",
        description:
          "La carte évolue chaque semaine ou chaque mois. Un site classique demande à votre dev de modifier — coûteux. Notre solution : un back-office WordPress simple où vous éditez la carte vous-même en 5 minutes.",
      },
      {
        title: "Réservations sans dépendre des plateformes tierces",
        description:
          "TheFork prend 2-7€ par couvert + 30% sur les promotions. Votre site doit pouvoir prendre des réservations directes — économies massives sur le long terme.",
      },
      {
        title: "SEO local hyper-compétitif à Rouen",
        description:
          "\"Restaurant Rouen\" est ultra-disputé. Sortir dans le pack local Google demande une fiche Google Business Profile parfaite + un site optimisé + des avis réguliers.",
      },
      {
        title: "Photos de qualité (et leur poids)",
        description:
          "Un site restaurant vit par ses photos. Compresser sans perdre en qualité, lazy-loading, formats modernes (AVIF, WebP) : Core Web Vitals préservés malgré 30-50 photos.",
      },
    ],
    features: [
      {
        title: "Module de réservation directe",
        description:
          "Intégration Zenchef, GuestOnline, ResDiary ou solution custom — votre client réserve sans intermédiaire, vous gardez la marge.",
      },
      {
        title: "Carte digitale + QR code",
        description:
          "Carte web avec catégories, allergènes, prix. QR code à imprimer sur table : un client peut scanner et voir votre carte sans application.",
      },
      {
        title: "Click & collect / commande en ligne",
        description:
          "Si vous faites de la vente à emporter ou de la livraison locale, on intègre un système simple avec Stripe — sans dépendre d'Uber Eats.",
      },
      {
        title: "SEO local Rouen + Google Business",
        description:
          "Optimisation fiche Google Business Profile, schema LocalBusiness/Restaurant, contenu géolocalisé. Objectif : pack local Google sur \"restaurant + quartier\".",
      },
    ],
    recommendedStack:
      "WordPress avec thème custom (idéal pour la mise à jour fréquente de la carte par le restaurateur) + intégration Zenchef pour les réservations + Stripe pour le click & collect.",
    faq: [
      {
        question: "Combien coûte un site internet pour un restaurant à Rouen ?",
        answer:
          "Pour un restaurant à Rouen, un site WordPress vitrine avec carte et formulaire de réservation coûte 3 500-5 500 €. Avec module de réservation pro (Zenchef) et click & collect intégré, comptez 5 500-8 500 €. Maintenance ensuite : 80-200 €/mois.",
      },
      {
        question: "Faut-il payer TheFork ou prendre un système de réservation custom ?",
        answer:
          "Pour un restaurant qui fait 50-100 couverts/jour, TheFork coûte 600-1 800 €/mois en commissions. Un module direct (Zenchef ~150 €/mois ou solution custom 0 €/mois après dev) est rentabilisé en moins de 12 mois. Notre conseil : commencer avec TheFork pour acquérir, basculer vers du direct dès que le restaurant est connu.",
      },
      {
        question: "Quels sont les délais pour un site de restaurant ?",
        answer:
          "Un site WordPress simple : 2-3 semaines de la signature à la mise en ligne. Avec réservation et click & collect : 4-6 semaines. Le délai dépend surtout de la rapidité avec laquelle vous nous fournissez les contenus (photos, carte, infos pratiques).",
      },
    ],
    keywords: [
      "agence web restaurant rouen",
      "site internet restaurant rouen",
      "création site restaurant normandie",
      "site web restaurant rouennais",
      "réservation en ligne restaurant rouen",
    ],
  },

  hotel: {
    slug: "hotel",
    name: "hôtel",
    namePlural: "hôtels",
    nameLabeled: "les hôtels",
    title: "Agence web pour hôtel à Rouen — Sites & réservation directe",
    description:
      "Création de sites internet pour hôtels à Rouen et en Normandie. Moteur de réservation, intégration Booking.com, SEO local. WordPress / Next.js sur mesure.",
    intro:
      "Vous gérez un hôtel à Rouen, en Normandie ou sur la côte ? Le secteur hôtelier subit la guerre des OTAs (Booking, Expedia) qui ponctionnent 15-25% de commission. Votre site web doit faire l'inverse : capter le maximum de réservations directes pour préserver votre marge. Cet article détaille notre approche pour les hôteliers — du petit B&B 5 chambres à l'hôtel 3-4 étoiles du centre de Rouen.",
    challenges: [
      {
        title: "Disparité de prix avec les OTAs",
        description:
          "Les clients comparent toujours votre tarif avec celui de Booking. Le site doit afficher clairement votre best price guarantee et inclure un moteur de réservation aussi rapide que les concurrents.",
      },
      {
        title: "Multilingue obligatoire (au minimum FR/EN)",
        description:
          "Une partie significative des clients d'un hôtel rouennais sont internationaux. Site obligatoirement bilingue, idéalement trilingue (FR/EN/DE ou FR/EN/NL).",
      },
      {
        title: "Mobile-first absolu",
        description:
          "70%+ des réservations hôtel se font sur mobile. UX mobile parfaite obligatoire : photos qui se chargent vite, formulaire de réservation court, paiement Apple Pay / Google Pay.",
      },
      {
        title: "Trust signals : avis, photos, géolocalisation",
        description:
          "Note Booking/TripAdvisor affichée, carte interactive, 360° des chambres si possible. Le client doit pouvoir se projeter avant de réserver.",
      },
    ],
    features: [
      {
        title: "Moteur de réservation intégré",
        description:
          "Intégration Mews, Cloudbeds, ReservIT, ou Channel Manager générique. Synchronisation temps réel avec Booking pour éviter le surbooking.",
      },
      {
        title: "Site multilingue (FR / EN / +)",
        description:
          "Architecture multilingue propre (pas de Google Translate). SEO international, balises hreflang, URLs propres /fr/, /en/.",
      },
      {
        title: "Photos haute qualité + lazy load",
        description:
          "Galeries avec format AVIF, lazy loading agressif, Core Web Vitals préservés malgré 100+ photos. Optionnel : visite 360° intégrée.",
      },
      {
        title: "SEO local Normandie + tourisme",
        description:
          "Schema Hotel, fiche Google Business, intégration TripAdvisor. Visibilité sur \"hôtel Rouen centre\", \"hôtel pas cher Rouen\", \"hotel near Rouen station\".",
      },
    ],
    recommendedStack:
      "Next.js + intégration Mews ou Cloudbeds API. Le rendu serveur (SSR) garantit un SEO solide et un chargement instantané, indispensable pour le mobile.",
    faq: [
      {
        question: "Combien coûte un site internet pour un hôtel à Rouen ?",
        answer:
          "Pour un hôtel à Rouen, un site Next.js avec moteur de réservation intégré coûte typiquement 8 000-15 000 €. Le ROI se mesure en commissions Booking économisées : un hôtel 30 chambres qui passe de 60% à 50% de réservations OTA économise 25-50 k€/an. Maintenance : 200-500 €/mois.",
      },
      {
        question: "WordPress ou Next.js pour un hôtel ?",
        answer:
          "WordPress convient pour un hôtel 5-10 chambres avec une intégration simple. Au-delà, ou si le multilingue + la performance sont critiques, Next.js est le bon choix : SEO supérieur, vitesse, intégrations API plus propres.",
      },
      {
        question: "Faut-il intégrer Booking sur son site ?",
        answer:
          "Oui, paradoxalement. La grille de tarifs Booking sert de référence pour rassurer le client. Mais le bouton de réservation finale doit pointer vers VOTRE moteur, pas vers Booking. C'est cet équilibre qu'on configure.",
      },
    ],
    keywords: [
      "agence web hôtel rouen",
      "site internet hôtel rouen",
      "création site hôtel normandie",
      "moteur de réservation hôtel rouen",
      "site web hôtellerie rouen",
    ],
  },

  "cabinet-comptable": {
    slug: "cabinet-comptable",
    name: "cabinet comptable",
    namePlural: "cabinets comptables",
    nameLabeled: "les cabinets comptables",
    title: "Agence web pour cabinet comptable à Rouen — Sites pro & client",
    description:
      "Sites internet pour cabinets comptables à Rouen : portail client, prise de RDV, blog conseils. Krealabs développe des sites WordPress et Next.js sur mesure.",
    intro:
      "Les cabinets comptables à Rouen évoluent vers un modèle hybride : conseil + expertise + outils digitaux pour les clients. Votre site web n'est plus seulement une vitrine — c'est une porte d'entrée pour vos services dématérialisés. Cet article résume notre approche pour les experts-comptables rouennais et normands, du cabinet 2-3 collaborateurs à la structure 30+ salariés.",
    challenges: [
      {
        title: "Crédibilité et confiance",
        description:
          "Un cabinet comptable se choisit sur la confiance. Votre site doit projeter sérieux, expertise, mention des certifications (OEC), équipe avec photos et bios, témoignages clients vérifiables.",
      },
      {
        title: "SEO sur les requêtes locales et spécialisées",
        description:
          "\"Expert-comptable Rouen\", \"comptable pour startup Normandie\", \"cabinet comptable Petit-Quevilly\". Chaque niche se positionne par un contenu dédié sur le site (page service ou article blog).",
      },
      {
        title: "Portail client sécurisé",
        description:
          "Échanges de documents (bilans, factures, déclarations) doivent passer par un portail sécurisé, pas par email. Intégration possible avec MyUnisoft, Fulll, ou portail custom.",
      },
      {
        title: "Conformité RGPD stricte",
        description:
          "Données comptables = données sensibles. RGPD obligatoire, registre de traitement, mentions légales pro, politique de confidentialité détaillée.",
      },
    ],
    features: [
      {
        title: "Pages services par typologie de client",
        description:
          "Page dédiée pour TPE, profession libérale, startup, association, etc. Chaque page cible une intention SEO précise et un parcours de conversion adapté.",
      },
      {
        title: "Blog expertise comptable & fiscalité",
        description:
          "Articles réguliers (fiscalité, droit du travail, optimisation) : on vous aide à structurer la grille éditoriale et publier régulièrement. ROI SEO mesurable en 6-12 mois.",
      },
      {
        title: "Prise de RDV en ligne avec qualification",
        description:
          "Calendly ou Cal.com avec formulaire de qualification : taille entreprise, type de besoin, échéance. Vous arrivez en RDV avec le contexte déjà cadré.",
      },
      {
        title: "Portail client dédié",
        description:
          "Page protégée par login pour vos clients : upload documents, accès archives bilans, factures dématérialisées. Intégration avec votre suite (MyUnisoft, Cegid, etc.).",
      },
    ],
    recommendedStack:
      "WordPress avec thème custom + plugin sécurité Wordfence + intégration calendly. Pour les cabinets ambitieux : Next.js + portail client custom + intégration Cegid / MyUnisoft API.",
    faq: [
      {
        question: "Combien coûte un site internet pour un cabinet comptable à Rouen ?",
        answer:
          "Un site vitrine WordPress avec 6-8 pages services + blog : 4 000-6 500 €. Avec portail client intégré : 8 000-15 000 €. Le portail client se rentabilise en 12-24 mois par le temps gagné sur les échanges email.",
      },
      {
        question: "Comment ressortir sur \"expert-comptable Rouen\" dans Google ?",
        answer:
          "C'est une requête à 200-300 recherches/mois à Rouen, très compétitive. La méthode : fiche Google Business optimisée + 6-12 mois de contenu blog ciblé + backlinks depuis des sites pro (OEC, CCI, articles de presse) + avis Google réguliers. Objectif réaliste : top 5 en 12-18 mois.",
      },
    ],
    keywords: [
      "agence web cabinet comptable rouen",
      "site internet expert comptable rouen",
      "site web comptable normandie",
      "création site cabinet comptable",
      "portail client comptable rouen",
    ],
  },

  avocat: {
    slug: "avocat",
    name: "cabinet d'avocats",
    namePlural: "cabinets d'avocats",
    nameLabeled: "les cabinets d'avocats",
    title: "Agence web pour avocat à Rouen — Site cabinet conforme",
    description:
      "Création de sites internet pour avocats à Rouen et en Normandie : conformité ordre, blog expertise, prise de RDV. Sites WordPress et Next.js sur mesure.",
    intro:
      "Les avocats à Rouen ont des contraintes réglementaires fortes pour leur communication digitale : règles déontologiques du Conseil National des Barreaux (CNB), pas de comparaison entre avocats, pas de slogans commerciaux. Mais le digital reste essentiel pour être trouvé. Cet article résume notre approche pour les cabinets d'avocats du barreau de Rouen, en respectant à la lettre la déontologie.",
    challenges: [
      {
        title: "Conformité au RIN (Règlement Intérieur National)",
        description:
          "Pas de slogan commercial, pas de comparaison, pas de témoignages clients individualisés. Le site doit respecter à la lettre l'article 10 du RIN. Nous connaissons les règles et les appliquons.",
      },
      {
        title: "Spécialisations clairement affichées",
        description:
          "Droit du travail, droit des affaires, droit pénal, etc. Chaque spécialisation = une page dédiée, ciblant les requêtes SEO précises (\"avocat droit du travail Rouen\").",
      },
      {
        title: "SEO local + sémantique juridique",
        description:
          "Vocabulaire juridique précis pour Google (synonymie, terminologie). Schema LegalService, contenu structuré pour répondre aux questions des prospects.",
      },
      {
        title: "Articles blog (mais conformes)",
        description:
          "Articles sur le droit accessibles au grand public : excellent SEO, à condition de respecter les règles déontologiques (information, pas démarchage).",
      },
    ],
    features: [
      {
        title: "Pages spécialisations détaillées",
        description:
          "Une page par spécialisation/domaine de droit, avec définition, exemples de dossiers, FAQ, parcours de contact clair.",
      },
      {
        title: "Blog juridique grand public",
        description:
          "Calendrier éditorial 1-2 articles/mois sur l'actualité juridique. Articles structurés (schema LegalService), avec partage social et newsletter.",
      },
      {
        title: "Prise de RDV avec qualification",
        description:
          "Formulaire qui qualifie : type de litige, urgence, premier RDV gratuit ou payant. Le tri se fait en amont, le secrétariat gagne du temps.",
      },
      {
        title: "Conformité RGPD + secret professionnel",
        description:
          "Mentions légales conformes CNB, politique de confidentialité avec mention du secret professionnel, registre RGPD, chiffrement des données.",
      },
    ],
    recommendedStack:
      "WordPress avec thème custom (parfait pour un cabinet 2-10 avocats publiant régulièrement). Plugin sécurité indispensable. Pour les cabinets premium ou business : Next.js sur mesure.",
    faq: [
      {
        question: "Quelles sont les obligations légales pour un site d'avocat à Rouen ?",
        answer:
          "Le site doit respecter le RIN (article 10) : pas de slogan commercial, pas de comparaison entre avocats, pas de témoignages individualisés non anonymisés, mentions obligatoires (nom du barreau, n° d'inscription, RPC). Nous fournissons un site conforme par défaut.",
      },
      {
        question: "Combien coûte un site pour un cabinet d'avocats à Rouen ?",
        answer:
          "Site vitrine WordPress avec 5-8 pages spécialisations + blog : 4 500-7 000 €. Site Next.js premium pour cabinet business avec portail client documents : 12 000-25 000 €.",
      },
    ],
    keywords: [
      "agence web avocat rouen",
      "site internet avocat rouen",
      "site web cabinet avocats normandie",
      "création site avocat",
      "site avocat conforme RIN",
    ],
  },

  immobilier: {
    slug: "immobilier",
    name: "agence immobilière",
    namePlural: "agences immobilières",
    nameLabeled: "les agences immobilières",
    title: "Agence web pour agence immobilière à Rouen — Sites & catalogues",
    description:
      "Sites internet pour agences immobilières à Rouen : catalogue de biens, recherche multicritères, synchro logiciel transactionnel. WordPress / Next.js sur mesure.",
    intro:
      "Les agences immobilières à Rouen évoluent dans un marché digitalisé : SeLoger, Leboncoin, Logic-Immo concentrent l'essentiel des leads, mais à coût croissant. Votre site web doit faire le pont entre ces portails et votre marque locale, capter les recherches directes (\"agence immobilière Rouen centre\", \"appartement à louer Mont-Saint-Aignan\") et permettre une expérience de recherche fluide. Cet article résume notre approche.",
    challenges: [
      {
        title: "Synchronisation avec votre logiciel transactionnel",
        description:
          "Hektor, Apimo, NetTy, AC3 : votre logiciel central contient les biens. Le site doit afficher en temps réel les biens disponibles, sans double saisie.",
      },
      {
        title: "Recherche multicritères et carte interactive",
        description:
          "Filtres (type, surface, prix, localisation), carte avec biens géolocalisés, comparaison de biens, favoris. UX cruciale pour la conversion.",
      },
      {
        title: "SEO ultra-local : par quartier",
        description:
          "Les prospects cherchent \"appartement Saint-Sever\", \"maison Bois-Guillaume\". Pages dédiées par quartier de Rouen, avec contenu original (carte, écoles, transports, prix moyens).",
      },
      {
        title: "Photos professionnelles et virtual tour",
        description:
          "Galerie photos haute qualité, plans 2D/3D, visite virtuelle 360° pour les biens premium. Plus le bien est cher, plus les visuels comptent.",
      },
    ],
    features: [
      {
        title: "Intégration logiciel transactionnel",
        description:
          "Sync automatique avec Hektor, Apimo, NetTy, Periklès, etc. Les biens créés dans votre logiciel sont publiés sur votre site sous 5 minutes.",
      },
      {
        title: "Moteur de recherche performant",
        description:
          "Filtres multi-critères, carte interactive Leaflet/Mapbox, tri par pertinence, pagination SEO-friendly. UX comparable à SeLoger.",
      },
      {
        title: "Pages quartiers de Rouen optimisées SEO",
        description:
          "Une page par quartier ciblé (10-30 pages selon votre zone d'intervention) : contenu original + biens du quartier listés dynamiquement.",
      },
      {
        title: "Formulaires de prospection sortants",
        description:
          "Estimation gratuite en ligne, alerte mail pour nouveaux biens, demande de RDV — chaque formulaire envoie en CRM (Hubspot, Pipedrive, ou intégré au logiciel transactionnel).",
      },
    ],
    recommendedStack:
      "WordPress + intégration Hektor/Apimo via leur API ou plugin officiel + plugin recherche optimisée. Pour les agences premium : Next.js avec API logiciel transactionnel et carte Mapbox.",
    faq: [
      {
        question: "Comment synchroniser mon logiciel transactionnel avec un site ?",
        answer:
          "La plupart des logiciels (Hektor, Apimo, NetTy, AC3, Periklès) proposent des connecteurs ou API pour les sites web. Nous gérons l'intégration. Délais : 1-2 semaines selon la complexité de l'API. Coût additionnel : 800-3 000 €.",
      },
      {
        question: "Combien coûte un site pour une agence immobilière à Rouen ?",
        answer:
          "Site WordPress avec intégration logiciel + 50 biens listés + carte : 6 000-12 000 €. Site Next.js sur mesure avec moteur de recherche custom : 15 000-30 000 €. ROI mesurable en leads directs économisés vs portails (Leboncoin Pro = 500 €/mois en moyenne).",
      },
    ],
    keywords: [
      "agence web immobilier rouen",
      "site internet agence immobilière rouen",
      "site web immobilier normandie",
      "création site immobilier",
      "site agent immobilier rouen",
    ],
  },

  "salon-coiffure": {
    slug: "salon-coiffure",
    name: "salon de coiffure",
    namePlural: "salons de coiffure",
    nameLabeled: "les salons de coiffure",
    title: "Agence web pour salon de coiffure à Rouen — Site & réservation",
    description:
      "Création de sites internet pour salons de coiffure à Rouen : prise de RDV en ligne, galerie photos, SEO local. Spécialiste WordPress et Next.js.",
    intro:
      "Vous tenez un salon de coiffure à Rouen et vous voulez moderniser votre présence en ligne ? Le secteur évolue vite : prise de RDV via PlanityRdv, Trésor, Treatwell devient le standard. Mais ces plateformes prennent 1-3% de commission ET captent vos clients pour les rediriger vers la concurrence. Votre propre site avec module de RDV intégré change la donne. Cet article résume notre approche pour les salons de coiffure rouennais.",
    challenges: [
      {
        title: "Prise de RDV sans dépendre des plateformes",
        description:
          "Planity, Trésor prennent 1-3% + des frais d'abonnement. Un module de RDV direct sur votre site élimine ces coûts (économies de 200-800 €/mois pour un salon actif).",
      },
      {
        title: "SEO local très compétitif",
        description:
          "\"Coiffeur Rouen\" = ultra-compétitif. Pour ressortir, il faut une stratégie hyperlocal : par quartier, par spécialité (homme, balayage, mèches), par tarif.",
      },
      {
        title: "Galerie photos qui converted",
        description:
          "Les clients choisissent un coiffeur par les photos de réalisations. Galerie avant/après, portfolio par coiffeur, possibilité de filtrer (cheveux courts, colorations).",
      },
      {
        title: "Avis Google = vie ou mort",
        description:
          "Le pack local Google se gagne avec les avis. Sans 30+ avis 4.5★ minimum, impossible de sortir devant la concurrence. Nous aidons à structurer la demande d'avis.",
      },
    ],
    features: [
      {
        title: "Module de réservation direct",
        description:
          "Treatwell Connect, Planity API, ou solution custom Calendly + Stripe. Vos clients réservent et paient directement sur votre site.",
      },
      {
        title: "Galerie réalisations avec filtres",
        description:
          "Portfolio par coiffeur, par type (homme, femme, enfant, coloration). Filtres dynamiques pour aider le client à trouver son inspiration.",
      },
      {
        title: "Pages prestations détaillées",
        description:
          "Une page par prestation/forfait (coupe, balayage, mariage). Tarifs affichés clairement, photos d'illustrations, FAQ.",
      },
      {
        title: "SEO local & avis Google",
        description:
          "Optimisation Google Business Profile, schema HairSalon, demande d'avis automatisée post-RDV.",
      },
    ],
    recommendedStack:
      "WordPress + plugin réservation Amelia ou Bookly (légers et performants) + galerie native. Pour les salons multi-points : Next.js + module RDV custom.",
    faq: [
      {
        question: "Combien coûte un site pour un salon de coiffure à Rouen ?",
        answer:
          "Site WordPress vitrine avec galerie + module de réservation simple : 2 500-4 500 €. Avec personnalisation poussée (multi-coiffeurs, paiement en ligne) : 5 000-7 500 €. Maintenance : 50-150 €/mois.",
      },
      {
        question: "Faut-il garder Planity / Treatwell en parallèle ?",
        answer:
          "Au début oui, pour acquérir. Puis basculer progressivement le trafic vers votre site direct. Sur 12 mois, un salon actif économise 2 000-6 000 € en commissions plateforme.",
      },
    ],
    keywords: [
      "agence web salon de coiffure rouen",
      "site internet coiffeur rouen",
      "création site salon coiffure normandie",
      "réservation en ligne coiffeur rouen",
      "site web coiffure",
    ],
  },

  medecin: {
    slug: "medecin",
    name: "cabinet médical",
    namePlural: "cabinets médicaux",
    nameLabeled: "les cabinets médicaux",
    title: "Agence web pour médecin & cabinet médical à Rouen",
    description:
      "Sites internet pour médecins et cabinets médicaux à Rouen : informations patients, prise de RDV via Doctolib, conformité CNOM. Sites WordPress et Next.js.",
    intro:
      "Vous êtes médecin libéral ou pilote d'un cabinet de groupe à Rouen ? Votre présence en ligne est encadrée par le Conseil National de l'Ordre des Médecins (CNOM) : pas de publicité commerciale, information factuelle uniquement, transparence sur les diplômes et spécialités. Mais un site web reste utile pour informer les patients, prendre des RDV directement (sans Doctolib), publier des conseils santé. Cet article résume notre approche.",
    challenges: [
      {
        title: "Conformité CNOM (article 13 du Code de déontologie)",
        description:
          "Pas de publicité, pas de comparaison, information factuelle uniquement (diplômes, spécialités, horaires). Nous appliquons ces règles dès la conception.",
      },
      {
        title: "Prise de RDV : Doctolib ou direct ?",
        description:
          "Doctolib prend 109 €/mois + des frais cachés. Un module de RDV direct (intégration agenda Google ou solution custom) revient à 0-30 €/mois.",
      },
      {
        title: "Données patients = données sensibles RGPD",
        description:
          "Article 9 RGPD : données de santé = catégorie spéciale. Hébergement HDS (Hébergeur de Données de Santé) obligatoire si vous stockez des données patients sur le site.",
      },
      {
        title: "SEO local mais discret",
        description:
          "Sortir sur \"médecin généraliste Rouen\" sans tomber dans la publicité interdite. Stratégie : présence Google Business + contenu factuel d'information santé.",
      },
    ],
    features: [
      {
        title: "Pages informations patients",
        description:
          "Présentation cabinet, équipe médicale (photos + diplômes + spécialités), tarifs (secteur 1/2, conventions), horaires, accès, parking, transports.",
      },
      {
        title: "Module de RDV (Doctolib ou direct)",
        description:
          "Intégration widget Doctolib, ou module de RDV custom relié à votre agenda Google/Outlook. Vous gardez le choix.",
      },
      {
        title: "Articles santé pour vos patients",
        description:
          "Blog factuel (vaccinations, prévention, conseils saisonniers) : améliore SEO + sert d'éducation patient. Rédaction par vous, mise en forme par nous.",
      },
      {
        title: "Téléconsultation (optionnel)",
        description:
          "Intégration solutions de téléconsultation conformes (Hellocare, Maiia, Livi). Pour les cabinets qui veulent proposer ce service en direct.",
      },
    ],
    recommendedStack:
      "WordPress + plugin RGPD strict + hébergement HDS (si stockage de données patients) + thème custom respectant CNOM. Pour les structures de groupe : Next.js avec gestion multi-praticiens.",
    faq: [
      {
        question: "Quelles sont les obligations légales pour un site de médecin à Rouen ?",
        answer:
          "Respecter l'article 13 du Code de déontologie médicale (pas de publicité, information factuelle), être conforme RGPD (article 9, données de santé), héberger les données sensibles chez un HDS, et faire valider le site par votre Conseil départemental de l'Ordre avant publication.",
      },
      {
        question: "Vaut-il mieux Doctolib ou un module de RDV intégré ?",
        answer:
          "Doctolib : ~109 €/mois mais énorme visibilité (les patients trouvent votre profil même sans connaître votre site). Module direct : 0-30 €/mois mais demande un effort marketing pour faire venir les patients sur le site. La plupart des médecins utilisent les deux en parallèle.",
      },
    ],
    keywords: [
      "agence web médecin rouen",
      "site internet cabinet médical rouen",
      "création site médecin normandie",
      "site web médecin",
      "site cabinet médical conforme CNOM",
    ],
  },

  dentiste: {
    slug: "dentiste",
    name: "cabinet dentaire",
    namePlural: "cabinets dentaires",
    nameLabeled: "les cabinets dentaires",
    title: "Agence web pour dentiste à Rouen — Sites & prise de RDV",
    description:
      "Création de sites internet pour cabinets dentaires à Rouen : informations patients, RDV en ligne, photos équipe & équipements. WordPress et Next.js.",
    intro:
      "Les cabinets dentaires à Rouen ont des contraintes similaires aux médecins (Code de déontologie de l'Ordre des chirurgiens-dentistes, pas de publicité) mais avec un volet visuel important : montrer ses équipements, son cabinet, son équipe pour rassurer les patients. Cet article résume notre approche.",
    challenges: [
      {
        title: "Conformité ONCD (article R.4127-215 CSP)",
        description:
          "Pas de publicité commerciale, information factuelle. Nous appliquons les règles de l'Ordre National des Chirurgiens-Dentistes dès la conception.",
      },
      {
        title: "Confiance par l'image",
        description:
          "Les patients ont peur du dentiste. Le site doit rassurer : photos du cabinet propres et modernes, équipe souriante, mention des équipements dernière génération.",
      },
      {
        title: "Spécialisations claires",
        description:
          "Implantologie, orthodontie adulte, esthétique, parodontologie. Une page par spécialité aide à attirer le bon patient.",
      },
      {
        title: "Avis Google massif",
        description:
          "Les patients lisent les avis avant de choisir un dentiste. Demande d'avis post-RDV automatisée, réponses systématiques aux avis.",
      },
    ],
    features: [
      {
        title: "Galerie cabinet + équipements",
        description:
          "Photos professionnelles du cabinet, fauteuils, équipements (radio panoramique, scanner 3D, laser, etc.). Rassure le patient avant le RDV.",
      },
      {
        title: "Pages spécialités détaillées",
        description:
          "Implants, orthodontie, esthétique, prévention enfants. Chaque page cible une intention SEO (\"orthodontie adulte Rouen\", \"implant dentaire prix Rouen\").",
      },
      {
        title: "RDV en ligne (Doctolib ou direct)",
        description:
          "Widget Doctolib intégré ou module custom relié à votre agenda. Patient autonome 24/7.",
      },
      {
        title: "Conformité ONCD + RGPD",
        description:
          "Mentions légales conformes, pas de slogan, transparence sur les diplômes. Hébergement HDS si données patients.",
      },
    ],
    recommendedStack:
      "WordPress + thème sur mesure (esthétique soignée critique) + intégration Doctolib + plugin sécurité.",
    faq: [
      {
        question: "Combien coûte un site pour un cabinet dentaire à Rouen ?",
        answer:
          "Site WordPress vitrine avec galerie + pages spécialités + RDV Doctolib : 3 500-6 500 €. Site avec photos pro (shooting) + module RDV intégré : 7 000-12 000 €.",
      },
    ],
    keywords: [
      "agence web dentiste rouen",
      "site internet cabinet dentaire rouen",
      "création site dentiste normandie",
      "site web chirurgien dentiste",
      "site cabinet dentaire conforme ONCD",
    ],
  },

  garagiste: {
    slug: "garagiste",
    name: "garage automobile",
    namePlural: "garages automobile",
    nameLabeled: "les garages",
    title: "Agence web pour garage automobile à Rouen — Sites & RDV",
    description:
      "Création de sites internet pour garages automobile à Rouen : prise de RDV, devis en ligne, catalogue véhicules. Sites WordPress et Next.js sur mesure.",
    intro:
      "Vous tenez un garage automobile à Rouen ou en banlieue rouennaise (Petit-Quevilly, Mont-Saint-Aignan, Saint-Étienne-du-Rouvray) ? Les automobilistes cherchent leur garage en ligne : avis Google, devis rapide, prise de RDV directe. Votre site web doit capter ce trafic local et convertir les visiteurs en clients. Cet article résume notre approche.",
    challenges: [
      {
        title: "SEO local hyper-précis",
        description:
          "\"Garage Rouen\", \"contrôle technique Petit-Quevilly\", \"révision voiture Mont-Saint-Aignan\". Stratégie par quartier + par prestation = des dizaines de portes d'entrée SEO.",
      },
      {
        title: "Confiance et transparence des prix",
        description:
          "Les clients automobilistes redoutent l'arnaque. Affichage clair des tarifs (révision, pneus, contrôle technique), photos de l'atelier, équipe.",
      },
      {
        title: "Catalogue véhicules d'occasion (si vente)",
        description:
          "Si vous vendez du VO, le catalogue doit être lisible (photos, kilométrage, prix, fiche technique), avec recherche multi-critères et formulaire de prise de contact par véhicule.",
      },
      {
        title: "RDV en ligne pour entretien",
        description:
          "Module de prise de RDV (révision, contrôle technique) directement depuis le site, avec choix créneau, type de service, modèle de véhicule.",
      },
    ],
    features: [
      {
        title: "Pages prestations détaillées",
        description:
          "Révision, vidange, pneumatiques, contrôle technique, carrosserie, mécanique générale. Chaque page cible une intention SEO précise.",
      },
      {
        title: "Catalogue VO si vente d'occasion",
        description:
          "Module véhicules d'occasion avec photos, fiches techniques, prix, kilométrage. Filtres (marque, prix, énergie, km).",
      },
      {
        title: "Devis en ligne / RDV",
        description:
          "Formulaire de devis rapide (type véhicule, prestation, urgence). Réponse automatisée + qualification commerciale.",
      },
      {
        title: "Avis & témoignages",
        description:
          "Intégration avis Google Business directement sur le site (widget). Réassurance immédiate.",
      },
    ],
    recommendedStack:
      "WordPress + plugin catalogue VO (si vente) + module devis custom + intégration agenda Google.",
    faq: [
      {
        question: "Combien coûte un site pour un garage automobile à Rouen ?",
        answer:
          "Site vitrine avec pages prestations + formulaire devis : 2 500-4 500 €. Avec catalogue véhicules d'occasion intégré : 5 000-9 000 €.",
      },
    ],
    keywords: [
      "agence web garage automobile rouen",
      "site internet garage rouen",
      "création site garagiste normandie",
      "site web mécanicien rouen",
      "site garage occasion rouen",
    ],
  },

  "e-commerce": {
    slug: "e-commerce",
    name: "e-commerce",
    namePlural: "sites e-commerce",
    nameLabeled: "les e-commerces",
    title: "Agence e-commerce à Rouen — Création de boutiques en ligne",
    description:
      "Création de sites e-commerce à Rouen : WooCommerce, Shopify, headless. Intégration Stripe, gestion de stock, SEO produit. Agence digitale normande.",
    intro:
      "Vous lancez ou refondez votre site e-commerce à Rouen, en Normandie ou ailleurs ? Le choix de la plateforme et de l'architecture conditionne 80% du succès à 3 ans. WooCommerce, Shopify, headless avec Next.js : chaque option a ses avantages selon votre catalogue, vos volumes, votre stratégie. Cet article résume notre approche e-commerce pour les PME normandes — boutique de 50 produits ou marketplace de 5000+ SKUs.",
    challenges: [
      {
        title: "Choix de plateforme : WooCommerce vs Shopify vs custom",
        description:
          "WooCommerce : flexibilité maximale, gratuit, mais demande maintenance technique. Shopify : 79-2000$/mois, plus simple, plus restrictif. Custom Next.js + Stripe : pour les acteurs avec besoins très spécifiques.",
      },
      {
        title: "Performance produit et SEO",
        description:
          "Page produit qui charge en <2s, schema Product/Offer, breadcrumbs, balises optimisées. Core Web Vitals critiques pour le SEO produit.",
      },
      {
        title: "Gestion du stock multi-canal",
        description:
          "Si vous vendez aussi en physique, sur Amazon, ou via marketplaces : synchronisation du stock obligatoire (ERP, PIM, ou solution custom).",
      },
      {
        title: "Paiement, livraison, retours",
        description:
          "Stripe (recommandé), PayPal, virement. Transporteurs (Colissimo, Mondial Relay, Chronopost). Gestion des retours fluide.",
      },
    ],
    features: [
      {
        title: "Catalogue produit optimisé",
        description:
          "Photos haute qualité, fiches produits SEO-friendly, variantes (taille, couleur), filtres et recherche performante. Tri par pertinence.",
      },
      {
        title: "Paiement & livraison flexibles",
        description:
          "Stripe (TPE virtuel à 1.4% + 0.25€), Apple Pay, Google Pay. Intégration transporteurs (Mondial Relay, Colissimo, Chronopost). Calcul automatique des frais.",
      },
      {
        title: "Gestion de stock & dropshipping",
        description:
          "Sync stock multi-canal, alertes rupture, gestion des préco/back-orders. Si dropshipping : intégration AliExpress / Spocket.",
      },
      {
        title: "SEO produit + analytics e-commerce",
        description:
          "Schema Product, Open Graph produit, Google Shopping feed, Meta Pixel. Tracking conversions avancé via GA4 + Vercel Analytics.",
      },
    ],
    recommendedStack:
      "Pour 90% des PME normandes : WooCommerce (catalogue < 500 produits) ou Shopify (catalogue 500-2000 produits, équipe non-tech). Au-delà ou besoin de performance extrême : Next.js + Stripe + headless commerce (Shopify Hydrogen ou Saleor).",
    faq: [
      {
        question: "WooCommerce ou Shopify pour un e-commerce à Rouen ?",
        answer:
          "Le choix dépend de votre profil : WooCommerce si vous avez besoin de personnalisation ou un développeur sous la main (coûts évolutifs maîtrisés). Shopify si vous voulez du clé en main avec abonnement mensuel prévisible (79-299$/mois). Pour la majorité des PME normandes débutantes, Shopify est plus simple ; pour celles qui prévoient une forte évolution, WooCommerce est plus flexible. Voir notre comparatif complet [WooCommerce vs Shopify pour PME](/blog/woocommerce-vs-shopify-pme).",
      },
      {
        question: "Combien coûte la création d'un site e-commerce à Rouen ?",
        answer:
          "Boutique WooCommerce simple (50-200 produits) : 8 000-15 000 €. Boutique Shopify personnalisée : 5 000-12 000 € + abonnement Shopify mensuel. Headless Next.js sur mesure : 25 000-80 000 € + maintenance évolutive.",
      },
    ],
    keywords: [
      "agence e-commerce rouen",
      "création site e-commerce rouen",
      "agence woocommerce rouen",
      "agence shopify rouen",
      "boutique en ligne normandie",
    ],
  },
};

export const SECTOR_SLUGS = Object.keys(SECTORS);
