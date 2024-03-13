import { envServer as env } from '@jeromefitz/next-config/env.server.mjs'

const CONFIG = {
  EPISODES: {
    DATABASE_ID: env.NOTION__DATABASE__EPISODES ?? '',
    SEGMENT: 'episodes',
  },

  PAGES: {
    DATABASE_ID: env.NOTION__DATABASE__PAGES ?? '',
    SEGMENT: 'pages',
  },
  PEOPLE: {
    DATABASE_ID: env.NOTION__DATABASE__PEOPLE ?? '',
    SEGMENT: 'people',
  },
  PODCASTS: {
    DATABASE_ID: env.NOTION__DATABASE__PODCASTS ?? '',
    SEGMENT: 'podcasts',
  },
  VENUES: {
    DATABASE_ID: env.NOTION__DATABASE__VENUES ?? '',
    SEGMENT: 'venues',
  },
}

export { CONFIG }
