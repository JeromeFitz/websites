import _orderBy from 'lodash/orderBy.js'
import { MetadataRoute } from 'next'

/**
 * @todo(next) dynamic
 */
const siteUrl = 'https://jeromefitzgerald.com'
const lastModified = new Date()

const root = ['']
const events = [
  '2023/06/01/your-act',
  '2023/06/10/the-playlist',
  '2023/06/16/jerome-and',
  '2023/06/30/bracket-night',
  '2023/07/01/irony-city',
  '2023/07/15/jerome-and',
  '2023/08/03/your-act',
  '2023/08/19/jerome-and',
]
const pages = [
  'about',
  'books',
  'colophon',
  'contact',
  'events',
  'music',
  'podcasts',
  'shows',
]
const podcasts = ['jer-and-ky-and-guest', 'knockoffs']
const shows = [
  'alex-o-jerome',
  'boo-humbag',
  'bubble-boy-the-musical',
  'jer-and-ky',
  'jerome-and',
  'jfle-take-broadway',
  'jfle',
  'justin-and-jerome-experience',
  'my-dinner-with-andre-the-musical',
  'the-death-show',
  'the-playlist',
  'warp-zone',
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sitemapRoot = root.map((slug) => ({
  lastModified,
  url: `${siteUrl}`,
}))
const sitemapEvents = events.map((slug) => ({
  lastModified,
  url: `${siteUrl}/events/${slug}`,
}))
const sitemapPages = pages.map((slug) => ({
  lastModified,
  url: `${siteUrl}/${slug}`,
}))
const sitemapPodcasts = podcasts.map((slug) => ({
  lastModified,
  url: `${siteUrl}/${slug}`,
}))
const sitemapShows = shows.map((slug) => ({
  lastModified,
  url: `${siteUrl}/shows/${slug}`,
}))

function sitemap(): MetadataRoute.Sitemap {
  return _orderBy(
    [
      // {
      //   url: `${siteUrl}`,
      //   lastModified: new Date(),
      // },
      ...sitemapRoot,
      ...sitemapEvents,
      ...sitemapPages,
      ...sitemapPodcasts,
      ...sitemapShows,
    ],
    ['url'],
    ['asc'],
  )
}

export default sitemap
