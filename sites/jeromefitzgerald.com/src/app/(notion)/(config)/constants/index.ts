import ms from 'ms'

/**
 * @redis is in seconds not ms
 */
const getTimeInSeconds = (time: number) => time / 1000 ?? 0

/**
 * @note in seconds
 *       ...probably could be hard-coded
 */
const TIME = {
  DAY: getTimeInSeconds(ms('1d')),
  HOUR: getTimeInSeconds(ms('1h')),
  MINUTE: getTimeInSeconds(ms('1m')),
  MONTH: getTimeInSeconds(ms('30d')),
  YEAR: getTimeInSeconds(ms('1y')),
}

const CONSTANTS = {
  BLOG: {
    DATABASE_ID: process.env.NOTION__DATABASE__BLOG ?? '',
    SEGMENT: 'blog',
  },
  BOOKS: {
    DATABASE_ID: process.env.NOTION__DATABASE__BOOKS ?? '',
    SEGMENT: 'books',
  },
  EPISODES: {
    DATABASE_ID: process.env.NOTION__DATABASE__EPISODES ?? '',
    SEGMENT: 'episodes',
  },
  EVENTS: {
    DATABASE_ID: process.env.NOTION__DATABASE__EVENTS ?? '',
    SEGMENT: 'events',
  },
  PAGES: {
    DATABASE_ID: process.env.NOTION__DATABASE__PAGES ?? '',
    SEGMENT: 'pages',
  },
  PEOPLE: {
    DATABASE_ID: process.env.NOTION__DATABASE__PEOPLE ?? '',
    SEGMENT: 'people',
  },
  PODCASTS: {
    DATABASE_ID: process.env.NOTION__DATABASE__PODCASTS ?? '',
    SEGMENT: 'podcasts',
  },
  SHOWS: {
    DATABASE_ID: process.env.NOTION__DATABASE__SHOWS ?? '',
    SEGMENT: 'shows',
  },
  VENUES: {
    DATABASE_ID: process.env.NOTION__DATABASE__VENUES ?? '',
    SEGMENT: 'venues',
  },
}

export { CONSTANTS, TIME }
