/**
 * Editable page texts. Each page declares its texts once, with the
 * current copy as default: the CMS global is generated from it
 * (payload/globals/pages.ts) and pages read merged values through
 * getPageTexts (lib/content/pages.ts). An empty field falls back to the
 * default, so the site never shows a blank.
 *
 * Text conventions (rendered by `rich`): *mots* → italic serif emphasis,
 * a line break → <br />.
 */
export type TextField = { label: string; default: string; long?: boolean; help?: string };
export type ListField = {
  label: string;
  list: Record<string, { label: string; long?: boolean }>;
  default: Record<string, string>[];
};
export type PageDef = { slug: string; label: string; fields: Record<string, TextField | ListField> };

export function definePage<const T extends PageDef>(def: T): T {
  return def;
}

export const isList = (f: TextField | ListField): f is ListField => "list" in f;

export type PageValues<T extends PageDef> = {
  [K in keyof T["fields"]]: T["fields"][K] extends ListField
    ? Record<keyof T["fields"][K]["list"] & string, string>[]
    : string;
};
