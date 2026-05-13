/**
 * IndexNow — protocol pour notifier les moteurs de recherche (Bing, Yandex,
 * Naver, Seznam, Yep) qu'une URL a été créée, mise à jour ou supprimée.
 * Google supporte indirectement via les partenariats.
 *
 * Usage typique :
 *   await pingIndexNow(["https://krealabs.fr/blog/new-article"]);
 *
 * Doc : https://www.indexnow.org/documentation
 */

const HOST = "krealabs.fr";
const KEY = "29c51993aa3e05611d63246c5978b1e7";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";

export interface IndexNowResult {
  ok: boolean;
  status: number;
  error?: string;
}

/**
 * Notifie IndexNow d'une ou plusieurs URLs (max 10 000 par requête).
 * Retourne un statut HTTP : 200 = OK, 202 = Accepted (à valider plus tard),
 * 400 = Bad request, 403 = Key not found, 422 = URLs don't belong to host.
 */
export async function pingIndexNow(
  urls: string[],
): Promise<IndexNowResult> {
  if (urls.length === 0) {
    return { ok: false, status: 0, error: "no urls" };
  }

  // Validation : toutes les URLs doivent appartenir au host
  const invalid = urls.find((u) => !u.startsWith(`https://${HOST}`));
  if (invalid) {
    return {
      ok: false,
      status: 0,
      error: `url ${invalid} doesn't belong to ${HOST}`,
    };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
      }),
    });

    return {
      ok: response.ok,
      status: response.status,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
