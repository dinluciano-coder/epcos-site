import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Permite todos os crawlers nas páginas públicas
        userAgent: '*',
        allow: '/',
        // Bloqueia rotas privadas / de admin
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/admin/dashboard',
        ],
      },
      {
        // Bloqueia crawlers maliciosos conhecidos
        userAgent: [
          'AhrefsBot',
          'MJ12bot',
          'SemrushBot',
          'DotBot',
          'BLEXBot',
          'MegaIndex',
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://epcos.eng.br/sitemap.xml',
    host: 'https://epcos.eng.br',
  }
}
