import { Client } from '@notionhq/client'

import { PROPERTIES } from '~lib/notion/schema'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

const dateTimestamp = new Date().toISOString()
// const dateTimestampBlog = new Date('2020-01-01').toISOString()

const QUERIES = {
  // @todo(notion) Published or Event?
  dateBefore: {
    property: PROPERTIES.datePublished.notion,
    date: {
      before: dateTimestamp,
    },
  },
  // @todo(notion) Published or Event?
  dateOnOrAfter: {
    property: PROPERTIES.datePublished.notion,
    date: {
      on_or_after: dateTimestamp,
    },
  },
  published: {
    property: PROPERTIES.isPublished.notion,
    checkbox: {
      equals: false,
    },
  },
  slug: {
    property: PROPERTIES.slug.notion,
    text: {
      equals: '',
    },
  },
}

export { notion, QUERIES }
