import type { Payload, PayloadRequest } from "payload";

import { CITIES } from "../../lib/cities";
import { CITY_FAQ } from "../../lib/city-faq";
import { SECTORS } from "../../lib/sectors";

/** Imports cities (with their FAQ) and Rouen sectors from lib/, once per slug. */
export async function seedLocal(payload: Payload, req?: PayloadRequest) {
  for (const c of Object.values(CITIES)) {
    const existing = await payload.find({ collection: "cities", where: { slug: { equals: c.slug } }, limit: 1, req });
    if (existing.docs.length) continue;
    const { geo, ...rest } = c;
    await payload.create({ req, collection: "cities", data: { ...rest, lat: geo.lat, lng: geo.lng, faq: CITY_FAQ[c.slug] ?? [] } });
  }
  for (const s of Object.values(SECTORS)) {
    const existing = await payload.find({ collection: "sectors", where: { slug: { equals: s.slug } }, limit: 1, req });
    if (existing.docs.length) continue;
    await payload.create({ req, collection: "sectors", data: { ...s } });
  }
}
