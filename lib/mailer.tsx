/**
 * Service d'envoi d'emails via Resend (https://resend.com).
 *
 * Architecture :
 *  - Domaine d'envoi vérifié : send.krealabs.fr (SPF/DKIM via Resend)
 *  - Domaine de réception : krealabs.fr → ProtonMail via MX OVH (intact)
 *  - From : noreply@send.krealabs.fr (configurable via EMAIL_FROM)
 *  - Admin notif → contact@krealabs.fr (boîte ProtonMail)
 *  - Auto-reply visiteur → email du visiteur
 *  - replyTo sur la notif admin = email du visiteur → quand l'admin
 *    répond depuis ProtonMail, ça part bien vers le visiteur
 *
 * Variables d'env requises :
 *  - RESEND_API_KEY    Clé API Resend (Dashboard > API Keys)
 *  - EMAIL_FROM        Sender, ex: "Krealabs <noreply@send.krealabs.fr>"
 *  - CONTACT_EMAIL     Destinataire admin (défaut: contact@krealabs.fr)
 */

import * as React from "react";
import { Resend } from "resend";

import { ContactEmailTemplate } from "@/emails/contact-template";
import { ContactAutoreplyTemplate } from "@/emails/contact-autoreply-template";
import { WaitlistNotificationTemplate } from "@/emails/waitlist-notification-template";
import { WaitlistConfirmationTemplate } from "@/emails/waitlist-confirmation-template";

const FROM = process.env.EMAIL_FROM || "Krealabs <noreply@krealabs.fr>";
const ADMIN_TO = process.env.CONTACT_EMAIL || "contact@krealabs.fr";

// Lazy init : permet au build de passer sans la clé (la clé n'est requise
// qu'au runtime des routes API). resend.emails.send throw si pas de clé.
function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY manquant. Ajoute-le dans .env.local (dev) et dans Vercel (prod).",
    );
  }
  return new Resend(key);
}

const requestTypeSubject: Record<string, string> = {
  devis: "Demande de devis",
  contact: "Nouveau message",
  partenariat: "Demande de partenariat",
};

export interface ContactFormData {
  requestType: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  pricingOption?: string;
  message: string;
  filesCount?: number;
}

/**
 * Envoie la notif admin + l'auto-reply visiteur (en parallèle).
 * La notif admin est critique → throw en cas d'échec.
 * L'auto-reply est best-effort → log mais n'échoue pas la requête.
 */
export async function sendContactEmails(data: ContactFormData): Promise<void> {
  const resend = getResend();
  const typeLabel = requestTypeSubject[data.requestType] || "Nouveau message";

  const [adminResult, visitorResult] = await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: [ADMIN_TO],
      replyTo: data.email,
      subject: `${typeLabel} — ${data.name}`,
      react: React.createElement(ContactEmailTemplate, {
        requestType: data.requestType,
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        pricingOption: data.pricingOption,
        message: data.message,
        filesCount: data.filesCount || 0,
      }),
    }),
    resend.emails.send({
      from: FROM,
      to: [data.email],
      replyTo: ADMIN_TO,
      subject: "Votre demande est bien reçue — Krealabs",
      react: React.createElement(ContactAutoreplyTemplate, {
        name: data.name,
        requestType: data.requestType,
      }),
    }),
  ]);

  if (adminResult.status === "rejected") {
    console.error("[mailer] Resend admin email failed:", adminResult.reason);
    throw new Error("Échec d'envoi de la notification admin");
  }
  if (adminResult.value.error) {
    console.error("[mailer] Resend admin error:", adminResult.value.error);
    throw new Error(
      `Resend admin error: ${adminResult.value.error.message}`,
    );
  }

  if (visitorResult.status === "rejected") {
    console.error(
      "[mailer] Resend visitor autoreply failed:",
      visitorResult.reason,
    );
    // best-effort, on ne throw pas
  } else if (visitorResult.value.error) {
    console.error(
      "[mailer] Resend visitor autoreply error:",
      visitorResult.value.error,
    );
  }
}

/**
 * Envoie la notif admin waitlist + le mail de bienvenue au visiteur.
 */
export async function sendWaitlistEmails(email: string): Promise<void> {
  const resend = getResend();

  const [adminResult, visitorResult] = await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: [ADMIN_TO],
      replyTo: email,
      subject: `Nouvelle inscription waitlist — ${email}`,
      react: React.createElement(WaitlistNotificationTemplate, { email }),
    }),
    resend.emails.send({
      from: FROM,
      to: [email],
      replyTo: ADMIN_TO,
      subject: "Bienvenue sur la waitlist Krealabs",
      react: React.createElement(WaitlistConfirmationTemplate, { email }),
    }),
  ]);

  if (adminResult.status === "rejected") {
    console.error(
      "[mailer] Resend admin waitlist failed:",
      adminResult.reason,
    );
    throw new Error("Échec d'envoi de la notification waitlist");
  }
  if (adminResult.value.error) {
    console.error(
      "[mailer] Resend admin waitlist error:",
      adminResult.value.error,
    );
    throw new Error(
      `Resend admin error: ${adminResult.value.error.message}`,
    );
  }

  if (visitorResult.status === "rejected") {
    console.error(
      "[mailer] Resend visitor waitlist confirmation failed:",
      visitorResult.reason,
    );
  } else if (visitorResult.value.error) {
    console.error(
      "[mailer] Resend visitor waitlist confirmation error:",
      visitorResult.value.error,
    );
  }
}
