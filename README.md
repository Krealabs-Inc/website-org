# Kréalabs - Agence Web & Mobile

Site officiel de Kréalabs, agence de développement web et mobile basée à Rouen, spécialisée en React, Next.js et React Native.

## 🚀 Technologies

- **Framework**: Next.js 16 avec App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Email**: Resend
- **Deployment**: Vercel

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/Krealabs-Inc/website-org.git
cd website-org

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos valeurs

# Générer le client Prisma
npx prisma generate

# Créer les tables dans la base de données
npx prisma db push

# Lancer le serveur de développement
npm run dev
```

## 🔧 Configuration

### Variables d'environnement requises

Voir `.env.example` pour la liste complète. Les principales variables :

- `RESEND_API_KEY`: Clé API pour l'envoi d'emails
- `DATABASE_URL`: URL de connexion PostgreSQL
- `NEXT_PUBLIC_SUPABASE_URL`: URL publique Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Clé anonyme Supabase
- `ADMIN_TOKEN`: Token d'authentification admin

### Base de données

Le projet utilise Prisma avec PostgreSQL. Deux tables principales :

- `waitlist_contacts`: Inscriptions à la liste d'attente
- `contact_forms`: Soumissions de formulaires de contact

Pour plus de détails, voir `DATABASE_SETUP.md`.

## 📂 Structure du projet

```
krealabs/
├── app/                      # App Router Next.js
│   ├── admin/               # Dashboard administrateur
│   ├── api/                 # API Routes
│   ├── blog/                # Pages blog
│   ├── contact/             # Page contact
│   ├── notre-histoire/      # Page à propos
│   ├── pricing/             # Page tarifs
│   └── technologies/        # Pages technos
├── components/              # Composants réutilisables
│   ├── admin/              # Composants admin
│   ├── navigation/         # Navigation
│   └── ui/                 # UI components
├── emails/                  # Templates d'emails
├── lib/                     # Utilitaires
├── prisma/                  # Schéma Prisma
└── public/                  # Assets statiques
```

## 🎨 Features

### Site Public
- ✅ Page d'accueil avec animations
- ✅ Page tarifs avec 3 formules
- ✅ Pages technologies (React, Next.js, React Native)
- ✅ Page Notre Histoire
- ✅ Formulaire de contact avec upload de fichiers
- ✅ Liste d'attente (waitlist)
- ✅ Blog
- ✅ Mode sombre
- ✅ Responsive design

### Dashboard Admin
- ✅ Authentification par token
- ✅ Vue d'ensemble des contacts
- ✅ Export CSV des contacts
- ✅ Envoi de newsletters
- ✅ Filtres et recherche
- ✅ Statistiques en temps réel

## 🛠️ Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Linter ESLint
npx prisma studio    # Interface graphique BDD
npx prisma generate  # Générer le client Prisma
npx prisma db push   # Pousser le schéma vers la BDD
```

## 🔐 Admin

Accéder au dashboard admin : `/admin`

Authentification avec le token défini dans `ADMIN_TOKEN`.

Voir `ADMIN_GUIDE.md` pour la documentation complète.

## 📧 Emails

Le projet utilise Resend pour l'envoi d'emails avec des templates React personnalisés :

- Email de confirmation d'inscription waitlist
- Notification admin pour nouvelle inscription
- Notification admin pour nouveau formulaire de contact

Tous les emails utilisent le design système de l'agence (violet #A543F1, dark theme).

## 🚀 Déploiement

Le site est déployé automatiquement sur Vercel lors des push sur la branche `main`.

### Variables d'environnement Vercel

Ne pas oublier de configurer toutes les variables d'environnement dans les settings Vercel.

## 📝 Licence

Propriété de Kréalabs. Tous droits réservés.

## 👥 Contact

- **Email**: contact@krealabs.fr
- **Site**: https://krealabs.fr
- **Localisation**: Rouen, France

---

Développé avec ❤️ par Kréalabs
