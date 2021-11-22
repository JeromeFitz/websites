const DB = {
  BLOG: {
    database_id: '27360d9b5f274dc2ac19ad09837b6860',
    name: 'BLOG',
    routeType: true,
    seo: '31d8d3edb6844789a4fcd8dd4a1d488c',
  },
  EPISODES: {
    database_id: '2dbb52e80e5d49bfbf5ac1a98f6c07d4',
    name: 'EPISODES',
    routeType: true,
    seo: '08fadd3ea6294d0eaf57c3e79123b420',
  },
  EVENTS: {
    database_id: '9248dbc7a4c141aab16551bc87ed5422',
    name: 'EVENTS',
    routeType: true,
    seo: 'dd10d84d6d934a69ba25963a8c52a95b',
  },
  PAGES: {
    database_id: 'c6ef23945c684e10a5f6aafb4c7ad115',
    name: 'PAGES',
    routeType: true,
    seo: '',
  },
  PEOPLE: {
    database_id: '66dedc454721449790255de1dbe49472',
    name: 'PEOPLE',
    routeType: true,
    seo: 'c3ef887b3577408aa14616ee84d948f9',
  },
  PODCASTS: {
    database_id: '601679d51dba4dd1b0bc1efc20800e5a',
    name: 'PODCASTS',
    routeType: true,
    seo: '52de0748cd4d4152a803f0b1fac9465d',
  },
  SEO: {
    database_id: 'dc09ee3b04da4fad859a26113df607ba',
    name: 'SEO',
    routeType: true,
    seo: '',
  },
  SHOWS: {
    database_id: '30471ded18b34af982d2f0064c4bcbf1',
    name: 'SHOWS',
    routeType: true,
    seo: '7f18c17dc86e429a850580cdf874022b',
  },
  VENUES: {
    database_id: 'ab2134096d7f48ad9c86c576b59b6c0e',
    name: 'VENUES',
    routeType: true,
    seo: '92d703d8c9d94e61bed37b205c928bfb',
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
