import { unstable_cache } from "next/cache";

import { cms } from "@/lib/cms";
import type { CityData } from "@/lib/cities";
import type { CityFAQItem } from "@/lib/city-faq";
import type { SectorData } from "@/lib/sectors";

type Doc = Record<string, unknown>;
const list = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);
const qa = (v: unknown) => (Array.isArray(v) ? (v as { question: string; answer: string }[]).map(({ question, answer }) => ({ question, answer })) : []);
const td = (v: unknown) => (Array.isArray(v) ? (v as { title: string; description: string }[]).map(({ title, description }) => ({ title, description })) : []);

export type CityWithFaq = CityData & { faq: CityFAQItem[] };

function toCity(d: Doc): CityWithFaq {
  return {
    slug: d.slug as string,
    path: d.path as string,
    name: d.name as string,
    cityArticle: d.cityArticle as string,
    cityPossessive: d.cityPossessive as string,
    adjective: d.adjective as string,
    adjectivePlural: d.adjectivePlural as string,
    postalCode: d.postalCode as string,
    region: d.region as string,
    department: d.department as string,
    inseeCode: d.inseeCode as string,
    population: d.population as string,
    metropole: d.metropole as string,
    geo: { lat: d.lat as number, lng: d.lng as number },
    distanceFromRouen: d.distanceFromRouen as number,
    heroIntro: d.heroIntro as string,
    zonesActivite: list(d.zonesActivite),
    topSectors: list(d.topSectors),
    landmarks: list(d.landmarks),
    title: d.title as string,
    description: d.description as string,
    keywords: list(d.keywords),
    cityReason: d.cityReason as string,
    faq: qa(d.faq),
  };
}

function toSector(d: Doc): SectorData {
  return {
    slug: d.slug as string,
    name: d.name as string,
    namePlural: d.namePlural as string,
    nameLabeled: d.nameLabeled as string,
    title: d.title as string,
    description: d.description as string,
    intro: d.intro as string,
    challenges: td(d.challenges),
    features: td(d.features),
    recommendedStack: d.recommendedStack as string,
    faq: qa(d.faq),
    keywords: list(d.keywords),
  };
}

/** Cities keyed by slug. Cached; refreshed when edited in /cms. */
export const getCities = unstable_cache(
  async (): Promise<Record<string, CityWithFaq>> => {
    const payload = await cms();
    const res = await payload.find({ collection: "cities", limit: 100, depth: 0 });
    return Object.fromEntries(res.docs.map((d) => [d.slug as string, toCity(d as unknown as Doc)]));
  },
  ["content-cities"],
  { tags: ["cities"] },
);

/** A city by slug; throws if missing (each city has its own route file). */
export async function getCity(slug: string) {
  const city = (await getCities())[slug];
  if (!city) throw new Error(`City "${slug}" is missing from the CMS`);
  return city;
}

/** Rouen sectors keyed by slug. Cached; refreshed when edited in /cms. */
export const getSectors = unstable_cache(
  async (): Promise<Record<string, SectorData>> => {
    const payload = await cms();
    const res = await payload.find({ collection: "sectors", limit: 100, depth: 0 });
    return Object.fromEntries(res.docs.map((d) => [d.slug as string, toSector(d as unknown as Doc)]));
  },
  ["content-sectors"],
  { tags: ["sectors"] },
);
