import Link from "next/link";
import { Fragment, type ReactNode } from "react";

interface MarkdownTextProps {
  /** Texte avec liens markdown : "Texte avec [lien](/url) inline" */
  children: string;
}

/**
 * Mini-parser markdown : [texte](/url) devient un <Link> Next.js (ou un
 * <a> externe), **texte** devient du gras. Pas de dépendance externe.
 * Le reste du texte est rendu tel quel.
 */
export function MarkdownText({ children }: MarkdownTextProps) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(children)) !== null) {
    const [full, text, href, bold] = match;
    const start = match.index;

    // Texte avant le lien
    if (start > lastIndex) {
      parts.push(<Fragment key={key++}>{children.slice(lastIndex, start)}</Fragment>);
    }

    if (bold !== undefined) {
      parts.push(
        <strong key={key++} className="font-semibold text-[var(--foreground)]">
          {bold}
        </strong>,
      );
    } else if (href.startsWith("/") || href.startsWith("#")) {
      parts.push(
        <Link
          key={key++}
          href={href}
          className="text-[var(--accent)] underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          {text}
        </Link>,
      );
    } else {
      parts.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)] underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          {text}
        </a>,
      );
    }

    lastIndex = start + full.length;
  }

  // Texte après le dernier lien
  if (lastIndex < children.length) {
    parts.push(<Fragment key={key++}>{children.slice(lastIndex)}</Fragment>);
  }

  return <>{parts}</>;
}
