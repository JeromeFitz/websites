const CONFIG = {
  EPISODES: {
    DATABASE_ID: process.env.NOTION__DATABASE__EPISODES ?? '',
    SEGMENT: 'episodes',
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
  VENUES: {
    DATABASE_ID: process.env.NOTION__DATABASE__VENUES ?? '',
    SEGMENT: 'venues',
  },
}

export { CONFIG }
