import { pgTable } from 'drizzle-orm/pg-core'

import { init } from '../helpers'

const cacheEvents = pgTable('cache_events', {
  ...init,
})

export { cacheEvents }
