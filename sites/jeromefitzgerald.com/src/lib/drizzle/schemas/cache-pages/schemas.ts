import { pgTable } from 'drizzle-orm/pg-core'

import { init } from '../helpers'

const cachePages = pgTable('cache_pages', {
  ...init,
})

export { cachePages }
