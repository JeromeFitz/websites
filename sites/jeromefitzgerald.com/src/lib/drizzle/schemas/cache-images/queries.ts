import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import { eq, sql } from 'drizzle-orm'

import { drizzle } from '@/lib/drizzle/index'

import type { CacheImage } from './types'

import { cacheImages } from './schemas'

export const segment = 'images'

export async function getImageKeyValue({
  key,
}: {
  key: string
}): Promise<CacheImage[]> {
  return await drizzle.execute(
    sql.raw(`
SELECT
	id,
	key,
	value,
	slug,
	src,
	width AS "width",
	height AS "height",
	blur_data_url AS "blurDataUrl",
	inserted_at AS "insertedAt",
	updated_at AS "updatedAt"
FROM
  cache_images
WHERE
	site_id = ${envServer.POSTGRES_SITE_ID}
  AND
  key = '${key}'`),
  )
}

export async function getImageKeyValue2({
  key,
}: {
  key: string
}): Promise<CacheImage[]> {
  return await drizzle.select().from(cacheImages).where(eq(cacheImages.key, key))
}
