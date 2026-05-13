import { NextRequest, NextResponse } from "next/server";

import { subscribe, NewsletterError } from "@/lib/newsletter";

/**
 * POST /api/newsletter
 * Body : { "email": "user@example.com", "source": "footer" (optionnel) }
 *
 * Inscrit un email à la newsletter Krealabs :
 *  1. Stockage Prisma (idempotent)
 *  2. Sync Resend Audience (si RESEND_AUDIENCE_ID set)
 *  3. Welcome email immédiat (avec lien unsubscribe one-click)
 */
export async function POST(request: NextRequest) {
  let body: { email?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Format de requête invalide (JSON attendu)" },
      { status: 400 },
    );
  }

  const email = body.email;
  const source = body.source || "website";

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Email requis" },
      { status: 400 },
    );
  }

  try {
    const result = await subscribe(email, source);
    return NextResponse.json({
      success: true,
      status: result.status,
      message:
        result.status === "resubscribed"
          ? "Vous êtes ré-inscrit à la newsletter Krealabs."
          : "Inscription réussie. Un mail de bienvenue vous a été envoyé.",
    });
  } catch (err) {
    if (err instanceof NewsletterError) {
      const status =
        err.code === "invalid-email"
          ? 400
          : err.code === "already-subscribed"
            ? 409
            : 500;
      return NextResponse.json(
        { error: err.message, code: err.code },
        { status },
      );
    }
    console.error("Newsletter signup error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
