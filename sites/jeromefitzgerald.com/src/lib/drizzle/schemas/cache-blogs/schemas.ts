import { pgTable } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'

import { init } from '../helpers'

const cacheBlogs = pgTable('cache_blogs', {
  ...init,
})

export const selectSchemaBlogs = createSelectSchema(cacheBlogs)
export { cacheBlogs }
