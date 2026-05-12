# Audit & Optimisation Waitlist - Krealabs

## 📊 État actuel

### Points de collecte identifiés

| # | Localisation | Composant | Fichier | Status | Problèmes |
|---|--------------|-----------|---------|--------|-----------|
| 1 | Page d'accueil (Hero) | `WaitlistHero` | `/app/page.tsx` | ✅ Fonctionnel | Design à harmoniser |
| 2 | Page d'accueil (Banner) | `WaitlistBanner` | `/app/page.tsx` | ✅ Fonctionnel | Doublon avec Hero |
| 3 | Footer global | `WaitlistBanner` | `/components/blocks/waitlist-banner.tsx` | ✅ Fonctionnel | Partout même si pas pertinent |
| 4 | Blog footer | `NewsletterSignup` | `/app/blog/page.tsx` | ⚠️ Séparé | Pas lié à waitlist API |

### API actuelle

**Endpoint** : `POST /api/waitlist`

**Fichier** : `/app/api/waitlist/route.ts`

**Fonctionnalités** :
- ✅ Validation email (regex)
- ✅ Vérification doublons (unique constraint)
- ✅ Enregistrement DB (Prisma)
- ✅ Email confirmation user (Resend)
- ✅ Email notification admin (Resend)
- ✅ Gestion erreurs

**Schéma DB** :
```prisma
model WaitlistContact {
  id        String   @id @default(cuid())
  email     String   @unique
  source    String   @default("website")
  createdAt DateTime @default(now())
}
```

---

## ❌ Problèmes identifiés

### 1. Duplication et confusion

**Problème** : Plusieurs composants font la même chose
- `WaitlistHero` : Inscription waitlist
- `WaitlistBanner` : Inscription waitlist
- `NewsletterSignup` : Newsletter (séparée)

**Impact** :
- Expérience utilisateur confuse
- Code dupliqué
- Maintenance difficile

### 2. Positionnement incohérent

**Problème** : Waitlist demandée plusieurs fois sur la même page
- Hero section (haut de page)
- Banner section (milieu de page)
- Footer (bas de page)

**Impact** :
- Redondant et agressif
- Dilue l'impact du CTA principal

### 3. Newsletter vs Waitlist

**Problème** : Confusion entre deux concepts
- **Waitlist** : Liste d'attente pour un produit/service à venir
- **Newsletter** : Abonnement aux actualités

**Actuellement** : Les deux termes sont utilisés de façon interchangeable

**Impact** :
- Message marketing flou
- Base de données confondue

### 4. Source tracking incomplet

**Problème** : Le champ `source` est toujours "website"

**Impact** :
- Impossible de savoir d'où vient l'inscription
- Pas de tracking marketing
- Pas d'A/B testing possible

### 5. Pas de confirmation visuelle cohérente

**Problème** : Chaque composant gère son propre état success/error

**Impact** :
- UX incohérente
- Code dupliqué

---

## ✅ Solutions proposées

### Solution 1 : Clarifier la stratégie

**Décision à prendre** : Qu'est-ce que Krealabs propose exactement ?

#### Option A : Waitlist uniquement
- Pour un produit/service spécifique à venir
- Ex: "Soyez les premiers informés du lancement de notre plateforme"

#### Option B : Newsletter uniquement
- Pour recevoir des actualités, tips, articles
- Ex: "Recevez nos meilleurs conseils dev chaque semaine"

#### Option C : Les deux (recommandé)
- **Newsletter** : Contenu régulier (blog, tips, cas clients)
- **Waitlist** : Produits spécifiques (templates, outils, early access)

### Solution 2 : Architecture unifiée

```
/components/email-collection/
├── newsletter-form.tsx         # Formulaire newsletter
├── waitlist-form.tsx           # Formulaire waitlist
├── email-form-base.tsx         # Base commune
└── use-email-submit.ts         # Hook partagé

/app/api/
├── newsletter/route.ts         # POST newsletter
├── waitlist/route.ts           # POST waitlist (existant)
└── email-preferences/route.ts  # GET/PUT préférences

/prisma/schema.prisma
├── NewsletterSubscriber        # Nouveau model
├── WaitlistContact            # Existant
└── EmailPreference            # Préférences user
```

### Solution 3 : Tracking amélioré

**Nouveaux champs à ajouter** :

