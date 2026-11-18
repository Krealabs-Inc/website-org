import { unstable_cache } from "next/cache";

import { items, mediaUrl } from "@/lib/directus";
import type { TeamMember } from "@/lib/team";

type Doc = Record<string, unknown>;
const list = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);
const opt = (v: unknown) => (typeof v === "string" && v ? v : undefined);

function toMember(d: Doc): TeamMember {
  return {
    slug: d.slug as string,
    name: d.name as string,
    role: d.role as string,
    initials: d.initials as string,
    bio: d.bio as string,
    longBio: d.longBio as string,
    location: d.location as string,
    yearsExperience: d.yearsExperience as string,
    loves: d.loves as string,
    background: d.background as string,
    photo: mediaUrl(d.photo) ?? opt(d.photoPath),
    github: opt(d.github),
    linkedin: opt(d.linkedin),
    twitter: opt(d.twitter),
    website: opt(d.website),
    specialties: list(d.specialties),
    stack: list(d.stack),
    knowsAbout: list(d.knowsAbout),
    metaTitle: d.metaTitle as string,
    metaDescription: d.metaDescription as string,
  };
}

/** The team, in display order. Cached; refreshed when edited in Directus. */
export const getTeam = unstable_cache(
  async (): Promise<TeamMember[]> => {
    const docs = await items("team", { sort: "order" });
    return docs.map((d) => toMember(d as unknown as Doc));
  },
  ["content-team"],
  { tags: ["team"] },
);

export async function getTeamMember(slug: string) {
  return (await getTeam()).find((m) => m.slug === slug);
}
