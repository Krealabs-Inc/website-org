# Guide d'utilisation Admin

## Accès au Dashboard Admin

Le dashboard admin est accessible à l'adresse : **`/admin`**

### Authentification

Pour accéder au dashboard, vous devez vous authentifier avec le token admin défini dans `.env.local` :

```
ADMIN_TOKEN=krealabs_admin_2024_secure_token
```

**⚠️ Important :** Changez ce token par une valeur sécurisée et unique en production !

## Fonctionnalités

### 📊 Vue d'ensemble

Le dashboard affiche des statistiques en temps réel :
- **Total Contacts** : Nombre total de contacts (waitlist + formulaires)
- **Waitlist** : Nombre d'inscriptions à la liste d'attente
- **Formulaires** : Nombre de formulaires de contact soumis

### 📥 Export de contacts

Trois options d'export sont disponibles au format CSV :

1. **Exporter tout** : Tous les contacts (waitlist + formulaires)
2. **Exporter Waitlist** : Uniquement les inscriptions waitlist
3. **Exporter Formulaires** : Uniquement les formulaires de contact

Les fichiers CSV sont téléchargés automatiquement avec la date du jour.

### 📧 Envoi de Newsletter

Cliquez sur "Envoyer Newsletter" pour afficher le formulaire d'envoi :

1. **Sélectionner les destinataires** :
   - Tous : Envoie à tous les contacts
   - Waitlist uniquement : Envoie uniquement aux inscrits waitlist
   - Formulaires uniquement : Envoie uniquement aux contacts du formulaire

2. **Remplir le sujet** : Le sujet de l'email

3. **Remplir le contenu HTML** : Le corps de l'email en HTML

4. **Envoyer** : L'envoi se fait par lots de 100 emails via Resend

### 🔍 Filtrage et recherche

- **Filtres rapides** : Tous / Waitlist / Formulaires
- **Recherche** : Recherchez par email, nom, entreprise

### 📋 Visualisation des contacts

#### Contacts Waitlist
Tableau avec :
- Email
- Source (website, blog, other)
- Date d'inscription

#### Formulaires de Contact
Cards détaillées avec :
- Type de demande (devis, contact, partenariat)
- Nom, email, téléphone, entreprise
- Budget sélectionné
- Message complet
- Nombre de fichiers joints
- Date de soumission

## API Endpoints

### GET `/api/admin/contacts`

Récupère tous les contacts.

**Headers requis :**
```
Authorization: Bearer <ADMIN_TOKEN>
```

**Query params :**
- `type` : `all` | `waitlist` | `forms` (défaut: `all`)
- `format` : `json` | `csv` (défaut: `json`)

**Exemple :**
```bash
curl -H "Authorization: Bearer krealabs_admin_2024_secure_token" \
  "http://localhost:3000/api/admin/contacts?type=all&format=json"
```

**Réponse (JSON) :**
```json
{
  "success": true,
  "data": {
    "waitlistContacts": [...],
    "contactForms": [...],
    "stats": {
      "totalWaitlist": 10,
      "totalForms": 5,
      "total": 15
    }
  }
}
```

### POST `/api/admin/newsletter`

Envoie une newsletter aux contacts.

**Headers requis :**
```
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json
```

**Body :**
```json
{
  "subject": "Sujet de la newsletter",
  "htmlContent": "<h1>Contenu HTML</h1><p>Votre message...</p>",
  "recipients": "all" // ou "waitlist" ou "forms"
}
```

**Exemple :**
```bash
curl -X POST \
  -H "Authorization: Bearer krealabs_admin_2024_secure_token" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Nouveautés Kréalabs",
    "htmlContent": "<h1>Bonjour!</h1><p>Découvrez nos nouveautés...</p>",
    "recipients": "all"
  }' \
  "http://localhost:3000/api/admin/newsletter"
```

**Réponse :**
```json
{
  "success": true,
  "message": "Newsletter envoyée à 15 sur 15 destinataires",
  "details": {
    "total": 15,
    "sent": 15,
    "failed": 0,
    "batches": 1
  }
}
```

## Sécurité

### En développement

Le token actuel (`krealabs_admin_2024_secure_token`) est suffisant pour le développement local.

### En production

**⚠️ Avant de déployer en production :**

1. **Générer un token sécurisé** :
   ```bash
   openssl rand -base64 32
   ```

2. **Mettre à jour la variable d'environnement** :
   ```
   ADMIN_TOKEN=<votre_nouveau_token_sécurisé>
   ```

3. **Ajouter `.env.local` au `.gitignore`** (déjà fait)

4. **Configurer la variable sur votre plateforme de déploiement** (Vercel, etc.)

### Recommandations additionnelles

Pour une sécurité accrue en production, envisagez :

1. **Authentification OAuth** : Remplacer le token simple par OAuth (Google, GitHub)
2. **Rate limiting** : Limiter le nombre de requêtes API
3. **Audit logs** : Logger toutes les actions admin
4. **IP whitelisting** : Restreindre l'accès à certaines IP
5. **2FA** : Ajouter une authentification à deux facteurs

## Support

Pour toute question ou problème :
- Email : contact@krealabs.fr
- Documentation : DATABASE_SETUP.md
