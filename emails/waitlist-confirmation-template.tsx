import * as React from "react";

interface WaitlistConfirmationTemplateProps {
  email: string;
}

export const WaitlistConfirmationTemplate: React.FC<WaitlistConfirmationTemplateProps> = ({
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
          padding: 50px 30px;
          text-align: center;
        }

        .header h1 {
          margin: 0;
          color: #ffffff;
          font-size: 32px;
          font-weight: 700;
        }

        .header p {
          margin: 15px 0 0;
          color: rgba(255, 255, 255, 0.95);
          font-size: 18px;
        }

        .emoji {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .content {
          padding: 50px 40px;
        }

        .greeting {
          font-size: 20px;
          color: #1a1a1a;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .text {
          font-size: 16px;
          color: #4b5563;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .highlight-box {
          background-color: #f9fafb;
          padding: 24px;
          border-radius: 8px;
          border-left: 4px solid #A543F1;
          margin: 30px 0;
        }

        .highlight-box h3 {
          margin: 0 0 15px 0;
          color: #A543F1;
          font-size: 18px;
          font-weight: 600;
        }

        .highlight-box ul {
          margin: 0;
          padding-left: 20px;
          color: #4b5563;
        }

        .highlight-box li {
          margin-bottom: 10px;
          line-height: 1.6;
        }

        .cta-button {
          display: inline-block;
          padding: 16px 32px;
          background: linear-gradient(135deg, #A543F1 0%, #c5cbf9 100%);
          color: #ffffff;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          margin-top: 20px;
          transition: transform 0.2s;
        }

        .cta-button:hover {
          transform: translateY(-2px);
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
          line-height: 1.6;
        }

        .footer a {
          color: #A543F1;
          text-decoration: none;
          font-weight: 600;
        }

        .social-links {
          margin-top: 20px;
        }

        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: #A543F1;
          text-decoration: none;
          font-size: 14px;
        }
      `}</style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <div className="emoji">🎉</div>
          <h1>Bienvenue sur notre liste d'attente !</h1>
          <p>Merci de rejoindre l'aventure Krealabs</p>
        </div>

        <div className="content">
          <p className="greeting">Bonjour,</p>

          <p className="text">
            Nous sommes ravis de vous compter parmi les premiers à être informés de nos actualités,
            nouveautés et offres exclusives !
          </p>

          <p className="text">
            Votre inscription a bien été prise en compte avec l'adresse : <strong>{email}</strong>
          </p>

          <div className="highlight-box">
            <h3>Ce qui vous attend :</h3>
            <ul>
              <li>Accès prioritaire à nos nouvelles fonctionnalités</li>
              <li>Tutoriels et ressources exclusifs sur le développement web et mobile</li>
              <li>Offres spéciales réservées aux membres de la waitlist</li>
              <li>Conseils d'experts et meilleures pratiques</li>
            </ul>
          </div>

          <p className="text">
            En attendant, n'hésitez pas à explorer notre site et découvrir nos services :
          </p>

          <center>
            <a href="https://krealabs.fr" className="cta-button">
              Découvrir Krealabs
            </a>
          </center>

          <p className="text" style={{ marginTop: '30px' }}>
            Vous avez une question ou un projet en tête ? Notre équipe est à votre écoute !
          </p>
        </div>

        <div className="footer">
          <p>
            <strong>Krealabs</strong> - Agence de développement web et mobile
          </p>
          <p style={{ marginTop: '10px' }}>
            Clermont-Ferrand, France
          </p>
          <p style={{ marginTop: '15px' }}>
            <a href="mailto:contact@krealabs.fr">contact@krealabs.fr</a>
          </p>
          <div className="social-links">
            <a href="https://krealabs.fr">Site web</a>
            <span style={{ color: '#e5e7eb' }}>|</span>
            <a href="https://krealabs.fr/blog">Blog</a>
            <span style={{ color: '#e5e7eb' }}>|</span>
            <a href="https://krealabs.fr/services">Services</a>
          </div>
          <p style={{ marginTop: '20px', fontSize: '12px', color: '#999999' }}>
            Vous recevez cet email car vous vous êtes inscrit à notre liste d'attente.
          </p>
        </div>
      </div>
    </body>
  </html>
);
