import { Fragment, type ReactNode } from "react";
import Link from "next/link";

const TOKEN = /(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;
const LINK_CLASS = "underline underline-offset-2 hover:text-[var(--foreground)]";

/**
 * Renders an editable CMS text: [texte](/adresse) → link, **mots** → bold,
 * *mots* → <em> (the site's serif italic), line breaks → <br />. Pure,
 * usable on server and client.
 */
export function rich(text: string, emClassName?: string): ReactNode {
  return text.split("\n").map((line, li, lines) => (
    <Fragment key={li}>
      {line.split(TOKEN).map((part, pi) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (link) {
          const [, label, href] = link;
          return href.startsWith("/") ? (
            <Link key={pi} href={href} className={LINK_CLASS}>
              {label}
            </Link>
          ) : (
            <a key={pi} href={href} className={LINK_CLASS}>
              {label}
            </a>
          );
        }
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return (
            <strong key={pi} className="text-[var(--foreground)] font-medium">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return (
            <em key={pi} className={emClassName}>
              {part.slice(1, -1)}
            </em>
          );
        }
        return <Fragment key={pi}>{part}</Fragment>;
      })}
      {li < lines.length - 1 && <br />}
    </Fragment>
  ));
}
