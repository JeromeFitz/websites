import { MetadataRoute } from 'next'

const host = 'https://jeromefitzgerald.com'

function robots(): MetadataRoute.Robots {
  return {
    host,
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${host}/sitemap.xml`,
  }
}

export default robots
