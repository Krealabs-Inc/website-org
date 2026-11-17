/** Original /faq content; imported into the CMS (payload/seed/faq.ts). */
export const FAQ_GROUPS: { title: string; items: { question: string; answer: string }[] }[] = [
  {
    title: "Le projet",
    items: [
      {
        question: "Quels sont vos délais de réalisation ?",
        answer:
          "Les délais varient selon la complexité. Un site vitrine est livré en 2 à 3 semaines, une application web complète en 4 à 8 semaines, une app mobile en 6 à 12 semaines. Vous recevez un planning détaillé dès la phase de devis.",
      },
      {
        question: "Comment se déroule un projet avec vous ?",
        answer:
          "Notre processus en 4 étapes : (1) cadrage et brief écrit, (2) maquettes Figma validées par vous, (3) développement en sprints avec démos régulières, (4) mise en ligne, formation et suivi. Vous êtes impliqué à chaque étape.",
      },
      {
        question: "Travaillez-vous avec des startups ?",
        answer:
          "Oui, nous accompagnons régulièrement des startups sur leur MVP. Nous proposons des cadrages courts pour valider rapidement un produit minimum viable, ainsi qu'un accompagnement long terme à mesure que le produit évolue.",
      },
    ],
  },
  {
    title: "Tarifs & devis",
    items: [
      {
        question: "Combien coûte un projet ?",
        answer:
          "Nos tarifs sont systématiquement sur devis car chaque projet est unique. Après un premier échange (gratuit, sans engagement), nous vous transmettons un devis détaillé sous 48 à 72h. Pas de tarifs cachés, pas de mauvaise surprise.",
      },
      {
        question: "Proposez-vous des formules de maintenance ?",
        answer:
          "Oui, nous proposons des contrats de maintenance mensuelle incluant mises à jour de sécurité, corrections, petites évolutions, monitoring et support technique. Chaque projet bénéficie aussi de 1 mois de support gratuit après livraison.",
      },
      {
        question: "Quels modes de paiement acceptez-vous ?",
        answer:
          "Virement bancaire principalement, avec un échelonnement classique : 30% à la signature, 30% à la validation des maquettes, 30% à la livraison, 10% un mois après mise en production.",
      },
    ],
  },
  {
    title: "Technologies & expertise",
    items: [
      {
        question: "Quelles technologies utilisez-vous ?",
        answer:
          "Stack moderne : React et Next.js pour le web, React Native pour le mobile, TypeScript pour la robustesse, Prisma + PostgreSQL pour les bases de données, Tailwind CSS pour le design. Nous choisissons la stack la plus adaptée à chaque projet.",
      },
      {
        question: "Proposez-vous du SEO ?",
        answer:
          "Oui, tous nos sites intègrent les fondations SEO dès le développement (structure, métadonnées, performance, schema.org). Nous proposons également des prestations SEO avancées : audit, optimisation, contenus, suivi des positions, SEO local Rouen.",
      },
      {
        question: "Fournissez-vous l'hébergement ?",
        answer:
          "Nous déployons sur des infrastructures performantes comme Vercel ou AWS, et vous aidons à choisir la meilleure option pour votre cas. L'hébergement n'est pas inclus dans nos forfaits (coûts variables selon le trafic), mais nous gérons la configuration et le déploiement continu.",
      },
    ],
  },
  {
    title: "Collaboration",
    items: [
      {
        question: "Êtes-vous basés à Rouen ?",
        answer:
          "Oui, notre équipe est basée à Rouen en Normandie. Nous travaillons principalement en remote, mais nous organisons volontiers des points en présentiel pour les clients locaux. Nous intervenons dans toute la France.",
      },
      {
        question: "Puis-je modifier mon site moi-même après livraison ?",
        answer:
          "Oui, nous construisons des sites faciles à maintenir. Pour le contenu, vous avez accès à un CMS simple. Pour le code, nous fournissons une documentation complète et proposons une formation. Notre support reste disponible.",
      },
      {
        question: "Que se passe-t-il si je ne suis pas satisfait ?",
        answer:
          "Nous travaillons en itérations avec validation à chaque étape pour éviter toute mauvaise surprise. Si une étape ne convient pas, nous la retravaillons jusqu'à validation. Nous offrons une garantie de 30 jours après livraison pour toute correction.",
      },
    ],
  },
];
