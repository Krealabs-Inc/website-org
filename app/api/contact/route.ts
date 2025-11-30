import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactEmailTemplate } from "@/emails/contact-template";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const requestType = formData.get("requestType") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const pricingOption = formData.get("pricingOption") as string;
    const message = formData.get("message") as string;

    // Extract files
    const files = formData.getAll("files") as File[];

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
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

    // Process attachments
    const attachments = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return {
          filename: file.name,
          content: buffer,
        };
      })
    );

    // Determine subject based on request type
    let subject = "Nouveau message de contact";
    if (requestType === "devis") {
      subject = "Nouvelle demande de devis";
    } else if (requestType === "partenariat") {
      subject = "Nouvelle demande de partenariat";
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Krealabs Contact <noreply@krealabs.fr>",
      to: ["contact@krealabs.fr"],
      replyTo: email,
      subject: `${subject} - ${name}`,
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

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
