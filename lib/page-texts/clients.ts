import { ctaFields, definePage } from "./define";

export const CLIENTS = definePage({
  slug: "clients",
  label: "Réalisations (page)",
  fields: {
    eyebrow: { label: "Bande · surtitre", default: "Réalisations & explorations" },
    title: { label: "Bande · titre", default: "Des besoins différents.\nDes réponses *concrètes.*", long: true },
    intro: { label: "Bande · texte", default: "Une plateforme multilingue, des sites vitrines, un site de marque, une boutique, un concept de refonte et notre propre logiciel. Pour chacun : la situation de départ, ce qui a été fait, et ce que ça change. Peut-être un cas proche du vôtre.", long: true },
    casesEyebrow: { label: "Fiches · surtitre", default: "Les fiches en détail" },
    casesTitle: { label: "Fiches · titre", default: "Leur situation, ce qui a été fait, *ce que ça change.*" },
    labelSituation: { label: "Fiches · libellé 1", default: "La situation." },
    labelWork: { label: "Fiches · libellé 2", default: "Ce qui a été fait." },
    labelResult: { label: "Fiches · libellé 3", default: "Ce que ça change." },
    ...ctaFields("Et votre *projet ?*", {"text": "Parlons de votre activité, de vos visiteurs et de ce que votre site doit leur permettre de faire.", "primary": "Parler de mon projet"}),
  },
});
