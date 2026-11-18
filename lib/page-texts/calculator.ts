import { ctaFields, definePage } from "./define";

export const CALCULATOR = definePage({
  slug: "calculateur",
  label: "Calculateur",
  fields: {
    eyebrow: { label: "Hero · surtitre", default: "Calculateur · Estimation projet" },
    title: { label: "Hero · titre", default: "Combien *coûte* votre projet web ?" },
    intro: { label: "Hero · texte", default: "Trois choix, et votre ticket s’imprime ligne par ligne : une fourchette réaliste pour votre site, votre boutique, votre logiciel ou votre application, basée sur les prix du marché normand.", long: true },
    methodEyebrow: { label: "Méthode · surtitre", default: "D’où vient votre estimation ?" },
    methodTitle: { label: "Méthode · titre", default: "Une estimation *que vous pouvez vérifier*." },
    methodText1: { label: "Méthode · texte (1)", default: "La fourchette de base par type de projet est dérivée des devis réels qu'on a chiffrés depuis 2020 à Rouen. Les options additionnelles (paiement Stripe, comptes utilisateur, intégrations…) sont valorisées au prix marché normand : environ 600-800 €/jour de dev senior, avec une fourchette qui reflète la variance selon la complexité.", long: true },
    methodText2: { label: "Méthode · texte (2)", default: "Le multiplicateur d'urgence (+20% si < 4 semaines, -5% si flexible) reflète le coût opérationnel réel : un projet urgent demande de déprioriser d'autres clients ou de mobiliser des renforts.", long: true },
    methodText3: { label: "Méthode · texte (3)", default: "**Cette estimation n'est pas un devis.** Pour un chiffrage précis, votre projet doit d'abord être cadré (besoins exacts, contraintes, intégrations spécifiques) : c'est l'objet du premier rendez-vous, gratuit. Pour aller plus loin sur les tarifs, lisez l'[article complet sur les prix des sites internet à Rouen](/blog/prix-site-internet-rouen-2026).", long: true },
    ...ctaFields("Passez de l'estimation au *devis précis*.", {"text": "Votre premier rendez-vous est offert, à Rouen ou en visio : vous passez de la fourchette à un prix ferme.", "primary": "Réserver mon rendez-vous offert"}),
  },
});
