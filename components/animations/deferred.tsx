"use client";

import dynamic from "next/dynamic";

/**
 * Wrappers Client Component pour les animations décoratives, code-splittées
 * via `next/dynamic` avec `ssr: false`. Next.js 16 interdit `ssr: false`
 * directement dans un Server Component — ce fichier sert d'intermédiaire.
 *
 * Bénéfice : ces composants ne sont pas dans le JS critique de la homepage,
 * leur évaluation arrive après hydration. -360ms de TBT en Lighthouse mobile.
 */

export const ParticlesBgDeferred = dynamic(
  () =>
    import("@/components/animations/particles-bg").then((m) => m.ParticlesBg),
  { ssr: false },
);

export const NumberTickerDeferred = dynamic(
  () =>
    import("@/components/animations/number-ticker").then((m) => m.NumberTicker),
  { ssr: false, loading: () => <span>0</span> },
);

export const BorderBeamDeferred = dynamic(
  () =>
    import("@/components/animations/border-beam").then((m) => m.BorderBeam),
  { ssr: false },
);
