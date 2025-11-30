# Configuration de l'API Waitlist avec Resend

Ce document explique comment configurer l'API de la waitlist qui utilise **Resend** pour l'envoi d'emails.

## Qu'est-ce que Resend ?

**Resend** (https://resend.com) est un service d'envoi d'emails transactionnels moderne et simple d'utilisation. Il est parfait pour :
- Emails de confirmation
- Notifications
- Newsletters
- Emails transactionnels

## Configuration de Resend

### 1. Créer un compte Resend

1. Allez sur https://resend.com
2. Créez un compte gratuit
3. Vérifiez votre email

### 2. Configurer votre domaine

Pour pouvoir envoyer des emails depuis `noreply@krealabs.fr`, vous devez configurer votre domaine :

1. Dans le dashboard Resend, allez dans **Domains**
2. Cliquez sur **Add Domain**
3. Entrez votre domaine : `krealabs.fr`
4. Suivez les instructions pour ajouter les enregistrements DNS :
   - **SPF** : Pour l'authentification
   - **DKIM** : Pour signer vos emails
   - **DMARC** : Pour la politique de livraison

#### Enregistrements DNS à ajouter

Resend vous donnera des enregistrements DNS à ajouter. Voici un exemple :

```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

Type: TXT
Name: resend._domainkey
Value: [Valeur fournie par Resend]

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@krealabs.fr
```

### 3. Obtenir votre clé API

1. Dans le dashboard Resend, allez dans **API Keys**
2. Cliquez sur **Create API Key**
3. Donnez-lui un nom (par exemple : "Krealabs Waitlist")
4. Sélectionnez les permissions (Full Access pour commencer)
5. Copiez la clé API (elle commence par `re_`)

### 4. Configurer les variables d'environnement

Créez ou modifiez le fichier `.env.local` à la racine du projet :

```env
RESEND_API_KEY=re_votre_cle_api_ici
```

**Important** : Ne commitez JAMAIS ce fichier dans Git. Il est déjà dans le `.gitignore`.

### 5. Plan gratuit Resend

Le plan gratuit de Resend offre :
- **100 emails/jour**
- **3,000 emails/mois**
- Support de tous les domaines vérifiés
- Accès complet à l'API

Pour la plupart des projets en démarrage, c'est largement suffisant !

## Structure de l'API Waitlist

### Endpoint API : `/api/waitlist`

**Méthode** : `POST`

**Body** :
```json
{
  "email": "utilisateur@example.com"
}
```

**Réponse (succès)** :
```json
{
  "success": true,
  "message": "Inscription réussie",
  "confirmationId": "email_id_resend"
}
```

**Réponse (erreur)** :
```json
{
  "error": "Format d'email invalide"
}
```

### Emails envoyés

Lorsqu'un utilisateur s'inscrit, **2 emails** sont envoyés :

#### 1. Email de confirmation à l'utilisateur
- **De** : `Krealabs <noreply@krealabs.fr>`
- **À** : L'adresse email de l'utilisateur
- **Sujet** : "Bienvenue sur la liste d'attente Krealabs"
- **Template** : `/emails/waitlist-confirmation-template.tsx`
- **Contenu** : Message de bienvenue avec ce qui attend l'utilisateur

#### 2. Email de notification à l'admin
- **De** : `Krealabs Waitlist <noreply@krealabs.fr>`
- **À** : `contact@krealabs.fr`
- **Sujet** : "Nouvelle inscription à la liste d'attente"
- **Template** : `/emails/waitlist-notification-template.tsx`
- **Contenu** : Notification avec l'email de l'inscrit

## Composants utilisant l'API

L'API waitlist est utilisée par 3 composants :

### 1. WaitlistHero (`/components/ui/waitlist-hero.tsx`)
- Page d'accueil principale
- Hero section avec animation confetti
- Formulaire d'inscription immersif

### 2. WaitlistBanner (`/components/blocks/waitlist-banner.tsx`)
- Banner sticky en bas de certaines pages
- Format compact avec CTA

### 3. NewsletterSignup (`/components/blocks/newsletter-signup.tsx`)
- Section newsletter sur la page blog
- Format carte avec gradient
- Utilisé dans `/app/blog/page.tsx`

## Tester l'API

### En développement

Pour tester sans envoyer de vrais emails, Resend propose un mode sandbox :

```typescript
// Dans route.ts, pour tester
const { data, error } = await resend.emails.send({
  from: "onboarding@resend.dev", // Email de test
  to: ["delivered@resend.dev"],  // Email de test
  subject: "Test",
  react: WaitlistConfirmationTemplate({ email })
});
```

### En production

Une fois votre domaine vérifié, changez simplement :
- `from: "Krealabs <noreply@krealabs.fr>"`
- `to: [email]` (l'email réel de l'utilisateur)

## Monitoring et Analytics

Dans le dashboard Resend, vous pouvez :
- Voir tous les emails envoyés
- Vérifier le statut de livraison
- Consulter les logs d'erreur
- Voir les statistiques d'ouverture (avec tracking activé)

## Personnalisation des templates

Les templates d'email sont des composants React situés dans `/emails/` :

- `waitlist-confirmation-template.tsx` - Email de confirmation utilisateur
- `waitlist-notification-template.tsx` - Email de notification admin

Vous pouvez les personnaliser en modifiant :
- Le HTML/JSX
- Les styles inline CSS
- Le contenu et la structure

## Sécurité

✅ **Bonnes pratiques déjà en place** :
- Validation de l'email côté serveur
- Regex pour format d'email
- Gestion d'erreurs complète
- Variables d'environnement pour la clé API
- Rate limiting recommandé (à ajouter si besoin)

## Limites et considérations

### Rate limiting
Actuellement, il n'y a pas de rate limiting. Pour éviter les abus, vous pouvez :
- Ajouter un rate limiter (ex: `next-rate-limit`)
- Utiliser un CAPTCHA (reCAPTCHA, hCaptcha)
- Stocker les emails dans une base de données pour éviter les doublons

### Stockage des emails
Actuellement, les emails ne sont **pas stockés** dans une base de données. Vous recevez juste une notification par email. Pour un vrai système de waitlist, vous devriez :
- Ajouter une base de données (Supabase, PostgreSQL, MongoDB, etc.)
- Stocker les emails avec timestamp
- Créer une interface admin pour gérer la waitlist

## Support

Pour toute question sur Resend :
- Documentation : https://resend.com/docs
- Support : https://resend.com/support
- Status : https://resend.com/status

## Prochaines étapes

1. ✅ Configuration du compte Resend
2. ✅ Vérification du domaine `krealabs.fr`
3. ✅ Ajout de la clé API dans `.env.local`
4. 🔄 Test de l'envoi d'emails
5. 📊 (Optionnel) Ajouter une base de données pour stocker les emails
6. 🔒 (Optionnel) Ajouter un rate limiter
7. 📈 (Optionnel) Ajouter des analytics d'ouverture

## Commandes utiles

```bash
# Installer Resend (déjà fait)
npm install resend

# Tester l'API en local
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Voir les logs du serveur
npm run dev
```

---

**Dernière mise à jour** : 2025-11-30
