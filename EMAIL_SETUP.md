# Configuration de l'envoi d'emails (SMTP via nodemailer)

Ce projet utilise **nodemailer** pour l'envoi d'emails directement
en SMTP — pas de service tiers HTTP (type Resend). Compatible avec
n'importe quel provider SMTP : OVH, Gmail, Brevo, AWS SES, Hostinger, etc.

## Variables d'environnement requises

Dans `.env.local` (dev) ou Vercel Environment Variables (prod) :

```bash
SMTP_HOST=ssl0.ovh.net           # Hôte SMTP du provider
SMTP_PORT=465                    # 465 (SSL) ou 587 (STARTTLS)
SMTP_USER=noreply@krealabs.fr    # Utilisateur SMTP (souvent l'email)
SMTP_PASS=votre_mot_de_passe     # Mot de passe ou App Password
SMTP_FROM="Krealabs <noreply@krealabs.fr>"  # Adresse expéditrice
CONTACT_EMAIL=contact@krealabs.fr           # Destinataire des formulaires
```

## Providers SMTP recommandés

### OVH Mail Pro (par défaut dans ce projet)

```bash
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_USER=noreply@krealabs.fr
SMTP_PASS=<mot de passe défini dans le manager OVH>
```

Doc OVH : https://docs.ovh.com/fr/emails/parametres-generiques-pour-configurer-mes-emails/

### Gmail (avec App Password)

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=vous@gmail.com
SMTP_PASS=<App Password généré dans Google Account Security>
```

Pas le mot de passe Gmail normal — il faut un App Password (2FA requise) :
https://myaccount.google.com/apppasswords

### Brevo (ex-Sendinblue) — gratuit jusqu'à 300/jour

```bash
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=<votre login Brevo>
SMTP_PASS=<clé SMTP générée dans Brevo > SMTP & API>
```

### AWS SES (haute volumétrie, pas cher)

```bash
SMTP_HOST=email-smtp.eu-west-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=<Access Key SMTP générée dans IAM>
SMTP_PASS=<Secret Key SMTP correspondant>
```

## Fichiers concernés

- `lib/mailer.ts` : utilitaire partagé (transporter nodemailer + helper `sendMail`)
- `app/api/contact/route.ts` : envoi des formulaires de contact
- `app/api/waitlist/route.ts` : confirmation + notification waitlist
- `app/api/admin/newsletter/route.ts` : newsletter admin (bulk avec pause)

## Templates

Les templates restent en React (`emails/*.tsx`) et sont rendus en HTML
via `@react-email/render` (déjà installé). Bonus : compatibles avec
n'importe quel client email (Gmail, Outlook, Apple Mail).

## Tester en dev

```bash
# 1. Configurer SMTP dans .env.local
# 2. Lancer le dev server : npm run dev
# 3. Tester l'API contact :

curl -X POST http://localhost:3000/api/contact \
  -F "name=Test" \
  -F "email=test@example.com" \
  -F "message=Test message"

# Réponse 200 si OK + email arrive sur CONTACT_EMAIL
```

## Migration depuis Resend (effectuée mai 2026)

- Variable `RESEND_API_KEY` peut être supprimée
- Templates `emails/*.tsx` restent valides
- Aucun changement sur les composants front
- Bulk newsletter : Resend supportait 100 destinataires par appel,
  nodemailer envoie en boucle avec pause 50ms pour respecter limites
  SMTP standard
