import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated, getAdminAuthError } from "@/lib/admin-auth";

/**
 * Stub : envoi newsletter bulk désactivé dans le setup actuel.
 *
 * Le service email (Formsubmit) du site est conçu pour envoyer
 * UN formulaire visiteur vers contact@krealabs.fr — pas pour
 * envoyer en bulk à plusieurs destinataires arbitraires.
 *
 * Pour réactiver la newsletter admin, options :
 *  - Réintégrer Resend avec un domaine vérifié (DNS records)
 *  - Utiliser un service dédié newsletter (Mailchimp, Buttondown,
 *    ConvertKit, Brevo) avec leur API
 *  - Déployer un script externe pour les envois bulk
 */
export async function POST(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return getAdminAuthError();
  }

  return NextResponse.json(
    {
      error:
        "Envoi de newsletter désactivé dans le setup actuel. Voir EMAIL_SETUP.md pour réactiver via Resend + domaine vérifié ou service dédié.",
    },
    { status: 501 },
  );
}
