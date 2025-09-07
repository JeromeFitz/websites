import type { Segment } from '@/utils/getBySegment'

import { sql } from 'drizzle-orm'

import { drizzle } from '@/lib/drizzle/index'
import { getBySegment } from '@/utils/getBySegment'

async function getKeyValues({ segment }: { segment: Segment }) {
  return await drizzle.execute(
    sql.raw(
      `SELECT id, key, value, inserted_at, updated_at FROM ${getBySegment[segment].drizzleDatabaseString}`,
    ),
  )
}

export { getKeyValues }
