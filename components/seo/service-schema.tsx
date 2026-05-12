/**
 * ServiceSchema - Structured Data JSON-LD pour les services
 * Indique à Google qu'il s'agit d'un service professionnel
 */

interface ServiceSchemaProps {
  name: string
  description: string
  url: string
  price?: string
}

export function ServiceSchema({ name, description, url, price }: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': name,
    'description': description,
    'url': url,
    'provider': {
      '@type': 'Organization',
      'name': 'Krealabs',
      'url': 'https://krealabs.fr',
      'logo': 'https://krealabs.fr/logo.png',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Rouen',
        'addressRegion': 'Normandie',
        'addressCountry': 'FR',
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+33-X-XX-XX-XX-XX',
        'contactType': 'Customer Service',
        'areaServed': 'FR',
        'availableLanguage': 'French',
      },
    },
    'areaServed': {
      '@type': 'GeoCircle',
      'geoMidpoint': {
        '@type': 'GeoCoordinates',
        'latitude': '49.4431',
        'longitude': '1.0993',
      },
      'geoRadius': '100000',
    },
    ...(price && {
      'offers': {
        '@type': 'Offer',
        'availability': 'https://schema.org/InStock',
        'priceCurrency': 'EUR',
        'price': price,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
