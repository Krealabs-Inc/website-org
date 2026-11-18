import { unstable_cache } from "next/cache";

import { cms } from "@/lib/cms";
import { isList, type PageDef, type PageValues } from "@/lib/page-texts/define";

/**
 * A page's texts: what was saved in the CMS, or the original copy for any
 * empty field. Cached per page; refreshed when the page is saved in /cms.
 */
export async function getPageTexts<T extends PageDef>(def: T): Promise<PageValues<T>> {
  const stored = await unstable_cache(
    async () => {
      const payload = await cms();
      return (await payload.findGlobal({ slug: `page-${def.slug}` as never, depth: 0 })) as unknown as Record<string, unknown>;
    },
    ["page-texts", def.slug],
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
