# Configuration de la base de données

## Option 1 : Supabase (Recommandé - Gratuit)

1. **Créer un compte Supabase**
   - Allez sur https://supabase.com
   - Créez un nouveau projet
   - Notez votre mot de passe de base de données

2. **Récupérer l'URL de connexion**
   - Dans votre projet Supabase, allez dans `Settings > Database`
   - Copiez la "Connection string" (URI format)
   - Remplacez `[YOUR-PASSWORD]` par votre mot de passe

3. **Mettre à jour .env.local**
   ```
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
   ```

4. **Générer et migrer la base de données**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## Option 2 : PostgreSQL Local

1. **Installer PostgreSQL**
   ```bash
   # macOS
   brew install postgresql@16
   brew services start postgresql@16

   # Créer la base de données
   createdb krealabs
   ```

2. **.env.local est déjà configuré** pour le local
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5432/krealabs?schema=public"
   ```

3. **Générer et migrer**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## Commandes utiles

- **Générer le client Prisma** : `npx prisma generate`
- **Pousser le schéma** : `npx prisma db push`
- **Ouvrir Prisma Studio** : `npx prisma studio`
- **Réinitialiser la BDD** : `npx prisma db push --force-reset`

## Structure de la base de données

### Table `waitlist_contacts`
- `id`: Identifiant unique
- `email`: Email du contact (unique)
- `source`: Source de l'inscription (website, blog, other)
- `createdAt`: Date d'inscription

### Table `contact_forms`
- `id`: Identifiant unique
- `requestType`: Type de demande (devis, contact, partenariat)
- `name`: Nom du contact
- `email`: Email
- `phone`: Téléphone (optionnel)
- `company`: Entreprise (optionnel)
- `pricingOption`: Budget (optionnel)
- `message`: Message
- `filesCount`: Nombre de fichiers joints
- `createdAt`: Date de soumission
