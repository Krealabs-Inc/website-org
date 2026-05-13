import * as React from "react";
import {
  EmailShell,
  EmailHeader,
  EmailFooter,
  colors,
} from "./_layout";

interface ContactEmailTemplateProps {
  requestType: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  pricingOption?: string;
  message: string;
  filesCount: number;
}

const typeLabel: Record<string, string> = {
  devis: "Demande de devis",
  contact: "Contact",
  partenariat: "Partenariat",
};

const projectLabel: Record<string, string> = {
  "site-web": "Site web",
  "app-mobile": "Application mobile",
  logiciel: "Logiciel sur mesure",
  "refonte-seo": "Refonte / SEO",
};

/**
 * Email reçu par l'admin (contact@krealabs.fr) à chaque soumission.
 * Reply-To sur le visiteur → réponse depuis ProtonMail va direct au visiteur.
 */
export const ContactEmailTemplate: React.FC<ContactEmailTemplateProps> = ({
  requestType,
  name,
  email,
  phone,
  company,
  pricingOption,
  message,
  filesCount,
}) => {
  const label = typeLabel[requestType] || "Nouveau message";

  const InfoRow = ({
    label: rowLabel,
    value,
    href,
  }: {
    label: string;
    value?: string;
    href?: string;
  }) => {
    if (!value) return null;
    return (
      <tr>
        <td
          style={{
            padding: "10px 0",
            fontSize: "13px",
            color: colors.textSubtle,
            width: "40%",
            verticalAlign: "top",
          }}
        >
          {rowLabel}
        </td>
        <td
          style={{
            padding: "10px 0",
            fontSize: "14px",
            color: colors.text,
            fontWeight: 500,
            verticalAlign: "top",
          }}
        >
          {href ? (
            <a
              href={href}
              style={{ color: colors.accent, textDecoration: "none" }}
            >
              {value}
            </a>
          ) : (
            value
          )}
        </td>
      </tr>
    );
  };

  return (
    <EmailShell
      title={`${label} — ${name}`}
      preview={`${label} de ${name}${company ? ` (${company})` : ""}`}
    >
      <EmailHeader subtitle={label} />

      <tr>
        <td style={{ padding: "0 32px 8px" }}>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              color: colors.text,
              margin: "0 0 4px",
            }}
          >
            {name}
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: colors.textMuted,
              margin: 0,
            }}
          >
            vient de remplir le formulaire de contact.
          </p>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "24px 32px 8px" }}>
          <table
            role="presentation"
            width="100%"
            cellPadding={0}
            cellSpacing={0}
            style={{
              borderTop: `1px solid ${colors.divider}`,
              borderBottom: `1px solid ${colors.divider}`,
            }}
          >
            <tbody>
              <InfoRow
                label="Email"
                value={email}
                href={`mailto:${email}`}
              />
              <InfoRow
                label="Téléphone"
                value={phone}
                href={phone ? `tel:${phone.replace(/\s/g, "")}` : undefined}
              />
              <InfoRow label="Entreprise" value={company} />
              <InfoRow
                label="Type de projet"
                value={pricingOption ? projectLabel[pricingOption] || pricingOption : undefined}
              />
            </tbody>
          </table>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "20px 32px 8px" }}>
          <div
            style={{
              fontSize: "11px",
              color: colors.textSubtle,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "10px",
              fontWeight: 600,
            }}
          >
            Message
          </div>
          <div
            style={{
              padding: "16px 18px",
              backgroundColor: colors.accentBg,
              borderLeft: `3px solid ${colors.accent}`,
              borderRadius: "6px",
              fontSize: "15px",
              lineHeight: 1.65,
              color: colors.text,
              whiteSpace: "pre-wrap" as const,
            }}
          >
            {message}
          </div>
          {filesCount > 0 && (
            <div
              style={{
                marginTop: "12px",
                fontSize: "12px",
                color: colors.textSubtle,
              }}
            >
              {filesCount} fichier{filesCount > 1 ? "s" : ""} joint
              {filesCount > 1 ? "s" : ""}
            </div>
          )}
        </td>
      </tr>

      <tr>
        <td style={{ padding: "24px 32px 28px" }}>
          <table role="presentation" cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr>
                <td>
                  <a
                    href={`mailto:${email}?subject=${encodeURIComponent(
                      `Re: ${label} — Krealabs`,
                    )}`}
                    style={{
                      display: "inline-block",
                      padding: "11px 22px",
                      backgroundColor: colors.accent,
                      color: "#0a0a0a",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: "14px",
                      borderRadius: "8px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Répondre à {name.split(" ")[0]}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <EmailFooter>
        <span style={{ color: colors.textSubtle }}>
          Reçu le{" "}
          {new Date().toLocaleString("fr-FR", {
            dateStyle: "long",
            timeStyle: "short",
          })}
        </span>
      </EmailFooter>
    </EmailShell>
  );
};
