import * as React from "react";

interface WaitlistNotificationTemplateProps {
  email: string;
}

export const WaitlistNotificationTemplate: React.FC<WaitlistNotificationTemplateProps> = ({
  email,
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

        .emoji {
          font-size: 48px;
          margin-bottom: 15px;
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

        .info-card {
          background-color: #f9fafb;
          padding: 24px;
          border-radius: 8px;
          border-left: 4px solid #A543F1;
          margin: 20px 0;
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
          font-size: 18px;
          color: #1a1a1a;
          font-weight: 600;
        }

        .info-value a {
          color: #A543F1;
          text-decoration: none;
        }

        .timestamp {
          font-size: 14px;
          color: #666666;
          margin-top: 20px;
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
      `}</style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <div className="emoji">🔔</div>
          <h1>Nouvelle inscription à la waitlist</h1>
          <p>Un nouveau membre a rejoint la liste d'attente</p>
        </div>

        <div className="content">
          <div className="badge">Waitlist</div>

          <div className="info-card">
            <div className="info-title">Adresse email</div>
            <div className="info-value">
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>

          <p className="timestamp">
            📅 {new Date().toLocaleString('fr-FR', {
              dateStyle: 'full',
              timeStyle: 'short'
            })}
          </p>
        </div>

        <div className="footer">
          <p>
            Cette notification a été envoyée automatiquement depuis{' '}
            <a href="https://krealabs.fr">krealabs.fr</a>
          </p>
          <p style={{ marginTop: '10px', fontSize: '12px', color: '#999999' }}>
            Krealabs - Agence de développement web et mobile
          </p>
        </div>
      </div>
    </body>
  </html>
);