```prisma
model WaitlistContact {
  id        String   @id @default(cuid())
  email     String   @unique
  source    String   // "homepage-hero", "pricing-cta", "blog-footer"
  medium    String?  // "organic", "paid", "social", "email"
  campaign  String?  // Nom de la campagne marketing
  referrer  String?  // URL de provenance
  metadata  Json?    // Données additionnelles
  createdAt DateTime @default(now())

  @@map("waitlist_contacts")
}
```

### Solution 4 : Composants optimisés

#### NewsletterForm (nouveau)

```tsx
// /components/email-collection/newsletter-form.tsx
"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Mail } from 'lucide-react'

interface NewsletterFormProps {
  variant?: 'inline' | 'card' | 'minimal'
  source?: string
  className?: string
}

export function NewsletterForm({
  variant = 'inline',
  source = 'unknown',
  className = ''
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source,
          referrer: document.referrer,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription')
      }

      toast.success('Inscription réussie !', {
        description: 'Vérifiez votre boîte mail pour confirmer.',
      })

      setEmail('')
    } catch (error: any) {
      toast.error('Erreur', {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Envoi...' : "S'inscrire"}
        </Button>
      </form>
    )
  }

  if (variant === 'card') {
    return (
      <div className={`bg-surface rounded-lg p-6 space-y-4 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Newsletter Krealabs</h3>
            <p className="text-sm text-muted-foreground">
              Tips dev, articles et actus
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Inscription...' : "S'abonner à la newsletter"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground">
          En vous inscrivant, vous acceptez de recevoir nos emails.
          Désinscription possible à tout moment.
        </p>
      </div>
    )
  }

  // variant === 'inline' (default)
  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Envoi...' : "S'inscrire"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Recevez nos tips et articles chaque semaine
      </p>
    </form>
  )
}
```

#### WaitlistForm (amélioré)

```tsx
// /components/email-collection/waitlist-form.tsx
"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Sparkles } from 'lucide-react'

interface WaitlistFormProps {
  variant?: 'hero' | 'banner' | 'inline'
  source?: string
  productName?: string
  className?: string
}

