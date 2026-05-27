import { Metadata } from "next";

import { CityLanding } from "@/components/local/city-landing";
import { CITIES } from "@/lib/cities";

const city = CITIES["le-havre"];

export const metadata: Metadata = {
  title: city.title,
  description: city.description,
  alternates: { canonical: `https://krealabs.fr${city.path}` },
  openGraph: {
    title: `${city.title} — Krealabs`,
    description: city.description,
    url: `https://krealabs.fr${city.path}`,
    type: "website",
  },
};

export default function AgenceWebLeHavrePage() {
  return <CityLanding city={city} />;
}
