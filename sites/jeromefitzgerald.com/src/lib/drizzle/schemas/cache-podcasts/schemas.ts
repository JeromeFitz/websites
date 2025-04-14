import { pgTable } from 'drizzle-orm/pg-core'

import { init } from '../helpers'

const cachePodcasts = pgTable('cache_podcasts', {
  ...init,
})

export { cachePodcasts }
