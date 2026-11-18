import { Metadata } from "next";

import { CityLanding } from "@/components/local/city-landing";
import { getCity } from "@/lib/content/local";


export async function generateMetadata(): Promise<Metadata> {
  const city = await getCity("caen");
  return {
  title: city.title,
  description: city.description,
  alternates: { canonical: `https://krealabs.fr${city.path}` },
  openGraph: {
    title: `${city.title} - Krealabs`,
    description: city.description,
    url: `https://krealabs.fr${city.path}`,
    type: "website",
  },
  };
}

export default async function AgenceWebCaenPage() {
  const city = await getCity("caen");
  return <CityLanding city={city} />;
}
