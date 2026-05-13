import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware Next.js : assigne un variant A/B au visiteur via cookie.
 * Pattern simple : 50/50 split, cookie persistant 1 an.
 *
 * Usage côté composants :
 *   import { cookies } from "next/headers";
 *   const variant = cookies().get("kl-variant")?.value;
 *   return <Hero variant={variant === "b" ? "alternate" : "default"} />
 *
 * Configurer les expériences via Vercel Edge Config quand on en aura
 * besoin de plusieurs simultanément. Pour le moment, simple A/B.
 */

const VARIANT_COOKIE = "kl-variant";
const VARIANT_VALUES = ["a", "b"] as const;
type Variant = (typeof VARIANT_VALUES)[number];

function assignVariant(): Variant {
  return Math.random() < 0.5 ? "a" : "b";
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const existing = request.cookies.get(VARIANT_COOKIE);
  if (existing && VARIANT_VALUES.includes(existing.value as Variant)) {
    return response;
  }

  const variant = assignVariant();
  response.cookies.set(VARIANT_COOKIE, variant, {
    maxAge: 60 * 60 * 24 * 365, // 1 an
    sameSite: "lax",
    httpOnly: false, // lisible côté client pour analytics
    secure: true,
    path: "/",
  });
  return response;
}

export const config = {
  // Skip pour les assets statiques, API routes et fichiers spéciaux.
  // Note Next.js : seul l'outer group est autorisé comme capturing group ;
  // les groupes internes doivent être non-capturing (?:...).
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|.*\\.(?:png|jpg|jpeg|svg|webp|avif|ico|woff2?)).*)",
  ],
};
