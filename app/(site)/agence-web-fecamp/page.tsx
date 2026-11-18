import { Metadata } from "next";

import { CityLanding } from "@/components/local/city-landing";
import { getCity } from "@/lib/content/local";


export async function generateMetadata(): Promise<Metadata> {
  const city = await getCity("fecamp");
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

export default async function AgenceWebFecampPage() {
  const city = await getCity("fecamp");
  return <CityLanding city={city} />;
}
