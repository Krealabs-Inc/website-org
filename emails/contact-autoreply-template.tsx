import * as React from "react";

interface ContactAutoreplyProps {
  name: string;
  requestType?: string;
}

/**
 * Email de confirmation envoyé automatiquement au visiteur après
 * soumission du formulaire de contact. Lui indique que sa demande
 * est bien reçue et qu'une réponse manuelle suivra sous 24h ouvrées.
 */
export function ContactAutoreplyTemplate({
  name,
  requestType,
}: ContactAutoreplyProps) {
  const typeLabel: Record<string, string> = {
    devis: "demande de devis",
    contact: "demande de renseignement",
    partenariat: "demande de partenariat",
  };
  const label = typeLabel[requestType || "contact"] || "demande";

  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Demande bien reçue — Krealabs</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#0a0a0a",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
          color: "#fafafa",
        }}
      >
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ backgroundColor: "#0a0a0a", padding: "40px 20px" }}
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  width="600"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    backgroundColor: "#141414",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <tbody>
                    {/* Header */}
                    <tr>
                      <td style={{ padding: "32px 32px 24px" }}>
                        <table cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              <td style={{ verticalAlign: "middle" }}>
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "9999px",
                                    backgroundColor: "#8F99ED",
                                    marginRight: "10px",
                                    verticalAlign: "middle",
                                  }}
                                />
                                <span
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: 700,
                                    color: "#fafafa",
                                    letterSpacing: "-0.02em",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  krealabs
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Body */}
                    <tr>
                      <td style={{ padding: "0 32px 32px" }}>
                        <h1
                          style={{
                            fontSize: "28px",
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                            lineHeight: 1.2,
                            color: "#fafafa",
                            margin: "0 0 16px",
                          }}
                        >
                          Merci {name},<br />
                          votre {label} est bien reçue.
                        </h1>
                        <p
                          style={{
                            fontSize: "16px",
                            lineHeight: 1.6,
                            color: "rgba(250,250,250,0.7)",
                            margin: "0 0 24px",
                          }}
                        >
                          Nous avons bien reçu votre message et nous l'étudions
                          dès maintenant. Vous recevrez une réponse personnalisée
                          de notre part sous <strong style={{ color: "#fafafa" }}>24 heures ouvrées</strong>.
                        </p>
                        <p
                          style={{
                            fontSize: "16px",
                            lineHeight: 1.6,
                            color: "rgba(250,250,250,0.7)",
                            margin: "0 0 24px",
                          }}
                        >
                          En attendant, n'hésitez pas à explorer notre travail :
                        </p>

                        {/* Liens utiles */}
                        <table cellPadding={0} cellSpacing={0} width="100%">
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  padding: "16px",
                                  backgroundColor: "rgba(143,153,237,0.08)",
                                  borderLeft: "3px solid #8F99ED",
                                  borderRadius: "6px",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: 1.6,
                                    margin: 0,
                                    color: "rgba(250,250,250,0.85)",
                                  }}
                                >
                                  <a
                                    href="https://krealabs.fr/services/wordpress"
                                    style={{
                                      color: "#8F99ED",
                                      textDecoration: "none",
                                      fontWeight: 600,
                                    }}
                                  >
                                    → Notre offre WordPress
                                  </a>
                                  <br />
                                  <a
                                    href="https://krealabs.fr/services"
                                    style={{
                                      color: "#8F99ED",
                                      textDecoration: "none",
                                      fontWeight: 600,
                                    }}
                                  >
                                    → Tous nos services
                                  </a>
                                  <br />
                                  <a
                                    href="https://krealabs.fr/equipe"
                                    style={{
                                      color: "#8F99ED",
                                      textDecoration: "none",
                                      fontWeight: 600,
                                    }}
                                  >
                                    → L'équipe Krealabs
                                  </a>
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <p
                          style={{
                            fontSize: "14px",
                            lineHeight: 1.6,
                            color: "rgba(250,250,250,0.5)",
                            margin: "32px 0 0",
                          }}
                        >
                          Une question urgente ? Écrivez-nous directement à{" "}
                          <a
                            href="mailto:contact@krealabs.fr"
                            style={{ color: "#8F99ED", textDecoration: "none" }}
                          >
                            contact@krealabs.fr
                          </a>
                          .
                        </p>
                      </td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td
                        style={{
                          padding: "24px 32px",
                          borderTop: "1px solid rgba(255,255,255,0.08)",
                          fontSize: "12px",
                          color: "rgba(250,250,250,0.4)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Krealabs · Agence web à Rouen · krealabs.fr
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
