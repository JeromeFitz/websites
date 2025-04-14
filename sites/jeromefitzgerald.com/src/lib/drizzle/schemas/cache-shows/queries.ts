import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import { sql } from 'drizzle-orm'

import type { Show } from '@/lib/drizzle/schemas/cache-shows/types'
import type { Segment } from '@/utils/getBySegment'

import { drizzle } from '@/lib/drizzle/index'
export const segment: Segment = 'shows'

const orderBy_default = `ORDER BY
  arr.item_object -> 'properties' -> 'Date.ISO' -> 'formula' ->> 'string' DESC`

const sqlBase = `
SELECT
	id AS pid,
	key,
	value,
	inserted_at AS "insertedAt",
	updated_at AS "updatedAt",
	arr.item_object -> 'properties' -> 'Authors' -> 'people' -> 'array' AS "authors",
	arr.item_object -> 'properties' -> 'Date' -> 'date' ->> 'start' AS "date",
	arr.item_object -> 'properties' -> 'Festival' -> 'multi_select' AS "festival",
	arr.item_object -> 'properties' -> 'ID' -> 'formula' ->> 'string' AS "id",
	CAST(arr.item_object -> 'properties' -> 'Is.Active' ->> 'checkbox' AS boolean) AS "isActive",
	CAST(arr.item_object -> 'properties' -> 'Is.Featured' ->> 'checkbox' AS boolean) AS "isFeatured",
	CAST(arr.item_object -> 'properties' -> 'Is.HouseTeam' ->> 'checkbox' AS boolean) AS "isHouseTeam",
	CAST(arr.item_object -> 'properties' -> 'Is.HouseTeamPast' ->> 'checkbox' AS boolean) AS "isHouseTeamPast",
	CAST(arr.item_object -> 'properties' -> 'Is.Indexed' ->> 'checkbox' AS boolean) AS "isIndexed",
	CAST(arr.item_object -> 'properties' -> 'Is.Published' ->> 'checkbox' AS boolean) AS "isPublished",
	CAST(arr.item_object -> 'properties' -> 'Is.Recurring' ->> 'checkbox' AS boolean) AS "isRecurring",
	arr.item_object -> 'properties' -> 'Relation.Events.Primary' -> 'relation' AS "relationEventsPrimary",
	arr.item_object -> 'properties' -> 'Relation.Events.Supporting' -> 'relation' AS "relationEventsSupporting",
	arr.item_object -> 'properties' -> 'Relation.People.Cast' -> 'relation' AS "relationPeopleCast",
	arr.item_object -> 'properties' -> 'Relation.People.Cast.Past' -> 'relation' AS "relationPeopleCastPast",
	arr.item_object -> 'properties' -> 'Relation.People.Crew' -> 'relation' AS "relationPeopleCrew",
	arr.item_object -> 'properties' -> 'Relation.People.Director' -> 'relation' AS "relationPeopleDirector",
	arr.item_object -> 'properties' -> 'Relation.People.Director.Musical' -> 'relation' AS "relationPeopleDirectorMusical",
	arr.item_object -> 'properties' -> 'Relation.People.Director.Technical' -> 'relation' AS "relationPeopleDirectorTechnical",
	arr.item_object -> 'properties' -> 'Relation.People.Music' -> 'relation' AS "relationPeopleMusic",
	arr.item_object -> 'properties' -> 'Relation.People.Producer' -> 'relation' AS "relationPeopleProducer",
	arr.item_object -> 'properties' -> 'Relation.People.Thanks' -> 'relation' AS "relationPeopleThanks",
	arr.item_object -> 'properties' -> 'Relation.People.Writer' -> 'relation' AS "relationPeopleWriter",
	arr.item_object -> 'properties' -> 'Relation.Tags' -> 'relation' AS "relationTags",
	arr.item_object -> 'properties' -> 'Rollup.People.Cast.Past.Title' -> 'rollup' -> 'array' AS "rollupPeopleCastPastTitle",
	arr.item_object -> 'properties' -> 'Rollup.People.Cast.Slug' -> 'rollup' -> 'array' AS "rollupPeopleCastSlug",
	arr.item_object -> 'properties' -> 'Rollup.People.Cast.Title' -> 'rollup' -> 'array' AS "rollupPeopleCastTitle",
	arr.item_object -> 'properties' -> 'Rollup.People.Crew.Title' -> 'rollup' -> 'array' AS "rollupPeopleCrewTitle",
	arr.item_object -> 'properties' -> 'Rollup.People.Director.Musical.Title' -> 'rollup' -> 'array' AS "rollupPeopleDirectorMusicalTitle",
	arr.item_object -> 'properties' -> 'Rollup.People.Director.Technical.Title' -> 'rollup' -> 'array' AS "rollupPeopleDirectorTechnicalTitle",
	arr.item_object -> 'properties' -> 'Rollup.People.Director.Title' -> 'rollup' -> 'array' AS "rollupPeopleDirectorTitle",
	arr.item_object -> 'properties' -> 'Rollup.People.Music.Title' -> 'rollup' -> 'array' AS "rollupPeopleMusicTitle",
	arr.item_object -> 'properties' -> 'Rollup.People.Producer.Title' -> 'rollup' -> 'array' AS "rollupPeopleProducerTitle",
	arr.item_object -> 'properties' -> 'Rollup.People.Thanks.Title' -> 'rollup' -> 'array' AS "rollupPeopleThanksTitle",
	arr.item_object -> 'properties' -> 'Rollup.People.Writer.Title' -> 'rollup' -> 'array' AS "rollupPeopleWriterTitle",
	arr.item_object -> 'properties' -> 'Rollup.Tags' -> 'rollup' -> 'array' AS "rollupTags",
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
	arr.item_object -> 'properties' -> 'Tags' -> 'multi_select' AS "tags",
	arr.item_object -> 'properties' -> 'Title' -> 'title' -> 0 ->> 'plain_text' AS "title",
	arr.item_object -> 'properties' -> 'Type' -> 'select' ->> 'name' AS "type"
FROM
	cache_shows,
	jsonb_array_elements(value)
WITH
	ordinality arr (item_object, POSITION)
WHERE
	site_id = ${envServer.POSTGRES_SITE_ID}
[REPLACE_WHERE]
[REPLACE_ORDERBY]
[REPLACE_LIMIT]
`
export async function getShows(): Promise<Show[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', '')
        .replace('[REPLACE_ORDERBY]', orderBy_default)
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
export async function getShowsWithLimit({
  limit = 10,
}: {
  limit: number
}): Promise<Show[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', '')
        .replace('[REPLACE_ORDERBY]', orderBy_default)
        .replace('[REPLACE_LIMIT]', `LIMIT ${limit}`),
    ),
  )
}
export async function getShow({ key }: { key: string }): Promise<Show[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', `AND key = '${key}'`)
        .replace('[REPLACE_ORDERBY]', '')
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
