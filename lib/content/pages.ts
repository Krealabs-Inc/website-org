import { createHash } from "node:crypto";
import { unstable_cache } from "next/cache";

import { single } from "@/lib/directus";
import { isList, type PageDef, type PageValues } from "@/lib/page-texts/define";

/**
 * A page's texts: what was saved in the CMS, or the original copy for any
 * empty field. Cached per page; refreshed when the page is saved in Directus.
 */
export async function getPageTexts<T extends PageDef>(def: T): Promise<PageValues<T>> {
  const stored = await unstable_cache(
    async () => {
      return (await single(`page_${def.slug.replace(/-/g, "_")}`)) as Record<string, unknown> | null;
    },
    // The defaults' fingerprint is part of the key: a copy change in code
    // never stays hidden behind a cached read of the previous version.
    ["page-texts", def.slug, fingerprint(def)],
    { tags: [`page-${def.slug}`] },
  )();

  const out: Record<string, unknown> = {};
  for (const [name, f] of Object.entries(def.fields)) {
    const v = stored?.[name];
    if (isList(f)) {
      const rows = Array.isArray(v) ? (v as Record<string, string>[]) : [];
      out[name] = rows.length ? rows.map((r) => Object.fromEntries(Object.keys(f.list).map((k) => [k, r[k] ?? ""]))) : f.default;
    } else {
      out[name] = typeof v === "string" && v.trim() ? v : f.default;
    }
  }
  return out as PageValues<T>;
}

const prints = new WeakMap<PageDef, string>();
function fingerprint(def: PageDef): string {
  let p = prints.get(def);
  if (!p) {
    p = createHash("sha1").update(JSON.stringify(def.fields)).digest("hex").slice(0, 12);
    prints.set(def, p);
  }
  return p;
}
