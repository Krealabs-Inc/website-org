import * as React from "react";

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

const requestTypeLabels: Record<string, string> = {
  devis: "Demande de devis",
  contact: "Contact simple",
  partenariat: "Demande de partenariat",
};

const requestTypeEmojis: Record<string, string> = {
  devis: "💰",
  contact: "💬",
  partenariat: "🤝",
};

export const ContactEmailTemplate: React.FC<ContactEmailTemplateProps> = ({
  requestType,
  name,
  email,
  phone,
  company,
  pricingOption,
  message,
  filesCount,
}) => (
  <html>
    <head>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap');

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: #030303;
          margin: 0;
          padding: 0;
        }

        .email-wrapper {
          background-color: #030303;
          padding: 40px 20px;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #0a0a0a;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .header {
          background: linear-gradient(135deg, #A543F1 0%, #8b35d1 100%);
          padding: 40px;
          text-align: center;
          position: relative;
        }

        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyOHYySDI0di0yaDEyek0zNiAyMnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+');
          opacity: 0.1;
        }

        .logo {
          position: relative;
          z-index: 1;
          width: 56px;
          height: 56px;
          margin: 0 auto 16px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .logo-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .header h1 {
          position: relative;
          z-index: 1;
          margin: 0;
          color: #ffffff;
          font-size: 24px;
          font-weight: 700;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.5px;
        }

        .header p {
          position: relative;
          z-index: 1;
          margin: 10px 0 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 15px;
        }

        .badge {
          position: relative;
          z-index: 1;
          display: inline-block;
          padding: 6px 14px;
          background-color: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 100px;
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 16px;
          backdrop-filter: blur(10px);
        }

        .content {
          padding: 40px;
          color: rgba(255, 255, 255, 0.7);
        }

        .info-section {
          margin-bottom: 32px;
        }

        .section-title {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }

        .info-grid {
          display: grid;
          gap: 12px;
        }

        .info-row {
          background: linear-gradient(135deg, rgba(165, 67, 241, 0.05) 0%, rgba(197, 203, 249, 0.02) 100%);
          padding: 14px 18px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .info-label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
        }

        .info-value {
          font-size: 14px;
          color: #ffffff;
          font-weight: 600;
          text-align: right;
        }

        .email-value {
          color: #A543F1;
        }

        .message-box {
          background: linear-gradient(135deg, rgba(165, 67, 241, 0.1) 0%, rgba(197, 203, 249, 0.05) 100%);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid rgba(165, 67, 241, 0.2);
          margin-top: 20px;
        }

        .message-title {
          font-size: 14px;
          color: #ffffff;
          font-weight: 700;
          margin-bottom: 12px;
          font-family: 'Space Grotesk', sans-serif;
        }

        .message-text {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
          white-space: pre-wrap;
        }

        .attachments-badge {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(165, 67, 241, 0.15);
          border: 1px solid rgba(165, 67, 241, 0.3);
          border-radius: 100px;
          color: #A543F1;
          font-size: 13px;
          font-weight: 600;
          margin-top: 16px;
        }

        .cta-button {
          display: inline-block;
          padding: 12px 28px;
          background: #A543F1;
          color: #ffffff;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          margin-top: 24px;
          transition: all 0.2s;
        }

        .cta-button:hover {
          background: #8b35d1;
          transform: translateY(-1px);
        }

        .timestamp {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer {
          background-color: #030303;
          padding: 28px 40px;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .footer p {
          margin: 6px 0;
          color: rgba(255, 255, 255, 0.5);
          font-size: 13px;
          line-height: 1.6;
        }
      `}</style>
    </head>
    <body>
      <div className="email-wrapper">
        <div className="container">
          <div className="header">
            <div className="logo">
              <span className="logo-text">K</span>
            </div>
            <div className="badge">{requestTypeEmojis[requestType] || "📧"} {requestTypeLabels[requestType]}</div>
            <h1>Nouveau message</h1>
            <p>Formulaire de contact Kréalabs</p>
          </div>

          <div className="content">
            <div className="info-section">
              <div className="section-title">Informations du contact</div>
              <div className="info-grid">
                <div className="info-row">
                  <span className="info-label">Nom</span>
                  <span className="info-value">{name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email</span>
                  <a href={`mailto:${email}`} className="info-value email-value">{email}</a>
                </div>
                {phone && (
                  <div className="info-row">
                    <span className="info-label">Téléphone</span>
                    <a href={`tel:${phone}`} className="info-value email-value">{phone}</a>
                  </div>
                )}
                {company && (
                  <div className="info-row">
                    <span className="info-label">Entreprise</span>
                    <span className="info-value">{company}</span>
                  </div>
                )}
                {pricingOption && (
                  <div className="info-row">
                    <span className="info-label">Budget</span>
                    <span className="info-value">{pricingOption}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="message-box">
              <div className="message-title">Message</div>
              <div className="message-text">{message}</div>
              {filesCount > 0 && (
                <div className="attachments-badge">
                  📎 {filesCount} fichier{filesCount > 1 ? 's' : ''} joint{filesCount > 1 ? 's' : ''}
                </div>
              )}
            </div>

            <center>
              <a href={`mailto:${email}`} className="cta-button">
                Répondre →
              </a>
            </center>

            <p className="timestamp">
              📅 {new Date().toLocaleString('fr-FR', {
                dateStyle: 'full',
                timeStyle: 'short'
              })}
            </p>
          </div>

          <div className="footer">
            <div className="footer-logo">Kréalabs</div>
            <p>Notification automatique du formulaire de contact</p>
            <p style={{ marginTop: '12px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.3)' }}>
              Cet email a été généré automatiquement
            </p>
          </div>
        </div>
      </div>
    </body>
  </html>
);
