import nodemailer from "nodemailer";
import type { ReactElement } from "react";
import { render } from "@react-email/render";

/**
 * Transport SMTP partagé (singleton) — créé une fois au démarrage du
 * worker, réutilisé pour tous les envois (économise les TCP handshakes).
 *
 * Variables d'env requises :
 * - SMTP_HOST       Hôte SMTP (ex: ssl0.ovh.net, smtp.gmail.com, smtp-relay.brevo.com)
 * - SMTP_PORT       Port (587 STARTTLS recommandé, 465 SSL implicite)
 * - SMTP_USER       Utilisateur (généralement l'adresse email)
 * - SMTP_PASS       Mot de passe ou App Password (Gmail) ou clé API SMTP
 * - SMTP_FROM       Adresse "From" (ex: "Krealabs <noreply@krealabs.fr>")
 * - CONTACT_EMAIL   Destinataire des formulaires (ex: contact@krealabs.fr)
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  // 465 = secure connection à l'ouverture, 587 = STARTTLS upgrade
  secure: Number(process.env.SMTP_PORT || 587) === 465,
  auth:
    process.env.SMTP_USER && process.env.SMTP_PASS
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
});

export interface SendMailOptions {
  /** Destinataire (défaut : CONTACT_EMAIL de l'env) */
  to?: string;
  /** Adresse à laquelle l'utilisateur peut répondre (le mail client) */
  replyTo?: string;
  /** Sujet du mail */
  subject: string;
  /** Composant React rendu en HTML (privilégié) */
  react?: ReactElement;
  /** OU contenu HTML direct */
  html?: string;
  /** Version texte (fallback pour clients sans HTML) */
  text?: string;
  /** Pièces jointes */
  attachments?: Array<{ filename: string; content: Buffer }>;
}

/**
 * Envoie un email via SMTP. Le contenu peut être passé en React
 * (rendu via @react-email/render) ou en HTML brut. Retourne le messageId
 * ou throw en cas d'erreur.
 */
export async function sendMail(opts: SendMailOptions): Promise<string> {
  const html =
    opts.html ?? (opts.react ? await render(opts.react) : undefined);

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: opts.to ?? process.env.CONTACT_EMAIL,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html,
    text: opts.text,
    attachments: opts.attachments,
  });

  return info.messageId;
}

/** Vérifie la connectivité SMTP (utile en /api/health ou en debug) */
export async function verifySmtp(): Promise<boolean> {
  try {
    await transporter.verify();
    return true;
  } catch (err) {
    console.error("SMTP verify failed:", err);
    return false;
  }
}
