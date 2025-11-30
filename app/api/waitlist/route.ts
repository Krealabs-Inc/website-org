import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { WaitlistConfirmationTemplate } from "@/emails/waitlist-confirmation-template";
import { WaitlistNotificationTemplate } from "@/emails/waitlist-notification-template";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: "Email requis" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // Send confirmation email to user
    const confirmationEmail = await resend.emails.send({
      from: "Krealabs <noreply@krealabs.fr>",
      to: [email],
      subject: "Bienvenue sur la liste d'attente Krealabs",
      react: WaitlistConfirmationTemplate({ email }) as React.ReactElement,
    });

    if (confirmationEmail.error) {
      console.error("Resend confirmation error:", confirmationEmail.error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email de confirmation" },
        { status: 500 }
      );
    }

    // Send notification email to admin
    const notificationEmail = await resend.emails.send({
      from: "Krealabs Waitlist <noreply@krealabs.fr>",
      to: ["contact@krealabs.fr"],
      subject: "Nouvelle inscription à la liste d'attente",
      react: WaitlistNotificationTemplate({ email }) as React.ReactElement,
    });

    if (notificationEmail.error) {
      console.error("Resend notification error:", notificationEmail.error);
      // Don't fail if notification fails - user confirmation is more important
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inscription réussie",
        confirmationId: confirmationEmail.data?.id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing waitlist signup:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
