import * as React from "react";

/**
 * Tokens partagés pour les 4 templates emails Krealabs.
 * Garde les emails cohérents avec l'identité du site (#8F99ED, dark theme).
 *
 * Contraintes email :
 *  - Table-based layout (Outlook / GMail iOS legacy)
 *  - Inline styles uniquement, pas de classes CSS
 *  - System fonts (Geist + Google Fonts ne rendent pas dans tous les clients)
 *  - Pas de `display: grid`, `flex`, `backdrop-filter`, etc.
 */

export const LOGO_URL = "https://krealabs.fr/apple-touch-icon.png";
export const SITE_URL = "https://krealabs.fr";

export const colors = {
  bg: "#0a0a0a",
  card: "#141414",
  border: "rgba(255,255,255,0.08)",
  divider: "rgba(255,255,255,0.06)",
  text: "#fafafa",
  textMuted: "rgba(250,250,250,0.7)",
  textSubtle: "rgba(250,250,250,0.5)",
  accent: "#8F99ED",
  accentBg: "rgba(143,153,237,0.08)",
  accentBorder: "rgba(143,153,237,0.25)",
} as const;

export const fontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';

export interface EmailShellProps {
  /** Titre du document, utilisé par certains clients pour l'aperçu */
  title: string;
  /** Preview text affiché par Gmail/Apple Mail dans la liste, max ~120 chars */
  preview?: string;
  children: React.ReactNode;
}

export function EmailShell({ title, preview, children }: EmailShellProps) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="color-scheme" content="dark light" />
        <meta name="supported-color-schemes" content="dark light" />
        <title>{title}</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: colors.bg,
          fontFamily,
          color: colors.text,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {preview && (
          <div
            style={{
              display: "none",
              overflow: "hidden",
              lineHeight: "1px",
              maxHeight: 0,
              maxWidth: 0,
              opacity: 0,
              color: "transparent",
            }}
          >
            {preview}
          </div>
        )}
        <table
          role="presentation"
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ backgroundColor: colors.bg, padding: "40px 16px" }}
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  role="presentation"
                  width="600"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    backgroundColor: colors.card,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <tbody>{children}</tbody>
                </table>
                <table
                  role="presentation"
                  width="600"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    marginTop: "24px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          padding: "0 8px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: colors.textSubtle,
                          lineHeight: 1.6,
                        }}
                      >
                        Krealabs · Agence digitale, Rouen
                        <span style={{ margin: "0 6px" }}>·</span>
                        <a
                          href={SITE_URL}
                          style={{ color: colors.textSubtle, textDecoration: "none" }}
                        >
                          krealabs.fr
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

/** Header avec logo + wordmark — utilisé par tous les templates. */
export function EmailHeader({ subtitle }: { subtitle?: string }) {
  return (
    <tr>
      <td style={{ padding: "28px 32px 20px" }}>
        <table role="presentation" cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr>
              <td style={{ verticalAlign: "middle", paddingRight: "12px" }}>
                <img
                  src={LOGO_URL}
                  alt="Krealabs"
                  width={36}
                  height={36}
                  style={{
                    display: "block",
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                  }}
                />
              </td>
              <td style={{ verticalAlign: "middle" }}>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: colors.text,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  krealabs
                </div>
                {subtitle && (
                  <div
                    style={{
                      marginTop: "4px",
                      fontSize: "12px",
                      color: colors.textSubtle,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {subtitle}
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}

/** Footer minimal — par défaut un séparateur + ligne d'infos. */
export function EmailFooter({ children }: { children?: React.ReactNode }) {
  return (
    <tr>
      <td
        style={{
          padding: "20px 32px 28px",
          borderTop: `1px solid ${colors.divider}`,
          fontSize: "12px",
          color: colors.textSubtle,
          lineHeight: 1.6,
        }}
      >
        {children || (
          <>
            Une question ? Écrivez-nous à{" "}
            <a
              href="mailto:contact@krealabs.fr"
              style={{ color: colors.accent, textDecoration: "none" }}
            >
              contact@krealabs.fr
            </a>
          </>
        )}
      </td>
    </tr>
  );
}
