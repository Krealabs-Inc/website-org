import { NextRequest, NextResponse } from "next/server";
import { ContactEmailTemplate } from "@/emails/contact-template";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import * as React from "react";

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
    const files = formData.getAll("files") as File[];

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

    // Sauvegarde DB
    await prisma.contactForm.create({
      data: {
        requestType: requestType || "contact",
        name,
        email,
        phone: phone || null,
        company: company || null,
        pricingOption: pricingOption || null,
        message,
        filesCount: files.length,
      },
    });

    // Pièces jointes : conversion File → Buffer pour nodemailer
    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      })),
    );

    // Sujet contextuel
    const subjectByType: Record<string, string> = {
      devis: "Nouvelle demande de devis",
      partenariat: "Nouvelle demande de partenariat",
      contact: "Nouveau message de contact",
    };
    const subject = `${subjectByType[requestType] || "Nouveau message"} — ${name}`;

    // Envoi SMTP
    try {
      await sendMail({
        subject,
        replyTo: email,
        react: ContactEmailTemplate({
          requestType,
          name,
          email,
          phone,
          company,
          pricingOption,
          message,
          filesCount: files.length,
        }) as React.ReactElement,
        attachments: attachments.length > 0 ? attachments : undefined,
      });
    } catch (smtpError) {
      console.error("SMTP send error:", smtpError);
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
