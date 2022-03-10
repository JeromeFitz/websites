/**
 * @todo(notion)
 *
 * PAGES should come from DATABASE
 * SEO should come from DATABASE
 * => ex) GET SEO first _then_ dynamicaly generate/store info
 *
 */
import { DATA_TYPES, PROPERTIES } from '@jeromefitz/notion/constants'
import type { DatabaseInfo } from '@jeromefitz/notion/schema'
import { TIME } from 'next-notion/src/constants'

// const DATA_TYPES: DataTypesObject = {
//   LISTING: 'LISTING',
//   LISTING_BY_DATE: 'LISTING_BY_DATE',
//   SLUG: 'SLUG',
//   SLUG_BY_ROUTE: 'SLUG_BY_ROUTE',
// }

// console.dir(`DATA_TYPES`)
// console.dir(DATA_TYPES)

const PAGES__HOMEPAGE = 'homepage'
const PAGES = ['about', 'colophon', 'contact']

// @todo(next-notion) move to `isChild`
const NOTION: DatabaseInfo = {
  BLOG: {
    active: true,
    database_id: '27360d9b5f274dc2ac19ad09837b6860',
    dataTypes: [
      DATA_TYPES.LISTING,
      DATA_TYPES.LISTING_BY_DATE,
      DATA_TYPES.SLUG_BY_ROUTE,
    ],
    hasChild: null,
    isChild: null,
    isChildInfoType: null,
    name: 'BLOG',
    page_id__seo: '31d8d3edb6844789a4fcd8dd4a1d488c',
    routeMeta: true,
    routeType: 'blog',
    slug: 'blog',
    //
    //
    infoType: PROPERTIES.datePublished,
    skipStaticPaths: false,
    ttl: TIME.MONTH,
  },
  BOOKS: {
    active: true,
    database_id: 'cff5175d-c317-4af4-b2b2-0826eb409291',
    dataTypes: [DATA_TYPES.LISTING, DATA_TYPES.SLUG],
    hasChild: null,
    isChild: null,
    isChildInfoType: null,
    name: 'BOOKS',
    page_id__seo: 'b61655ff-3881-4bd9-9ea9-92b847b49b70',
    routeMeta: true,
    routeType: 'books',
    slug: 'books',
    //
    //
    infoType: PROPERTIES.datePublished,
    skipStaticPaths: true,
    ttl: TIME.MONTH,
  },
  EPISODES: {
    active: true,
    database_id: '2dbb52e80e5d49bfbf5ac1a98f6c07d4',
    dataTypes: [DATA_TYPES.SLUG, DATA_TYPES.SLUG_BY_ROUTE],
    hasChild: null,
    isChild: 'PODCASTS',
    isChildInfoType: PROPERTIES.rollupEpisodes__PodcastsSlugs,
    name: 'EPISODES',
    page_id__seo: '08fadd3ea6294d0eaf57c3e79123b420',
    routeMeta: true,
    routeType: 'episodes',
    slug: 'episodes',
    //
    //
    infoType: PROPERTIES.datePublished,
    skipStaticPaths: false,
    ttl: TIME.MONTH,
  },
  EVENTS: {
    active: true,
    database_id: '9248dbc7a4c141aab16551bc87ed5422',
    dataTypes: [
      DATA_TYPES.LISTING,
      DATA_TYPES.LISTING_BY_DATE,
      DATA_TYPES.SLUG_BY_ROUTE,
    ],
    hasChild: null,
    isChild: null,
    isChildInfoType: null,
    name: 'EVENTS',
    page_id__seo: 'dd10d84d6d934a69ba25963a8c52a95b',
    routeMeta: true,
    routeType: 'events',
    slug: 'events',
    //
    //
    infoType: PROPERTIES.dateEvent,
    skipStaticPaths: false,
    ttl: TIME.MONTH,
  },
  PAGES: {
    active: false,
    database_id: 'c6ef23945c684e10a5f6aafb4c7ad115',
    dataTypes: [DATA_TYPES.SLUG],
    hasChild: null,
    isChild: null,
    isChildInfoType: null,
    name: 'PAGES',
    page_id__seo: '',
    routeMeta: false,
    routeType: 'pages',
    slug: 'pages',
    //
    //
    infoType: PROPERTIES.datePublished,
    skipStaticPaths: false,
    ttl: TIME.MONTH,
  },
  PEOPLE: {
    active: false,
    database_id: '66dedc454721449790255de1dbe49472',
    dataTypes: [DATA_TYPES.LISTING, DATA_TYPES.SLUG],
    hasChild: null,
    isChild: null,
    isChildInfoType: null,
    name: 'PEOPLE',
    page_id__seo: 'c3ef887b3577408aa14616ee84d948f9',
    routeMeta: false,
    routeType: 'people',
    slug: 'people',
    //
    //
    infoType: PROPERTIES.datePublished,
    skipStaticPaths: false,
    ttl: TIME.MONTH,
  },
  PODCASTS: {
    active: true,
    database_id: '601679d51dba4dd1b0bc1efc20800e5a',
    dataTypes: [DATA_TYPES.LISTING, DATA_TYPES.SLUG],
    hasChild: 'EPISODES',
    isChild: null,
    isChildInfoType: null,
    name: 'PODCASTS',
    page_id__seo: '52de0748cd4d4152a803f0b1fac9465d',
    routeMeta: true,
    routeType: 'podcasts',
    slug: 'podcasts',
    //
    //
    infoType: PROPERTIES.datePublished,
    skipStaticPaths: false,
    ttl: TIME.MONTH,
  },
  SEO: {
    active: false,
    database_id: 'dc09ee3b04da4fad859a26113df607ba',
    dataTypes: [DATA_TYPES.SLUG],
    hasChild: null,
    isChild: null,
    isChildInfoType: null,
    name: 'SEO',
    page_id__seo: '',
    routeMeta: false,
    routeType: 'seo',
    slug: 'seo',
    //
    //
    infoType: PROPERTIES.datePublished,
    skipStaticPaths: false,
    ttl: TIME.MONTH,
  },
  SHOWS: {
    active: true,
    database_id: '30471ded18b34af982d2f0064c4bcbf1',
    dataTypes: [DATA_TYPES.LISTING, DATA_TYPES.SLUG],
    hasChild: null,
    isChild: null,
    isChildInfoType: null,
    name: 'SHOWS',
    page_id__seo: '7f18c17dc86e429a850580cdf874022b',
    routeMeta: false,
    routeType: 'shows',
    slug: 'shows',
    //
    //
    infoType: PROPERTIES.datePublished,
    skipStaticPaths: false,
    ttl: TIME.MONTH,
  },
  VENUES: {
    active: true,
    database_id: 'ab2134096d7f48ad9c86c576b59b6c0e',
    dataTypes: [DATA_TYPES.LISTING, DATA_TYPES.SLUG],
    hasChild: null,
    isChild: null,
    isChildInfoType: null,
    name: 'VENUES',
    page_id__seo: '92d703d8c9d94e61bed37b205c928bfb',
    routeMeta: false,
    routeType: 'venues',
    slug: 'venues',
    //
    //
    infoType: PROPERTIES.datePublished,
    skipStaticPaths: false,
    ttl: TIME.MONTH,
  },
}

export { NOTION, PAGES__HOMEPAGE, PAGES }
