import { pgTable } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'

import { init } from '../helpers'

const cacheBlocks = pgTable('cache_blocks', {
  ...init,
})

export const selectSchemaBlocks = createSelectSchema(cacheBlocks)
export { cacheBlocks }
