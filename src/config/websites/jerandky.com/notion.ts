import { DATA_TYPES } from '@jeromefitz/temp/package/helper'
import { DatabaseInfo } from '@jeromefitz/temp/package/schema/types'

const PAGES__HOMEPAGE = 'homepage'
const PAGES: string[] = ['about']

const NOTION: DatabaseInfo = {
  BLOG: {
    active: true,
    database_id: '27789ca1-49e8-4490-bb29-5a3fdec0ec77',
    dataTypes: [
      DATA_TYPES.LISTING,
      DATA_TYPES.LISTING_BY_DATE,
      DATA_TYPES.SLUG_BY_ROUTE,
    ],
    name: 'BLOG',
    page_id__seo: 'bf958989-7433-4701-8896-61377571cd1f',
    routeType: 'blog',
    slug: 'blog',
  },
  EPISODES: {
    active: true,
    database_id: 'f09fac69-3045-46cc-9209-44b13665bada',
    dataTypes: [DATA_TYPES.SLUG, DATA_TYPES.SLUG_BY_ROUTE],
    name: 'EPISODES',
    page_id__seo: 'feb5acb5-2890-41e9-897c-878054228eab',
    routeType: 'episodes',
    slug: 'episodes',
  },
  EVENTS: {
    active: true,
    database_id: '23e3954d-c714-4279-9f81-a8a51c9087ba',
    dataTypes: [
      DATA_TYPES.LISTING,
      DATA_TYPES.LISTING_BY_DATE,
      DATA_TYPES.SLUG_BY_ROUTE,
    ],
    name: 'EVENTS',
    page_id__seo: '73764c77-b623-445f-ac75-63ddaeefea20',
    routeType: 'events',
    slug: 'events',
  },
  PAGES: {
    active: false,
    database_id: '96432799-6f4c-46e2-a618-d0d0eb2a79f2',
    dataTypes: [DATA_TYPES.SLUG],
    name: 'PAGES',
    page_id__seo: '',
    routeType: 'pages',
    slug: 'pages',
  },
  PEOPLE: {
    active: false,
    database_id: '6cedcf32-de09-4e81-a658-1aea384821e5',
    dataTypes: [DATA_TYPES.LISTING, DATA_TYPES.SLUG],
    name: 'PEOPLE',
    page_id__seo: 'bf25bb0a-6078-42bc-9cc6-6fbf756ae141',
    routeType: 'people',
    slug: 'people',
  },
  PODCASTS: {
    active: true,
    database_id: 'daed70c1-43b2-4177-986b-fe874d346b4e',
    dataTypes: [DATA_TYPES.LISTING, DATA_TYPES.SLUG],
    name: 'PODCASTS',
    page_id__seo: '5391b1d2-a347-47df-a574-efb7a90f18cf',
    routeType: 'podcasts',
    slug: 'podcasts',
  },
  SEO: {
    active: false,
    database_id: '07dd136e-92cd-49a3-a99d-f409ac3ca87b',
    dataTypes: [DATA_TYPES.SLUG],
    name: 'SEO',
    page_id__seo: '',
    routeType: 'seo',
    slug: 'seo',
  },
  SHOWS: {
    active: true,
    database_id: '552ca1a6-4729-4950-9cd4-cebbec996b91',
    dataTypes: [DATA_TYPES.LISTING, DATA_TYPES.SLUG],
    name: 'SHOWS',
    page_id__seo: 'decdf268-7988-4afd-90fc-de165cabe68d',
    routeType: 'shows',
    slug: 'shows',
  },
  VENUES: {
    active: true,
    database_id: 'e7bac7a0-e489-4e97-a242-c9934f645621',
    dataTypes: [DATA_TYPES.LISTING, DATA_TYPES.SLUG],
    name: 'VENUES',
    page_id__seo: 'be79732f-d9f3-4855-866b-6f0f4573410b',
    routeType: 'venues',
    slug: 'venues',
  },
}

export { NOTION, PAGES__HOMEPAGE, PAGES }
