/**
 * @todo(notion)
 *
 * PAGES should come from DATABASE
 * SEO should come from DATABASE
 * => ex) GET SEO first _then_ dynamicaly generate/store info
 *
 */
import { DatabaseInfo } from '~lib/notion/schema/types'

const PAGES__HOMEPAGE = 'homepage'
const PAGES: string[] = ['about', 'colophon', 'contact']

const NOTION: DatabaseInfo = {
  BLOG: {
    active: true,
    database_id: '27360d9b5f274dc2ac19ad09837b6860',
    name: 'BLOG',
    page_id__seo: '31d8d3edb6844789a4fcd8dd4a1d488c',
    routeType: 'blog',
    slug: 'blog',
  },
  EPISODES: {
    active: true,
    database_id: '2dbb52e80e5d49bfbf5ac1a98f6c07d4',
    name: 'EPISODES',
    page_id__seo: '08fadd3ea6294d0eaf57c3e79123b420',
    routeType: 'episodes',
    slug: 'episodes',
  },
  EVENTS: {
    active: true,
    database_id: '9248dbc7a4c141aab16551bc87ed5422',
    name: 'EVENTS',
    page_id__seo: 'dd10d84d6d934a69ba25963a8c52a95b',
    routeType: 'events',
    slug: 'events',
  },
  PAGES: {
    active: false,
    database_id: 'c6ef23945c684e10a5f6aafb4c7ad115',
    name: 'PAGES',
    page_id__seo: '',
    routeType: 'pages',
    slug: 'pages',
  },
  PEOPLE: {
    active: false,
    database_id: '66dedc454721449790255de1dbe49472',
    name: 'PEOPLE',
    page_id__seo: 'c3ef887b3577408aa14616ee84d948f9',
    routeType: 'people',
    slug: 'people',
  },
  PODCASTS: {
    active: true,
    database_id: '601679d51dba4dd1b0bc1efc20800e5a',
    name: 'PODCASTS',
    page_id__seo: '52de0748cd4d4152a803f0b1fac9465d',
    routeType: 'podcasts',
    slug: 'podcasts',
  },
  SEO: {
    active: false,
    database_id: 'dc09ee3b04da4fad859a26113df607ba',
    name: 'SEO',
    page_id__seo: '',
    routeType: 'seo',
    slug: 'seo',
  },
  SHOWS: {
    active: true,
    database_id: '30471ded18b34af982d2f0064c4bcbf1',
    name: 'SHOWS',
    page_id__seo: '7f18c17dc86e429a850580cdf874022b',
    routeType: 'shows',
    slug: 'shows',
  },
  VENUES: {
    active: true,
    database_id: 'ab2134096d7f48ad9c86c576b59b6c0e',
    name: 'VENUES',
    page_id__seo: '92d703d8c9d94e61bed37b205c928bfb',
    routeType: 'venues',
    slug: 'venues',
  },
}

export { NOTION, PAGES__HOMEPAGE, PAGES }
