# Configuration de l'envoi d'emails

Ce projet utilise [Resend](https://resend.com) pour l'envoi d'emails depuis le formulaire de contact.

## Etapes de configuration

### 1. Creer un compte Resend

1. Allez sur [resend.com](https://resend.com)
2. Creez un compte gratuit (100 emails/jour gratuits)

### 2. Obtenir une cle API

1. Connectez-vous a votre dashboard Resend
2. Allez dans "API Keys"
3. Creez une nouvelle cle API
4. Copiez la cle (elle ne sera affichee qu'une seule fois)

### 3. Configurer les variables d'environnement

1. Creez un fichier `.env.local` a la racine du projet
2. Ajoutez la cle API :

```bash
RESEND_API_KEY=re_votre_cle_api_ici
```

### 4. Verifier le domaine (optionnel mais recommande)

Pour utiliser une adresse email personnalisee (`noreply@krealabs.fr`), vous devez verifier votre domaine :

1. Dans le dashboard Resend, allez dans "Domains"
2. Ajoutez votre domaine `krealabs.fr`
3. Configurez les enregistrements DNS (MX, TXT, CNAME) selon les instructions
4. Attendez la verification (peut prendre quelques heures)

**Note:** Sans verification de domaine, vous pouvez utiliser `onboarding@resend.dev` comme expediteur pour les tests.

### 5. Tester l'envoi

1. Demarrez le serveur de developpement : `npm run dev`
2. Allez sur `/contact`
3. Remplissez et envoyez le formulaire
4. Verifiez la reception de l'email a `contact@krealabs.fr`

## Structure des fichiers

- `/app/api/contact/route.ts` - API endpoint pour traiter le formulaire
- `/emails/contact-template.tsx` - Template HTML de l'email
- `/app/contact/page.tsx` - Page du formulaire de contact

## Fonctionnalites

- ✅ Selection du type de demande (devis, contact, partenariat)
- ✅ Selection de la formule tarifaire (pour les devis)
- ✅ Upload de fichiers multiples
- ✅ Email au format HTML avec design moderne
- ✅ Pieces jointes incluses dans l'email
- ✅ Validation cote client et serveur
- ✅ Messages d'erreur et de succes

## Limites Resend (plan gratuit)

- 100 emails par jour
- 3 000 emails par mois
- Pieces jointes jusqu'a 40 MB par email

Pour des volumes plus importants, consultez les [plans Resend](https://resend.com/pricing).

## Personnalisation

### Modifier l'adresse de reception

Dans `/app/api/contact/route.ts`, ligne 72 :

```typescript
to: ["contact@krealabs.fr"], // Modifiez ici
```

### Modifier le template email

Editez `/emails/contact-template.tsx` pour personnaliser le design de l'email.

### Ajouter des champs au formulaire

1. Ajoutez le champ dans `/app/contact/page.tsx`
2. Mettez a jour l'interface dans `/app/api/contact/route.ts`
3. Ajoutez le champ dans le template email `/emails/contact-template.tsx`

## Deploiement

Sur Vercel, ajoutez la variable d'environnement :

1. Allez dans Project Settings > Environment Variables
2. Ajoutez `RESEND_API_KEY` avec votre cle
3. Redeployez le projet

## Support

En cas de probleme :
- [Documentation Resend](https://resend.com/docs)
- [Support Resend](https://resend.com/support)
