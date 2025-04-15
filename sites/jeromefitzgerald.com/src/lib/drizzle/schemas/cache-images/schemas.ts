/* eslint-disable perfectionist/sort-objects */
import { pgTable, text } from 'drizzle-orm/pg-core'

import { init } from '../helpers'

const cacheImages = pgTable('cache_images', {
  ...init,
  blurDataUrl: text('blur_data_url').notNull(),
  slug: text().notNull(),
  src: text().notNull(),
  width: text().notNull(),
  height: text().notNull(),
})

export { cacheImages }
