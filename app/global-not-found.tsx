import type { Metadata } from "next";

import "./(site)/globals.css";
import { fontVariables } from "@/lib/fonts";
import { Compass } from "@/components/not-found/compass";

export const metadata: Metadata = {
  title: "Page introuvable · Krealabs",
  robots: { index: false },
};

/**
 * 404 for URLs that match no route at all. Needed because the app has two
 * root layouts (the site and the Payload admin), so Next.js cannot compose
 * a 404 from a single layout. Same compass as the site's own not-found, without the search shortcut
 * (the search modal lives in the site layout).
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
