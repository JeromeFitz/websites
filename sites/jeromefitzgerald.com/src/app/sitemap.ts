import type { MetadataRoute } from 'next'

import type { Episode } from '@/lib/drizzle/schemas/cache-episodes/types'
import type { Event } from '@/lib/drizzle/schemas/cache-events/types'
import type { Page } from '@/lib/drizzle/schemas/cache-pages/types'
import type { Podcast } from '@/lib/drizzle/schemas/cache-podcasts/types'
import type { Show } from '@/lib/drizzle/schemas/cache-shows/types'

import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'

import _orderBy from 'lodash/orderBy.js'

import { getEpisodes } from '@/lib/drizzle/schemas/cache-episodes/queries'
import { getEvents } from '@/lib/drizzle/schemas/cache-events/queries'
import { getPages } from '@/lib/drizzle/schemas/cache-pages/queries'
import { getPodcasts } from '@/lib/drizzle/schemas/cache-podcasts/queries'
import { getShows } from '@/lib/drizzle/schemas/cache-shows/queries'

function getUrl(slug: string) {
  return `https://${siteUrl}${slug}`
}

const siteUrl = env.NEXT_PUBLIC__SITE
// @todo(notion) get actual data here
const lastModified = new Date()

const root = ['']
const currently = [
  // 'cooking',
  'listening-to',
  'reading',
]

const eventItems: Event[] = await getEvents()
const events: string[] = []
eventItems.map((item) => {
  if (item.isIndexed && item.isPublished) {
    events.push(item.slugPreview)
  }
})
const pagesForRemoval = [
  '/blog',
  '/books',
  '/homepage',
  '/kitchen-sink',
  '/music',
  '/people',
  '/venues',
]
const pageItems: Page[] = await getPages()
const pages: string[] = []
pageItems.map((item) => {
  if (
    item.isIndexed &&
    item.isPublished &&
    !pagesForRemoval.includes(item.slugPreview)
  ) {
    pages.push(item.slugPreview)
  }
})

const podcastItems: Podcast[] = await getPodcasts()
const podcasts: string[] = []
podcastItems.map((item) => {
  if (item.isIndexed && item.isPublished) {
    podcasts.push(item.slugPreview)
  }
})
const podcastEpisodeItems: Episode[] = await getEpisodes()
const podcastEpisodes: string[] = []
podcastEpisodeItems.map((item) => {
  if (item.isIndexed && item.isPublished) {
    podcastEpisodes.push(item.slugPreview)
  }
})

const showItems: Show[] = await getShows()
const shows: string[] = []
showItems.map((item) => {
  if (item.isIndexed && item.isPublished) {
    shows.push(item.slugPreview)
  }
})

const sitemapRoot = root.map((slug) => ({
  lastModified,
  url: getUrl(slug),
}))
const sitemapCurrently = currently.map((slug) => ({
  lastModified,
  url: `${siteUrl}/currently/${slug}`,
}))
const sitemapEvents = events.map((slug) => ({
  lastModified,
  url: getUrl(slug),
}))
const sitemapPages = pages.map((slug) => ({
  lastModified,
  url: getUrl(slug),
}))
const sitemapPodcasts = podcasts.map((slug) => ({
  lastModified,
  url: getUrl(slug),
}))

const sitemapPodcastEpisodes = podcastEpisodes.map((slug) => ({
  lastModified,
  url: getUrl(slug),
}))
const sitemapShows = shows.map((slug) => ({
  lastModified,
  url: getUrl(slug),
}))

function sitemap(): MetadataRoute.Sitemap {
  return _orderBy(
    [
      ...sitemapRoot,
      ...sitemapCurrently,
      ...sitemapEvents,
      ...sitemapPages,
      ...sitemapPodcasts,
      // ...sitemapPodcastEpisodes,
      ...sitemapShows,
    ],
    ['url'],
    ['asc'],
  )
}

export default sitemap
