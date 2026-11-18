/**
 * Editable page texts. Each page declares its texts once, with the
 * current copy as default: the CMS global is generated from it
 * (payload/globals/pages.ts) and pages read merged values through
 * getPageTexts (lib/content/pages.ts). An empty field falls back to the
 * default, so the site never shows a blank.
 *
 * Text conventions (rendered by `rich`): *mots* → italic serif emphasis,
 * **mots** → bold, [texte](/adresse) → link, a line break → <br />.
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

/** The closing call-to-action block most pages end with (ServiceCta). */
export function ctaFields(title: string, o: { eyebrow?: string; text?: string; primary?: string; secondary?: string } = {}) {
  return {
    ctaEyebrow: { label: "Appel à l’action · surtitre", default: o.eyebrow ?? "Votre projet" },
    ctaTitle: { label: "Appel à l’action · titre", default: title },
    ctaText: { label: "Appel à l’action · texte", long: true, default: o.text ?? "Le premier échange est gratuit et sans engagement. Décrivez votre projet, on vous répond sous 24h." },
    ctaPrimary: { label: "Appel à l’action · bouton principal", default: o.primary ?? "Parler de mon projet" },
    ctaSecondary: {
      label: "Appel à l’action · bouton secondaire",
      default: o.secondary ?? "Voir ce qu’on peut faire pour vous",
      help: "Vide = pas de bouton secondaire (si le texte d’origine est vide).",
    },
  } satisfies Record<string, TextField>;
}
