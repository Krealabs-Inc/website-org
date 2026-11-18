import type { Payload } from "payload";

import { seedTeam } from "./team";
import { seedProjects } from "./projects";
import { seedGlossary } from "./glossary";
import { seedLocal } from "./local";
import { seedFaq } from "./faq";
import { seedPosts } from "./posts";

/** Imports the site's original content into Payload; existing entries are kept. */
export async function seedAll(payload: Payload) {
  await seedTeam(payload);
  await seedProjects(payload);
  await seedGlossary(payload);
  await seedLocal(payload);
  await seedFaq(payload);
  await seedPosts(payload);
}
