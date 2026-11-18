/**
 * Sector pages signature: the site we would propose for this trade,
 * drawn as a site map built from the sector's own features. Each sector
 * gets a different plan from the same data. Branches draw in on load
 * (CSS); still with reduced motion.
 */
export function SectorSitemap({ name, pages }: { name: string; pages: string[] }) {
  return (
    <figure className="smap" aria-label={`Plan de site proposé pour un ${name}`}>
      <p className="smap-root">Votre site</p>
      <ul>
        <li className="smap-page" style={{ "--i": 0 } as React.CSSProperties}>
          Accueil
        </li>
        {pages.map((p, i) => (
          <li key={p} className="smap-page" style={{ "--i": i + 1 } as React.CSSProperties}>
            {p}
          </li>
        ))}
        <li className="smap-page is-cta" style={{ "--i": pages.length + 1 } as React.CSSProperties}>
          Contact · devis
        </li>
      </ul>
      <figcaption className="smap-caption">Plan de site type pour un {name}</figcaption>
    </figure>
  );
}
