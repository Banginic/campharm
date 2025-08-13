import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/pharmacy', '/api'], // adjust as needed
      },
    ],
    sitemap: 'https://medyro.vercel.app/sitemap.xml', // replace with your domain
    host: 'https://medyro.vercel.app',
  }
}
