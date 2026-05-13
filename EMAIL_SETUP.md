# Configuration emails — Formsubmit (zéro setup) + ProtonMail

## Architecture choisie

```
Visiteur soumet formulaire
         │
         ▼
 Vercel /api/contact (Next.js)
         │ Save form to Prisma DB
         │
         ▼ POST JSON
 Formsubmit (https://formsubmit.co/ajax/contact@krealabs.fr)
         │
         ├──→ Email à contact@krealabs.fr (= ProtonMail via MX OVH)
         │       Reply-To = email du visiteur
         │       Tu réponds depuis ProtonMail comme d'habitude
         │
         └──→ Auto-reply au visiteur (champ _autoresponse)
                 "Bonjour {Name}, votre demande est bien reçue..."
                 Le visiteur sait qu'on a bien capté son message
```

**Pourquoi Formsubmit** : aucune autre solution n'offre l'auto-reply
visiteur sans configuration DNS. Resend free tier impose la
vérification du domaine pour envoyer à autre chose que l'email du
propriétaire du compte. Brevo demande SPF/DKIM. Formsubmit gère tout
côté serveur, on n'a qu'à POST des données.

---

## Setup en 2 minutes

### 1. Variables d'env

Dans Vercel Dashboard > Project Settings > Environment Variables
(Production + Preview + Development) :

```bash
CONTACT_EMAIL=contact@krealabs.fr
```

C'est tout. Aucune API key requise.

### 2. Activation Formsubmit (première fois uniquement)

Au premier formulaire soumis depuis le site (en prod ou en dev),
Formsubmit envoie un email d'activation à `contact@krealabs.fr`.

1. Soumettre une fois le formulaire `/contact` (avec un email réel)
2. Ouvrir ta boîte ProtonMail (contact@krealabs.fr)
3. Tu reçois un email Formsubmit avec un bouton "Activate"
4. Cliquer → c'est activé pour toujours

Tous les envois suivants arrivent directement, sans nouvelle étape.

---

## Que reçoit le visiteur

Auto-reply texte plain envoyé immédiatement depuis Formsubmit :

```
Bonjour {Nom},

Nous avons bien reçu votre demande de devis et nous l'étudions
dès maintenant.

Vous recevrez une réponse personnalisée sous 24 heures ouvrées
à l'adresse {son email}.

En attendant, n'hésitez pas à explorer notre travail :
  • Offre WordPress : https://krealabs.fr/services/wordpress
  • Tous nos services : https://krealabs.fr/services
  • L'équipe : https://krealabs.fr/equipe

Une question urgente ? Écrivez-nous directement à contact@krealabs.fr.

À très vite,
L'équipe Krealabs
https://krealabs.fr
```

L'email apparaît dans la boîte du visiteur avec un sender Formsubmit
(`noreply@formsubmit.co`) mais avec Reply-To pointant sur
`contact@krealabs.fr`.

## Que tu reçois sur ProtonMail

Email structuré (template `table`) avec toutes les infos du formulaire :

```
Sujet : Demande de devis — Jean Dupont

| Champ        | Valeur                                     |
|--------------|--------------------------------------------|
| name         | Jean Dupont                                |
| email        | jean@entreprise.fr                         |
| telephone    | 06 12 34 56 78                             |
| entreprise   | Acme SAS                                   |
| type_demande | Demande de devis                           |
| type_projet  | Site web                                   |
| message      | Bonjour, nous cherchons une agence pour... |
```

**Reply-To = jean@entreprise.fr** → quand tu réponds dans ProtonMail,
ta réponse part directement vers le visiteur.

---

## Limitations

- **Pas de pièces jointes** sur le free tier Formsubmit. Si le visiteur
  veut envoyer un brief / maquettes, il le fait par mail après ta première
  réponse (mentionné dans le placeholder du formulaire).
- **1000-2000 submissions / mois** sur free (largement suffisant pour
  une agence).
- Footer "Powered by Formsubmit" en bas de l'email visiteur.
- Sender visible = `noreply@formsubmit.co` (Reply-To corrigé sur ton domaine).

---

## Code utilisateur

Tout passe par `lib/mailer.ts > sendForm()` :

```ts
import { sendForm } from "@/lib/mailer";

await sendForm({
  fields: {
    subject: "Nouveau message",
    name: "Jean Dupont",
    email: "jean@example.com",
    message: "...",
    // tout autre champ custom sera ajouté à l'email
  },
  autoresponse: "Bonjour Jean, ...",  // optionnel
});
```

Routes qui l'utilisent :
- `app/api/contact/route.ts` — formulaire de contact + auto-reply
- `app/api/waitlist/route.ts` — inscription waitlist + auto-reply

`app/api/admin/newsletter/route.ts` est désactivé (501) car Formsubmit
ne gère pas le bulk vers des destinataires arbitraires.

---

## Debugging

Si emails n'arrivent pas en prod :

1. **Vérifier l'activation** : as-tu cliqué le bouton "Activate" dans
   le premier email Formsubmit ? Si pas, tous les envois sont en attente.
2. **Vercel logs** : Dashboard > Deployments > Latest > Functions >
   `/api/contact` → cherche `Formsubmit error`.
3. **Spam ProtonMail** : check le dossier spam (improbable mais bon).
4. **Quota** : Formsubmit limite à ~1000-2000/mois. Au-delà, les envois
   sont bloqués jusqu'au mois suivant. Pour augmenter, upgrade payant
   ou switcher vers Resend + domaine vérifié.

---

## Si tu veux changer de service plus tard

L'abstraction `sendForm()` dans `lib/mailer.ts` peut être remplacée
sans toucher au reste du code. Options pour upgrade futur :

- **Resend** + domaine vérifié → emails depuis `noreply@krealabs.fr`,
  meilleure deliverability, statistiques. Nécessite 3 DNS records.
- **Brevo** + domaine vérifié → idem, free tier 300/jour.
- **AWS SES** + domaine vérifié → haute volumétrie, ~0.10$ / 1000.

Tous compatibles avec l'API actuelle, juste remplacer le corps de
`sendForm()`.
