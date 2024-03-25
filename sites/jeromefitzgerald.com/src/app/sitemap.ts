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
  '2023/08/03/your-act',
  '2023/08/12/arcade-hootenanny',
  '2023/08/19/jerome-and',
  '2023/09/07/your-act',
  '2023/09/08/fondue-for-two',
  '2023/09/09/super-late-night',
  '2023/09/15/jerome-and',
  '2023/09/16/knights-of-the-arcade',
  '2023/09/22/the-sketch-comedy-lab',
  '2023/09/23/fridge-art-sketch-show',
  '2023/09/29/bitch-please',
  '2023/10/13/the-latchkey-kids',
  '2023/10/14/arcade-hootenanny',
  '2023/10/15/master-class-sketch-reading',
  '2023/10/21/jerome-and',
  '2023/10/28/sketch-night',
  '2023/11/03/unlocking-811',
  '2023/11/18/jerome-and',
  '2023/12/16/jerome-and',
  '2024/01/13/arcade-hootenanny',
  '2024/01/18/lucky-draw',
  '2024/01/26/friday-night-raw-with-ricky-romance',
  '2024/02/03/fridge-art-sketch-show',
  '2024/03/22/sketch-madness',
  '2024/03/23/sketch-madness',
  '2024/04/13/arcade-hootenanny',
  '2024/05/18/the-playlist',
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
  url: `${siteUrl}/podcasts/${slug}`,
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
