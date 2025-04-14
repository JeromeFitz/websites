import { pgTable } from 'drizzle-orm/pg-core'

import { init } from '../helpers'

const cacheShows = pgTable('cache_shows', {
  ...init,
})

export { cacheShows }
