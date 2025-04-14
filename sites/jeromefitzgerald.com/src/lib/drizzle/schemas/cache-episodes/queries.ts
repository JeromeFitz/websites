import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import { sql } from 'drizzle-orm'

import type { Episode } from '@/lib/drizzle/schemas/cache-episodes/types'
import type { Segment } from '@/utils/getBySegment'

import { drizzle } from '@/lib/drizzle/index'
export const segment: Segment = 'episodes'

const orderBy_default = `ORDER BY
  arr.item_object -> 'properties' -> 'Date.ISO' -> 'formula' ->> 'string' DESC`

const sqlBase = `
SELECT
	id AS "pid",
	key,
	value,
	inserted_at AS "insertedAt",
	updated_at AS "updatedAt",
	arr.item_object -> 'properties' -> 'Authors' -> 'people' -> 0 ->> 'name' AS "authors",
	arr.item_object -> 'properties' -> 'Date' -> 'date' ->> 'start' AS "date",
	arr.item_object -> 'properties' -> 'Date.Created' ->> 'created_time' AS "dateCreated",
	arr.item_object -> 'properties' -> 'Date.DayOfMonth' -> 'formula' ->> 'string' AS "dateDayOfMonth",
	arr.item_object -> 'properties' -> 'Date.DayOfMonthOrdinal' -> 'formula' ->> 'string' AS "dateDayOfMonthOrdinal",
	arr.item_object -> 'properties' -> 'Date.DayOfWeek' -> 'formula' ->> 'string' AS "dateDayOfWeek",
	arr.item_object -> 'properties' -> 'Date.DayOfWeekAbbr' -> 'formula' ->> 'string' AS "dateDayOfWeekAbbr",
	arr.item_object -> 'properties' -> 'Date.DaysUntilEvent' -> 'formula' ->> 'string' AS "dateDaysUntilEvent",
	arr.item_object -> 'properties' -> 'Date.HoursUntilEvent' -> 'formula' ->> 'string' AS "dateHoursUntilEvent",
	arr.item_object -> 'properties' -> 'Date.ISO' -> 'formula' ->> 'string' AS "dateIso",
	arr.item_object -> 'properties' -> 'Date.Month' -> 'formula' ->> 'string' AS "dateMonth",
	arr.item_object -> 'properties' -> 'Date.MonthNameAbbr' -> 'formula' ->> 'string' AS "dateMonthNameAbbr",
	arr.item_object -> 'properties' -> 'Date.Published' -> 'date' ->> 'start' AS "datePublished",
	arr.item_object -> 'properties' -> 'Date.Recorded' -> 'date' ->> 'start' AS "dateRecorded",
	arr.item_object -> 'properties' -> 'Date.Time' -> 'formula' ->> 'string' AS "dateTime",
	arr.item_object -> 'properties' -> 'Date.TimeZone' -> 'formula' ->> 'string' AS "dateTimeZone",
	arr.item_object -> 'properties' -> 'Date.WeekNumber' -> 'formula' ->> 'string' AS "dateWeekNumber",
	arr.item_object -> 'properties' -> 'Date.Year' -> 'formula' ->> 'string' AS "dateYear",
	arr.item_object -> 'properties' -> 'ID' -> 'formula' ->> 'string' AS "id",
	CAST(arr.item_object -> 'properties' -> 'Is.Active' ->> 'checkbox' AS boolean) AS "isActive",
	CAST(arr.item_object -> 'properties' -> 'Is.Explicit' ->> 'checkbox' AS boolean) AS "isExplicit",
	CAST(arr.item_object -> 'properties' -> 'Is.Indexed' ->> 'checkbox' AS boolean) AS "isIndexed",
	CAST(arr.item_object -> 'properties' -> 'Is.Published' ->> 'checkbox' AS boolean) AS "isPublished",
	arr.item_object -> 'properties' -> 'Meta.Apple.ID' -> 'rich_text' -> 0 ->> 'plain_text' AS "metaAppleId",
	arr.item_object -> 'properties' -> 'Meta.Apple.URL' ->> 'url' AS "metaAppleUrl",
	arr.item_object -> 'properties' -> 'Meta.Duration' ->> 'number' AS "metaDuration",
	arr.item_object -> 'properties' -> 'Meta.Episode' ->> 'number' AS "metaEpisode",
	arr.item_object -> 'properties' -> 'Meta.MP3' AS "metaMp3",
	arr.item_object -> 'properties' -> 'Meta.Season' ->> 'number' AS "metaSeason",
	arr.item_object -> 'properties' -> 'Meta.Sort' -> 'formula' ->> 'string' AS "metaSort",
	arr.item_object -> 'properties' -> 'Meta.Spotify.ID' -> 'rich_text' -> 0 ->> 'plain_text' AS "metaSpotifyId",
	arr.item_object -> 'properties' -> 'Meta.Spotify.URL' ->> 'url' AS "metaSpotifyUrl",
	arr.item_object -> 'properties' -> 'Meta.Time' -> 'rich_text' -> 0 ->> 'plain_text' AS "metaTime",
	arr.item_object -> 'properties' -> 'Meta.Time.Duration' -> 'formula' ->> 'number' AS "metaTimeDuration",
	arr.item_object -> 'properties' -> 'Meta.Time.Hours' -> 'formula' ->> 'number' AS "metaTimeHours",
	arr.item_object -> 'properties' -> 'Meta.Time.Minutes' -> 'formula' ->> 'number' AS "metaTimeMinutes",
	arr.item_object -> 'properties' -> 'Meta.Time.Seconds' -> 'formula' ->> 'number' AS "metaTimeSeconds",
	arr.item_object -> 'properties' -> 'Meta.Time.Valid' -> 'formula' ->> 'boolean' AS "metaTimeValid",
	arr.item_object -> 'properties' -> 'Meta.Type' -> 'select' ->> 'name' AS "metaType",
	arr.item_object -> 'properties' -> 'Relation.People.Guest' -> 'relation' AS "relationPeopleGuest",
	arr.item_object -> 'properties' -> 'Relation.People.SoundEngineer' -> 'relation' AS "relationPeopleSoundengineer",
	arr.item_object -> 'properties' -> 'Relation.People.Thanks' -> 'relation' AS "relationPeopleThanks",
	arr.item_object -> 'properties' -> 'Relation.Podcasts' -> 'relation' AS "relationPodcasts",
	arr.item_object -> 'properties' -> 'Relation.Venues' -> 'relation' AS "relationVenues",
	arr.item_object -> 'properties' -> 'Rollup.People.Guest.Title' -> 'rollup' -> 'array' AS "rollupPeopleGuestTitle",
	arr.item_object -> 'properties' -> 'Rollup.People.Host.Title' -> 'rollup' -> 'array' AS "rollupPeopleHostTitle",
	arr.item_object -> 'properties' -> 'Rollup.People.SoundEngineer.Title' -> 'rollup' -> 'array' AS "rollupPeopleSoundengineerTitle",
	arr.item_object -> 'properties' -> 'Rollup.People.Thanks.Title' -> 'rollup' -> 'array' AS "rollupPeopleThanksTitle",
	arr.item_object -> 'properties' -> 'Rollup.Podcasts.Apple.ID' -> 'rollup' -> 'array' AS "rollupPodcastsAppleId",
	arr.item_object -> 'properties' -> 'Rollup.Podcasts.Apple.URL' -> 'rollup' -> 'array' AS "rollupPodcastsAppleUrl",
	arr.item_object -> 'properties' -> 'Rollup.Podcasts.Slug' -> 'rollup' -> 'array' AS "rollupPodcastsSlug",
	arr.item_object -> 'properties' -> 'Rollup.Podcasts.Spotify.ID' -> 'rollup' -> 'array' AS "rollupPodcastsSpotifyId",
	arr.item_object -> 'properties' -> 'Rollup.Podcasts.Spotify.URL' -> 'rollup' -> 'array' AS "rollupPodcastsSpotifyUrl",
	arr.item_object -> 'properties' -> 'Rollup.Podcasts.Title' -> 'rollup' -> 'array' AS "rollupPodcastsTitle",
	arr.item_object -> 'properties' -> 'Rollup.Venues.Slug' -> 'rollup' -> 'array' AS "rollupVenuesSlug",
	arr.item_object -> 'properties' -> 'Rollup.Venues.Title' -> 'rollup' -> 'array' AS "rollupVenuesTitle",
	arr.item_object -> 'properties' -> 'SEO.Description' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoDescription",
	arr.item_object -> 'properties' -> 'SEO.Image' -> 'files' -> 0 AS "seoImage",
	arr.item_object -> 'properties' -> 'SEO.Image.Description' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoImageDescription",
	arr.item_object -> 'properties' -> 'SEO.Keywords' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoKeywords",
	arr.item_object -> 'properties' -> 'Slug' -> 'rich_text' -> 0 ->> 'plain_text' AS "slug",
	arr.item_object -> 'properties' -> 'Slug.Preview' -> 'formula' ->> 'string' AS "slugPreview",
	arr.item_object -> 'properties' -> 'Subtilte' -> 'rich_text' -> 0 ->> 'plain_text' AS "subtitle",
	arr.item_object -> 'properties' -> 'Title' -> 'title' -> 0 ->> 'plain_text' AS "title"
FROM
	cache_episodes,
	jsonb_array_elements(value)
WITH
	ordinality arr (item_object, POSITION)
WHERE
	site_id = ${envServer.POSTGRES_SITE_ID}
[REPLACE_WHERE]
[REPLACE_ORDERBY]
[REPLACE_LIMIT]
`
export async function getEpisodes(): Promise<Episode[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', '')
        .replace('[REPLACE_ORDERBY]', orderBy_default)
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
export async function getEpisodesWithLimit({
  limit = 10,
}: {
  limit: number
}): Promise<Episode[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', '')
        .replace('[REPLACE_ORDERBY]', orderBy_default)
        .replace('[REPLACE_LIMIT]', `LIMIT ${limit}`),
    ),
  )
}
export async function getEpisodesByPodcast({
  key,
}: {
  key: string
}): Promise<Episode[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', `AND key LIKE '${key}%'`)
        .replace(
          '[REPLACE_ORDERBY]',
          'ORDER BY "metaSeason" DESC, "metaEpisode" DESC',
        )
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
export async function getEpisode({ key }: { key: string }): Promise<Episode[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', `AND key = '${key}'`)

        .replace('[REPLACE_ORDERBY]', '')
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
