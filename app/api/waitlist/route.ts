import { NextRequest, NextResponse } from "next/server";
import { WaitlistConfirmationTemplate } from "@/emails/waitlist-confirmation-template";
import { WaitlistNotificationTemplate } from "@/emails/waitlist-notification-template";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import * as React from "react";

export async function POST(request: NextRequest) {
  try {
    let body: { email?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Format de requête invalide (JSON attendu)" },
        { status: 400 },
      );
    }
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 },
      );
    }

    const existingContact = await prisma.waitlistContact.findUnique({
      where: { email },
    });

    if (existingContact) {
      return NextResponse.json(
        { error: "Cet email est déjà inscrit à la liste d'attente" },
        { status: 409 },
      );
    }

    await prisma.waitlistContact.create({
      data: { email, source: "website" },
    });

    // Email de confirmation à l'utilisateur (critique — bloque si échec)
    try {
      await sendMail({
        to: email,
        subject: "Bienvenue sur la liste d'attente Krealabs",
        react: WaitlistConfirmationTemplate({ email }) as React.ReactElement,
      });
    } catch (smtpError) {
      console.error("SMTP confirmation error:", smtpError);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email de confirmation" },
        { status: 500 },
      );
    }

    // Notification admin (best-effort — n'échoue pas si KO)
    try {
      await sendMail({
        subject: "Nouvelle inscription à la liste d'attente",
        react: WaitlistNotificationTemplate({ email }) as React.ReactElement,
      });
    } catch (smtpError) {
      console.error("SMTP notification error:", smtpError);
    }

    return NextResponse.json(
      { success: true, message: "Inscription réussie" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing waitlist signup:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