export function WaitlistForm({
  variant = 'inline',
  source = 'unknown',
  productName = 'nos nouveaux produits',
  className = ''
}: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source,
          referrer: document.referrer,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription')
      }

      toast.success('Vous êtes sur la liste !', {
        description: 'Nous vous contacterons dès que ce sera prêt.',
      })

      setEmail('')
    } catch (error: any) {
      toast.error('Erreur', {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === 'hero') {
    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="flex-1 h-14 text-lg"
            />
            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="h-14 px-8"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              {isLoading ? 'Inscription...' : 'Rejoindre la waitlist'}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Soyez les premiers informés du lancement de {productName}
          </p>
        </form>
      </div>
    )
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-primary to-purple-600 rounded-lg p-6 text-white ${className}`}>
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">Rejoignez la waitlist</h3>
            <p className="opacity-90">
              Soyez les premiers à découvrir {productName}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="flex-1 bg-white text-gray-900"
            />
            <Button
              type="submit"
              disabled={isLoading}
              variant="secondary"
            >
              {isLoading ? 'Envoi...' : "S'inscrire"}
            </Button>
          </form>
        </div>
      </div>
    )
  }

  // variant === 'inline'
  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Envoi...' : 'Rejoindre'}
        </Button>
      </div>
    </form>
  )
}
```

---

## 🗺️ Stratégie de placement recommandée

### Homepage (/)

```tsx
// Hero section - Primary CTA
<WaitlistForm
  variant="hero"
  source="homepage-hero"
  productName="nos templates premium"
/>

// Pas de banner répétitif au milieu

// Footer - Newsletter (pas waitlist)
<NewsletterForm
  variant="card"
  source="homepage-footer"
/>
```

### Page Pricing (/pricing)

```tsx
// CTA après les formules
<WaitlistForm
  variant="banner"
  source="pricing-cta"
  productName="notre offre Enterprise sur-mesure"
/>
```

### Page Produits (/products)

```tsx
// Banner pour early access
<WaitlistForm
  variant="banner"
  source="products-hero"
  productName="nos prochains produits"
/>
```

### Page Blog (/blog)

```tsx
// Newsletter dans le footer
<NewsletterForm
  variant="card"
  source="blog-footer"
/>
```

### Footer global

```tsx
// Newsletter uniquement (pas waitlist)
<NewsletterForm
  variant="minimal"
  source="global-footer"
/>
```

---

## 🔄 Migration plan

### Étape 1 : Créer nouveaux composants
- [ ] `NewsletterForm` avec 3 variants
- [ ] `WaitlistForm` amélioré avec tracking
- [ ] Hook `useEmailSubmit` partagé

### Étape 2 : Créer API Newsletter
- [ ] Route `/api/newsletter`
- [ ] Model Prisma `NewsletterSubscriber`
- [ ] Templates email (confirmation, welcome)

### Étape 3 : Améliorer API Waitlist
- [ ] Ajouter champs tracking (source, referrer, medium)
- [ ] Améliorer validation
- [ ] Meilleurs messages d'erreur

### Étape 4 : Refactor pages
- [ ] Homepage : Garder 1 waitlist + 1 newsletter
- [ ] Pricing : Waitlist spécifique Enterprise
- [ ] Blog : Newsletter uniquement
- [ ] Services : Pas de collecte email
- [ ] Footer : Newsletter uniquement

### Étape 5 : Analytics
- [ ] Tracking conversions par source
- [ ] Dashboard admin pour voir stats
- [ ] Export CSV des inscriptions

---

## 📊 Nouveau schéma Prisma complet

```prisma
// Waitlist - Liste d'attente produits
model WaitlistContact {
  id        String   @id @default(cuid())
  email     String   @unique
  source    String   // "homepage-hero", "pricing-cta", "products"
  medium    String?  // "organic", "paid", "social"
  campaign  String?  // Nom campagne marketing
  referrer  String?  // URL provenance
  metadata  Json?    // Données additionnelles
  status    WaitlistStatus @default(PENDING)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("waitlist_contacts")
  @@index([source])
  @@index([status])
}

enum WaitlistStatus {
  PENDING       // En attente
  CONTACTED     // Contacté
  CONVERTED     // Converti en client
  UNSUBSCRIBED  // Désinscrit
}

// Newsletter - Abonnés contenu régulier
model NewsletterSubscriber {
  id              String   @id @default(cuid())
  email           String   @unique
  source          String   // Où ils se sont inscrits
  status          NewsletterStatus @default(PENDING)
  confirmedAt     DateTime?
  unsubscribedAt  DateTime?
  metadata        Json?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@map("newsletter_subscribers")
  @@index([status])
}

enum NewsletterStatus {
  PENDING       // En attente confirmation
  ACTIVE        // Actif
  UNSUBSCRIBED  // Désinscrit
  BOUNCED       // Email invalide
}

// Préférences email (optionnel, pour phase 2)
model EmailPreference {
  id                String   @id @default(cuid())
  email             String   @unique
  receiveNewsletter Boolean  @default(true)
  receiveProduct    Boolean  @default(true)
  receiveMarketing  Boolean  @default(false)
  frequency         EmailFrequency @default(WEEKLY)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@map("email_preferences")
}

enum EmailFrequency {
  DAILY
  WEEKLY
  MONTHLY
}
```

---

## 📧 API Newsletter à créer

```typescript
// /app/api/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY!)

const subscribeSchema = z.object({
  email: z.string().email('Email invalide'),
  source: z.string().optional().default('unknown'),
  referrer: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, source, referrer } = subscribeSchema.parse(body)

    // Vérifier si déjà inscrit
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    })

    if (existing) {
      if (existing.status === 'ACTIVE') {
        return NextResponse.json(
          { error: 'Vous êtes déjà inscrit à la newsletter' },
          { status: 400 }
        )
      }

      // Réactiver si désinscrit
      if (existing.status === 'UNSUBSCRIBED') {
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { status: 'PENDING', unsubscribedAt: null },
        })
      }
    } else {
      // Nouvelle inscription
      await prisma.newsletterSubscriber.create({
        data: {
          email,
          source,
          metadata: { referrer },
        },
      })
    }

    // Générer token de confirmation
    const confirmToken = Buffer.from(`${email}:${Date.now()}`).toString('base64')

    // Envoyer email de confirmation
    await resend.emails.send({
      from: 'noreply@krealabs.fr',
      to: email,
      subject: 'Confirmez votre inscription à la newsletter Krealabs',
      html: `
        <h1>Bienvenue chez Krealabs !</h1>
        <p>Merci de vous être inscrit à notre newsletter.</p>
        <p>
          <a href="${process.env.NEXT_PUBLIC_URL}/newsletter/confirm?token=${confirmToken}">
            Cliquez ici pour confirmer votre inscription
          </a>
        </p>
        <p>Si vous n'avez pas demandé cette inscription, ignorez cet email.</p>
      `,
    })

    return NextResponse.json({
      success: true,
      message: 'Vérifiez votre boîte mail pour confirmer',
    })
  } catch (error: any) {
    console.error('Newsletter subscription error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    )
  }
}

// Endpoint de confirmation
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 400 })
    }

    // Décoder le token
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [email] = decoded.split(':')

    // Confirmer l'inscription
    await prisma.newsletterSubscriber.update({
      where: { email },
      data: {
        status: 'ACTIVE',
        confirmedAt: new Date(),
      },
    })

    // Envoyer email de bienvenue
    await resend.emails.send({
      from: 'noreply@krealabs.fr',
      to: email,
      subject: 'Bienvenue dans la newsletter Krealabs',
      html: `
        <h1>Merci d'avoir confirmé !</h1>
        <p>Vous recevrez désormais nos meilleurs articles et conseils chaque semaine.</p>
        <p>À très vite,<br>L'équipe Krealabs</p>
      `,
    })

    return NextResponse.json({
      success: true,
      message: 'Inscription confirmée avec succès',
    })
  } catch (error: any) {
    console.error('Newsletter confirmation error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la confirmation' },
      { status: 500 }
    )
  }
}
```

---

## 📈 Dashboard Admin

### Ajout aux stats admin

```tsx
// /app/admin/page.tsx - Ajouter section analytics

interface EmailStats {
  waitlist: {
    total: number
    bySource: Record<string, number>
    lastWeek: number
  }
  newsletter: {
    total: number
    active: number
    pending: number
    unsubscribed: number
  }
}

async function getEmailStats(): Promise<EmailStats> {
  const [waitlistTotal, waitlistBySource, newsletterStats] = await Promise.all([
    prisma.waitlistContact.count(),
    prisma.waitlistContact.groupBy({
      by: ['source'],
      _count: true,
    }),
    prisma.newsletterSubscriber.groupBy({
      by: ['status'],
      _count: true,
    }),
  ])

  return {
    waitlist: {
      total: waitlistTotal,
      bySource: Object.fromEntries(
        waitlistBySource.map(({ source, _count }) => [source, _count])
      ),
      lastWeek: await prisma.waitlistContact.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    },
    newsletter: {
      total: newsletterStats.reduce((sum, { _count }) => sum + _count, 0),
      active: newsletterStats.find(s => s.status === 'ACTIVE')?._count || 0,
      pending: newsletterStats.find(s => s.status === 'PENDING')?._count || 0,
      unsubscribed: newsletterStats.find(s => s.status === 'UNSUBSCRIBED')?._count || 0,
    },
  }
}
```

---

## ✅ Checklist finale

### Clarification
- [ ] Décider : Newsletter + Waitlist ou un seul ?
- [ ] Définir les produits/services pour la waitlist
- [ ] Créer le messaging clair pour chaque formulaire

### Développement
- [ ] Créer composants `NewsletterForm` et `WaitlistForm`
- [ ] Créer API `/api/newsletter`
- [ ] Mettre à jour schema Prisma
- [ ] Migrer la base de données
- [ ] Ajouter tracking (source, referrer, etc.)
- [ ] Créer templates email

### Refactoring
- [ ] Refactor homepage (1 waitlist + 1 newsletter max)
- [ ] Refactor toutes les pages avec stratégie claire
- [ ] Supprimer composants obsolètes
- [ ] Mettre à jour footer

### Analytics & Suivi
- [ ] Dashboard admin avec stats
- [ ] Export CSV des inscriptions
- [ ] Tracking conversions par source
- [ ] Tests A/B (optionnel)

### QA
- [ ] Tester tous les formulaires
- [ ] Vérifier emails envoyés
- [ ] Tester doublons
- [ ] Tester désinscription
- [ ] Validation accessibilité

---

**Recommandation finale** :

Je recommande fortement l'**Option C** : maintenir **Newsletter ET Waitlist séparés**.

- **Newsletter** : Pour le contenu régulier (blog, tips, actualités)
- **Waitlist** : Pour les nouveaux produits digitaux (templates, outils)

Cette approche permet :
1. ✅ Segmentation claire de l'audience
2. ✅ Messaging marketing précis
3. ✅ Meilleur tracking et analytics
4. ✅ Conformité RGPD (consentement spécifique)
