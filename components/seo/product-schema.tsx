/**
 * ProductSchema - Structured Data JSON-LD pour les produits
 * Affiche les produits dans les résultats de recherche avec prix et notation
 */

interface ProductSchemaProps {
  name: string
  description: string
  image?: string | null
  price: number // en centimes
  currency: string
  url: string
  category?: string | null
}

export function ProductSchema({
  name,
  description,
  image,
  price,
  currency,
  url,
  category,
}: ProductSchemaProps) {
  const priceInUnits = price / 100

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': name,
    'description': description,
    ...(image && { 'image': image }),
    'url': url,
    'brand': {
      '@type': 'Brand',
      'name': 'Krealabs',
    },
    'offers': {
      '@type': 'Offer',
      'price': priceInUnits.toFixed(2),
      'priceCurrency': currency.toUpperCase(),
      'availability': 'https://schema.org/InStock',
      'url': url,
      'seller': {
        '@type': 'Organization',
        'name': 'Krealabs',
        'url': 'https://krealabs.fr',
      },
    },
    ...(category && { 'category': category }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
