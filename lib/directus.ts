/**
 * Read-only access to the content in Directus (cms.krealabs.fr).
 *
 * Content is public in Directus (read only), so no token is needed. Every
 * getter in lib/content wraps these calls in `unstable_cache` with a tag; a
 * Directus Flow calls /api/revalidate on each change to refresh that tag.
 */

const BASE = (process.env.DIRECTUS_URL || "https://cms.krealabs.fr").replace(/\/$/, "");

export type Doc = Record<string, unknown>;

type Query = { sort?: string | string[]; limit?: number; fields?: string };

async function get<T>(path: string): Promise<T> {
  const res = await fetch(BASE + path, { cache: "no-store", headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Directus ${path}: ${res.status} ${await res.text().catch(() => "")}`.slice(0, 400));
  return ((await res.json()) as { data: T }).data;
}

/** Every item of a collection. */
export function items(collection: string, q: Query = {}): Promise<Doc[]> {
  const p = new URLSearchParams({ limit: String(q.limit ?? -1), fields: q.fields ?? "*" });
  if (q.sort) p.set("sort", Array.isArray(q.sort) ? q.sort.join(",") : q.sort);
  return get<Doc[]>(`/items/${collection}?${p}`);
}

/** A singleton (one entry per page under "Textes des pages"). */
export function single(collection: string): Promise<Doc | null> {
  return get<Doc | null>(`/items/${collection}`).catch(() => null);
}

/** Public URL of a file chosen in Directus (a file id), if any. */
export function mediaUrl(value: unknown): string | undefined {
  if (typeof value === "string" && /^[0-9a-f-]{36}$/i.test(value)) return `${BASE}/assets/${value}`;
  if (value && typeof value === "object" && "id" in value) return mediaUrl((value as { id: unknown }).id);
  return undefined;
}
