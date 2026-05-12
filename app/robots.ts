import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://krealabs.fr'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/api',
          '/api/*',
          '/_next',
          '/_next/*',
          '/design-system', // page de showcase interne, pas pour l'indexation
        ],
      },
      // Bloquer les scrapers IA si souhaité (à activer si tu ne veux pas
      // que ton contenu nourrisse ChatGPT, Claude, etc.)
      // {
      //   userAgent: ['GPTBot', 'CCBot', 'ClaudeBot', 'anthropic-ai', 'PerplexityBot'],
      //   disallow: '/',
      // },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
