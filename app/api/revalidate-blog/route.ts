import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/revalidate-blog
 *
 * Endpoint déclenché par le cron Vercel (vercel.json) tous les jours
 * à 06:00 UTC. Force la revalidation des routes blog pour que les
 * articles à publication différée (date future) deviennent visibles
 * à leur date prévue, même sans visiteur.
 *
 * Sécurisé par CRON_SECRET (Vercel auto-set en prod) → seul Vercel
 * peut déclencher la revalidation.
 *
 * Doc Vercel Cron : https://vercel.com/docs/cron-jobs
 */
export async function GET(request: NextRequest) {
  // Vercel envoie le header "Authorization: Bearer ${CRON_SECRET}"
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const revalidated: string[] = [];
  const paths = [
    "/blog",
    "/blog/category/wordpress",
    "/blog/category/web",
    "/blog/category/mobile",
    "/blog/category/seo",
    "/blog/category/outils",
    "/blog/feed.xml",
    "/sitemap.xml",
  ];

  for (const path of paths) {
    revalidatePath(path);
    revalidated.push(path);
  }

  return NextResponse.json({
    revalidated,
    timestamp: new Date().toISOString(),
  });
}
