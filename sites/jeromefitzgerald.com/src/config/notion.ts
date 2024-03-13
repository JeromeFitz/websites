/**
 * @note(notion) try as i might, we need a config file
 */
import { envServer as env } from '@/config/env.server.mjs'

const DATABASES = {
  BLOG: {
    id: env.NOTION__DATABASE__BLOG,
    segment: 'pages',
    slug: 'blog',
  },
  BOOKS: {
    id: env.NOTION__DATABASE__BOOKS,
    segment: 'pages',
    slug: 'books',
  },
  EPISODES: {
    id: env.NOTION__DATABASE__EPISODES,
    segment: 'episodes',
    slug: 'episodes',
  },
  EVENTS: {
    id: env.NOTION__DATABASE__EVENTS,
    segment: 'pages',
    slug: 'events',
  },
  PAGES: {
    id: env.NOTION__DATABASE__PAGES,
    segment: 'pages',
    slug: '',
  },
  PODCASTS: {
    id: env.NOTION__DATABASE__PODCASTS,
    segment: 'pages',
    slug: 'podcasts',
  },
  SHOWS: {
    id: env.NOTION__DATABASE__SHOWS,
    segment: 'pages',
    slug: 'shows',
  },
  VENUES: {
    id: env.NOTION__DATABASE__VENUES,
    segment: 'pages',
    slug: 'veneus',
  },
}

export { DATABASES }
