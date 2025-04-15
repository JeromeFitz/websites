import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import { sql } from 'drizzle-orm'

import type { Segment } from '@/utils/getBySegment'

import { drizzle } from '@/lib/drizzle/index'

import type { Book } from './types'
export const segment: Segment = 'books'

const orderBy_default = `ORDER BY
  arr.item_object -> 'properties' -> 'Title' -> 'title' -> 0 ->> 'plain_text' ASC`

const sqlBase = `
SELECT
  id as pid,
	key,
	inserted_at AS "insertedAt",
	updated_at AS "updatedAt",
	timezone ('UTC', inserted_at::timestamptz) AS "insertedAtUTC",
	timezone ('America/New_York', inserted_at::timestamptz) AS "insertedAtET",
	inserted_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York' AS "insertedAtET2",
	timezone ('America/Los_Angeles', inserted_at::timestamptz) AS "insertedAtPT",
	arr.item_object -> 'properties' -> 'Author' -> 'rich_text' -> 0 ->> 'plain_text' AS "author",
	arr.item_object -> 'properties' -> 'Date.Published' -> 'date' ->> 'start' AS "datePublished",
	arr.item_object -> 'properties' -> 'Date.Read' AS "dateRead",
	arr.item_object -> 'properties' -> 'Date.Released' -> 'date' ->> 'start' AS "dateReleased",
	arr.item_object -> 'properties' -> 'Date.Released.ISO' -> 'formula' ->> 'string' AS "dateReleasedISO",
	arr.item_object ->> 'id' AS "id",
	CAST(arr.item_object -> 'properties' -> 'Is.Active' ->> 'checkbox' AS boolean) AS "isActive",
	CAST(arr.item_object -> 'properties' -> 'Is.Bookshop' ->> 'checkbox' AS boolean) AS "isBookshop",
	CAST(arr.item_object -> 'properties' -> 'Is.Indexed' ->> 'checkbox' AS boolean) AS "isIndexed",
	CAST(arr.item_object -> 'properties' -> 'Is.Published' ->> 'checkbox' AS boolean) AS "isPublished",
	arr.item_object -> 'properties' -> 'ISBN-10' -> 'rich_text' -> 0 ->> 'plain_text' AS "isbn10",
	arr.item_object -> 'properties' -> 'ISBN-13' -> 'rich_text' -> 0 ->> 'plain_text' AS "isbn13",
	arr.item_object -> 'properties' -> 'Publisher' -> 'rich_text' -> 0 ->> 'plain_text' AS "publisher",
	arr.item_object -> 'properties' -> 'SEO.Image' -> 'files' -> 0 AS "seoImage",
	arr.item_object -> 'properties' -> 'SEO.Image.Description' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoImageDescription",
	arr.item_object -> 'properties' -> 'Slug' -> 'rich_text' -> 0 ->> 'plain_text' AS "slug",
	arr.item_object -> 'properties' -> 'Slug.Preview' -> 'formula' ->> 'string' AS "slugPreview",
	arr.item_object -> 'properties' -> 'Status' -> 'select' ->> 'name' AS "status",
	arr.item_object -> 'properties' -> 'Status' -> 'select' ->> 'color' AS "statusColor",
	arr.item_object -> 'properties' -> 'Subtitle' -> 'rich_text' -> 0 ->> 'plain_text' AS "subtitle",
	arr.item_object -> 'properties' -> 'Title' -> 'title' -> 0 ->> 'plain_text' AS "title",
	arr.item_object -> 'properties' -> 'URL.Amazon' ->> 'url' AS "urlAmazon",
	arr.item_object -> 'properties' -> 'URL.Biblio' -> 'formula' ->> 'string' AS "urlBiblio",
	arr.item_object -> 'properties' -> 'URL.Bookshop' -> 'formula' ->> 'string' AS "urlBookshop",
	arr.item_object -> 'properties' -> 'URL.Goodreads' ->> 'url' AS "urlGoodreads"
FROM
	cache_books,
	jsonb_array_elements(value)
WITH
	ordinality arr (item_object, POSITION)
WHERE
	site_id = ${envServer.POSTGRES_SITE_ID}
[REPLACE_WHERE]
[REPLACE_ORDERBY]
[REPLACE_LIMIT]
`
export async function getBooks(): Promise<Book[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', '')
        .replace('[REPLACE_ORDERBY]', orderBy_default)
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
export async function getBooksWithLimit({
  limit = 10,
}: {
  limit: number
}): Promise<Book[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', '')
        .replace('[REPLACE_ORDERBY]', orderBy_default)
        .replace('[REPLACE_LIMIT]', `LIMIT ${limit}`),
    ),
  )
}
export async function getBook({ key }: { key: string }): Promise<Book[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', `AND key = '${key}'`)
        .replace('[REPLACE_ORDERBY]', '')
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
