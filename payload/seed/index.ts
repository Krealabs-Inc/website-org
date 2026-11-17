import type { Payload } from "payload";

import { seedTeam } from "./team";

/** Imports the site's original content into Payload; existing entries are kept. */
export async function seedAll(payload: Payload) {
  await seedTeam(payload);
}
