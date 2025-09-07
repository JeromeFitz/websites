import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import {
  cacheBlocks,
  cacheBlogs,
  cacheBooks,
  cacheEpisodes,
  cacheEvents,
  cachePages,
  cachePodcasts,
  cacheShows,
  cacheVenues,
} from '@/lib/drizzle/schemas'
import {
  getBlogsWithLimit,
  getBooksWithLimit,
  getEventsWithLimit,
  getPagesWithLimit,
  getPodcastsWithLimit,
  getShowsWithLimit,
  getVenuesWithLimit,
} from '@/lib/drizzle/schemas/queries'

export type Segment =
  | 'blocks'
  | 'blog'
  | 'books'
  | 'episodes'
  | 'events'
  | 'pages'
  | 'podcasts'
  | 'shows'
  | 'venues'

export enum Segments {
  blocks = 'blocks',
  blogs = 'blog',
  books = 'books',
  episodes = 'episodes',
  events = 'events',
  pages = 'pages',
  podcasts = 'podcasts',
  shows = 'shows',
  venues = 'venues',
}

interface SegmentValues {
  drizzleDatabase: any
  drizzleDatabaseString: string
  getItems: any
  limit: number
  notionDatabaseId: string
}

export const getBySegment: Record<Segments, SegmentValues> = {
  // @note(notion) this is not a true notion database
  blocks: {
    drizzleDatabase: cacheBlocks,
    drizzleDatabaseString: 'cache_blocks',
    // // biome-ignore lint/suspicious/noEmptyBlockStatements: migrate
    getItems: () => {},
    limit: 0,
    notionDatabaseId: '',
  },
  blog: {
    drizzleDatabase: cacheBlogs,
    drizzleDatabaseString: 'cache_blogs',
    getItems: getBlogsWithLimit,
    limit: 100,
    notionDatabaseId: envServer.NOTION__DATABASE__BLOG,
  },
  books: {
    drizzleDatabase: cacheBooks,
    drizzleDatabaseString: 'cache_books',
    getItems: getBooksWithLimit,
    limit: 100,
    notionDatabaseId: envServer.NOTION__DATABASE__BOOKS,
  },
  episodes: {
    drizzleDatabase: cacheEpisodes,
    drizzleDatabaseString: 'cache_episodes',
    getItems: getEventsWithLimit,
    limit: 100,
    notionDatabaseId: envServer.NOTION__DATABASE__EPISODES,
  },
  events: {
    drizzleDatabase: cacheEvents,
    drizzleDatabaseString: 'cache_events',
    getItems: getEventsWithLimit,
    limit: 25,
    notionDatabaseId: envServer.NOTION__DATABASE__EVENTS,
  },
  pages: {
    drizzleDatabase: cachePages,
    drizzleDatabaseString: 'cache_pages',
    getItems: getPagesWithLimit,
    limit: 100,
    notionDatabaseId: envServer.NOTION__DATABASE__PAGES,
  },
  podcasts: {
    drizzleDatabase: cachePodcasts,
    drizzleDatabaseString: 'cache_podcasts',
    getItems: getPodcastsWithLimit,
    limit: 100,
    notionDatabaseId: envServer.NOTION__DATABASE__PODCASTS,
  },
  shows: {
    drizzleDatabase: cacheShows,
    drizzleDatabaseString: 'cache_shows',
    getItems: getShowsWithLimit,
    limit: 50,
    notionDatabaseId: envServer.NOTION__DATABASE__SHOWS,
  },
  venues: {
    drizzleDatabase: cacheVenues,
    drizzleDatabaseString: 'cache_venues',
    getItems: getVenuesWithLimit,
    limit: 50,
    notionDatabaseId: envServer.NOTION__DATABASE__VENUES,
  },
}
