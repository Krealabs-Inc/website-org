import { Fragment, type ReactNode } from "react";

/**
 * Renders an editable CMS text: *mots* becomes <em> (the site's serif
 * italic), line breaks become <br />. Pure, usable on server and client.
 */
export function rich(text: string, emClassName?: string): ReactNode {
  return text.split("\n").map((line, li, lines) => (
    <Fragment key={li}>
      {line.split(/(\*[^*]+\*)/g).map((part, pi) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
          <em key={pi} className={emClassName}>
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={pi}>{part}</Fragment>
        ),
      )}
      {li < lines.length - 1 && <br />}
    </Fragment>
  ));
}
