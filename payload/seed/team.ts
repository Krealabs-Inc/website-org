import type { Payload, PayloadRequest } from "payload";

import { TEAM } from "../../lib/team";

/** Imports the team from lib/team.ts (original content), once per slug. */
export async function seedTeam(payload: Payload, req?: PayloadRequest) {
  for (const [i, m] of TEAM.entries()) {
    const existing = await payload.find({ collection: "team", where: { slug: { equals: m.slug } }, limit: 1, req });
    if (existing.docs.length) continue;
    await payload.create({
      req,
      collection: "team",
      data: {
        name: m.name,
        slug: m.slug,
        role: m.role,
        initials: m.initials,
        order: i,
        photoPath: m.photo,
        loves: m.loves,
        background: m.background,
        bio: m.bio,
        longBio: m.longBio,
        location: m.location,
        yearsExperience: m.yearsExperience,
        specialties: m.specialties,
        stack: m.stack,
        knowsAbout: m.knowsAbout,
        github: m.github,
        linkedin: m.linkedin,
        twitter: m.twitter,
        website: m.website,
        metaTitle: m.metaTitle,
        metaDescription: m.metaDescription,
      },
    });
  }
}
