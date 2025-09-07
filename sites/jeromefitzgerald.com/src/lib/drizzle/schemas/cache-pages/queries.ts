import type { Page } from '@/lib/drizzle/schemas/cache-pages/types'
import type { Segment } from '@/utils/getBySegment'

import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import { sql } from 'drizzle-orm'

import { drizzle } from '@/lib/drizzle/index'
export const segment: Segment = 'pages'

const orderBy_default = `ORDER BY
  arr.item_object -> 'properties' -> 'Date.ISO' -> 'formula' ->> 'string' DESC`

const sqlBase = `
SELECT
	id AS "pid",
	key,
	value,
	inserted_at AS "insertedAt",
	updated_at AS "updatedAt",
	arr.item_object -> 'properties' -> 'Authors' -> 'people' -> 'array' AS "authors",
	arr.item_object -> 'properties' -> 'Date' -> 'date' ->> 'start' AS "date",
	arr.item_object ->> 'id' AS "id",
	CAST(arr.item_object -> 'properties' -> 'Is.Active' ->> 'checkbox' AS boolean) AS "isActive",
  CAST(arr.item_object -> 'properties' -> 'Is.Indexed' ->> 'checkbox' AS boolean) AS "isIndexed",
  CAST(arr.item_object -> 'properties' -> 'Is.Notion' ->> 'checkbox' AS boolean) AS "isNotion",
	CAST(arr.item_object -> 'properties' -> 'Is.Published' ->> 'checkbox' AS boolean) AS "isPublished",
	arr.item_object -> 'properties' -> 'SEO.Description' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoDescription",
	arr.item_object -> 'properties' -> 'SEO.Image' -> 'files' -> 0 AS "seoImage",
	arr.item_object -> 'properties' -> 'SEO.Image.Description' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoImageDescription",
	arr.item_object -> 'properties' -> 'Slug' -> 'rich_text' -> 0 ->> 'plain_text' AS "slug",
	arr.item_object -> 'properties' -> 'Slug.Preview' -> 'formula' ->> 'string' AS "slugPreview",
	arr.item_object -> 'properties' -> 'Title' -> 'title' -> 0 ->> 'plain_text' AS "title"
FROM
	cache_pages,
	jsonb_array_elements(value)
WITH
	ordinality arr (item_object, POSITION)
WHERE
	site_id = ${envServer.POSTGRES_SITE_ID}
[REPLACE_WHERE]
[REPLACE_ORDERBY]
[REPLACE_LIMIT]
`
export async function getPages(): Promise<Page[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', '')
        .replace('[REPLACE_ORDERBY]', orderBy_default)
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
export async function getPagesWithLimit({
  limit = 10,
}: {
  limit: number
}): Promise<Page[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', '')
        .replace('[REPLACE_ORDERBY]', orderBy_default)
        .replace('[REPLACE_LIMIT]', `LIMIT ${limit}`),
    ),
  )
}
export async function getPage({ key }: { key: string }): Promise<Page[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', `AND key = '${key}'`)
        .replace('[REPLACE_ORDERBY]', '')
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
