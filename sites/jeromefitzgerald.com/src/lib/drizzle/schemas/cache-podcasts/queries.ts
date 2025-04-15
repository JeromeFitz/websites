import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import { sql } from 'drizzle-orm'

import type { Podcast } from '@/lib/drizzle/schemas/cache-podcasts/types'
import type { Segment } from '@/utils/getBySegment'

import { drizzle } from '@/lib/drizzle/index'
export const segment: Segment = 'podcasts'

const orderBy_default = `ORDER BY
  arr.item_object -> 'properties' -> 'Date.ISO' -> 'formula' ->> 'string' DESC`

const sqlBase = `
SELECT
	id AS pid,
	key,
	value,
	inserted_at AS "insertedAt",
	updated_at AS "updatedAt",
	arr.item_object -> 'properties' -> 'Author' -> 'people' -> 'array' AS "author",
	arr.item_object -> 'properties' -> 'Author.Email' -> 'rich_text' -> 0 ->> 'plain_text' AS "authorEmail",
	arr.item_object -> 'properties' -> 'Date' -> 'date' ->> 'start' AS "date",
	arr.item_object -> 'properties' -> 'Date.Created' ->> 'created_time' AS "dateCreated",
	arr.item_object -> 'properties' -> 'Date.DayOfMonth' -> 'formula' ->> 'string' AS "dateDayOfMonth",
	arr.item_object -> 'properties' -> 'Date.DayOfMonthOrdinal' -> 'formula' ->> 'string' AS "dateDayOfMonthOrdinal",
	arr.item_object -> 'properties' -> 'Date.DayOfWeek' -> 'formula' ->> 'string' AS "dateDayOfWeek",
	arr.item_object -> 'properties' -> 'Date.DayOfWeekAbbr' -> 'formula' ->> 'string' AS "dateDayOfWeekAbbr",
	arr.item_object -> 'properties' -> 'Date.DaysUntilEvent' -> 'formula' ->> 'number' AS "dateDaysUntilEvent",
  arr.item_object -> 'properties' -> 'Date.HoursUntilEvent' -> 'formula' ->> 'number' AS "dateHoursUntilEvent",
	arr.item_object -> 'properties' -> 'Date.ISO' -> 'formula' ->> 'string' AS "dateIso",
	arr.item_object -> 'properties' -> 'Date.Month' -> 'formula' ->> 'string' AS "dateMonth",
	arr.item_object -> 'properties' -> 'Date.MonthNameAbbr' -> 'formula' ->> 'string' AS "dateMonthNameAbbr",
	arr.item_object -> 'properties' -> 'Date.Published' -> 'date' ->> 'start' AS "datePublished",
	arr.item_object -> 'properties' -> 'Date.Time' -> 'formula' ->> 'string' AS "dateTime",
	arr.item_object -> 'properties' -> 'Date.Timezone' -> 'formula' ->> 'string' AS "dateTimezone",
	arr.item_object -> 'properties' -> 'Date.WeekNumber' -> 'formula' ->> 'string' AS "dateWeekNumber",
	arr.item_object -> 'properties' -> 'Date.Year' -> 'formula' ->> 'string' AS "dateYear",
	arr.item_object -> 'properties' -> 'Festival' -> 'multi_select' AS "festival",
	arr.item_object -> 'properties' -> 'ID' -> 'formula' ->> 'string' AS "id",
	CAST(arr.item_object -> 'properties' -> 'Is.Active' ->> 'checkbox' AS boolean) AS "isActive",
	CAST(arr.item_object -> 'properties' -> 'Is.Explicit' ->> 'checkbox' AS boolean) AS "isExplicit",
	CAST(arr.item_object -> 'properties' -> 'Is.Indexed' ->> 'checkbox' AS boolean) AS "isIndexed",
	CAST(arr.item_object -> 'properties' -> 'Is.Published' ->> 'checkbox' AS boolean) AS "isPublished",
	arr.item_object -> 'properties' -> 'Meta.Apple.ID' -> 'rich_text' -> 0 ->> 'plain_text' AS "metaAppleId",
	arr.item_object -> 'properties' -> 'Meta.Apple.URL' ->> 'url' AS "metaAppleUrl",
	arr.item_object -> 'properties' -> 'Meta.Spotify.ID' -> 'rich_text' -> 0 ->> 'plain_text' AS "metaSpotifyId",
	arr.item_object -> 'properties' -> 'Meta.Spotify.URL' ->> 'url' AS "metaSpotifyUrl",
	arr.item_object -> 'properties' -> 'Relation.Episodes' -> 'relation' AS "relationEpisodes",
	arr.item_object -> 'properties' -> 'Relation.People.Host' -> 'relation' AS "relationPeopleProducer",
	arr.item_object -> 'properties' -> 'Relation.People.Thanks' -> 'relation' AS "relationPeopleThanks",
	arr.item_object -> 'properties' -> 'Rollup.Episodes.Slug' -> 'rollup' -> 'array' AS "rollupEpisodesSlug",
	arr.item_object -> 'properties' -> 'Rollup.Episodes.SlugPreview' -> 'rollup' -> 'array' AS "rollupEpisodesSlugPreview",
	arr.item_object -> 'properties' -> 'Rollup.Episodes.Title' -> 'rollup' -> 'array' AS "rollupEpisodesTitle",
	arr.item_object -> 'properties' -> 'Rollup.People.Host.Title' -> 'rollup' -> 'array' AS "rollupPeopleHostTitle",
	arr.item_object -> 'properties' -> 'Rollup.People.Producer.Title' -> 'rollup' -> 'array' AS "rollupPeopleProducerTitle",
	arr.item_object -> 'properties' -> 'Rollup.People.Thanks.Title' -> 'rollup' -> 'array' AS "rollupPeopleThanksTitle",
	arr.item_object -> 'properties' -> 'SEO.Description' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoDescription",
	arr.item_object -> 'properties' -> 'SEO.Image' -> 'files' -> 0 AS "seoImage",
	arr.item_object -> 'properties' -> 'SEO.Image.Description' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoImageDescription",
	arr.item_object -> 'properties' -> 'SEO.Keywords' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoKeywords",
	arr.item_object -> 'properties' -> 'Slug' -> 'rich_text' -> 0 ->> 'plain_text' AS "slug",
	arr.item_object -> 'properties' -> 'Slug.Preview' -> 'formula' ->> 'string' AS "slugPreview",
	arr.item_object -> 'properties' -> 'Social.Spotify' ->> 'url' AS "socialSpotify",
	arr.item_object -> 'properties' -> 'Spotify.ID' -> 'rich_text' -> 0 ->> 'plain_text' AS "spotifyId",
	arr.item_object -> 'properties' -> 'Spotify.URL' ->> 'url' AS "spotifyUrl",
	arr.item_object -> 'properties' -> 'Title' -> 'title' -> 0 ->> 'plain_text' AS "title",
	arr.item_object -> 'properties' -> '.Type' -> 'select' ->> 'name' AS "type"
FROM
	cache_podcasts,
	jsonb_array_elements(value)
WITH
	ordinality arr (item_object, POSITION)
WHERE
	site_id = ${envServer.POSTGRES_SITE_ID}
[REPLACE_WHERE]
[REPLACE_ORDERBY]
[REPLACE_LIMIT]
`
export async function getPodcasts(): Promise<Podcast[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', '')
        .replace('[REPLACE_ORDERBY]', orderBy_default)
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
export async function getPodcastsWithLimit({
  limit = 10,
}: {
  limit: number
}): Promise<Podcast[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', '')
        .replace('[REPLACE_ORDERBY]', orderBy_default)
        .replace('[REPLACE_LIMIT]', `LIMIT ${limit}`),
    ),
  )
}
export async function getPodcast({ key }: { key: string }): Promise<Podcast[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', `AND key = '${key}'`)
        .replace('[REPLACE_ORDERBY]', '')
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
