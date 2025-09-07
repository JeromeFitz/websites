import { pgTable, text } from 'drizzle-orm/pg-core'

import { init } from '../helpers'

const cacheImages = pgTable('cache_images', {
  ...init,
  blurDataUrl: text('blur_data_url').notNull(),
  height: text().notNull(),
  slug: text().notNull(),
  src: text().notNull(),
  width: text().notNull(),
})

export { cacheImages }
