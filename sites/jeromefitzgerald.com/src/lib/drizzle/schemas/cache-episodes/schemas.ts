import { pgTable } from 'drizzle-orm/pg-core'

import { init } from '../helpers'

const cacheEpisodes = pgTable('cache_episodes', {
  ...init,
})

export { cacheEpisodes }
