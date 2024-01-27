import { MetadataRoute } from 'next'

const host = 'https://jeromefitzgerald.com'

function robots(): MetadataRoute.Robots {
  return {
    host,
    rules: {
      allow: ['/', '/api/v1/og/*'],
      disallow: ['/playground'],
      userAgent: '*',
    },
    sitemap: `${host}/sitemap.xml`,
  }
}

export default robots
