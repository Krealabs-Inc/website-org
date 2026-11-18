import type { Metadata } from "next";

import { TechPage } from "@/components/tech/tech-page";
import { getPageTexts } from "@/lib/content/pages";
import { TECH_REACT_NATIVE } from "@/lib/page-texts/tech-react-native";
import { ReactNativeDemo } from "@/components/tech/demos";

export const metadata: Metadata = {
  title: "React Native à Rouen - Apps iOS & Android cross-platform",
  description:
    "Développement React Native à Rouen. Applications mobiles iOS et Android avec une seule base de code. Performance native, OTA, notifications push.",
  alternates: { canonical: "https://krealabs.fr/technologies/react-native" },
};

export default async function ReactNativePage() {
  const t = await getPageTexts(TECH_REACT_NATIVE);
  return <TechPage number="03" demo={<ReactNativeDemo />} t={t} />;
}
