import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendForm } from "@/lib/mailer";

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

    // Labels lisibles
    const typeLabel: Record<string, string> = {
      devis: "Demande de devis",
      contact: "Question / Renseignement",
      partenariat: "Partenariat",
    };
    const projectLabel: Record<string, string> = {
      "site-web": "Site web",
      "app-mobile": "Application mobile",
      logiciel: "Logiciel sur mesure",
      "refonte-seo": "Refonte / SEO",
    };

    // Envoi via Formsubmit
    try {
      await sendForm({
        fields: {
          subject: `${typeLabel[requestType] || "Nouveau message"} — ${name}`,
          name,
          email,
          telephone: phone || "Non renseigné",
          entreprise: company || "Non renseignée",
          type_demande: typeLabel[requestType] || requestType || "contact",
          type_projet: pricingOption
            ? projectLabel[pricingOption] || pricingOption
            : "Non précisé",
          message,
        },
        autoresponse: [
          `Bonjour ${name},`,
          ``,
          `Nous avons bien reçu votre ${typeLabel[requestType]?.toLowerCase() || "demande"} et nous l'étudions dès maintenant.`,
          ``,
          `Vous recevrez une réponse personnalisée sous 24 heures ouvrées à l'adresse ${email}.`,
          ``,
          `En attendant, n'hésitez pas à explorer notre travail :`,
          `  • Offre WordPress : https://krealabs.fr/services/wordpress`,
          `  • Tous nos services : https://krealabs.fr/services`,
          `  • L'équipe : https://krealabs.fr/equipe`,
          ``,
          `Une question urgente ? Écrivez-nous directement à contact@krealabs.fr.`,
          ``,
          `À très vite,`,
          `L'équipe Krealabs`,
          `https://krealabs.fr`,
        ].join("\n"),
      });
    } catch (err) {
      console.error("Formsubmit error:", err);
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
