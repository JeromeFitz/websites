import type { Venue } from '@/lib/drizzle/schemas/cache-venues/types'
import type { Segment } from '@/utils/getBySegment'

import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import { sql } from 'drizzle-orm'

import { drizzle } from '@/lib/drizzle/index'
export const segment: Segment = 'venues'

const orderBy_default = `ORDER BY
  arr.item_object -> 'properties' -> 'Date.ISO' -> 'formula' ->> 'string' DESC`

const sqlBase = `
SELECT
	id AS pid,
	key,
	value,
	inserted_at AS "insertedAt",
	updated_at AS "updatedAt",
	arr.item_object -> 'properties' -> 'Address.City' -> 'rich_text' -> 0 ->> 'plain_text' AS "addressCity",
	arr.item_object -> 'properties' -> 'Address.Latitude' ->> 'number' AS "addressLatitude",
	arr.item_object -> 'properties' -> 'Address.Longitude' ->> 'number' AS "addressLongitude",
	arr.item_object -> 'properties' -> 'Address.Neighborhood' -> 'rich_text' -> 0 ->> 'plain_text' AS "addressNeighborhood",
	arr.item_object -> 'properties' -> 'Address.State' -> 'select' ->> 'name' AS "addressState",
	arr.item_object -> 'properties' -> 'Address.Street' -> 'rich_text' -> 0 ->> 'plain_text' AS "addressStreet",
	arr.item_object -> 'properties' -> 'Address.PostalCode' ->> 'number' AS "addressPostalCode",
	arr.item_object -> 'properties' -> 'Authors' -> 'people' -> 0 ->> 'name' AS "authors",
	arr.item_object -> 'properties' -> 'Date.Published' -> 'date' ->> 'start' AS "datePublished",
	arr.item_object -> 'properties' -> 'ID' -> 'formula' ->> 'string' AS "id",
	CAST(arr.item_object -> 'properties' -> 'Is.Indexed' ->> 'checkbox' AS boolean) AS "isIndexed",
	CAST(arr.item_object -> 'properties' -> 'Is.Published' ->> 'checkbox' AS boolean) AS "isPublished",
	arr.item_object -> 'properties' -> 'Phone' ->> 'phone_number' AS "phone",
	arr.item_object -> 'properties' -> 'Relation.Episodes' -> 'relation' AS "relationEpisodes",
	arr.item_object -> 'properties' -> 'Relation.Events' -> 'relation' AS "relationEvents",
	arr.item_object -> 'properties' -> 'SEO.Description' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoDescription",
	arr.item_object -> 'properties' -> 'SEO.Image' -> 'files' -> 0 AS "seoImage",
	arr.item_object -> 'properties' -> 'SEO.Image.Description' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoImageDescription",
	arr.item_object -> 'properties' -> 'SEO.Keywords' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoKeywords",
	arr.item_object -> 'properties' -> 'Slug' -> 'rich_text' -> 0 ->> 'plain_text' AS "slug",
	arr.item_object -> 'properties' -> 'Slug.Preview' -> 'formula' ->> 'string' AS "slugPreview",
	arr.item_object -> 'properties' -> 'Social.Bluesky' ->> 'url' AS "socialBluesky",
	arr.item_object -> 'properties' -> 'Social.Facebook' ->> 'url' AS "socialFacebook",
	arr.item_object -> 'properties' -> 'Social.Instagram' ->> 'url' AS "socialInstagram",
	arr.item_object -> 'properties' -> 'Social.Twitter' ->> 'url' AS "socialTwitter",
	arr.item_object -> 'properties' -> 'Social.Website' ->> 'url' AS "socialWebsite",
	arr.item_object -> 'properties' -> 'Title' -> 'title' -> 0 ->> 'plain_text' AS "title"
FROM
	cache_venues,
	jsonb_array_elements(value)
WITH
	ordinality arr (item_object, POSITION)
WHERE
	site_id = ${envServer.POSTGRES_SITE_ID}
[REPLACE_WHERE]
[REPLACE_ORDERBY]
[REPLACE_LIMIT]
`
export async function getVenues(): Promise<Venue[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', '')
        .replace('[REPLACE_ORDERBY]', orderBy_default)
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
export async function getVenuesWithLimit({
  limit = 10,
}: {
  limit: number
}): Promise<Venue[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', '')
        .replace('[REPLACE_ORDERBY]', orderBy_default)
        .replace('[REPLACE_LIMIT]', `LIMIT ${limit}`),
    ),
  )
}
export async function getVenue({ key }: { key: string }): Promise<Venue[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', `AND key = '${key}'`)
        .replace('[REPLACE_ORDERBY]', '')
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
