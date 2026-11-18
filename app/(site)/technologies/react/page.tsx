import type { Metadata } from "next";

import { TechPage } from "@/components/tech/tech-page";
import { getPageTexts } from "@/lib/content/pages";
import { TECH_REACT } from "@/lib/page-texts/tech-react";
import { ReactDemo } from "@/components/tech/demos";

export const metadata: Metadata = {
  title: "React à Rouen - Bibliothèque UI moderne",
  description:
    "Développement React à Rouen. Composants réutilisables, écosystème mature, standard de l'industrie. Base de nos applications web et mobiles.",
  alternates: { canonical: "https://krealabs.fr/technologies/react" },
};

export default async function ReactPage() {
  const t = await getPageTexts(TECH_REACT);
  return <TechPage number="02" demo={<ReactDemo />} t={t} />;
}
