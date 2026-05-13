# Configuration emails — Resend (envoi) + ProtonMail (réception)

## Architecture choisie

```
Visiteur soumet formulaire
         │
         ▼
 Vercel /api/contact (Next.js)
         │ Save form to Prisma DB
         │
         ▼ Resend SDK (HTTPS)
 Resend (send.krealabs.fr — SPF + DKIM vérifiés)
         │
         ├──→ Email admin → contact@krealabs.fr
         │       From: Krealabs <noreply@send.krealabs.fr>
         │       Reply-To: email du visiteur
         │       Reçu sur ProtonMail (MX OVH du domaine racine)
         │       → Tu réponds depuis ProtonMail, ça part vers le visiteur
         │
         └──→ Auto-reply visiteur → email du visiteur
                 From: Krealabs <noreply@send.krealabs.fr>
                 Reply-To: contact@krealabs.fr
                 Template React brandé Krealabs
```

**Pourquoi Resend** : emails 100% brandés Krealabs (logo, violet #8F99ED,
typo, layout), sender pro `@send.krealabs.fr`, deliverability solide,
templates React maintenus côté codebase.

**Pourquoi `send.krealabs.fr`** : sous-domaine d'envoi isolé qui ne
touche pas aux MX records ProtonMail sur le domaine racine. Les SPF
et DKIM Resend vivent sur le sous-domaine, ProtonMail garde son SPF
sur la racine. Zéro merge, zéro conflit.

---

## Setup une fois pour toutes

### 1. Compte Resend + domaine

1. Créer un compte sur https://resend.com
2. Domains > Add Domain → `send.krealabs.fr` → **Enable Sending uniquement**
3. Copier les 3 records DNS (SPF TXT + DKIM TXT + bounces MX) dans la
   zone OVH du sous-domaine `send.krealabs.fr`
4. Attendre le statut **Verified** (10-60 min)

### 2. API Key

Resend Dashboard > API Keys > Create API Key → `krealabs-prod`

Garder la clé en sécurité (visible une seule fois, format `re_...`).

### 3. Variables d'env

**Local (.env.local)** :

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=Krealabs <noreply@send.krealabs.fr>
CONTACT_EMAIL=contact@krealabs.fr
```

**Vercel** (Project Settings > Environment Variables, Production + Preview + Development) :

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=Krealabs <noreply@send.krealabs.fr>
CONTACT_EMAIL=contact@krealabs.fr
```

---

## Templates React

4 templates dans `emails/`, tous brandés Krealabs (#8F99ED, dark theme,
fonts Inter + Space Grotesk) :

| Template                              | Usage                                    |
|---------------------------------------|------------------------------------------|
| `contact-template.tsx`                | Notif admin : nouveau contact            |
| `contact-autoreply-template.tsx`      | Auto-reply visiteur : demande reçue      |
| `waitlist-notification-template.tsx`  | Notif admin : nouvelle inscription       |
| `waitlist-confirmation-template.tsx`  | Bienvenue visiteur : sur la waitlist     |

Les templates sont des composants React standard — modifiables comme
n'importe quel composant du site. Resend les rend en HTML côté serveur
au moment de l'envoi.

---

## Code utilisateur

Tout passe par `lib/mailer.tsx` :

```ts
import { sendContactEmails, sendWaitlistEmails } from "@/lib/mailer";

// Formulaire de contact
await sendContactEmails({
  requestType: "devis",
  name: "Jean Dupont",
  email: "jean@example.com",
  phone: "0612345678",
  company: "Acme SAS",
  pricingOption: "site-web",
  message: "...",
  filesCount: 0,
});

// Inscription waitlist
await sendWaitlistEmails("jean@example.com");
```

Comportement :
- **Notif admin** est critique → throw si Resend échoue → 500 côté API
- **Auto-reply visiteur** est best-effort → log mais ne fait pas échouer

Routes :
- `app/api/contact/route.ts` — formulaire de contact
- `app/api/waitlist/route.ts` — inscription waitlist

---

## Limitations Resend free tier

- **3000 emails / mois** — largement suffisant pour le contact form
- **100 emails / jour** — idem
- **1 domaine vérifié** — `send.krealabs.fr` (suffit)
- Pour des newsletters bulk plus tard → passer en plan payant ou
  brancher Resend Audiences/Broadcast

---

## Debugging

Si emails n'arrivent pas en prod :

1. **Vercel logs** : Dashboard > Deployments > Latest > Functions >
   `/api/contact` → cherche `Resend admin email failed` ou `Resend admin error`.
2. **Resend Dashboard > Logs** : toutes les requêtes API y sont
   tracées (Delivered, Bounced, Complained).
3. **DNS** : Resend > Domains > send.krealabs.fr → vérifier "Verified".
   Si "Pending", les records DNS OVH ne sont pas encore propagés.
4. **API Key** : vérifier que `RESEND_API_KEY` est bien set sur
   Production dans Vercel (pas seulement Preview).
5. **Spam ProtonMail** : check le dossier spam.

---

## Changer le sender

Pour passer de `noreply@send.krealabs.fr` à autre chose :

```bash
# Vercel env
EMAIL_FROM=Romain de Krealabs <romain@send.krealabs.fr>
```

Tout email avant le `@` est accepté (pas besoin de créer une boîte —
Resend envoie depuis n'importe quel local-part du domaine vérifié).
