import type { Field, GlobalConfig } from "payload";

import { revalidateContent } from "../../lib/revalidate";
import { isList, type PageDef } from "../../lib/page-texts/define";
import { PAGE_DEFS } from "../../lib/page-texts";

const HELP = "*mots* = italique · un retour à la ligne = saut de ligne · vide = texte d’origine";

function toFields(def: PageDef): Field[] {
  return Object.entries(def.fields).map(([name, f]): Field => {
    if (isList(f)) {
      return {
        name,
        label: f.label,
        type: "array",
        defaultValue: f.default,
        fields: Object.entries(f.list).map(([sub, s]): Field =>
          s.long ? { name: sub, label: s.label, type: "textarea", required: true } : { name: sub, label: s.label, type: "text", required: true },
        ),
      };
    }
    const admin = { description: f.help ?? HELP };
    return f.long
      ? { name, label: f.label, type: "textarea", defaultValue: f.default, admin }
      : { name, label: f.label, type: "text", defaultValue: f.default, admin };
  });
}

/** One global per page, under "Pages" in the admin. */
export const PageGlobals: GlobalConfig[] = PAGE_DEFS.map((def) => ({
  slug: `page-${def.slug}`,
  label: def.label,
  admin: { group: "Pages" },
  access: { read: () => true },
  hooks: { afterChange: [() => revalidateContent(`page-${def.slug}`)] },
  fields: toFields(def),
}));
