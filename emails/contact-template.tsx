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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }

        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
          background: linear-gradient(135deg, #A543F1 0%, #c5cbf9 100%);
          padding: 40px 30px;
          text-align: center;
        }

        .header h1 {
          margin: 0;
          color: #ffffff;
          font-size: 28px;
          font-weight: 700;
        }

        .header p {
          margin: 10px 0 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
        }

        .content {
          padding: 40px 30px;
        }

        .badge {
          display: inline-block;
          padding: 8px 16px;
          background-color: rgba(165, 67, 241, 0.1);
          color: #A543F1;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .info-section {
          margin-bottom: 30px;
        }

        .info-title {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #666666;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .info-value {
          font-size: 16px;
          color: #1a1a1a;
          line-height: 1.6;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }

        .info-card {
          background-color: #f9fafb;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #A543F1;
        }

        .message-box {
          background-color: #f9fafb;
          padding: 24px;
          border-radius: 8px;
          border-left: 4px solid #A543F1;
          margin-top: 20px;
        }

        .message-box p {
          margin: 0;
          color: #333333;
          line-height: 1.8;
          font-size: 15px;
          white-space: pre-wrap;
        }

        .footer {
          background-color: #f9fafb;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }

        .footer p {
          margin: 0;
          color: #666666;
          font-size: 14px;
        }

        .footer a {
          color: #A543F1;
          text-decoration: none;
          font-weight: 600;
        }

        .divider {
          height: 1px;
          background-color: #e5e7eb;
          margin: 30px 0;
        }

        .attachment-notice {
          background-color: #fef3c7;
          padding: 16px;
          border-radius: 8px;
          border-left: 4px solid #f59e0b;
          margin-top: 20px;
        }

        .attachment-notice p {
          margin: 0;
          color: #92400e;
          font-size: 14px;
        }

        .attachment-notice strong {
          color: #78350f;
        }
      `}</style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <h1>Nouveau message recu</h1>
          <p>Un visiteur a rempli le formulaire de contact</p>
        </div>

        <div className="content">
          <div className="badge">
            {requestTypeLabels[requestType] || "Contact"}
          </div>

          <div className="info-grid">
            <div className="info-card">
              <div className="info-title">Nom</div>
              <div className="info-value">{name}</div>
            </div>

            <div className="info-card">
              <div className="info-title">Email</div>
              <div className="info-value">
                <a href={`mailto:${email}`} style={{ color: '#A543F1', textDecoration: 'none' }}>
                  {email}
                </a>
              </div>
            </div>

            {phone && (
              <div className="info-card">
                <div className="info-title">Telephone</div>
                <div className="info-value">
                  <a href={`tel:${phone}`} style={{ color: '#A543F1', textDecoration: 'none' }}>
                    {phone}
                  </a>
                </div>
              </div>
            )}

            {company && (
              <div className="info-card">
                <div className="info-title">Entreprise</div>
                <div className="info-value">{company}</div>
              </div>
            )}
          </div>

          {pricingOption && (
            <div className="info-section">
              <div className="info-title">Formule souhaitee</div>
              <div className="info-value">{pricingOption}</div>
            </div>
          )}

          <div className="divider"></div>

          <div className="info-section">
            <div className="info-title">Message</div>
            <div className="message-box">
              <p>{message}</p>
            </div>
          </div>

          {filesCount > 0 && (
            <div className="attachment-notice">
              <p>
                <strong>Fichiers joints :</strong> {filesCount} document{filesCount > 1 ? 's' : ''} en piece jointe
              </p>
            </div>
          )}
        </div>

        <div className="footer">
          <p>
            Ce message a ete envoye depuis le formulaire de contact de{' '}
            <a href="https://krealabs.fr">krealabs.fr</a>
          </p>
          <p style={{ marginTop: '10px', fontSize: '12px', color: '#999999' }}>
            Krealabs - Agence de developpement web et mobile
          </p>
        </div>
      </div>
    </body>
  </html>
);
