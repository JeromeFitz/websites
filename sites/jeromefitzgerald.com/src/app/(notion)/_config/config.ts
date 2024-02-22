const CONFIG = {
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
  MUSIC: {
    DATABASE_ID: '',
    SEGMENT: 'music',
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

export { CONFIG }
