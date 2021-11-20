const DB = {
  BLOG: {
    database_id: '0c81e72d-671e-4eac-b315-06471e11c864',
    name: 'BLOG',
    routeType: true,
    seo: 'fcd68c2321f3424ca3611d5d6e4fd4f0',
  },
  EPISODES: {
    database_id: '1833c951-6ad5-4b5b-a990-15a491b94f6c',
    name: 'EPISODES',
    routeType: true,
    seo: '3e53adb6b0ac4d398557d32d37719d60',
  },
  EVENTS: {
    database_id: 'e059561c-b9be-42fe-8b6d-c9e794da90f6',
    name: 'EVENTS',
    routeType: true,
    seo: 'abf6dce8e36e41b9ae0058d0ce737ca1',
  },
  PAGES: {
    database_id: '4ff1d22e-f38e-46a3-96f7-90553b44c996',
    name: 'PAGES',
    routeType: true,
    seo: 'd74da2d0ea074dc4805f84f398695ae5',
  },
  PEOPLE: {
    database_id: '2d0cf92c-8eee-4376-8487-7e9d3207ed8a',
    name: 'PEOPLE',
    routeType: true,
    seo: '4aef087a75b6493f94ebd2fda8a62a5d',
  },
  PODCASTS: {
    database_id: '9789db38-f995-4984-afc7-3d6b6739b3c0',
    name: 'PODCASTS',
    routeType: true,
    seo: 'a68e0a9ff2a14ee6943df9018669bfd1',
  },
  SEO: {
    database_id: 'f076737c-9191-4c7b-b81a-7717fe1e4944',
    name: 'SEO',
    routeType: true,
    seo: '',
  },
  SHOWS: {
    database_id: 'c49ab102-c34b-419a-bf02-30506df47d97',
    name: 'SHOWS',
    routeType: true,
    seo: '7cbeabcc3f5748a1af2a91eb2e7bcda2',
  },
  VENUES: {
    database_id: 'cf178d0e-4ec2-4c21-b826-a469f8735579',
    name: 'VENUES',
    routeType: true,
    seo: '385b9747e2c940a882e328c231becb51',
  },
}

const PAGES = ['about', 'colophon', 'contact']

const ROUTE_TYPES = {
  blog: 'blog',
  episodes: 'episodes',
  events: 'events',
  pages: 'pages',
  people: 'people',
  podcasts: 'podcasts',
  seo: 'seo',
  shows: 'shows',
  tags: 'tags',
  users: 'users',
  venues: 'venues',
}

const SEO = {
  blog: 'd9a4d872-1274-4657-a5b0-ca3a085e4b9e',
  episodes: 'b3c98bd5-b168-46d9-b4b6-bdf01612890d',
  events: '7bc401a6-5f36-409a-8e33-dcd05653d73c',
  pages: '',
  people: 'a94187ce-498c-4beb-88b2-78d56097d9f6',
  podcasts: '535c2582-ac66-4a6f-8216-6df092d4fbc2',
  seo: '',
  shows: '9e13be55-72c0-4964-b32e-f0ada3c9a082',
  tags: '',
  users: '41500e18-d97d-406d-8ca5-42cece7dafb5',
  venues: 'd79444f6-8158-4bae-9b75-285e0b5f85b2',
}

const SLUG__HOMEPAGE = 'homepage'

export { DB, PAGES, ROUTE_TYPES, SEO, SLUG__HOMEPAGE }
