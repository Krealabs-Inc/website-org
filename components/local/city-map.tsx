import Link from "next/link";
import { CITIES, type CityData } from "@/lib/cities";

// Simple equirectangular projection of the served area onto 600 × 340.
const LNG = [-1.9, 1.5];
const LAT = [48.7, 50.05];
const W = 600;
const H = 340;
const PAD = 30;
function project({ lat, lng }: { lat: number; lng: number }) {
  return {
    x: PAD + ((lng - LNG[0]) / (LNG[1] - LNG[0])) * (W - PAD * 2),
    y: PAD + ((LAT[1] - lat) / (LAT[1] - LAT[0])) * (H - PAD * 2),
  };
}

/**
 * City pages signature: the towns we serve placed by their real
 * coordinates, this page's town lit, and the road from our Rouen base
 * drawn to it with its distance. Every city page gets its own picture
 * from the same data. Other towns link to their own page.
 */
export function CityMap({ city }: { city: CityData }) {
  const rouen = project(CITIES.rouen.geo);
  const here = project(city.geo);
  const isHome = city.slug === "rouen";
  const others = Object.values(CITIES).filter((c) => c.slug !== city.slug);

  return (
    <figure className="city-map">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={isHome ? "Rouen, notre base, parmi les villes que nous accompagnons en Normandie" : `${city.name}, à ${city.distanceFromRouen} km de notre base de Rouen`}>
        {/* Graticule */}
        {[0.2, 0.4, 0.6, 0.8].map((f) => (
          <g key={f} className="cm-grid">
            <line x1={0} x2={W} y1={H * f} y2={H * f} />
            <line y1={0} y2={H} x1={W * f} x2={W * f} />
          </g>
        ))}

        {/* Road from Rouen */}
        {!isHome && (
          <>
            <path className="cm-road" pathLength={1} d={`M${rouen.x} ${rouen.y} Q ${(rouen.x + here.x) / 2} ${Math.min(rouen.y, here.y) - 40} ${here.x} ${here.y}`} />
            <text className="cm-km" x={(rouen.x + here.x) / 2} y={Math.min(rouen.y, here.y) - 26} textAnchor="middle">
              {city.distanceFromRouen} km
            </text>
          </>
        )}

        {/* Other towns */}
        {others.map((c) => {
          const p = project(c.geo);
          const home = c.slug === "rouen";
          // Label on the left near the right edge or just west of this town.
          const left = p.x > 440 || (here.x - p.x > 0 && here.x - p.x < 110 && Math.abs(p.y - here.y) < 40);
          return (
            <Link key={c.slug} href={c.path} className={home ? "cm-town is-home" : "cm-town"}>
              <circle cx={p.x} cy={p.y} r={home ? 6 : 4} />
              <text x={left ? p.x - 10 : p.x + 10} y={home ? p.y + 22 : p.y + 4} textAnchor={left ? "end" : "start"}>
                {home ? "Rouen · notre base" : c.name.replace("-en-Cotentin", "")}
              </text>
            </Link>
          );
        })}

        {/* This town */}
        <g className="cm-here">
          <circle className="cm-pulse" cx={here.x} cy={here.y} r={10} />
          <circle cx={here.x} cy={here.y} r={7} />
          <text x={here.x > 440 ? here.x - 14 : here.x + 14} y={here.y - 12} textAnchor={here.x > 440 ? "end" : "start"}>
            {isHome ? "Rouen · notre base" : city.name.replace("-en-Cotentin", "")}
          </text>
        </g>
      </svg>
      <figcaption className="cm-coords">
        {city.geo.lat.toFixed(4)}° N · {Math.abs(city.geo.lng).toFixed(4)}° {city.geo.lng < 0 ? "O" : "E"}
        <span>{isHome ? "Notre base" : `${city.distanceFromRouen} km de Rouen`}</span>
      </figcaption>
    </figure>
  );
}
