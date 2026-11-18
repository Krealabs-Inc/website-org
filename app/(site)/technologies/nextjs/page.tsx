import type { Metadata } from "next";

import { TechPage } from "@/components/tech/tech-page";
import { getPageTexts } from "@/lib/content/pages";
import { TECH_NEXTJS } from "@/lib/page-texts/tech-nextjs";
import { NextDemo } from "@/components/tech/demos";

export const metadata: Metadata = {
  title: "Next.js à Rouen - Framework React production",
  description:
    "Expertise Next.js à Rouen. Server Components, App Router, SEO natif, performance extrême. Notre framework de prédilection pour les sites web modernes.",
  alternates: { canonical: "https://krealabs.fr/technologies/nextjs" },
};

export default async function NextjsPage() {
  const t = await getPageTexts(TECH_NEXTJS);
  return <TechPage number="01" demo={<NextDemo />} t={t} />;
}
