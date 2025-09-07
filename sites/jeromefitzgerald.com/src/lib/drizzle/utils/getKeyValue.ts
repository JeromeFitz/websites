import type { Segment } from '@/utils/getBySegment'

import { sql } from 'drizzle-orm'

import { drizzle } from '@/lib/drizzle/index'
import { getBySegment } from '@/utils/getBySegment'

async function getKeyValue({ key, segment }: { key: string; segment: Segment }) {
  return await drizzle.execute(
    sql.raw(
      `SELECT id, key, value, inserted_at, updated_at FROM ${getBySegment[segment].drizzleDatabaseString} WHERE key = '${key}'`,
    ),
  )
}

export { getKeyValue }
