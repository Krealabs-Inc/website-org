import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactEmails } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { error: "Format de requête invalide (multipart/form-data attendu)" },
        { status: 400 },
      );
    }

    const requestType = formData.get("requestType") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const pricingOption = formData.get("pricingOption") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 },
      );
    }

    // Sauvegarde DB (toujours, même si l'envoi email échoue)
    await prisma.contactForm.create({
      data: {
        requestType: requestType || "contact",
        name,
        email,
        phone: phone || null,
        company: company || null,
        pricingOption: pricingOption || null,
        message,
        filesCount: 0,
      },
    });

    try {
      await sendContactEmails({
        requestType: requestType || "contact",
        name,
        email,
        phone: phone || undefined,
        company: company || undefined,
        pricingOption: pricingOption || undefined,
        message,
        filesCount: 0,
      });
    } catch (err) {
      console.error("Resend error:", err);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
