/** The site’s main pages (used by the 404 to suggest the closest ones), with words a visitor might have typed. */
export const ROUTES = [
  { label: "Accueil", href: "/", words: "accueil home index krealabs" },
  { label: "Nos solutions", href: "/services", words: "services solutions offres prestations" },
  { label: "Site WordPress", href: "/services/wordpress", words: "wordpress wp site vitrine woocommerce" },
  { label: "Développement web", href: "/services/developpement-web", words: "developpement web logiciel sur mesure dev" },
  { label: "Application mobile", href: "/services/applications-mobile", words: "application mobile app ios android" },
  { label: "Design UI/UX", href: "/services/design-uiux", words: "design ui ux maquette figma" },
  { label: "Performance & SEO", href: "/services/performance-seo", words: "seo performance referencement google vitesse" },
  { label: "Réalisations", href: "/clients", words: "clients realisations projets portfolio references" },
  { label: "L’équipe", href: "/equipe", words: "equipe team associes" },
  { label: "Notre histoire", href: "/notre-histoire", words: "histoire about agence" },
  { label: "Le Journal", href: "/blog", words: "blog articles journal actualites" },
  { label: "Lexique du web", href: "/lexique", words: "lexique glossaire definitions" },
  { label: "KreaStudio, maquette gratuite", href: "/studio", words: "studio kreastudio maquette gratuite apercu prototype ia" },
  { label: "Calculateur de devis", href: "/calculateur", words: "calculateur devis prix tarif estimation" },
  { label: "Questions fréquentes", href: "/faq", words: "faq questions" },
  { label: "Contact", href: "/contact", words: "contact devis rendez-vous email" },
];

function bigrams(s: string) {
  const out = new Set<string>();
  for (let i = 0; i < s.length - 1; i++) out.add(s.slice(i, i + 2));
  return out;
}

function dice(a: string, b: string) {
  const A = bigrams(a), B = bigrams(b);
  if (!A.size || !B.size) return 0;
  let n = 0;
  A.forEach((x) => B.has(x) && n++);
  return (2 * n) / (A.size + B.size);
}

/** The pages closest to a missing URL, best first. */
export function closest(path: string, count = 3) {
  const tokens = path.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z0-9]+/).filter((t) => t.length > 1);
  if (!tokens.length) return ROUTES.slice(1, 1 + count);
  return ROUTES.filter((r) => r.href !== "/")
    .map((r) => {
      const words = (r.words + " " + r.href).split(/[^a-z0-9]+/).filter(Boolean);
      const score = tokens.reduce((s, t) => s + Math.max(...words.map((w) => dice(t, w))), 0) / tokens.length;
      return { ...r, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}
