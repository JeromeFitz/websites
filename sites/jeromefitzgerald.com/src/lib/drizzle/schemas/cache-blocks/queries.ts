import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import { and, eq, sql } from 'drizzle-orm'

import type { Block } from '@/lib/drizzle/schemas/cache-blocks/types'

import { drizzle } from '@/lib/drizzle/index'

import { cacheBlocks } from './schemas'

const sqlBase = `
SELECT
	id AS pid,
	key,
	value,
	inserted_at AS "insertedAt",
	updated_at AS "updatedAt",
	arr.item_object -> 'results' AS results
FROM
	cache_blocks,
	jsonb_array_elements(value)
WITH
	ordinality arr (item_object, POSITION)
WHERE
	site_id = ${envServer.POSTGRES_SITE_ID}
[REPLACE_WHERE]
[REPLACE_ORDERBY]
[REPLACE_LIMIT]
`

export async function getBlocks({ key }: { key: string }): Promise<Block[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', `AND key = '${key}'`)
        .replace('[REPLACE_ORDERBY]', '')
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}

export async function getBlocks2({
  key,
}: {
  key: string
}): Promise<Omit<Block, 'results'>[]> {
  return await drizzle
    .select()
    .from(cacheBlocks)
    .where(
      and(
        eq(cacheBlocks.siteId, envServer.POSTGRES_SITE_ID),
        eq(cacheBlocks.key, key),
      ),
    )
}
