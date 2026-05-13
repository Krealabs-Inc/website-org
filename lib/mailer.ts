/**
 * Service d'envoi d'emails via Formsubmit (https://formsubmit.co).
 *
 * Architecture :
 *  - Pas d'API key, pas de DNS, pas de SMTP à configurer
 *  - Formsubmit gère l'infrastructure d'envoi côté serveur
 *  - Premier envoi → email d'activation reçu sur CONTACT_EMAIL,
 *    cliquer le lien d'activation → tous les envois suivants marchent
 *
 * Variables d'env requises :
 *  - CONTACT_EMAIL    Email destinataire (= boîte ProtonMail via MX OVH)
 *                     Défaut : contact@krealabs.fr
 *
 * Doc Formsubmit : https://formsubmit.co/help
 */

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contact@krealabs.fr";
const ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`;

export interface FormsubmitFields {
  /** Sujet de l'email envoyé à l'admin */
  subject: string;
  /** Nom du visiteur */
  name: string;
  /** Email du visiteur — sera utilisé comme Reply-To automatiquement */
  email: string;
  /** Contenu / message — autres champs custom acceptés */
  [key: string]: string | number | boolean | undefined;
}

export interface SendFormOptions {
  /** Champs du formulaire (subject, name, email, message, etc.) */
  fields: FormsubmitFields;
  /** Auto-reply envoyé au visiteur (texte simple, pas HTML) */
  autoresponse?: string;
  /** Captcha Formsubmit (anti-spam) — true par défaut */
  captcha?: boolean;
  /** Template de rendu côté Formsubmit ('table' = lisible) */
  template?: "table" | "basic" | "box";
}

/**
 * Envoie un formulaire via Formsubmit. Le visiteur peut recevoir un
 * auto-reply optionnel. Le destinataire reçoit un email structuré.
 *
 * Note : Formsubmit transmet automatiquement TOUS les champs du
 * formulaire dans l'email. Les champs commençant par "_" sont des
 * directives (_subject, _replyto, _autoresponse, etc.).
 */
export async function sendForm(opts: SendFormOptions): Promise<void> {
  const payload: Record<string, string | number | boolean> = {
    _subject: opts.fields.subject,
    _replyto: opts.fields.email,
    _captcha: opts.captcha === false ? "false" : "true",
    _template: opts.template || "table",
  };

  // Ajoute l'autoresponse seulement si présent
  if (opts.autoresponse) {
    payload._autoresponse = opts.autoresponse;
  }

  // Copie les champs visibles dans le mail (en excluant les directives
  // déjà set ci-dessus et le "subject" qui est mappé sur _subject)
  for (const [key, value] of Object.entries(opts.fields)) {
    if (key === "subject" || value === undefined || value === "") continue;
    payload[key] = value as string | number | boolean;
  }

  // Formsubmit vérifie Origin/Referer pour bloquer les soumissions
  // depuis des fichiers locaux file://. On fournit notre domaine prod.
  const origin =
    process.env.NEXT_PUBLIC_URL ||
    process.env.VERCEL_URL ||
    "https://krealabs.fr";
  const originUrl = origin.startsWith("http") ? origin : `https://${origin}`;

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: originUrl,
      Referer: originUrl,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Formsubmit error (HTTP ${response.status}): ${text || "no body"}`,
    );
  }

  const data = (await response.json().catch(() => null)) as {
    success?: string;
    message?: string;
  } | null;

  if (data && data.success !== "true" && data.message) {
    // Cas spécial : "needs Activation" → premier envoi, Formsubmit a
    // envoyé un email d'activation à CONTACT_EMAIL. Le user doit
    // cliquer dessus. On log un warning mais on ne fait pas échouer
    // la requête (la DB save a réussi, prochain envoi marchera).
    if (/activation/i.test(data.message)) {
      console.warn(
        "[mailer] Formsubmit needs activation. Check inbox at " +
          CONTACT_EMAIL +
          " and click 'Activate Form'. Message:",
        data.message,
      );
      return;
    }
    // Autres erreurs métier → on throw
    throw new Error(`Formsubmit business error: ${data.message}`);
  }
}
