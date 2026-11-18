import type { Metadata } from "next";

import { TechPage } from "@/components/tech/tech-page";
import { getPageTexts } from "@/lib/content/pages";
import { TECH_TYPESCRIPT } from "@/lib/page-texts/tech-typescript";
import { TypeScriptDemo } from "@/components/tech/demos";

export const metadata: Metadata = {
  title: "TypeScript à Rouen - Langage typé pour code maintenable",
  description:
    "Expertise TypeScript à Rouen. Typage strict, refactoring serein, autocomplétion partout. La fondation de tous nos projets web et mobile.",
  alternates: { canonical: "https://krealabs.fr/technologies/typescript" },
};

export default async function TypescriptPage() {
  const t = await getPageTexts(TECH_TYPESCRIPT);
  return <TechPage number="04" demo={<TypeScriptDemo />} t={t} />;
}
