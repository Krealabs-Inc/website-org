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

  association: {
    slug: "association",
    name: "association",
    namePlural: "associations",
    nameLabeled: "les associations",
    title: "Agence web pour association à Rouen — Sites loi 1901",
    description:
      "Création de sites internet pour associations à Rouen et en Normandie : présentation, adhésions en ligne, dons, agenda événements. WordPress et Next.js sur mesure.",
    intro:
      "Vous gérez une association loi 1901 à Rouen ou en Normandie ? Votre site web est l'épine dorsale de votre visibilité et de votre vie associative : recruter de nouveaux adhérents, collecter des dons, annoncer les événements, rassurer les financeurs. Krealabs intervient pour des associations de toutes tailles — du petit collectif de quartier à la fédération régionale — avec des solutions adaptées aux budgets limités.",
    challenges: [
      {
        title: "Budget contraint, exigence professionnelle",
        description:
          "Les associations doivent paraître pros sans avoir le budget d'une PME. Solution : WordPress + thème custom léger, pas de prestations superflues, focus sur l'essentiel.",
      },
      {
        title: "Adhésions et dons en ligne",
        description:
          "Le paiement en ligne pour adhésions, cotisations et dons est devenu standard. Intégration HelloAsso (gratuit, commission 1.5%) ou solution Stripe directe.",
      },
      {
        title: "Agenda événements vivant",
        description:
          "Réunions, ateliers, AG, événements publics : un calendrier d'événements maintenu à jour est crucial. Solution simple à éditer par les bénévoles.",
      },
      {
        title: "Conformité RGPD",
        description:
          "Les associations sont soumises au RGPD comme les entreprises. Mentions légales conformes, registre de traitement des données adhérents, consentement explicite pour la newsletter.",
      },
    ],
    features: [
      {
        title: "HelloAsso intégré : adhésions + dons + billetterie",
        description:
          "HelloAsso est l'outil de référence pour les assos (commission 0% en option). Widget intégré sur votre site pour adhérer, donner ou réserver un événement.",
      },
      {
        title: "Agenda et page événements",
        description:
          "Calendrier visuel, fiche par événement (lieu, horaire, prix, inscription), filtres par catégorie. Intégration Google Calendar pour les bénévoles.",
      },
      {
        title: "Espace presse / médias",
        description:
          "Page dédiée aux journalistes : photos HD, communiqués, contacts. Vital pour les assos qui veulent paraître dans la presse normande.",
      },
      {
        title: "Formation de l'équipe bénévole",
        description:
          "Nous formons 2-3 bénévoles à mettre à jour le site eux-mêmes (articles, agenda, adhérents). Documentation écrite fournie.",
      },
    ],
    recommendedStack:
      "WordPress + thème léger custom + HelloAsso intégré + plugin événements (The Events Calendar gratuit ou Modern Events Calendar). Setup simple à maintenir par les bénévoles.",
    faq: [
      {
        question: "Combien coûte un site internet pour une association à Rouen ?",
        answer:
          "Pour une association rouennaise, un site WordPress vitrine + intégration HelloAsso : 1 800-3 500 €. Avec agenda événements et espace adhérents : 3 500-6 000 €. Maintenance allégée : 30-80 €/mois. Demandez aussi si vous êtes éligible à un mécénat de compétence d'une agence locale (~30-40% du coût offert).",
      },
      {
        question: "Les associations sont-elles soumises au RGPD ?",
        answer:
          "Oui, totalement. Toute structure qui collecte des données personnelles (adhérents, donateurs, contacts) est concernée. Obligation : mentions légales conformes, politique de confidentialité, consentement explicite (case à cocher) pour la newsletter, registre des traitements.",
      },
    ],
    keywords: [
      "agence web association rouen",
      "site internet association loi 1901 rouen",
      "création site web association normandie",
      "site associatif",
      "site internet asso rouen",
    ],
  },

  ehpad: {
    slug: "ehpad",
    name: "EHPAD / maison de retraite",
    namePlural: "EHPAD et maisons de retraite",
    nameLabeled: "les EHPAD",
    title: "Agence web pour EHPAD à Rouen — Sites & familles",
    description:
      "Création de sites internet pour EHPAD et maisons de retraite à Rouen et en Normandie : informations familles, agenda visites, photos résidence. WordPress sur mesure.",
    intro:
      "Vous dirigez un EHPAD ou une maison de retraite à Rouen ou en Normandie ? Le secteur médico-social a des contraintes web spécifiques : rassurer les familles qui choisissent un établissement pour leur proche, transmettre une image de qualité de vie, simplifier la communication avec les familles. Krealabs accompagne plusieurs EHPAD normands sur la modernisation de leur présence digitale.",
    challenges: [
      {
        title: "Rassurer les familles avant la visite",
        description:
          "Les familles choisissent un EHPAD avec une charge émotionnelle forte. Le site doit projeter sécurité, qualité, humanité. Photos qualité, témoignages, équipe valorisée.",
      },
      {
        title: "Transparence sur les tarifs et financements",
        description:
          "Le secteur est scruté. Affichage clair du forfait journalier, des aides possibles (APA, ASH, APL), prestations incluses. Simulateur de coût en option.",
      },
      {
        title: "Communication aux familles (résidents existants)",
        description:
          "Newsletter mensuelle, photos d'animations, agenda événements (Noël, kermesse, ateliers), espace privé pour les familles avec photos et infos santé encadrées.",
      },
      {
        title: "Recrutement (personnel soignant)",
        description:
          "Le secteur peine à recruter. Page \"Nous rejoindre\" attractive avec témoignages de salariés, parcours, avantages, formulaire de candidature spontanée.",
      },
    ],
    features: [
      {
        title: "Visite virtuelle 360° de la résidence",
        description:
          "Pour les familles éloignées géographiquement : visite virtuelle de la résidence, des chambres-types, des espaces communs. Réduit les visites physiques inutiles.",
      },
      {
        title: "Pages prestations détaillées",
        description:
          "Hébergement permanent, court séjour, accueil de jour, unité Alzheimer protégée. Une page par typologie, avec tarifs, prestations incluses, FAQ.",
      },
      {
        title: "Espace famille sécurisé",
        description:
          "Login familles pour accéder à : photos récentes du résident, planning visites, paiement de la facture mensuelle, prise de RDV avec la direction.",
      },
      {
        title: "Page \"Nous rejoindre\" recrutement",
        description:
          "Témoignages d'aides-soignants, IDE, animateur. Vidéos courtes. Formulaire candidature spontanée. Souvent le levier #1 pour faire venir des CV.",
      },
    ],
    recommendedStack:
      "WordPress + thème custom (esthétique chaleureuse, photos en grand format) + plugin recrutement (WP Job Manager) + zone privée famille avec authentification.",
    faq: [
      {
        question: "Combien coûte un site pour un EHPAD à Rouen ?",
        answer:
          "Pour un EHPAD à Rouen, un site WordPress moderne avec galerie + pages prestations + page recrutement : 5 000-8 500 €. Avec espace famille sécurisé et visite virtuelle : 10 000-18 000 €. Maintenance et MAJ des actus : 200-500 €/mois.",
      },
      {
        question: "Comment se conformer aux exigences RGPD avec un espace famille ?",
        answer:
          "L'espace famille traite des données sensibles (photos, infos santé). Obligations : hébergement HDS (Hébergeur de Données de Santé), connexion HTTPS, authentification forte, chiffrement des photos, registre RGPD, droit d'accès et à l'effacement. Coût additionnel : ~50-150 €/mois pour l'hébergement HDS.",
      },
    ],
    keywords: [
      "agence web ehpad rouen",
      "site internet maison de retraite rouen",
      "création site ehpad normandie",
      "site internet ehpad",
      "agence web médico-social rouen",
    ],
  },

  kine: {
    slug: "kine",
    name: "cabinet de kinésithérapie",
    namePlural: "cabinets de kinésithérapie",
    nameLabeled: "les cabinets de kinésithérapie",
    title: "Agence web pour kinésithérapeute & ostéopathe à Rouen",
    description:
      "Sites internet pour kinés et ostéopathes à Rouen : prise de RDV Doctolib, présentation cabinet, spécialités, conformité ordre. WordPress / Next.js.",
    intro:
      "Vous êtes kinésithérapeute, ostéopathe ou exercez en cabinet pluridisciplinaire à Rouen ou en Normandie ? Vos patients vous trouvent à 80% via Google et Doctolib. Un site internet professionnel vous différencie de la concurrence locale, vous permet de capter des patients sans dépendre uniquement de Doctolib (49 €/mois minimum), et vous positionne comme expert sur vos spécialités.",
    challenges: [
      {
        title: "Conformité Code de déontologie (kinés) ou Ordre (ostéos)",
        description:
          "Pour les kinés : article R.4321-67 CSP (pas de publicité). Pour les ostéopathes : Charte du Registre des Ostéopathes de France. Information factuelle uniquement, pas de comparaison.",
      },
      {
        title: "Doctolib vs prise de RDV directe",
        description:
          "Doctolib : 49-129 €/mois mais énorme visibilité. Module RDV direct (Cal.com 0-30 €/mois) : économies mais demande effort marketing pour amener les patients.",
      },
      {
        title: "SEO local par spécialité",
        description:
          "\"Kiné Rouen\" : ultra-compétitif. Stratégies : pages dédiées par spécialité (sport, périnée, respiratoire, drainage), par quartier (Saint-Sever, Mont-Saint-Aignan). Chacune cible une niche.",
      },
      {
        title: "Patient autonome : tarifs et préparation séance",
        description:
          "Les patients veulent connaître les tarifs (secteur 1/2, dépassements), apporter les bons documents (ordonnance, bilan), préparer leur première séance. Page FAQ patient indispensable.",
      },
    ],
    features: [
      {
        title: "Page par spécialité (rééducation sport, périnée, etc.)",
        description:
          "Une page dédiée par spécialité ou par pathologie traitée. Texte SEO + FAQ + témoignages patients (anonymisés). Cible la longue traîne (\"kiné rééducation épaule Rouen\").",
      },
      {
        title: "RDV intégré (Doctolib ou Cal.com)",
        description:
          "Widget Doctolib intégré, OU module Cal.com custom relié à votre agenda Google. Patient autonome 24/7.",
      },
      {
        title: "Présentation cabinet et équipe",
        description:
          "Photos professionnelles du cabinet, équipement, équipe (avec diplômes pour chacun). Rassure avant le premier RDV.",
      },
      {
        title: "Blog conseils patients",
        description:
          "Articles conseil (exercices à domicile, prévention TMS, douleur dos). Excellent SEO + service rendu au patient.",
      },
    ],
    recommendedStack:
      "WordPress + thème léger custom + widget Doctolib + plugin SEO Yoast/RankMath + hébergement français.",
    faq: [
      {
        question: "Faut-il Doctolib ou un module de RDV direct ?",
        answer:
          "Doctolib à 49-129 €/mois apporte une visibilité massive (les patients tapent \"kiné rouen\" sur Doctolib). Un module direct est moins cher mais demande un effort marketing pour amener les patients à votre site. La plupart des kinés utilisent les deux en parallèle.",
      },
      {
        question: "Combien coûte un site pour un cabinet de kinésithérapie ?",
        answer:
          "Site vitrine WordPress avec pages spécialités + blog conseils + RDV Doctolib : 2 500-4 500 €. Site personnalisé avec module RDV intégré + témoignages patients : 4 500-7 500 €.",
      },
    ],
    keywords: [
      "agence web kiné rouen",
      "site internet kinésithérapeute rouen",
      "création site ostéopathe rouen",
      "site web cabinet kiné normandie",
      "agence web santé rouen",
    ],
  },

  plombier: {
    slug: "plombier",
    name: "plombier",
    namePlural: "plombiers",
    nameLabeled: "les plombiers",
    title: "Agence web pour plombier à Rouen — Sites & devis en ligne",
    description:
      "Création de sites internet pour plombiers à Rouen : devis express, urgence 24/7, SEO local par quartier. Spécialiste WordPress et SEO local.",
    intro:
      "Vous êtes plombier ou entreprise de plomberie à Rouen, dans le Petit-Quevilly, Bois-Guillaume, Mont-Saint-Aignan ou ailleurs en Normandie ? Vos clients vous trouvent en urgence : fuite d'eau, chauffe-eau en panne, WC bouchés. Votre site web doit être pensé conversion immédiate : numéro de téléphone affiché en gros, formulaire de devis express, capacité d'intervention 24/7 affichée clairement.",
    challenges: [
      {
        title: "Conversion en urgence",
        description:
          "Quand un client a une fuite, il ne lit pas le site. Il appelle. Le numéro de téléphone doit être en méga-bouton flottant, le formulaire de devis ultra-court (3 champs max).",
      },
      {
        title: "SEO local hyperprécis",
        description:
          "\"Plombier Rouen\", \"plombier urgent Bois-Guillaume\", \"chauffe-eau Mont-Saint-Aignan\". Une page par quartier + par prestation = 30+ pages SEO ciblées.",
      },
      {
        title: "Confiance et avis",
        description:
          "Le secteur est connu pour les arnaques. Avis Google massivement affichés, photos d'interventions, certifications (Qualibat, RGE), assurance décennale visible.",
      },
      {
        title: "Tarification transparente",
        description:
          "Affichage clair : déplacement, taux horaire, prestations forfaitaires (débouchage WC, remplacement chauffe-eau). Évite les mauvaises surprises.",
      },
    ],
    features: [
      {
        title: "Numéro flottant + formulaire express",
        description:
          "Bouton d'appel direct visible en permanence (sticky mobile). Formulaire de devis avec 3 champs : nom, téléphone, urgence (oui/non). Pas plus.",
      },
      {
        title: "Pages par quartier de Rouen",
        description:
          "Pages dédiées par quartier (\"plombier Saint-Sever\", \"plombier Mont-Saint-Aignan\") avec horaires d'intervention, délais, témoignages locaux.",
      },
      {
        title: "Galerie interventions",
        description:
          "Photos avant/après de vos interventions (sans visage évidemment). Rassure et démontre la qualité du travail.",
      },
      {
        title: "Certifications & assurances visibles",
        description:
          "Logos Qualibat, RGE, assurance décennale, garantie décennale en évidence. Rassure les particuliers exigeants.",
      },
    ],
    recommendedStack:
      "WordPress + thème simple optimisé conversion + plugin SEO local + intégration Google Business Profile + click-to-call mobile.",
    faq: [
      {
        question: "Combien coûte un site pour un plombier à Rouen ?",
        answer:
          "Site WordPress vitrine optimisé conversion : 1 800-3 500 €. Avec 10-15 pages SEO par quartier/prestation : 4 000-6 500 €. ROI rapide : un plombier qui gagne 2 interventions/mois via le site rentabilise en 6-12 mois.",
      },
      {
        question: "Vaut-il mieux investir dans Google Ads ou dans le SEO pour un plombier ?",
        answer:
          "Court terme (0-3 mois) : Google Ads (200-500 €/mois) pour avoir des leads tout de suite. Long terme : SEO local + Google Business Profile pour des leads gratuits sur la durée. La majorité des plombiers actifs combinent les deux.",
      },
    ],
    keywords: [
      "agence web plombier rouen",
      "site internet plomberie rouen",
      "création site plombier normandie",
      "site plombier urgent rouen",
      "site web artisan rouen",
    ],
  },

  electricien: {
    slug: "electricien",
    name: "électricien",
    namePlural: "électriciens",
    nameLabeled: "les électriciens",
    title: "Agence web pour électricien à Rouen — Sites & devis",
    description:
      "Création de sites internet pour électriciens à Rouen et en Normandie : devis en ligne, prestations détaillées, certifications RGE. Spécialiste SEO local.",
    intro:
      "Vous êtes électricien ou entreprise d'électricité générale à Rouen, en Métropole Rouen Normandie ou ailleurs ? Vos clients cherchent un professionnel fiable et certifié, capable d'intervenir rapidement sur des dépannages comme sur des installations neuves. Votre site web doit refléter votre expertise, afficher vos certifications (Qualifelec, RGE), et faciliter la prise de contact.",
    challenges: [
      {
        title: "Diversité des prestations",
        description:
          "Mise aux normes, IRVE (bornes de recharge), domotique, photovoltaïque, dépannage : 10+ prestations possibles. Chacune cible une intention SEO différente.",
      },
      {
        title: "Certifications IRVE / RGE de plus en plus stratégiques",
        description:
          "Avec la transition énergétique : bornes de recharge VE, panneaux solaires, pompes à chaleur. Page dédiée par certification, avec aides financières (MaPrimeRénov', CEE).",
      },
      {
        title: "Devis détaillés pour rassurer",
        description:
          "Les électriciens sont souvent mis en concurrence avec 3 devis. Le vôtre doit être clair, détaillé, professionnel. Outil de pré-devis en ligne en option.",
      },
      {
        title: "B2B vs B2C : 2 cibles distinctes",
        description:
          "Particuliers (dépannage, rénovation) vs Pros (entreprises, tertiaire, BTP). Pages dédiées pour chaque cible, communications différenciées.",
      },
    ],
    features: [
      {
        title: "Pages par prestation et certification",
        description:
          "Mise aux normes électriques, IRVE bornes, domotique, photovoltaïque, dépannage urgence. Chaque page cible une longue traîne SEO précise.",
      },
      {
        title: "Pré-devis en ligne",
        description:
          "Formulaire de pré-devis : type de prestation, surface, urgence, contact. Réponse automatisée + RDV téléphonique pour devis chiffré.",
      },
      {
        title: "Page rénovation énergétique",
        description:
          "Aides MaPrimeRénov', CEE, déductions fiscales clairement expliquées. Cible les propriétaires qui veulent réduire leur facture énergétique.",
      },
      {
        title: "Section pros / B2B",
        description:
          "Page dédiée pour les pros (architectes, agences immobilières, syndic) avec présentation de chantiers réalisés, références B2B.",
      },
    ],
    recommendedStack:
      "WordPress + thème custom + plugin SEO Yoast + plugin formulaires (Gravity Forms ou WPForms). Google Maps intégrée pour zone d'intervention.",
    faq: [
      {
        question: "Combien coûte un site internet pour un électricien à Rouen ?",
        answer:
          "Site WordPress vitrine avec pages prestations + devis : 2 200-4 000 €. Avec pages dédiées par certification (IRVE, RGE, photovoltaïque) + simulateur d'aides : 4 500-7 500 €.",
      },
      {
        question: "Faut-il afficher les tarifs sur le site d'un électricien ?",
        answer:
          "Pour les prestations standardisées (mise à la terre, remplacement disjoncteur, dépannage forfaitaire), oui — c'est un avantage concurrentiel. Pour les prestations sur mesure (rénovation totale, photovoltaïque), non — on renvoie vers un devis personnalisé. Le mix des deux est idéal.",
      },
    ],
    keywords: [
      "agence web électricien rouen",
      "site internet électricien rouen",
      "création site électricien normandie",
      "site web électricien irve rouen",
      "site web artisan électricité",
    ],
  },

  "agence-communication": {
    slug: "agence-communication",
    name: "agence de communication",
    namePlural: "agences de communication",
    nameLabeled: "les agences de communication",
    title: "Site web pour agence de communication à Rouen",
    description:
      "Création de sites internet pour agences de communication à Rouen : portfolio dynamique, études de cas, blog expertise. WordPress et Next.js sur mesure.",
    intro:
      "Vous dirigez une agence de communication, de design ou de publicité à Rouen ou en Normandie ? Votre site web EST votre principal commercial : il doit projeter votre niveau de créativité, vos réalisations, votre identité visuelle. C'est un exercice particulièrement délicat — votre site doit être plus beau que ceux que vous concevez pour vos clients. Krealabs accompagne plusieurs agences de communication normandes sur cette tension.",
    challenges: [
      {
        title: "Le site = vitrine de votre créativité",
        description:
          "Si vous vendez du design ou de la communication, votre site doit l'illustrer. Direction artistique forte, typographie soignée, animations subtiles, performance technique impeccable.",
      },
      {
        title: "Portfolio de cas clients hiérarchisé",
        description:
          "Des dizaines de projets dans le portfolio, mais seulement quelques-uns en featured. Capacité de filtrage par secteur, par expertise, par année.",
      },
      {
        title: "Études de cas détaillées",
        description:
          "Pour les projets phares : étude de cas longue forme (brief, processus, résultats chiffrés). Le contenu fait la différence vs un simple visuel.",
      },
      {
        title: "Différentiation vs Paris",
        description:
          "Une agence rouennaise se bat contre des agences parisiennes mieux référencées. Le site doit assumer la position locale comme un atout (réactivité, proximité, prix).",
      },
    ],
    features: [
      {
        title: "Portfolio premium avec étude de cas",
        description:
          "Grille de projets avec hover effect, filtres par discipline (branding, web, print, motion). Études de cas longues pour les projets phares (problématique, processus, résultats).",
      },
      {
        title: "Page expertise et méthode",
        description:
          "Présentation détaillée de votre méthode de travail (cadrage, recherche, conception, production). Rassure les prospects sur le processus.",
      },
      {
        title: "Blog éditorial",
        description:
          "Pas un blog SEO bourrin, mais un vrai blog éditorial : tendances design, réflexions sur la communication, analyses de campagnes. Position d'expert.",
      },
      {
        title: "Page équipe créative",
        description:
          "Une équipe créative se vend à travers ses personnalités. Photos pro, bios, parcours, références. Très important pour les agences de communication.",
      },
    ],
    recommendedStack:
      "Next.js + Framer Motion (animations subtiles) + Sanity CMS ou Contentful pour les contenus. Performance maximale, animations sur mesure, design system custom. WordPress reste viable pour les structures plus petites.",
    faq: [
      {
        question: "Pourquoi une agence de communication ne fait-elle pas son site elle-même ?",
        answer:
          "Beaucoup d'agences excellentes en com font appel à un partenaire technique pour leur propre site. Raison : leurs ressources doivent être facturables aux clients ; faire leur propre site, c'est de l'investissement à faible ROI immédiat. D'où le partenariat agence créative + agence dev.",
      },
      {
        question: "Combien coûte un site pour une agence de communication à Rouen ?",
        answer:
          "Pour une agence créative qui veut un site à la hauteur de son métier : 8 000-25 000 €. La fourchette dépend de la profondeur des animations, du custom CMS, et du nombre d'études de cas à mettre en forme.",
      },
    ],
    keywords: [
      "agence web pour agence de communication rouen",
      "site internet agence créative rouen",
      "création site agence de pub normandie",
      "portfolio agence communication",
      "site web agence design rouen",
    ],
  },

  pharmacie: {
    slug: "pharmacie",
    name: "pharmacie",
    namePlural: "pharmacies",
    nameLabeled: "les pharmacies",
    title: "Agence web pour pharmacie à Rouen — Sites & click & collect",
    description:
      "Sites internet pour pharmacies à Rouen et en Normandie : click & collect ordonnances, parapharmacie en ligne, conformité ARS. WordPress et Next.js.",
    intro:
      "Vous tenez une pharmacie d'officine à Rouen ou en Normandie ? Le secteur évolue : click & collect d'ordonnances, télé-services (vaccinations, tests, conseil pharmaceutique), parapharmacie en ligne. Votre site web est un canal commercial complémentaire de l'officine physique — à condition de respecter les règles strictes du Code de déontologie pharmaceutique et de l'Ordre.",
    challenges: [
      {
        title: "Conformité Ordre des Pharmaciens (article R.4235-22 CSP)",
        description:
          "Pas de publicité grand public sur les médicaments. Restrictions sur le e-commerce de médicaments (autorisation ARS obligatoire). Nous appliquons les règles dès la conception.",
      },
      {
        title: "Click & collect ordonnances",
        description:
          "Permettre aux clients de scanner leur ordonnance, choisir un créneau de retrait, et venir en officine sans attendre. Solution sécurisée RGPD.",
      },
      {
        title: "Parapharmacie en ligne (si vous en vendez)",
        description:
          "Vente en ligne de produits de parapharmacie (cosmétiques, compléments, hygiène). E-commerce simple à gérer, sans tomber dans le médicament (réglementé).",
      },
      {
        title: "Télé-services et nouvelles missions",
        description:
          "Vaccinations, tests Covid, entretiens pharmaceutiques, dispensation conditionnelle. Page d'information avec prise de RDV en ligne.",
      },
    ],
    features: [
      {
        title: "Click & collect ordonnances",
        description:
          "Upload sécurisé de l'ordonnance, choix d'un créneau de retrait, validation. Système sécurisé RGPD (chiffrement), pas de stockage à long terme.",
      },
      {
        title: "Boutique parapharmacie",
        description:
          "Catalogue produits parapharmacie (uniquement), paiement Stripe, retrait en officine ou livraison. WooCommerce configuré pour ne pas vendre de médicaments.",
      },
      {
        title: "Prise de RDV télé-services",
        description:
          "Calendrier intégré pour vaccinations, tests, entretiens pharmaceutiques. Patient autonome 24/7.",
      },
      {
        title: "Page équipe et conseils santé",
        description:
          "Présentation pharmacien titulaire + équipe + spécialités. Blog conseil santé (vaccinations, prévention saisonnière) pour SEO et fidélisation.",
      },
    ],
    recommendedStack:
      "WordPress + WooCommerce (configuré strict, pas de médicaments) + module RDV custom + hébergement HDS pour les ordonnances.",
    faq: [
      {
        question: "Peut-on vendre des médicaments en ligne en France ?",
        answer:
          "Oui, mais uniquement avec autorisation expresse de l'ARS et seulement pour les médicaments NON soumis à prescription. Le processus prend 6-12 mois et coûte 1 000-3 000 € de formalités. Notre conseil : commencer par le click & collect (légal, simple), puis évaluer si l'e-commerce médicaments vaut l'effort.",
      },
      {
        question: "Combien coûte un site pour une pharmacie à Rouen ?",
        answer:
          "Site WordPress vitrine avec click & collect ordonnances + RDV : 5 000-9 000 €. Avec boutique parapharmacie (WooCommerce, 200-500 produits) : 9 000-16 000 €. Maintenance : 150-400 €/mois.",
      },
    ],
    keywords: [
      "agence web pharmacie rouen",
      "site internet pharmacie rouen",
      "création site pharmacie normandie",
      "click collect pharmacie rouen",
      "site web officine rouen",
    ],
  },

  "transport-logistique": {
    slug: "transport-logistique",
    name: "société de transport et logistique",
    namePlural: "sociétés de transport et logistique",
    nameLabeled: "les sociétés de transport et logistique",
    title: "Agence web pour transport & logistique à Rouen — Sites B2B",
    description:
      "Sites internet pour entreprises de transport et logistique à Rouen : suivi de commandes, devis transport, intégrations ERP. WordPress et Next.js sur mesure.",
    intro:
      "Vous dirigez une entreprise de transport, de logistique ou de messagerie à Rouen, sur le port autonome ou sur la zone Vatine ? La Normandie concentre une activité logistique massive (port du Havre, axe Seine, A28). Votre site web n'est plus une simple vitrine : c'est un outil B2B pour générer des devis, gérer les comptes clients, suivre les commandes.",
    challenges: [
      {
        title: "B2B : devis et tarification complexe",
        description:
          "Le transport facture selon poids, volume, distance, urgence, type de marchandise. Outil de pré-devis en ligne pour qualifier rapidement les demandes.",
      },
      {
        title: "Suivi de commandes / tracking",
        description:
          "Les clients veulent voir où est leur livraison en temps réel. Intégration TMS (Transport Management System) : Akanea, Astre, Rio, ou solutions custom.",
      },
      {
        title: "SEO sectoriel et géographique",
        description:
          "\"Transporteur Rouen\", \"messagerie Le Havre\", \"logistique axe Seine\". Pages dédiées par typologie (palette, express, vrac, marchandises dangereuses) et par zone.",
      },
      {
        title: "Référencement B2B (annuaires pros)",
        description:
          "Inscription Europages, Kompass, Indexa, Pages Jaunes Pro. Backlinks B2B très puissants pour le SEO.",
      },
    ],
    features: [
      {
        title: "Outil de pré-devis transport",
        description:
          "Formulaire intelligent : type de marchandise, poids, volume, départ/arrivée, urgence. Pré-devis automatique ou redirection vers commercial selon complexité.",
      },
      {
        title: "Pages spécialités",
        description:
          "Transport routier, messagerie express, logistique entreposage, transport frigorifique, ADR (matières dangereuses). Chaque spécialité = page SEO dédiée.",
      },
      {
        title: "Espace client (factures + commandes)",
        description:
          "Login pour les clients : historique des transports, factures dématérialisées, suivi en temps réel, demande de devis depuis le portail.",
      },
      {
        title: "Recrutement chauffeurs",
        description:
          "Le secteur peine à recruter. Page \"Devenir chauffeur\" avec témoignages, formation, équipements, avantages, formulaire de candidature.",
      },
    ],
    recommendedStack:
      "Next.js + intégration TMS (Akanea, Astre, Stream, etc.) + Stripe pour les paiements + portail client custom. WordPress reste possible pour les structures plus petites avec moins d'intégrations.",
    faq: [
      {
        question: "Combien coûte un site pour une société de transport à Rouen ?",
        answer:
          "Site vitrine WordPress avec formulaire de devis avancé : 4 000-7 500 €. Site Next.js avec portail client + intégration TMS : 15 000-40 000 € selon la profondeur des intégrations.",
      },
      {
        question: "Faut-il intégrer le TMS (logiciel transport) au site ?",
        answer:
          "Pour une PME 10-50 salariés : pas obligatoire au début. Le formulaire de devis web peut être traité manuellement. Au-delà de 50 commandes/jour générées via le web, l'intégration TMS devient critique pour éviter la double saisie.",
      },
    ],
    keywords: [
      "agence web transport rouen",
      "site internet logistique normandie",
      "création site transporteur rouen",
      "site web messagerie rouen",
      "agence web transport b2b",
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
