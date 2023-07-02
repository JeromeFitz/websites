import { getDataTypes } from '@jeromefitz/notion/constants'
import type { DatabaseInfo, Databases } from '@jeromefitz/notion/schema'

import { NOTION, PAGES__HOMEPAGE, PAGES } from './notion'
import { sitemapExcludes } from './seo'

const getDynamicDatabases = (obj: DatabaseInfo) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key] = key
    return acc
  }, {})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const DATABASES: Databases = getDynamicDatabases(NOTION)

// console.dir(`____ DATABASES `)
// console.dir(DATABASES)

const ROUTE_TYPES = Object.keys(NOTION)
  .map((k) => !!NOTION[k].active && NOTION[k].routeType.toUpperCase())
  .filter(Boolean)

// console.dir(`____ ROUTE_TYPES `)
// console.dir(ROUTE_TYPES)

const ROUTE_TYPES_BY_DATA_TYPES = new Object()
getDataTypes.map((type: any) => (ROUTE_TYPES_BY_DATA_TYPES[type] = []))
Object.keys(NOTION).map((k) => {
  if (!!NOTION[k].active) {
    NOTION[k].dataTypes.map((dataType) =>
      ROUTE_TYPES_BY_DATA_TYPES[dataType].push(k.toUpperCase())
    )
  }
})

// console.dir(`____ ROUTE_TYPES_BY_DATA_TYPES`)
// console.dir(ROUTE_TYPES_BY_DATA_TYPES)

const ROUTE_META = Object.keys(NOTION)
  .map(
    (k) =>
      !!NOTION[k].active &&
      !!NOTION[k].routeMeta &&
      NOTION[k].routeType.toUpperCase()
  )
  .filter(Boolean)

// console.dir(`____ ROUTE_META `)
// console.dir(ROUTE_META)

const notionConfig = {
  DATABASES,
  NOTION,
  PAGES__HOMEPAGE,
  PAGES,
  ROUTE_META,
  ROUTE_TYPES_BY_DATA_TYPES,
  ROUTE_TYPES,
}

// console.dir(`____ notionConfig`)
// console.dir(notionConfig)

// console.dir(`____ NOTION `)
// console.dir(NOTION)

const pluralRules = [
  { rule: /cast$/i, replacement: 'cast' },
  { rule: /emeritus$/i, replacement: 'emeritus' },
  { rule: /crew$/i, replacement: 'crew' },
  { rule: /lineup$/i, replacement: 'lineup' },
  { rule: /music$/i, replacement: 'music' },
  { rule: /thanks$/i, replacement: 'thanks' },
  // { rule: /tags$/i, replacement: 'Tags' },
]

export { notionConfig, pluralRules, sitemapExcludes }

// @todo(notion) uh, make this dynamic please haha
export const TAGS = {
  '60dd326d-687e-4e64-a49b-46bfba218ffb': {
    id: '60dd326d-687e-4e64-a49b-46bfba218ffb',
    icon: {
      emoji: '🎭️',
    },
    slug: 'improv',
    title: 'Improv',
  },
  '9ae68a2d-44d0-44c2-8e73-81c3018bbc71': {
    id: '9ae68a2d-44d0-44c2-8e73-81c3018bbc71',
    icon: {
      emoji: '🎼️',
    },
    slug: 'music',
    title: 'Music',
  },
  'd31c1ac1-3f1a-4931-9841-c7fcffaabdf8': {
    id: 'd31c1ac1-3f1a-4931-9841-c7fcffaabdf8',
    icon: {
      emoji: '🧑‍🎤️',
    },
    slug: 'musical',
    title: 'Musical',
  },
  '7093497b-4869-4d2f-8803-a26f4fc871d6': {
    id: '7093497b-4869-4d2f-8803-a26f4fc871d6',
    icon: {
      emoji: '🖊️',
    },
    slug: 'sketch',
    title: 'Sketch',
  },
  '4bf09af2-078e-4101-8519-3500c2d68244': {
    id: '4bf09af2-078e-4101-8519-3500c2d68244',
    icon: {
      emoji: '🎤️',
    },
    slug: 'stand-up',
    title: 'Stand-Up',
  },
}
