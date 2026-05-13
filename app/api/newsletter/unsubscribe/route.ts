import { NextRequest, NextResponse } from "next/server";

import { unsubscribeByToken } from "@/lib/newsletter";

const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://krealabs.fr";

/**
 * GET /api/newsletter/unsubscribe?token=xxx
 *
 * Lien cliquable depuis les emails de la newsletter. Désinscription
 * en un clic (pas de formulaire de confirmation, RGPD-compliant +
 * conforme à la RFC 8058 List-Unsubscribe-Post).
 *
 * Redirige vers /newsletter/unsubscribe?status=... pour afficher la
 * confirmation visuelle au visiteur.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      `${SITE_URL}/newsletter/unsubscribe?status=invalid`,
    );
  }

  try {
    const result = await unsubscribeByToken(token);

    if (!result.found) {
      return NextResponse.redirect(
        `${SITE_URL}/newsletter/unsubscribe?status=invalid`,
      );
    }

    return NextResponse.redirect(
      `${SITE_URL}/newsletter/unsubscribe?status=success&email=${encodeURIComponent(result.email || "")}`,
    );
  } catch (err) {
    console.error("Newsletter unsubscribe error:", err);
    return NextResponse.redirect(
      `${SITE_URL}/newsletter/unsubscribe?status=error`,
    );
  }
}

/**
 * POST /api/newsletter/unsubscribe avec header List-Unsubscribe-Post.
 * Gmail/Apple Mail envoient un POST direct sans passer par le navigateur
 * (RFC 8058) — on doit répondre 200 sans redirect.
 */
export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) return new NextResponse(null, { status: 400 });

  try {
    const result = await unsubscribeByToken(token);
    return NextResponse.json({ success: result.found });
  } catch (err) {
    console.error("Newsletter unsubscribe POST error:", err);
    return new NextResponse(null, { status: 500 });
  }
}
