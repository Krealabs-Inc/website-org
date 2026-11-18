import { ctaFields, definePage } from "./define";

export const TECH_REACT_NATIVE = definePage({
  slug: "tech-react-native",
  label: "Technologie · React Native",
  fields: {
    kind: { label: "Hero · surtitre", default: "Technologie · Mobile" },
    title: { label: "Hero · titre", default: "*React Native* : iOS & Android,\nune seule équipe.", long: true },
    description: { label: "Hero · texte", default: "Le framework cross-platform le plus mature pour développer des applications mobiles natives. Une base de code, deux App Stores, l’expérience utilisateur fidèle à chaque plateforme.", long: true },
    heroCta: { label: "Hero · bouton", default: "Parler de mon projet" },
    whyEyebrow: { label: "Raisons · surtitre", default: "Pourquoi" },
    whyTitle: { label: "Raisons · titre", default: "Six atouts *décisifs*." },
    reasons: { label: "Raisons", list: { title: { label: "Titre" }, description: { label: "Texte", long: true } }, default: [{"title": "iOS & Android", "description": "Une seule base de code, deux apps installables sur les stores."}, {"title": "Performance native", "description": "Rendu via les composants natifs, pas un wrapper WebView."}, {"title": "Expo & EAS", "description": "Build cloud, preview channels, partage facile avec les beta-testers."}, {"title": "Mises à jour OTA", "description": "Patches déployés sans repasser par l'App Store ou le Play Store."}, {"title": "Notifications push", "description": "Expo Push, Firebase, OneSignal. Segmentation, scheduling, deep links."}, {"title": "APIs natives", "description": "Géolocalisation, caméra, biométrie, paiements Apple/Google Pay."}] },
    usesEyebrow: { label: "Cas d’usage · surtitre", default: "Cas d’usage" },
    uses: { label: "Cas d’usage", list: { title: { label: "Titre" }, description: { label: "Texte", long: true } }, default: [{"title": "Apps e-commerce", "description": "Catalogues, panier, paiements, push marketing. UX native."}, {"title": "Apps santé & fitness", "description": "Tracking, intégration HealthKit/Google Fit, monitoring."}, {"title": "Outils internes", "description": "Apps métier pour terrain, équipes mobiles, ventes externes."}] },
    ...ctaFields("Une app *mobile* à concevoir ?"),
  },
});
