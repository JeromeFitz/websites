import { pgTable } from 'drizzle-orm/pg-core'

import { init } from '../helpers'

const cacheVenues = pgTable('cache_venues', {
  ...init,
})

export { cacheVenues }
