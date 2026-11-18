import { definePage } from "./define";

/** /studio: the page that presents KreaStudio and sends visitors to it. */
export const STUDIO_PAGE = definePage({
  slug: "studio",
  label: "KreaStudio",
  fields: {
    eyebrow: { label: "Hero · surtitre", default: "KreaStudio · Outil gratuit" },
    title: { label: "Hero · titre", default: "Voyez votre site *avant de le commander.*" },
    intro: { label: "Hero · texte", long: true, default: "Site vitrine, boutique en ligne, application web ou mobile : décrivez votre projet en cinq minutes. KreaStudio génère avec l’IA une première maquette, que vous ajustez avant d’en parler avec l’équipe." },
    cta: { label: "Bouton principal (toute la page)", default: "Créer ma maquette gratuite" },
    heroSecondary: { label: "Hero · bouton secondaire", default: "Comment ça marche" },
    reassurance: { label: "Hero · ligne de réassurance", default: "Gratuit et sans engagement · Une adresse e-mail suffit · Deux retouches incluses" },
    stepsEyebrow: { label: "Étapes · surtitre", default: "Comment ça marche" },
    stepsTitle: { label: "Étapes · titre", default: "De votre idée à un devis, *en quatre étapes.*" },
    steps: {
      label: "Étapes",
      list: { title: { label: "Étape" }, description: { label: "Texte", long: true } },
      default: [
        { title: "Décrivez votre projet", description: "Votre activité, votre objectif, les pages utiles, l’ambiance souhaitée. Un questionnaire guidé, sans jargon, en cinq minutes environ." },
        { title: "Recevez votre maquette", description: "Quelques minutes plus tard, plusieurs écrans à parcourir, avec des textes écrits pour votre activité." },
        { title: "Ajustez-la", description: "Une couleur, une section, un texte à revoir : vous le dites en une phrase. Deux retouches sont incluses." },
        { title: "Parlez-en avec nous", description: "Posez vos questions à l’équipe depuis votre espace et demandez un devis quand la direction vous convient." },
      ],
    },
    featuresEyebrow: { label: "Contenu · surtitre", default: "Ce que vous recevez" },
    featuresTitle: { label: "Contenu · titre", default: "Une base concrète *pour décider.*" },
    features: {
      label: "Contenu de la maquette",
      list: { title: { label: "Titre" }, description: { label: "Texte", long: true } },
      default: [
        { title: "Plusieurs écrans à parcourir", description: "Accueil, pages clés, contact : vous passez d’un écran à l’autre comme sur un vrai site." },
        { title: "Des textes qui parlent de vous", description: "Les titres et les contenus sont écrits à partir de votre activité, pas du faux texte." },
        { title: "Une ambiance à votre image", description: "Sobre, chaleureuse, haut de gamme, affirmée, ludique ou technique : vous choisissez le ton." },
        { title: "Deux retouches incluses", description: "Vous décrivez ce qui ne va pas, la maquette est reprise en quelques minutes." },
        { title: "Un lien à partager", description: "Montrez la maquette à votre associé ou à votre entourage avant de décider." },
        { title: "Une équipe derrière l’outil", description: "Une messagerie pour vos questions, et un devis pour la réalisation quand vous êtes prêt." },
      ],
    },
    honestEyebrow: { label: "Transparence · surtitre", default: "À savoir" },
    honestTitle: { label: "Transparence · titre", default: "Une première maquette, *pas encore votre site.*" },
    honestText: { label: "Transparence · texte", long: true, default: "La maquette est générée par une intelligence artificielle à partir de vos réponses. Elle est indicative : elle sert à vous projeter et à lancer la discussion, pas à remplacer le travail de conception." },
    honestIs: {
      label: "Transparence · ce qu’elle est",
      list: { label: { label: "Texte" } },
      default: [{ label: "Une direction : structure, ton, contenus" }, { label: "Un support pour en parler à plusieurs" }, { label: "Un point de départ pour votre devis" }],
    },
    honestIsNot: {
      label: "Transparence · ce qu’elle n’est pas",
      list: { label: { label: "Texte" } },
      default: [{ label: "Votre site définitif, prêt à mettre en ligne" }, { label: "Un engagement, ni pour vous ni pour nous" }, { label: "Le design final, que l’équipe conçoit avec vous" }],
    },
    faqEyebrow: { label: "Questions · surtitre", default: "Questions fréquentes" },
    faqTitle: { label: "Questions · titre", default: "Avant de vous lancer" },
    faq: {
      label: "Questions fréquentes",
      list: { question: { label: "Question" }, answer: { label: "Réponse", long: true } },
      default: [
        { question: "Est-ce vraiment gratuit ?", answer: "Oui. Créer votre maquette et demander vos deux retouches ne coûte rien et ne vous engage à rien. Vous ne payez que si vous nous confiez ensuite la réalisation de votre projet, sur devis." },
        { question: "Faut-il créer un compte ?", answer: "Une adresse e-mail suffit. Vous recevez un lien et un code de connexion : pas de mot de passe à retenir." },
        { question: "Combien de temps faut-il prévoir ?", answer: "Environ cinq minutes pour décrire votre projet, puis quelques minutes pour que la maquette soit générée." },
        { question: "Qui fabrique la maquette ?", answer: "Une intelligence artificielle (Claude, d’Anthropic), guidée par nos consignes de conception. L’équipe Kréalabs prend le relais dès que vous posez une question ou demandez un devis." },
        { question: "La maquette sera-t-elle mon futur site ?", answer: "Non. C’est une première direction, indicative et non contractuelle. Votre site est ensuite conçu et développé par l’équipe, avec vous, à partir de cette base ou d’une autre." },
        { question: "Puis-je générer plusieurs maquettes ?", answer: "Chaque compte donne droit à une maquette et à deux retouches. Pour aller plus loin, on en parle ensemble." },
        { question: "Que deviennent mes données ?", answer: "Votre adresse e-mail, la description de votre projet et votre maquette servent uniquement à créer la maquette et à vous répondre. La description est transmise à Anthropic pour la génération. Vous pouvez demander la suppression complète de votre compte à tout moment." },
      ],
    },
    ctaEyebrow: { label: "Appel à l’action · surtitre", default: "À vous" },
    ctaTitle: { label: "Appel à l’action · titre", default: "Cinq minutes pour *voir votre idée.*" },
    ctaText: { label: "Appel à l’action · texte", long: true, default: "Décrivez votre projet maintenant, ou parlez-en directement à l’équipe si vous préférez." },
    ctaSecondary: { label: "Appel à l’action · bouton secondaire", default: "Parler de mon projet" },
  },
});
