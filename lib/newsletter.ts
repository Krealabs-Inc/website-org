/**
 * Pipeline newsletter Krealabs — orchestre :
 *  1. Stockage Prisma (NewsletterSubscriber) → source de vérité
 *  2. Sync Resend Audience (si RESEND_AUDIENCE_ID configuré)
 *  3. Welcome email transactionnel
 *  4. One-click unsubscribe via token cuid
 *
 * Setup Resend Audience :
 *  1. Dashboard Resend → Audiences → Create audience "Newsletter Krealabs"
 *  2. Copier l'ID (aud_xxx) dans Vercel env : RESEND_AUDIENCE_ID
 *  3. Côté Prisma : la table newsletter_subscribers est créée via prisma db push.
 *
 * Comportement si RESEND_AUDIENCE_ID absent :
 *   Le subscriber est ajouté en DB + welcome email envoyé, mais pas
 *   synchronisé dans Resend Audience. Suffira de l'ajouter ensuite et
 *   de lancer un re-sync manuel.
 */

import { Resend } from "resend";

import { prisma } from "@/lib/prisma";
import { sendNewsletterWelcome } from "@/lib/mailer";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

function getResend(): Resend | null {
  if (!RESEND_API_KEY) return null;
  return new Resend(RESEND_API_KEY);
}

export type SubscribeResult =
  | { status: "subscribed"; email: string }
  | { status: "resubscribed"; email: string }
  | { status: "already-subscribed"; email: string };

export class NewsletterError extends Error {
  constructor(
    message: string,
    public code: "invalid-email" | "already-subscribed" | "server-error",
  ) {
    super(message);
    this.name = "NewsletterError";
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Inscrit un visiteur à la newsletter.
 *
 * Idempotent :
 *  - Email nouveau → création + Resend sync + welcome email
 *  - Email existant désabonné → ré-abonnement
 *  - Email déjà abonné → erreur "already-subscribed"
 */
export async function subscribe(
  email: string,
  source: string = "website",
): Promise<SubscribeResult> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(normalizedEmail)) {
    throw new NewsletterError(
      "Format d'email invalide",
      "invalid-email",
    );
  }

  // Check si existant
  const existing = await prisma.newsletterSubscriber.findUnique({
    where: { email: normalizedEmail },
  });

  if (existing && existing.subscribed) {
    throw new NewsletterError(
      "Cet email est déjà inscrit",
      "already-subscribed",
    );
  }

  let subscriber;
  if (existing) {
    // Ré-abonnement
    subscriber = await prisma.newsletterSubscriber.update({
      where: { id: existing.id },
      data: {
        subscribed: true,
        unsubscribedAt: null,
        source,
      },
    });
  } else {
    // Nouveau
    subscriber = await prisma.newsletterSubscriber.create({
      data: { email: normalizedEmail, source },
    });
  }

  // Sync Resend Audience (best-effort, ne fait pas échouer la requête)
  if (AUDIENCE_ID) {
    try {
      const resend = getResend();
      if (resend) {
        const result = await resend.contacts.create({
          email: normalizedEmail,
          audienceId: AUDIENCE_ID,
          unsubscribed: false,
        });
        if (result.data?.id) {
          await prisma.newsletterSubscriber.update({
            where: { id: subscriber.id },
            data: { resendContactId: result.data.id },
          });
        }
      }
    } catch (err) {
      console.error("[newsletter] Resend audience sync failed:", err);
    }
  }

  // Welcome email (best-effort)
  try {
    await sendNewsletterWelcome({
      email: normalizedEmail,
      unsubscribeToken: subscriber.unsubscribeToken,
    });
  } catch (err) {
    console.error("[newsletter] Welcome email failed:", err);
  }

  return {
    status: existing ? "resubscribed" : "subscribed",
    email: normalizedEmail,
  };
}

/**
 * Désinscrit via token (lien one-click dans les emails).
 * Idempotent : si déjà désabonné, retourne success silencieusement.
 */
export async function unsubscribeByToken(token: string): Promise<{
  found: boolean;
  email: string | null;
}> {
  if (!token || token.length < 10) return { found: false, email: null };

  const subscriber = await prisma.newsletterSubscriber.findUnique({
    where: { unsubscribeToken: token },
  });

  if (!subscriber) return { found: false, email: null };

  if (!subscriber.subscribed) {
    return { found: true, email: subscriber.email };
  }

  await prisma.newsletterSubscriber.update({
    where: { id: subscriber.id },
    data: { subscribed: false, unsubscribedAt: new Date() },
  });

  // Sync Resend Audience
  if (AUDIENCE_ID && subscriber.resendContactId) {
    try {
      const resend = getResend();
      if (resend) {
        await resend.contacts.update({
          id: subscriber.resendContactId,
          audienceId: AUDIENCE_ID,
          unsubscribed: true,
        });
      }
    } catch (err) {
      console.error("[newsletter] Resend audience unsubscribe failed:", err);
    }
  }

  return { found: true, email: subscriber.email };
}
