import { pgTable } from 'drizzle-orm/pg-core'

import { init } from '../helpers'

const cacheBooks = pgTable('cache_books', {
  ...init,
})

export { cacheBooks }
