import { envServer } from '@jeromefitz/next-config/env.server.mjs'

// import { and, eq, sql } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

import type { Blog } from '@/lib/drizzle/schemas/cache-blogs/types'
import type { Segment } from '@/utils/getBySegment'

import { drizzle } from '@/lib/drizzle/index'

// import { cacheBlogs, selectSchemaBlogs } from './schemas'

export const segment: Segment = 'blog'

const orderBy_default = `ORDER BY
  arr.item_object -> 'properties' -> 'Date.ISO' -> 'formula' ->> 'string' DESC`

const sqlBase = `
SELECT
	id AS pid,
	key,
	value,
	inserted_at AS "insertedAt",
	updated_at "updatedAt",
	arr.item_object -> 'properties' -> 'Authors' -> 'people' -> 'array' AS "authors",
	arr.item_object -> 'properties' -> 'Date' -> 'date' ->> 'start' AS "date",
	arr.item_object -> 'properties' -> 'Date.DayOfMonth' -> 'formula' ->> 'string' AS "dateDayOfMonth",
	arr.item_object -> 'properties' -> 'Date.DayOfMonthOrdinal' -> 'formula' ->> 'string' AS "dateDayOfMonthOrdinal",
	arr.item_object -> 'properties' -> 'Date.DayOfWeek' -> 'formula' ->> 'string' AS "dateDayOfWeek",
	arr.item_object -> 'properties' -> 'Date.DayOfWeekOrdinal' -> 'formula' ->> 'string' AS "dateDayOfWeekOrdinal",
	arr.item_object -> 'properties' -> 'Date.ISO' -> 'formula' ->> 'string' AS "dateISO",
	arr.item_object -> 'properties' -> 'Date.Month' -> 'formula' ->> 'string' AS "dateMonth",
	arr.item_object -> 'properties' -> 'Date.MonthNameAbbr' -> 'formula' ->> 'string' AS "dateMonthNameAbbr",
	arr.item_object -> 'properties' -> 'Date.Published' -> 'date' ->> 'start' AS "datePublished",
	arr.item_object -> 'properties' -> 'Date.Time' -> 'formula' ->> 'string' AS "dateTime",
	arr.item_object -> 'properties' -> 'Date.Timezone' -> 'formula' ->> 'string' AS "dateTimeZone",
	arr.item_object -> 'properties' -> 'Date.WeekNumber' -> 'formula' ->> 'string' AS "dateWeekNumber",
	arr.item_object -> 'properties' -> 'Date.Year' -> 'formula' ->> 'string' AS "dateYear",
	arr.item_object -> 'properties' -> 'ID' -> 'formula' ->> 'string' AS "id",
	CAST(arr.item_object -> 'properties' -> 'Is.Indexed' ->> 'checkbox' AS boolean) AS "isIndexed",
	CAST(arr.item_object -> 'properties' -> 'Is.Published' ->> 'checkbox' AS boolean) AS "isPublished",
	arr.item_object -> 'properties' -> 'SEO.Description' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoDescription",
	arr.item_object -> 'properties' -> 'SEO.Image' -> 'files' -> 0 AS "seoImage",
	arr.item_object -> 'properties' -> 'SEO.Image.Description' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoImageDescription",
	arr.item_object -> 'properties' -> 'SEO.Keywords' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoKeywords",
	arr.item_object -> 'properties' -> 'Slug' -> 'rich_text' -> 0 ->> 'plain_text' AS "slug",
	arr.item_object -> 'properties' -> 'Slug.Preview' -> 'formula' ->> 'string' AS "slugPreview",
	arr.item_object -> 'properties' -> 'Title' -> 'title' -> 0 ->> 'plain_text' AS "title"
FROM
	cache_blogs,
	jsonb_array_elements(value)
WITH
	ordinality arr (item_object, POSITION)
WHERE
	site_id = ${envServer.POSTGRES_SITE_ID}
 [REPLACE_WHERE]
[REPLACE_ORDERBY]
[REPLACE_LIMIT]
`
export async function getBlogs(): Promise<Blog[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', '')
        .replace('[REPLACE_ORDERBY]', orderBy_default)
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
export async function getBlogsWithLimit({
  limit = 10,
}: {
  limit: number
}): Promise<Blog[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', '')
        .replace('[REPLACE_ORDERBY]', orderBy_default)
        .replace('[REPLACE_LIMIT]', `LIMIT ${limit}`),
    ),
  )
}

export async function getBlog({ key }: { key: string }): Promise<Blog[]> {
  // const rows = await drizzle
  //   .select({
  //     id: cacheBlogs.id,
  //     uuid: cacheBlogs.uuid,
  //     siteId: cacheBlogs.siteId,
  //     key: cacheBlogs.key,
  //     value: cacheBlogs.value,
  //     insertedAt: cacheBlogs.insertedAt,
  //     updatedAt: cacheBlogs.updatedAt,
  //   })
  //   .from(cacheBlogs)
  //   .where(eq(cacheBlogs.siteId, envServer.POSTGRES_SITE_ID))
  //   .limit(1)
  // const parsed = selectSchemaBlogs.parse(rows[0])
  // console.dir(`> parsed`)
  // console.dir(parsed)

  // const foo = await drizzle
  //   .select()
  //   .from(cacheBlogs)
  //   .where(
  //     and(
  //       eq(cacheBlogs.siteId, envServer.POSTGRES_SITE_ID),
  //       eq(cacheBlogs.key, key),
  //     ),
  //   )
  // const parsed2 = selectSchemaBlogs.parse(foo[0])
  // console.dir(`> parsed2`)
  // console.dir(parsed2)

  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', `AND key = '${key}'`)
        .replace('[REPLACE_ORDERBY]', '')
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
