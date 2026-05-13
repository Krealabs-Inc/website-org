import * as React from "react";
import {
  EmailShell,
  EmailHeader,
  EmailFooter,
  colors,
} from "./_layout";

interface WaitlistNotificationTemplateProps {
  email: string;
}

/**
 * Notification admin reçue à chaque inscription waitlist.
 */
export const WaitlistNotificationTemplate: React.FC<WaitlistNotificationTemplateProps> = ({
  email,
}) => {
  const now = new Date().toLocaleString("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <EmailShell
      title={`Nouvelle inscription waitlist — ${email}`}
      preview={`${email} vient de rejoindre la liste d'attente.`}
    >
      <EmailHeader subtitle="Waitlist" />

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
            Nouvelle inscription
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: colors.textMuted,
              margin: 0,
            }}
          >
            Quelqu&apos;un vient de rejoindre la liste d&apos;attente.
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
              <tr>
                <td
                  style={{
                    padding: "12px 0",
                    fontSize: "13px",
                    color: colors.textSubtle,
                    width: "40%",
                    verticalAlign: "top",
                  }}
                >
                  Email
                </td>
                <td
                  style={{
                    padding: "12px 0",
                    fontSize: "14px",
                    color: colors.text,
                    fontWeight: 500,
                  }}
                >
                  <a
                    href={`mailto:${email}`}
                    style={{ color: colors.accent, textDecoration: "none" }}
                  >
                    {email}
                  </a>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "12px 0",
                    fontSize: "13px",
                    color: colors.textSubtle,
                    width: "40%",
                  }}
                >
                  Source
                </td>
                <td
                  style={{
                    padding: "12px 0",
                    fontSize: "14px",
                    color: colors.text,
                    fontWeight: 500,
                  }}
                >
                  Site web krealabs.fr
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "12px 0",
                    fontSize: "13px",
                    color: colors.textSubtle,
                    width: "40%",
                  }}
                >
                  Date
                </td>
                <td
                  style={{
                    padding: "12px 0",
                    fontSize: "14px",
                    color: colors.text,
                    fontWeight: 500,
                  }}
                >
                  {now}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "24px 32px 28px" }}>
          <a
            href={`mailto:${email}`}
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
            Contacter
          </a>
        </td>
      </tr>

      <EmailFooter />
    </EmailShell>
  );
};
