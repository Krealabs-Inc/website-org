/**
 * Texts that depend on how many team members are shown on the site.
 *
 * In a text edited in Directus:
 *   {n}       → 4
 *   {nombre}  → quatre
 *   {Nombre}  → Quatre
 *   {s}       → "s" when there is more than one member (associé{s})
 */
const WORDS = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze"];

export function countWord(n: number): string {
  return WORDS[n] ?? String(n);
}

export function withTeamCount(text: string, n: number): string {
  const word = countWord(n);
  return text
    .replaceAll("{n}", String(n))
    .replaceAll("{nombre}", word)
    .replaceAll("{Nombre}", word.charAt(0).toUpperCase() + word.slice(1))
    .replaceAll("{s}", n > 1 ? "s" : "");
}

export const TEAM_COUNT_HELP = "{n} = nombre de membres affichés (4) · {nombre} = en lettres (quatre) · {Nombre} = Quatre · {s} = « s » s’il y en a plusieurs";

/** Same, applied to every text (and list item) of a page. */
export function withTeamCountAll<T extends Record<string, unknown>>(texts: T, n: number): T {
  const one = (v: unknown): unknown =>
    typeof v === "string"
      ? withTeamCount(v, n)
      : Array.isArray(v)
        ? v.map(one)
        : v && typeof v === "object"
          ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, one(x)]))
          : v;
  return one(texts) as T;
}
