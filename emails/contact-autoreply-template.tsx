import * as React from "react";
import {
  EmailShell,
  EmailHeader,
  EmailFooter,
  colors,
  SITE_URL,
} from "./_layout";

interface ContactAutoreplyProps {
  name: string;
  requestType?: string;
}

const typeLabel: Record<string, string> = {
  devis: "demande de devis",
  contact: "demande de renseignement",
  partenariat: "demande de partenariat",
};

/**
 * Auto-reply envoyé au visiteur après soumission du formulaire.
 * Sa lecture confirme qu'on a bien reçu sa demande.
 */
export function ContactAutoreplyTemplate({
  name,
  requestType,
}: ContactAutoreplyProps) {
  const label = typeLabel[requestType || "contact"] || "demande";
  const firstName = name.split(" ")[0];

  return (
    <EmailShell
      title="Votre demande est bien reçue — Krealabs"
      preview={`Bonjour ${firstName}, on a bien reçu votre ${label} et on revient vers vous sous 24h.`}
    >
      <EmailHeader subtitle="Demande reçue" />

      <tr>
        <td style={{ padding: "0 32px 8px" }}>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: colors.text,
              margin: "0 0 14px",
            }}
          >
            Merci {firstName},<br />
            votre {label} est entre de bonnes mains.
          </h1>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: colors.textMuted,
              margin: "0 0 12px",
            }}
          >
            On a bien reçu votre message et on l&apos;étudie dès maintenant. Vous
            recevrez une réponse personnalisée de notre part sous{" "}
            <strong style={{ color: colors.text }}>24 heures ouvrées</strong>.
          </p>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "20px 32px 0" }}>
          <div
            style={{
              fontSize: "11px",
              color: colors.textSubtle,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "12px",
              fontWeight: 600,
            }}
          >
            En attendant
          </div>
          <table
            role="presentation"
            width="100%"
            cellPadding={0}
            cellSpacing={0}
            style={{
              backgroundColor: colors.accentBg,
              border: `1px solid ${colors.accentBorder}`,
              borderRadius: "10px",
            }}
          >
            <tbody>
              <tr>
                <td style={{ padding: "18px 20px" }}>
                  <LinkRow
                    href={`${SITE_URL}/services/wordpress`}
                    label="Notre offre WordPress sur-mesure"
                  />
                  <LinkRow
                    href={`${SITE_URL}/services`}
                    label="Tous nos services"
                  />
                  <LinkRow href={`${SITE_URL}/equipe`} label="L'équipe Krealabs" />
                  <LinkRow
                    href={`${SITE_URL}/blog`}
                    label="Notre blog (SEO, WordPress, perf)"
                    last
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "24px 32px 28px" }}>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.7,
              color: colors.textSubtle,
              margin: 0,
            }}
          >
            Une question urgente ? Répondez simplement à cet email — votre
            réponse arrive directement dans notre boîte.
          </p>
        </td>
      </tr>

      <EmailFooter />
    </EmailShell>
  );
}

function LinkRow({
  href,
  label,
  last,
}: {
  href: string;
  label: string;
  last?: boolean;
}) {
  return (
    <div style={{ marginBottom: last ? 0 : "10px" }}>
      <a
        href={href}
        style={{
          color: colors.accent,
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "14px",
          letterSpacing: "-0.01em",
        }}
      >
        → {label}
      </a>
    </div>
  );
}
