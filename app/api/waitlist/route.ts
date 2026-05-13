import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWaitlistEmails } from "@/lib/mailer";

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

    try {
      await sendWaitlistEmails(email);
    } catch (err) {
      console.error("Resend waitlist error:", err);
      // best-effort : l'inscription DB est OK, on ne fait pas échouer
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
