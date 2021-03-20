import navigation from './navigation'
import getCache from '~config/notion/schema/getCache'
import {
  blog,
  episodes,
  events,
  pages,
  people,
  podcasts,
  seo,
  shows,
  users,
  venues,
} from '~config/notion/schema/routeTypes'

const notion = {
  topLevel: {
    icon: '😵️',
    id: '11b0f69c-217f-4549-b1f3-787408337cf3',
    title: process.env.NEXT_PUBLIC__SITE,
  },
  website: {
    icon: '🕸️',
    id: '207d0386-1e39-42b5-b3ec-74b34d051b3f',
    title: 'Website Data',
  },
}

const merged = {
  ...blog,
  ...events,
  ...episodes,
  ...pages,
  ...people,
  ...podcasts,
  ...seo,
  ...shows,
  ...users,
  ...venues,
}

const routeTypesArray = [
  // 'blog',
  'episodes',
  // 'events',
  'pages',
  // 'people',
  'podcasts',
  'seo',
  // 'shows',
  // 'users',
  // 'venues',
]

/**
 * @todo fix anti-pattern, this is confusing
 */
const isPages = (routeType) => {
  const isPage = routeTypesArray.indexOf(routeType) > -1
  return !isPage
}

export { getCache, isPages, merged, navigation, notion, routeTypesArray }
