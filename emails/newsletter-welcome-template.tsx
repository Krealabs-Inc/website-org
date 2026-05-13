import * as React from "react";
import {
  EmailShell,
  EmailHeader,
  EmailFooter,
  colors,
  SITE_URL,
} from "./_layout";

interface NewsletterWelcomeProps {
  email: string;
  unsubscribeUrl: string;
}

/**
 * Welcome email envoyé immédiatement après inscription newsletter.
 * Pose la promesse éditoriale + lien désabonnement one-click obligatoire (RGPD).
 */
export function NewsletterWelcomeTemplate({
  email,
  unsubscribeUrl,
}: NewsletterWelcomeProps) {
  return (
    <EmailShell
      title="Bienvenue sur la newsletter Krealabs"
      preview={`Inscription confirmée pour ${email}. Articles, retours d'expérience, veille tech — 1 mail par mois max.`}
    >
      <EmailHeader subtitle="Newsletter" />

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
            Bienvenue dans la boucle.
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
            <strong style={{ color: colors.text }}>{email}</strong>. Vous allez
            recevoir notre newsletter mensuelle, sans spam, sans pub.
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
            La promesse Krealabs
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
                    <strong style={{ color: colors.text }}>1 email max par mois</strong>{" "}
                    — pas plus, on a horreur du spam autant que vous.
                  </Bullet>
                  <Bullet>
                    Articles techniques (WordPress, Next.js, SEO, perf) +
                    retours d&apos;expérience d&apos;agence
                  </Bullet>
                  <Bullet>
                    Études de cas chiffrées sur des projets clients
                    (anonymisés)
                  </Bullet>
                  <Bullet last>
                    Désabonnement{" "}
                    <strong style={{ color: colors.text }}>en un clic</strong>,
                    aucune justification demandée
                  </Bullet>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "24px 32px 8px" }}>
          <a
            href={`${SITE_URL}/blog`}
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
            Lire les derniers articles
          </a>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "16px 32px 28px" }}>
          <p
            style={{
              fontSize: "13px",
              lineHeight: 1.6,
              color: colors.textSubtle,
              margin: 0,
            }}
          >
            Pour vous désabonner : cliquez sur{" "}
            <a
              href={unsubscribeUrl}
              style={{ color: colors.accent, textDecoration: "underline" }}
            >
              ce lien
            </a>{" "}
            — c&apos;est instantané, pas de formulaire à remplir.
          </p>
        </td>
      </tr>

      <EmailFooter>
        Vous recevez cet email car vous vous êtes inscrit à la newsletter
        Krealabs. Désinscription :{" "}
        <a
          href={unsubscribeUrl}
          style={{ color: colors.accent, textDecoration: "none" }}
        >
          un clic ici
        </a>
        .
      </EmailFooter>
    </EmailShell>
  );
}

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
        color: colors.textMuted,
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
