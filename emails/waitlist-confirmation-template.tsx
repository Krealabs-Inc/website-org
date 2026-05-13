import * as React from "react";
import {
  EmailShell,
  EmailHeader,
  EmailFooter,
  colors,
  SITE_URL,
} from "./_layout";

interface WaitlistConfirmationTemplateProps {
  email: string;
}

/**
 * Email de bienvenue envoyé au visiteur quand il rejoint la waitlist.
 */
export const WaitlistConfirmationTemplate: React.FC<WaitlistConfirmationTemplateProps> = ({
  email,
}) => {
  return (
    <EmailShell
      title="Bienvenue sur la waitlist — Krealabs"
      preview="Vous êtes sur la liste. On vous prévient dès qu'une nouveauté arrive."
    >
      <EmailHeader subtitle="Waitlist" />

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
            Vous êtes sur la liste.
          </h1>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: colors.textMuted,
              margin: "0 0 12px",
            }}
          >
            Inscription confirmée pour{" "}
            <strong style={{ color: colors.text }}>{email}</strong>. On vous
            préviendra en premier dès qu&apos;on lance une nouvelle offre, un
            article ou un outil qui peut vous être utile.
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
            Ce qui arrive dans votre boîte
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
                  <Bullet>
                    Accès anticipé aux nouvelles offres &amp; templates
                  </Bullet>
                  <Bullet>
                    Tutos sur WordPress, SEO et performance web
                  </Bullet>
                  <Bullet>
                    Études de cas chiffrées sur des refontes
                  </Bullet>
                  <Bullet last>
                    Pas de spam, pas de pub. Juste ce qui vaut le coup.
                  </Bullet>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "24px 32px 28px" }}>
          <a
            href={SITE_URL}
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
            Découvrir Krealabs
          </a>
        </td>
      </tr>

      <EmailFooter>
        Vous recevez cet email car vous vous êtes inscrit à la liste d&apos;attente
        Krealabs. Pour vous désinscrire, répondez simplement &laquo; stop &raquo;.
      </EmailFooter>
    </EmailShell>
  );
};

function Bullet({
  children,
  last,
}: {
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      style={{
        marginBottom: last ? 0 : "10px",
        fontSize: "14px",
        lineHeight: 1.6,
        color: colors.text,
        paddingLeft: "18px",
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          top: "9px",
          width: "6px",
          height: "6px",
          borderRadius: "9999px",
          backgroundColor: colors.accent,
        }}
      />
      {children}
    </div>
  );
}
