import type { Metadata } from "next";

import "./(site)/globals.css";
import { fontVariables } from "@/lib/fonts";
import { Compass } from "@/components/not-found/compass";

export const metadata: Metadata = {
  title: "Page introuvable · Krealabs",
  robots: { index: false },
};

/**
 * 404 for URLs that match no route at all: the root layout lives in the
 * (site) route group, so Next.js needs this standalone page. Same compass
 * as the site's own not-found, without the search shortcut (the search
 * modal lives in the site layout).
 */
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontVariables}>
      <body className="antialiased font-sans">
        <Compass search={false} />
      </body>
    </html>
  );
}
