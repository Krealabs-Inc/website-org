import { NextRequest, NextResponse } from "next/server";

import { pingIndexNow } from "@/lib/indexnow";

/**
 * POST /api/indexnow
 * Notifie IndexNow d'une ou plusieurs URLs nouvellement publiées.
 *
 * Body : { "urls": ["https://krealabs.fr/blog/...", ...] }
 *
 * Sécurisé par ADMIN_TOKEN (header Authorization: Bearer <token>) pour
 * éviter qu'un tiers spam le moteur avec nos URLs.
 *
 * Usage typique :
 *   curl -X POST https://krealabs.fr/api/indexnow \
 *     -H "Authorization: Bearer $ADMIN_TOKEN" \
 *     -H "Content-Type: application/json" \
 *     -d '{"urls":["https://krealabs.fr/blog/nouveau-article"]}'
 */
export async function POST(request: NextRequest) {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json(
      { error: "ADMIN_TOKEN not configured" },
      { status: 500 },
    );
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${adminToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { urls?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const urls = body.urls;
  if (!Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json(
      { error: "Body must contain a non-empty 'urls' array" },
      { status: 400 },
    );
  }

  const result = await pingIndexNow(urls);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error || "IndexNow failed", status: result.status },
      { status: result.status > 0 ? result.status : 500 },
    );
  }

  return NextResponse.json({ success: true, pinged: urls.length });
}
