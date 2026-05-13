import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { isAdminAuthenticated, getAdminAuthError } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return getAdminAuthError();
  }

  try {
    const { subject, htmlContent, recipients } = await request.json();

    if (!subject || !htmlContent) {
      return NextResponse.json(
        { error: "Sujet et contenu requis" },
        { status: 400 },
      );
    }

    let emails: string[] = [];

    if (recipients === "all" || recipients === "waitlist") {
      const waitlistContacts = await prisma.waitlistContact.findMany({
        select: { email: true },
      });
      emails = [...emails, ...waitlistContacts.map((c) => c.email)];
    }

    if (recipients === "all" || recipients === "forms") {
      const contactForms = await prisma.contactForm.findMany({
        select: { email: true },
      });
      emails = [...emails, ...contactForms.map((c) => c.email)];
    }

    emails = [...new Set(emails)];

    if (emails.length === 0) {
      return NextResponse.json(
        { error: "Aucun destinataire trouvé" },
        { status: 400 },
      );
    }

    // Envoi un par un via SMTP (nodemailer ne supporte pas le bulk
    // natif comme Resend). Pour les newsletters massives, on garde des
    // pauses pour respecter les limites de débit SMTP (300-1000/h selon
    // provider). 50ms entre envois = ~20 emails/sec max théorique.
    let sent = 0;
    let failed = 0;

    for (const email of emails) {
      try {
        await sendMail({
          to: email,
          subject,
          html: htmlContent,
        });
        sent++;
      } catch (error) {
        console.error(`Failed to send to ${email}:`, error);
        failed++;
      }
      // Petite pause pour ne pas saturer le SMTP
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    return NextResponse.json({
      success: true,
      message: `Newsletter envoyée à ${sent} sur ${emails.length} destinataires`,
      details: {
        total: emails.length,
        sent,
        failed,
      },
    });
  } catch (error) {
    console.error("Error sending newsletter:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de la newsletter" },
      { status: 500 },
    );
  }
}
