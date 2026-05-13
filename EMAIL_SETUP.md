# Configuration emails — Brevo SMTP (outbound) + ProtonMail (inbound)

## Architecture choisie

```
Visiteur envoie formulaire
         │
         ▼
 Vercel /api/contact (Next.js)
         │
         ▼
 Brevo SMTP (smtp-relay.brevo.com:587)
         │
         ▼  Email envoyé depuis noreply@krealabs.fr
         │  (DKIM/SPF valides via Brevo)
         ▼
 Inbox contact@krealabs.fr  ← ProtonMail (MX records OVH pointent vers Proton)
```

**Pourquoi cette archi** : ProtonMail n'expose pas de SMTP cloud
(seulement Bridge desktop). Brevo gère l'outbound (envoi depuis le code),
ProtonMail garde l'inbound (réception). Tu réponds depuis ProtonMail
comme d'habitude.

---

## Setup Brevo (5 min)

### 1. Créer un compte Brevo

https://www.brevo.com → "Sign up free"
Pas de carte bancaire. Free tier : 300 emails/jour à vie.

### 2. Vérifier le domaine `krealabs.fr`

Dans Brevo : `Senders & IP > Domains > Add a domain`.

Brevo te donne 3 enregistrements DNS à ajouter dans **OVH Zone DNS** :

| Type | Nom | Valeur (exemple) |
|---|---|---|
| TXT | `mail._domainkey.krealabs.fr` | `k=rsa; p=MIGfMA0...` (DKIM Brevo) |
| TXT | `krealabs.fr` | `brevo-code:XXXXX` (verification token) |
| TXT | `_dmarc.krealabs.fr` | `v=DMARC1; p=none; rua=mailto:...` (DMARC) |

**Dans OVH** :
1. Manager OVH → Web Cloud → Domaines → `krealabs.fr`
2. Onglet "Zone DNS" → "Ajouter une entrée" → TXT
3. Ajouter les 3 records ci-dessus
4. Attendre 5-15 min la propagation
5. Retour Brevo → "Authenticate this domain" → ✓ Vert sur les 3

⚠️ Si ton SPF existant (pour ProtonMail) doit cohabiter avec celui de
Brevo, **mergeles** au lieu d'avoir 2 records SPF (Google rejette).
Format SPF combiné typique :
```
v=spf1 include:_spf.protonmail.ch include:spf.brevo.com ~all
```

### 3. Générer la clé SMTP

Dans Brevo : `SMTP & API > SMTP > Generate a new SMTP key`.

Copie :
- **SMTP Login** (en haut de la page) — souvent ton email Brevo
- **SMTP Key** générée — c'est le mot de passe

### 4. Variables d'env Vercel

Dans **Vercel Dashboard > Project > Settings > Environment Variables** :

```bash
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=<ton login SMTP Brevo>
SMTP_PASS=<la clé SMTP générée>
SMTP_FROM=Krealabs <noreply@krealabs.fr>
CONTACT_EMAIL=contact@krealabs.fr
```

Variables à appliquer sur **Production, Preview, Development**.

Tu peux supprimer `RESEND_API_KEY` qui ne sert plus.

### 5. (Optionnel) Variables d'env local

Pour tester en `npm run dev`, créer `.env.local` (gitignored) avec
les mêmes valeurs.

### 6. Tester

```bash
curl -X POST https://krealabs.fr/api/contact \
  -F "name=Test" \
  -F "email=ton-email-perso@example.com" \
  -F "message=Test SMTP Brevo"
```

→ Devrait retourner `{success: true}`.
→ Email arrive sur `contact@krealabs.fr` (= ProtonMail) dans la minute.
→ Tu peux répondre directement, le `Reply-To: ton-email-perso@example.com`
   est déjà set, ta réponse part vers la bonne adresse.

---

## Templates email

Les templates restent en React (`emails/*.tsx`) et sont rendus en HTML
via `@react-email/render` (déjà installé). Compatible Gmail, Outlook,
Apple Mail, ProtonMail.

Fichiers :
- `emails/contact-template.tsx`
- `emails/waitlist-confirmation-template.tsx`
- `emails/waitlist-notification-template.tsx`

---

## Code utilisateur

Tout passe par `lib/mailer.ts` :

```ts
import { sendMail } from "@/lib/mailer";

await sendMail({
  to: "destinataire@example.com",
  subject: "Hello",
  react: <MonTemplate {...props} />,
  replyTo: "user@example.com",
  attachments: [{ filename: "doc.pdf", content: bufferBuffer }],
});
```

Routes qui l'utilisent :
- `app/api/contact/route.ts` — formulaire de contact
- `app/api/waitlist/route.ts` — inscription waitlist
- `app/api/admin/newsletter/route.ts` — newsletter admin

---

## Migration depuis Resend (effectuée mai 2026)

- `RESEND_API_KEY` supprimable de Vercel
- Templates `emails/*.tsx` inchangés
- Aucun changement front
- `package.json` : `resend` retiré, `nodemailer` ajouté

---

## Debugging

Si emails n'arrivent pas en prod :

1. **Vercel logs** : Vercel Dashboard > Deployments > Latest > Functions > /api/contact
   → cherche "SMTP send error" ou "SMTP verify failed"
2. **Brevo dashboard** : Logs > Transactional > voir si l'email est listé
3. **Spam** : check spam ProtonMail (DKIM/SPF mal config = spam)
4. **DNS propagation** : `dig TXT krealabs.fr` doit montrer les TXT Brevo
5. **Limites free tier** : 300/jour. Dépassé = emails bloqués jusqu'à
   minuit UTC.
