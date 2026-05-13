/**
 * FAQSchema - Structured Data JSON-LD pour FAQ
 * Affiche les questions/réponses directement dans les résultats Google
 * et est éligible aux Speakable rich results (recherche vocale Google Assistant).
 */

interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  items: FAQItem[]
  /**
   * Active SpeakableSpecification pour optimiser pour la recherche vocale
   * (Google Assistant). Recommandé sur la page FAQ principale uniquement
   * pour éviter de diluer le signal vocal.
   */
  speakable?: boolean
}

export function FAQSchema({ items, speakable = false }: FAQSchemaProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': items.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
  }

  if (speakable) {
    // SpeakableSpecification : indique à Google Assistant quelles parties
    // de la page peuvent être lues à voix haute. CSS selectors pointent
    // sur les Q/A rendus dans le DOM (cohérent avec les <summary>/<p>).
    schema.speakable = {
      '@type': 'SpeakableSpecification',
      cssSelector: ['summary', '[data-speakable]'],
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
