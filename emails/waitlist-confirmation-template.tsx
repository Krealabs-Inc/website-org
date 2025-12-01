import * as React from "react";
import Image from "next/image";

interface WaitlistConfirmationTemplateProps {
  email: string;
}

export const WaitlistConfirmationTemplate: React.FC<WaitlistConfirmationTemplateProps> = ({
  email,
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
          padding: 48px 40px;
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
          width: 64px;
          height: 64px;
          margin: 0 auto 20px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .logo-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .header h1 {
          position: relative;
          z-index: 1;
          margin: 0;
          color: #ffffff;
          font-size: 28px;
          font-weight: 700;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.5px;
        }

        .header p {
          position: relative;
          z-index: 1;
          margin: 12px 0 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
        }

        .badge {
          position: relative;
          z-index: 1;
          display: inline-block;
          padding: 8px 16px;
          background-color: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 100px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
          backdrop-filter: blur(10px);
        }

        .content {
          padding: 40px;
          color: rgba(255, 255, 255, 0.7);
        }

        .greeting {
          font-size: 18px;
          color: #ffffff;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .text {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .email-highlight {
          color: #A543F1;
          font-weight: 600;
        }

        .feature-box {
          background: linear-gradient(135deg, rgba(165, 67, 241, 0.1) 0%, rgba(197, 203, 249, 0.05) 100%);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid rgba(165, 67, 241, 0.2);
          margin: 28px 0;
        }

        .feature-box h3 {
          margin: 0 0 16px 0;
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
          font-family: 'Space Grotesk', sans-serif;
        }

        .feature-box ul {
          margin: 0;
          padding-left: 20px;
          color: rgba(255, 255, 255, 0.7);
        }

        .feature-box li {
          margin-bottom: 10px;
          line-height: 1.6;
        }

        .cta-button {
          display: inline-block;
          padding: 14px 32px;
          background: #A543F1;
          color: #ffffff;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          margin-top: 24px;
          transition: all 0.2s;
        }

        .cta-button:hover {
          background: #8b35d1;
          transform: translateY(-1px);
        }

        .divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 32px 0;
        }

        .footer {
          background-color: #030303;
          padding: 32px 40px;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .footer p {
          margin: 8px 0;
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
          line-height: 1.6;
        }

        .footer a {
          color: #A543F1;
          text-decoration: none;
          font-weight: 500;
        }

        .footer a:hover {
          color: #c5cbf9;
        }

        .footer-links {
          margin-top: 20px;
        }

        .footer-links a {
          margin: 0 12px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 13px;
        }

        .footer-links a:hover {
          color: #A543F1;
        }

        .separator {
          color: rgba(255, 255, 255, 0.2);
          margin: 0 8px;
        }
      `}</style>
    </head>
    <body>
      <div className="email-wrapper">
        <div className="container">
          <div className="header">
            <div className="logo">
              <Image src="/logo.png" alt="Kréalabs Logo" className="w-full h-auto object-contain" width={256} height={256} />
            </div>
            <div className="badge">✨ Bienvenue</div>
            <h1>Vous êtes sur la liste !</h1>
            <p>Merci de rejoindre l'aventure Kréalabs</p>
          </div>

          <div className="content">
            <p className="greeting">Bonjour,</p>

            <p className="text">
              Nous sommes ravis de vous compter parmi les premiers à être informés de nos actualités,
              nouveautés et offres exclusives !
            </p>

            <p className="text">
              Votre inscription a bien été prise en compte avec l'adresse : <span className="email-highlight">{email}</span>
            </p>

            <div className="feature-box">
              <h3>Ce qui vous attend :</h3>
              <ul>
                <li>🚀 Accès prioritaire à nos nouvelles fonctionnalités</li>
                <li>📚 Tutoriels et ressources exclusifs sur le développement web et mobile</li>
                <li>🎁 Offres spéciales réservées aux membres de la waitlist</li>
                <li>💡 Conseils d'experts et meilleures pratiques</li>
              </ul>
            </div>

            <p className="text">
              En attendant, n'hésitez pas à explorer notre site et découvrir nos services :
            </p>

            <center>
              <a href="https://krealabs.fr" className="cta-button">
                Découvrir Kréalabs →
              </a>
            </center>

            <div className="divider"></div>

            <p className="text" style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)' }}>
              Vous avez une question ou un projet en tête ? Notre équipe est à votre écoute !
            </p>
          </div>

          <div className="footer">
            <div className="footer-logo">Kréalabs</div>
            <p>Agence de développement web et mobile</p>
            <p>Rouen, France</p>
            <p style={{ marginTop: '16px' }}>
              <a href="mailto:contact@krealabs.fr">contact@krealabs.fr</a>
            </p>
            <div className="footer-links">
              <a href="https://krealabs.fr">Site web</a>
              <span className="separator">•</span>
              <a href="https://krealabs.fr/blog">Blog</a>
              <span className="separator">•</span>
              <a href="https://krealabs.fr/services">Services</a>
            </div>
            <p style={{ marginTop: '24px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.3)' }}>
              Vous recevez cet email car vous vous êtes inscrit à notre liste d'attente.
            </p>
          </div>
        </div>
      </div>
    </body>
  </html>
);
