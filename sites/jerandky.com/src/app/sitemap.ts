import _orderBy from 'lodash/orderBy'
import { MetadataRoute } from 'next'

/**
 * @todo(next) dynamic
 */
const siteUrl = 'https://jeromefitzgerald.com'
const lastModified = new Date()

const root = ['']
const podcasts = ['jer-and-ky-and-guest', 'knockoffs']

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sitemapRoot = root.map((slug) => ({
  url: `${siteUrl}`,
  lastModified,
}))
const sitemapPodcasts = podcasts.map((slug) => ({
  url: `${siteUrl}/podcasts/${slug}`,
  lastModified,
}))

function sitemap(): MetadataRoute.Sitemap {
  return _orderBy(
    [
      // {
      //   url: `${siteUrl}`,
      //   lastModified: new Date(),
      // },
      ...sitemapRoot,
      ...sitemapPodcasts,
    ],
    ['url'],
    ['asc']
  )
}

export default sitemap
